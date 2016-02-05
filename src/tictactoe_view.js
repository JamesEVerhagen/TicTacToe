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