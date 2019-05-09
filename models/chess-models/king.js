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
    if (x - 1 > 0) {
      positions[x - 1] = [y - 1, y, y + 1].filter(val => val > 0 && val <= 8);
    }
    return positions;
  }

  checkAndUpdate(x2, y2, matrix) {
    
    console.log("checking for valid move", this.validMoves);
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = King.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}


module.exports = {King}
