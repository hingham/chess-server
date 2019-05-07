'use strict';

const { ChessPieces } = require( "./chess-pieces.js");

class King extends ChessPieces {
  constructor(hex, xPos, yPos, team, type) {
    super(hex, xPos, yPos, team, type);
    this.validMoves = King.findMoves(xPos, yPos);
    this.type = 'king';

  }

  static findMoves(x, y) {
    let positions = {};

    positions[x] = [y + 1, y - 1].filter(val => val > 0 && val <= 8);

    if (x + 1 <= 8) {
      //sideways, sidways and up
      positions[x + 1] = [y - 1, y, y + 1].filter(val => val > 0 && val <= 8);
    }
    if (x - 1 <= 8) {
      positions[x - 1] = [y - 1, y, y + 1].filter(val => val > 0 && val <= 8);
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    super.checkAndUpdate();
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = King.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

// let lightKing = new King("&#9813;", 5, 1, "light");
// let darkKing = new King("&#9819;", 4, 8, "dark");

module.exports = {King}
