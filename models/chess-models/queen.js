const { ChessPieces } = require( "./chess-pieces.js");

class Queen extends ChessPieces {
  constructor(hex, xPos, yPos, team) {
    super(hex, xPos, yPos, team);
    this.type = 'queen';
    this.validMoves = Queen.findMoves(xPos, yPos);
  }

  static findMoves(x, y) {
    let positions = {};
    //can move move like rook
    positions[x] = [1, 2, 3, 4, 5, 6, 7, 8].filter(val => val !== y);
    for (let i = 1; i <= 8; i++) {
      if (x !== i) {
        positions[i] = [y];
      }
    }

    for (let i = 1; i <= 8; i++) {
      if (x + i !== x && x + i <= 8 && y + i <= 8) {
        positions[x + i].push(y + i);
      }
      if (x + i !== x && x + i <= 8 && y - i > 0) {
        positions[x + i].push(y - i);
      }
      if (x - i !== x && x - i > 0 && y + i <= 8) {
        positions[x - i] .push(y + i);
      }
      if (x - i !== x && x - i > 0 && y - i > 0) {
        positions[x - i].push(y - i);
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
    else if(this.yPos === y){
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
    else{
      let slope = (-1 * y - -1 * this.yPos) / (x - this.xPos);
      let inverseIntercept = -1 * y - slope * x;
      let input = Math.min(x, this.xPos) + 1;
      let end = Math.max(x, this.xPos);
      while (input !== end) {
        let output = input * slope + inverseIntercept;
        if (matrix[-output] && matrix[-output][input]) {
          return false;
        }
        input++;
      }
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
      this.validMoves = Queen.findMoves(this.xPos, this.yPos);
      return true;
    }
    return false;
  }

}

module.exports = {Queen};