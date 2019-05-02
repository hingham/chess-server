const { ChessPieces } = require( "./chess-pieces.js");

class Bishop extends ChessPieces {
  constructor(hex, xPos, yPos, type, checkAndMove, checkAndUpdate) {
    super(hex, xPos, yPos, type, checkAndMove, checkAndUpdate);
    this.validMoves = Bishop.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
    for (let i = 0; i < 8; i++) {
      if (x + i !== x && x + i <= 8 && y + i <= 8) {
        positions[x + i] = [y + i];
      }
      if (x + i !== x && x + i <= 8 && y - i > 0) {
        positions[x + i] = [y - i];
      }
      if (x - i !== x && x - i > 0 && y + i <= 8) {
        positions[x - i] = [y + i];
      }
      if (x - i !== x && x - i > 0 && y - i > 0) {
        positions[x - i] = [y - i];
      }
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = Bishop.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

let lightBishop1 = new Bishop("&#9815;", 3, 1, 'light');
let lightBishop2 = new Bishop("&#9815;", 6, 1, 'light');

let darkBishop1 = new Bishop("&#9821;", 3, 8, "dark");
let darkBishop2 = new Bishop("&#9821;", 6, 8, "dark");

module.exports = {lightBishop1, lightBishop2, darkBishop1, darkBishop2};
