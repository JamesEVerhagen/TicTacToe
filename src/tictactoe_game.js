var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;


function TicTacToeGame(players, board) {
  TableTop.Game.call(this, players, board);
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

/*
  Given the current state of the game, did someone win?
*/
TicTacToeGame.prototype.playerDidWin = function(player) {
  
  //check rows
  for (x = 0; x < 3; x++) {
    if(this.board.tiles[x][0].occupier && this.board.tiles[x][1].occupier && this.board.tiles[x][2].occupier){
      if((this.board.tiles[x][0].occupier.color == this.board.tiles[x][1].occupier.color)&&(this.board.tiles[x][1].occupier.color == this.board.tiles[x][2].occupier.color)){
        return true;
      }
    }
  }

  //check columns
  for (y = 0; y < 3; y++) {
    if(this.board.tiles[0][y].occupier && this.board.tiles[1][y].occupier && this.board.tiles[2][y].occupier){
      if((this.board.tiles[0][y].occupier.color == this.board.tiles[1][y].occupier.color)&&(this.board.tiles[1][y].occupier.color == this.board.tiles[2][y].occupier.color)){
        return true;
      }
    }
  }

  //check diagonals
  if(this.board.tiles[0][0].occupier && this.board.tiles[1][1].occupier && this.board.tiles[2][2].occupier){
    if((this.board.tiles[0][0].occupier.color == this.board.tiles[1][1].occupier.color)&&(this.board.tiles[1][1].occupier.color == this.board.tiles[2][2].occupier.color)){
      return true;
    }
  }
  if(this.board.tiles[0][2].occupier && this.board.tiles[1][1].occupier && this.board.tiles[2][0].occupier){
    if((this.board.tiles[0][2].occupier.color == this.board.tiles[1][1].occupier.color)&&(this.board.tiles[1][1].occupier.color == this.board.tiles[2][0].occupier.color)){
      return true;
    }
  }

  return false;
};


module.exports = TicTacToeGame;