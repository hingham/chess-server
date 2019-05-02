//import in the starting chessboard
const chessBoard = require("./board.js");

// console.log('chessboard', chessBoard);

class Game {
    constructor (roomId, player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.roomId = roomId;
        this.moves = 0;
        this.winner = null;
        this.board = chessBoard;
        this.playerMove = {};
    }

    switchTurn(){
        this.player1.turn = !this.player1.turn;
        this.player2.turn = !this.player2.turn;
    }

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

let testBoard = new Game('test', 'h', 'a');

let testPiece = testBoard.board[1][1];

console.log('test', testPiece);

let result = testPiece.checkAndUpdate(1, 4, testBoard.board);


console.log('result');


module.exports = Game;
