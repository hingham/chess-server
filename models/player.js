class Player {
    constructor(name, type){
        this.name= name;
        this.type = type;
        this.currentTurn = true;
        this.movesPlayed = 0;
        this.piecesCollected = [];
    }

    updateMovesPlayed = ()=>{
        this.movesPlayed ++;
    }

    setCurrentTurn = (turn)=>{
        this.currentTurn = turn;
        ///we could emit that data about whose turn it is to the broswer
    }
}

