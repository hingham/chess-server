const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const Game = require("./models/game.js");
const Player = require("./models/player.js");
// const board = require("./models/board.js");

app.use(express.static("public"));

server.listen(4000, () => console.log("server up on port 4000"));

const games = {};

//listen for new connections
io.on("connection", socket => {
  console.log("someone tried to connect", io.nsps);

  //create a new game room and pass new game data to DOM
  socket.on("createGame", data => {
    console.log("room data: ", data.name);
    socket.join(`room-${data.name}`);

    socket.broadcast.emit("connectToNewGame", data);
    socket.emit("player1", data);
    // io.sockets.in(`room-${data.name}`).emit('player1', data.name);
  });

  ///connect the player 2 to the room request
  socket.on("joinGame", data => {
    //wrap this in an if to check the total sockets in the room
    console.log("trying to join a game", data);

    socket.join(`room-${data.room}`);
    console.log(
      "a player joined an existing room",
      io.nsps["/"].adapter.rooms[`room-${data.room}`]
    );

    socket.emit("player2", data);
  });

  socket.on("bothPlayersJoined", data => {
    let newGame = new Game(
        data.player1,
        //these should be able to be referenced with sockets
        new Player(data.player1, "light", true),
        new Player(data.player2, "dark", false)
      );

    games[data.player1] = newGame;



    console.log("the game object", newGame);
    io.in(`room-${data.room}`).emit("drawBoard", games[data.player1]);
  });

  //handle the turn played by either player and notify the other
  socket.on("playerMoved", game => {
    console.log("game with move,", game);
    let sCol = game.playerMove.xStart;
    let sRow = game.playerMove.yStart;
    let eCol = game.playerMove.xEnd;
    let eRow = game.playerMove.yEnd;

    if (game.board[sRow][sCol] && game.playerMove.xEnd !== null) {
      //TODO: this SHOULD be modularized...
      if (game.board[eRow][eCol] !== null) {
        socket.emit("unValidMove", "That space is already occupied");
      } else {
        // returns boolean true if piece was successfully moved
        let pieceNode = game.board[sRow][sCol];
        console.log('piece', pieceNode);
        
        game.board[sRow][sCol].checkAndUpdate(eCol, eRow, game.board);
        if (moved) {
            game.switchTurn;
        //   socket.emit("drawBoard", games[game.roomId]);
        } else {
        //   socket.emit("unValidMove", "Not a valid move, please try again.");
        }
      }
    } else {
      socket.emit(
        "unValidMove",
        "There is piece at that space. Please try again."
      );
    }
  });

  //notify when there is a winner
  socket.on("gameEnded", data => {
    socket.boardcast.to(data.room).emit("gameEnd", data);
  });

  socket.on("disconnect", () => {
    console.log(`Playerdisconnected`);
    // connections[playerIdx] =null;
  });
});
