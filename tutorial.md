# Demo - Tic Tac Toe

In this demo, we'll be creating a simple Tic Tac Toe game. 

### index.html -- html File


### tictactoe.js -- Your Main File

```
// Import the TableTop Framework
var TableTop = require('tabletop-boardgames');

// Import other needed classes
var TicTacToeGame = require("./tictactoe_game.js");
var TicTacToeBoard = require("./tictactoe_board.js");
var TicTacToeView = require("./tictactoe_view.js");

// create the Board, Game, and TurnMap
var board = new TicTacToeBoard();
var game = new TicTacToeGame(board);

var view = new TicTacToeView(game);

//create our startView
var startView = new TableTop.StartView(game); 

// create our game over view
var gameOverView = new TableTop.GameOverView(game);

//create the turnmap
var turnMap = new TableTop.ManualTurn(game, startView, view, gameOverView);
game.setTurnMap(turnMap);

// gets the ball rolling!
game.updateState("start");

game.updateState("start");

```


### tictactoe_game.js - The Game

```

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

```

### tictactoe_js - The Board

```

var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;

function TicTacToeBoard() { 
  TableTop.GridBoard.call(this, 3, 3);
  this.buildTiles();
}

inherits(TicTacToeBoard, TableTop.GridBoard);

/*
  What tiles does your game board have? What colors are they?
*/
TicTacToeBoard.prototype.buildTiles = function() {
  var tileColor = 0xAAAAAA;
  var tile;
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      tile = new TableTop.Tile({color: tileColor});
      this.tiles[x][y] = tile;
    }
  } 
};


module.exports = TicTacToeBoard;

```

### tictactoe_view.js - The View

```

var inherits = require('util').inherits;
var TableTop = require('tabletop-boardgames');

function TicTacToeView(game) { 
  TableTop.View.call(this, game);
} 

inherits(TicTacToeView, TableTop.View);

/*
  What does a tile look like? 
*/
TicTacToeView.prototype.drawTile = function(tile, size) { 
  var tileView = new PIXI.Graphics();
  tileView.lineStyle(1, 0, 1);
  tileView.beginFill(tile.color, 1);
  tileView.drawRect(0, 0, size.width, size.height);
  return tileView;
};

/*
  What does a token look like? Note that you could draw different
  things for different tokens in this method
*/
TicTacToeView.prototype.drawToken = function(token, size) { 
  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  tokenView.drawCircle(size.width/2, size.height/2, size.width/2 - 20);
  return tokenView;
};

module.exports = TicTacToeView;


```



Happy gaming! 

TableTop.js Team