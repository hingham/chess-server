class ChessPieces {
  constructor(hex, xPos, yPos, team, type) {
    this.hex = hex;
    this.xPos = xPos;
    this.yPos = yPos;
    this.team = team;
    this.type = type;
    this.validMoves = null;
  }

  // sub classes should implement checkAndUpdate
  checkAndUpdate() {
    console.log("sub class must implement checkAndUpdate function");
    return false;
  }

  //sub classes should implement
  findMoves() {
    console.log("sub class must implement findMoves function");
  }

  canCapture() {
    console.log("sub class may implement canCapture function");
  }

  changePosition(x1, y1, x2, y2, matrix) {
    let temp = matrix[y1][x1];
    console.log("temp");
    matrix[y1][x1] = null;
    matrix[y2][x2] = temp;
  }

  //check if the move exists in the possible move object
  checkAndMove(x2, y2, matrix) {
    if ( matrix[y2][x2] && matrix[this.yPos][this.xPos].type === 'pawn' ) {
      //if position is filled and it is valid, return true, else return false
      console.log('the pawn is trying to capture', matrix[y2][x2]);
      if (
        this.validCapture.hasOwnProperty(x2) &&
        this.validCapture[x2] === y2
      ) {
        this.changePosition(this.xPos, this.yPos, x2, y2, matrix);
        this.updatePos(x2, y2);
        return true;
      } else {
        return false;
      }
    }
    console.log("place it is moving", matrix[y2][x2]);
    if (this.validMoves.hasOwnProperty(x2)) {
      let yArr = this.validMoves[x2];
      console.log("valid x");
      if (yArr.indexOf(parseInt(y2)) >= 0) {
        console.log("valid x and y");
        this.changePosition(this.xPos, this.yPos, x2, y2, matrix);
        this.updatePos(x2, y2);
        return true;
      }
    }
    console.log("not valid move");
    return false;
  }

  //update the nodes position on the board
  updatePos(x2, y2) {
    this.xPos = parseInt(x2, 10);
    this.yPos = parseInt(y2, 10);
    console.log("new position ", this.xPos, this.yPos);
  }
}

module.exports = { ChessPieces };
