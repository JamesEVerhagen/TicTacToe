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

/*
  Given the current state of the game, did they draw?
*/
TicTacToeGame.prototype.playerDraw = function() {
  
  //check if draw
  if(this.board.tiles[0][0].occupier != null && this.board.tiles[0][1].occupier != null && this.board.tiles[0][2].occupier != null &&
     this.board.tiles[1][0].occupier != null && this.board.tiles[1][1].occupier != null && this.board.tiles[1][2].occupier != null &&
     this.board.tiles[2][0].occupier != null && this.board.tiles[2][1].occupier != null && this.board.tiles[2][2].occupier != null){
     return true;
  }

  return false;
};

/*
  Given the current state of the game, return the cells that are empty
*/

TicTacToeGame.prototype.returnEmptyCells = function() {

  var emptyCells = new Array();
  
  //check if draw
  if(this.board.tiles[0][0].occupier == null){
    emptyCells.push(this.board.tiles[0][0]);
  }

  //check if draw
  if(this.board.tiles[0][1].occupier == null){
    emptyCells.push(this.board.tiles[0][1]);
  }

  //check if draw
  if(this.board.tiles[0][2].occupier == null ){
    emptyCells.push(this.board.tiles[0][2]);
  }

  //check if draw
  if(this.board.tiles[1][0].occupier == null ){
    emptyCells.push(this.board.tiles[1][0]);
  }

  //check if draw
  if(this.board.tiles[1][1].occupier == null ){
    emptyCells.push(this.board.tiles[1][1]);
  }

  //check if draw
  if(this.board.tiles[1][2].occupier == null ){
    emptyCells.push(this.board.tiles[1][2]);
  }

  //check if draw
  if(this.board.tiles[2][0].occupier == null ){
    emptyCells.push(this.board.tiles[2][0]);
  }

  //check if draw
  if(this.board.tiles[2][1].occupier == null ){
    emptyCells.push(this.board.tiles[2][1]);
  }

  //check if draw
  if(this.board.tiles[2][2].occupier == null ){
    emptyCells.push(this.board.tiles[2][2]);
  }
  return emptyCells;
};

/*
  Make the move! Move the token from the previous tile to the new tile
*/
TicTacToeGame.prototype.executeMoveAInovice = function() {
  var available = this.returnEmptyCells();
  var randomCell = available[Math.floor(Math.random() * available.length)];
  var newPosition = this.board.getTilePosition(randomCell);
  var tile = this.board.tiles[newPosition.x][newPosition.y];
  var token = new TableTop.Token(this.getCurrentPlayer(), tile, this.getCurrentPlayer().color);
  this.board.buildTokenForTile(token, tile);
  this.getCurrentPlayer().tokens.push(tile.occupier);
  this.proposedMove = {};
};

/*
  Make the move! Move the token from the previous tile to the new tile
*/
TicTacToeGame.prototype.executeMoveAIexpert = function() {
  var available = this.returnEmptyCells();
  var preferredMoves = new Array (this.board.tiles[1][1], this.board.tiles[0][0], this.board.tiles[0][2], this.board.tiles[2][0], 
    this.board.tiles[2][2], this.board.tiles[0][1], this.board.tiles[1][0], this.board.tiles[1][2], this.board.tiles[2][1]);
  var nextMove = null;
  loop1:
  for (var x = 0; x < 9; x++){
    loop2:
    for (var y = 0; y < 9; y++){
      if (available[y] == preferredMoves[x]){
          nextMove = preferredMoves[x];
          break loop1;
      }
    }
  }

  var newPosition = this.board.getTilePosition(nextMove);
  var tile = this.board.tiles[newPosition.x][newPosition.y];
  var token = new TableTop.Token(this.getCurrentPlayer(), tile, this.getCurrentPlayer().color);
  this.board.buildTokenForTile(token, tile);
  this.getCurrentPlayer().tokens.push(tile.occupier);
  this.proposedMove = {};
};

module.exports = TicTacToeGame;