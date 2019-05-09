const express = require("express");
const socketio = require("socket.io");
const http = require("http");

require("dotenv").config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const Game = require("./models/game.js");
const Player = require("./models/player.js");
const chessBoard = require("./models/board.js");

app.use(express.static("public"));

server.listen(process.env.PORT, () =>
  console.log(`server up on port ${process.env.PORT}`)
);

const games = {};
const openGames = {};
const users = {};

//listen for new connections
io.on("connection", socket => {
  socket.emit("showGames", openGames);
  //create a new game room and pass new game data to DOM
  socket.on("createGame", data => {
    console.log("room data: ", data.name);
    socket.join(`room-${data.name}`);

    //add the game to the list so new users will see games when they connect
    openGames[data.name] = null;
    socket.broadcast.emit("connectToNewGame", {
      name: data.name,
      games: openGames
    });

    //add player 1 to user object
    users[data.name] = new Player(socket.id, data.name, "light", true);

    socket.emit("player1", data);
    // io.sockets.in(`room-${data.name}`).emit('player1', data.name);
  });

  ///connect the player 2 to the room request
  socket.on("joinGame", data => {

    //delete this game from open games object
    delete openGames[data.room];

    socket.join(`room-${data.room}`);
    socket.emit("player2", { room: data.room, name: data.name});
    socket.broadcast.emit("updateAvailableGames", { games: openGames });
  });

  socket.on("bothPlayersJoined", data => {
    users[data.player2] = new Player(socket.id, data.player2, "dark", false);

    let newGame = new Game(
      data.player1,
      users[data.player1].socket,
      users[data.player1],
      users[data.player2].socket,
      users[data.player2]
    );

    games[data.player1] = newGame;
    let documentBoard = [...games[data.player1].board];

    io.in(`room-${data.room}`).emit("drawBoard", {
      gameId: data.player1,
      board: documentBoard,
      playerMove: games[data.player1].playerMove,
      player1: data.player1,
      player2: data.player2
    });
    socket.emit("wait");
  });

  //handle the turn played by either player and notify the other
  socket.on("playerMoved", data => {
    let myGame = games[data.gameId];
    myGame.playerMove = data.playerMove;

    let sCol = data.playerMove.xStart;
    let sRow = data.playerMove.yStart;
    let eCol = data.playerMove.xEnd;
    let eRow = data.playerMove.yEnd;

    let move = checkAndMove(socket, myGame, sRow, sCol, eRow, eCol); 
    if (move) {
      console.log('move', move);
      if(move == 'capture-king'){
        socket.emit("winner");
        socket.broadcast.to(`room-${data.gameId}`).emit("loose");
        return;
      }

      if (
        data.check &&
        myGame.board[eRow][eCol].isCheck(myGame.board)
      ) {
        // socket.emit("winner");
        socket.broadcast.to(`room-${data.gameId}`).emit("checked", 'You have been checked.');
      }

      let documentBoard = [...myGame.board];
      io.in(`room-${data.gameId}`).emit("drawBoard", {
        gameId: data.player1,
        board: documentBoard,
        player1: data.player1,
        player2: data.player2,
        playerMove: myGame.playerMove
      });

      //this should only be emited if the move is sucessful -- returns early from checkAndMove otherwise
      socket.emit("wait");
      socket.broadcast.to(`room-${data.gameId}`).emit("go", data);
    }
  });

  //notify when there is a winner
  socket.on("gameEnded", data => {
    socket.boardcast.to(data.room).emit("gameEnd");
  });

  socket.on("disconnect", () => {
    console.log(`Playerdisconnected`);
    // delete games.data[gameId];
    // connections[playerIdx] =null;
  });
});

function checkAndMove(socket, game, startRow, startCol, endRow, endCol) {
  if (!game.board[startRow][startCol]) {
    socket.emit(
      "unvalidMove",
      "There is no piece at that position. Please try again."
    );
    return false;
  }
  if (!endCol) {
    socket.emit(
      "unvalidMove",
      "Please select space to where you would like move."
    );
    return false;
  }
  //if there is already a space there and it is of the same team
  if (
    game.board[endRow][endCol] &&
    game.board[endRow][endCol].team === game.board[startRow][startCol].team
  ) {
    socket.emit("unvalidMove", "You already have a piece at that position.");
    return false;
  }
  // console.log('the team', game.board[startRow][startCol], game[socket.id].team)
  if (game.board[startRow][startCol].team !== game[socket.id].team) {
    socket.emit("unvalidMove", "Please select one of your pieces to move.");
    return false;
  }
  // console.log('type of:', game.board[startRow][startCol] instanceof LightPawn);
  let moved = game.board[startRow][startCol].checkAndUpdate(
    endCol,
    endRow,
    game.board
  );
  console.log('moved', moved);
  if(moved === 'capture-king') return moved;
  else if (!moved) {
    socket.emit("unvalidMove", "Not a valid move, please try again.");
    return false;
  }
  return true;
}
