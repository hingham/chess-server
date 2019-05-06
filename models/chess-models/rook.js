const { ChessPieces } = require( "./chess-pieces.js");

class Rook extends ChessPieces {
  constructor(hex, xPos, yPos, team) {
    super(hex, xPos, yPos, team);
    this.validMoves = Rook.findMoves(xPos, yPos);
    this.type = 'rook';
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

  checkCollision(x, y, matrix) {
    // the x position is static, need to check every spot between the xEnd and xStart 
    if(this.xPos === x){
      let start = Math.min(y, this.yPos);
      let end = Math.max(y, this.yPos);
      console.log('the collision', x, this.xPos, start, end);
      for(let i = start+1; i<end; i++){
        if(matrix[i][x]){
          //if there is a piece found, then return false
          return false;
        }
      }
    }
    else{
      //the y position is static, need to check every spot between the xEnd and the xStart
      let start = Math.min(x, this.xPos);
      let end = Math.max(x, this.xPos);
      for(let i = start+1; i<end; i++){
        if(matrix[y][i]){
          //if there is a piece found, then return false
          return false;
        }
      }
    }
    return true;
  }

  checkAndUpdate(x2, y2, matrix) {
    console.log("checking for valid move");
    if (this.checkCollision(x2, y2, matrix) && this.checkAndMove(x2, y2, matrix)) {
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
