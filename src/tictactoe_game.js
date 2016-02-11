var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;


function TicTacToeGame(board) {
  TableTop.Game.call(this, board);
  this.currentPlayer = 0;
  this.moveType = TableTop.Constants.moveTypePlaceToken;
  this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
  this.possibleNumPlayers = [2];
  this.showNextPlayerScreen = false;
};

inherits(TicTacToeGame, TableTop.Game);

/*
  Make the move! Move the token from the previous tile to the new tile
*/
TicTacToeGame.prototype.executeMove = function() {  
  var destination = this.proposedMove.destination;
  var newPosition = this.board.getTilePosition(destination);
  var tile = this.board.tiles[newPosition.x][newPosition.y];
  var token = new TableTop.Token(this.getCurrentPlayer(), tile, this.getCurrentPlayer().color);
  this.board.buildTokenForTile(token, tile);
  this.getCurrentPlayer().tokens.push(tile.occupier);

  this.proposedMove = {};
};

/*
  Is it legal for the token to move from the old tile to the new tile?
*/
TicTacToeGame.prototype.isValidMove = function(token, oldTile, newTile) { 


  return !newTile.occupier;
};


TicTacToeGame.prototype.threeDtable = function(currentArray) {
	

	var newArray= new Array();
	for (i = 0; i < 9; i++){
		newArray[i] = new Array();
		for (j = 0; j < 3; j++){
			newArray[i][j] = new Array();
		}
	}

	for (var row=0; row<9; row++){
		for (var col=0; col<9; col++){
			if ((row>=0) && (row<=2)){
				if ((col>=0) && (col<=2)){
					newArray[0][row][col]=currentArray[row][col];
				}
				if ((col>=3) && (col<=5)){
					newArray[1][row][col%3]=currentArray[row][col];
				}
				if ((col>=6) && (col<=8)){
					newArray[2][row][col%3]=currentArray[row][col];
				}
			}
			if ((row>=3) && (row<=5)){
				if ((col>=0) && (col<=2)){
					newArray[3][row%3][col%3]=currentArray[row][col];
				}
				if ((col>=3) && (col<=5)){
					newArray[4][row%3][col%3]=currentArray[row][col];
				}
				if ((col>=6) && (col<=8)){
					newArray[5][row%3][col%3]=currentArray[row][col];
				}
			}if ((row>=6) && (row<=8)){
				if ((col>=0) && (col<=2)){
					newArray[6][row%3][col%3]=currentArray[row][col];
				}
				if ((col>=3) && (col<=5)){
					newArray[7][row%3][col%3]=currentArray[row][col];
				}
				if ((col>=6) && (col<=8)){
					newArray[8][row%3][col%3]=currentArray[row][col];
				}
			}
		}
	}
	return newArray;
}


/*
  Given the current state of the game, did someone win?
*/
TicTacToeGame.prototype.playerDidWinSmall = function(player, element) {
  
  //check rows
  for (x = 0; x < 3; x++) {
    if(element[x][0].occupier && element[x][1].occupier && element[x][2].occupier){
      if((element[x][0].occupier.color == element[x][1].occupier.color)&&(element[x][1].occupier.color == element[x][2].occupier.color)){
        return true;
      }
    }
  }

  //check columns
  for (y = 0; y < 3; y++) {
    if(element[0][y].occupier && element[1][y].occupier && element[2][y].occupier){
      if((element[0][y].occupier.color == element[1][y].occupier.color)&&(element[1][y].occupier.color == element[2][y].occupier.color)){
        return true;
      }
    }
  }

  //check diagonals
  if(element[0][0].occupier && element[1][1].occupier && element[2][2].occupier){
    if((element[0][0].occupier.color == element[1][1].occupier.color)&&(element[1][1].occupier.color == element[2][2].occupier.color)){
      return true;
    }
  }
  if(element[0][2].occupier && element[1][1].occupier && element[2][0].occupier){
    if((element[0][2].occupier.color == element[1][1].occupier.color)&&(element[1][1].occupier.color == element[2][0].occupier.color)){
      return true;
    }
  }

  return false;
};

TicTacToeGame.prototype.playerDidWin = function(player){
	newArray=this.threeDtable(this.board.tiles);
	boardArray=[]
	for (position=0;position<9;position++){
		boardArray[position]=this.playerDidWinSmall(player,newArray[position]);
		if(boardArray[position]){
			return true;
		}
	}
	

}

module.exports = TicTacToeGame;