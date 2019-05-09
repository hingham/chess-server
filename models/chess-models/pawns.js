const { ChessPieces } = require("./chess-pieces.js");

class LightPawn extends ChessPieces {
  constructor(hex, xPos, yPos, team, type) {
    super(hex, xPos, yPos, team, type);
    this.validMoves = LightPawn.findMoves(xPos, yPos);
    this.validMoves[xPos].push(yPos + 2);
    this.validCapture = LightPawn.canCapture(xPos, yPos);
    this.type = "pawn";
  }

  static findMoves(x, y) {
    let positions = {};
    if (y + 1 <= 8) {
      positions[x] = [y + 1];
    }
    return positions;
  }

  static canCapture(x, y) {
    let capture = {};
    if (y + 1 <= 8 && x + 1 <= 8) {
      capture[x + 1] = y + 1;
    }
    if (y + 1 <= 8 && x - 1 >= 1) {
      capture[x - 1] = y + 1;
    }
    console.log("capture object", capture);
    return capture;
  }

  checkAndUpdate(x2, y2, matrix) {
    let move = this.checkAndMove(x2, y2, matrix);
    if (move) {
      if(move === 'capture-king') return move;
      this.validCapture = LightPawn.canCapture(this.xPos, this.yPos);
      this.validMoves = LightPawn.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

class DarkPawn extends ChessPieces {
  constructor(hex, xPos, yPos, team, type) {
    super(hex, xPos, yPos, team, type);
    this.validMoves = DarkPawn.findMoves(xPos, yPos);
    this.validMoves[xPos].push(yPos - 2);
    this.validCapture = DarkPawn.canCapture(xPos, yPos);
    this.type = "pawn";
  }

  static findMoves(x, y) {
    let positions = {};
    if (y - 1 >= 1) {
      positions[x] = [y - 1];
    }
    return positions;
  }

  static canCapture(x, y) {
    let capture = {};
    if (y - 1 >= 1 && x + 1 <= 8) {
      capture[x + 1] = y - 1;
    }
    if (y - 1 >= 1 && x - 1 >= 1) {
      capture[x - 1] = y - 1;
    }
    return capture;
  }

  checkAndUpdate(x2, y2, matrix) {
    let move = this.checkAndMove(x2, y2, matrix);
    if (move) {
      console.log('move, check for king', move);
      if(move === 'capture-king') return move;
      this.validCapture = DarkPawn.canCapture(this.xPos, this.yPos);
      this.validMoves = DarkPawn.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}


module.exports = {
  LightPawn, DarkPawn
};
