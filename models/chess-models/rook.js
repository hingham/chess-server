const { ChessPieces } = require( "./chess-pieces.js");

class Rook extends ChessPieces {
  constructor(hex, xPos, yPos, type, checkAndMove, checkAndUpdate) {
    super(hex, xPos, yPos, type, checkAndMove, checkAndUpdate);
    this.validMoves = Rook.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
    positions[x] = [1, 2, 3, 4, 5, 6, 7, 8].filter(val => val !== y);
    for (let i = 1; i <= 8; i++) {
      if (x !== i) {
        positions[i] = [y];
      }
    }

    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = Rook.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

let lightRook1 = new Rook("&#9814;", 1, 1, "light");
let lightRook2 = new Rook("&#9814;", 8, 1, "light");

let darkRook1 = new Rook("&#9820;", 1, 8, "dark");
let darkRook2 = new Rook("&#9820;", 8, 8, "dark");

module.exports = {lightRook1, lightRook2, darkRook1, darkRook2};