const { ChessPieces } = require("./chess-pieces.js");

class Bishop extends ChessPieces {
  constructor(hex, xPos, yPos, team) {
    super(hex, xPos, yPos, team);
    this.validMoves = Bishop.findMoves(xPos, yPos);
    this.type = "bishop";
  }

  static findMoves(x, y) {
    let positions = {};
    for (let i = 1; i < 9; i++) {
      positions[i] = [];
    }

    for (let i = 1; i <= 8; i++) {
      if (x + i !== x && x + i <= 8 && y + i <= 8) {
        positions[x + i].push(y + i);
      }
      if (x + i !== x && x + i <= 8 && y - i > 0) {
        positions[x + i].push(y - i);
      }
      if (x - i !== x && x - i > 0 && y + i <= 8) {
        positions[x - i].push(y + i);
      }
      if (x - i !== x && x - i > 0 && y - i > 0) {
        positions[x - i].push(y - i);
      }
    }
    return positions;
  }

  checkCollision(x, y, matrix) {
    let slope = (-1 * y - -1 * this.yPos) / (x - this.xPos);
    let inverseIntercept = -1 * y - slope * x;
    let input = Math.min(x, this.xPos) + 1;
    let end = Math.max(x, this.xPos);
    while (input !== end) {
      let output = input * slope + inverseIntercept;
      if (matrix[-output][input]) {
        return false;
      }
      input++;
    }
    return true;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    let collision = this.checkCollision(x2, y2, matrix);
    let move = this.checkAndMove;
    if (collision && move) {
      if(move === 'capture-king'){
        return move;
      }
      this.validMoves = Bishop.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

// let lightBishop1 = new Bishop("&#9815;", 3, 1, "light");
// let lightBishop2 = new Bishop("&#9815;", 6, 1, "light");

// let darkBishop1 = new Bishop("&#9821;", 3, 8, "dark");
// let darkBishop2 = new Bishop("&#9821;", 6, 8, "dark");

module.exports = {Bishop};
