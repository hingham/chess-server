class Player {
    constructor(socket, name, team, currentTurn){
        this.socket = socket;
        this.name= name;
        this.team = team;
        this.currentTurn = currentTurn;
        this.movesPlayed = 0;
        this.piecesCollected = [];
    }

    updateMovesPlayed  ()  {
        this.movesPlayed ++;
    } 

    // move(moveObj, matrix, callback) {
    //     console.log(`player move`);
    
    //     let metaData = {
    //       matrix: matrix,
    //       moveObj: moveObj
    //     };
    //     this.playerConnection.emit("move", metaData);
    //   }

    // setCurrentTurn = () => {
    //     this.currentTurn = !this.currentTurn;
    //     ///we could emit that data about whose turn it is to the broswer
    // }
}

module.exports = Player;
