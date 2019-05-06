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
    if (this.checkAndMove(x2, y2, matrix)) {
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
    console.log("checking for valid move");

    if (this.checkAndMove(x2, y2, matrix)) {
      this.validCapture = DarkPawn.canCapture(this.xPos, this.yPos);
      this.validMoves = DarkPawn.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }
}

let lightPawn1 = new LightPawn("&#9817;", 1, 2, "light");
let lightPawn2 = new LightPawn("&#9817;", 2, 2, "light");
let lightPawn3 = new LightPawn("&#9817;", 3, 2, "light");
let lightPawn4 = new LightPawn("&#9817;", 4, 2, "light");
let lightPawn5 = new LightPawn("&#9817;", 5, 2, "light");
let lightPawn6 = new LightPawn("&#9817;", 6, 2, "light");
let lightPawn7 = new LightPawn("&#9817;", 7, 2, "light");
let lightPawn8 = new LightPawn("&#9817;", 8, 2, "light");

let darkPawn1 = new DarkPawn("&#9823;", 1, 7, "dark");
let darkPawn2 = new DarkPawn("&#9823;", 2, 7, "dark");
let darkPawn3 = new DarkPawn("&#9823;", 3, 7, "dark");
let darkPawn4 = new DarkPawn("&#9823;", 4, 7, "dark");
let darkPawn5 = new DarkPawn("&#9823;", 5, 7, "dark");
let darkPawn6 = new DarkPawn("&#9823;", 6, 7, "dark");
let darkPawn7 = new DarkPawn("&#9823;", 7, 7, "dark");
let darkPawn8 = new DarkPawn("&#9823;", 8, 7, "dark");

module.exports = {
  lightPawn1,
  lightPawn2,
  lightPawn3,
  lightPawn4,
  lightPawn5,
  lightPawn6,
  lightPawn7,
  lightPawn8,
  darkPawn1,
  darkPawn2,
  darkPawn3,
  darkPawn4,
  darkPawn5,
  darkPawn6,
  darkPawn7,
  darkPawn8
};
