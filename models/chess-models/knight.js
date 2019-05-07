const { ChessPieces } = require( "./chess-pieces.js");

class Knight extends ChessPieces {

  constructor(hex, xPos, yPos, team) {
    super(hex, xPos, yPos, team);
    this.validMoves = Knight.findMoves(this.xPos, this.yPos);
    this.type = 'knight';
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkAndMove(x2, y2, matrix)) {
      this.validMoves = Knight.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }

  //find all possible moves for the knight
  static findMoves(x, y) {
    console.log("finding valid knight moves");

    let positions = {};
    if (x + 1 <= 8) {
      positions[x + 1] = [y + 2, y - 2].filter(val => val > 0 && val <= 8);
    }
    if (x - 1 > 0) {
      positions[x - 1] = [y + 2, y - 2].filter(val => val > 0 && val <= 8);
    }
    if (x + 2 <= 8) {
      positions[x + 2] = [y + 1, y - 1].filter(val => val > 0 && val <= 8);
    }
    if (x - 2 > 0) {
      positions[x - 2] = [y + 1, y - 1].filter(val => val > 0 && val <= 8);
    }
    return positions;
  }
}

// let lightKnight1 = new Knight("&#9816;", 2, 1, "light");
// let lightKnight2 = new Knight("&#9816;", 7, 1, "light");

// let darkKnight1 = new Knight("&#9822;", 2, 8, "dark");
// let darkKnight2 = new Knight("&#9822;", 7, 8, "dark");

module.exports =  {Knight};
