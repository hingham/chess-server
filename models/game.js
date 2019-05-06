//import in the starting chessboard
const chessBoard = require("./board.js");
const Player = require("./player.js");
const makeBoard = require('./board.js');
// console.log('chessboard', chessBoard);

class Game {
    constructor (roomId, socket1, player1, socket2, player2){
        this[`${socket1}`] = player1;
        this[`${socket2}`] = player2;
        // this.turn = 
        this.roomId = roomId;
        this.moves = 0;
        this.winner = null;
        this.board = makeBoard();
        this.playerMove = null;
    }

    // switchTurn(socket1, socket2){
    //     this[socket1].turn = !this.player1.turn;
    //     this[socket2].turn = !this.player2.turn;
    // }

    updateBoard () {
        //do work to update the matrix if the move was legal
    }


    checkCheckmate (){
        //check if the game is over and there is a winner
    }

    announceWinner  () {
        //send out data about the winner
    }

    endGame  () {
        //end the game
    }
}


module.exports = Game;
