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
  var tileColor = 0x39e600;
  var tile;
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      tile = new TableTop.Tile({color: tileColor});
      this.tiles[x][y] = tile;
    }
  } 
};


module.exports = TicTacToeBoard;