var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;

function TicTacToeBoard() { 
  TableTop.GridBoard.call(this, 9, 9);
  this.buildTiles();
}

inherits(TicTacToeBoard, TableTop.GridBoard);

/*
  What tiles does your game board have? What colors are they?
*/
TicTacToeBoard.prototype.buildTiles = function() {
  var tileColor = 0xAAAAAA;
  var tileColorTwo = 0xAAAAEE
  var tile;
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
   		tile = new TableTop.Tile({color: tileColor});
   		if ((x>2) && (x<6)){
   			if ((y>2) && (y<6)){
   				tile.color=tileColorTwo;
   			}
   		}
   		if ((x>=0) && (x<3)){
   			if ((y>=0) && (y<3)){
   				tile.color=0xAAAAFF;
   			}
   		}
   		if ((x>2) && (x<6)){
   			if ((y>=0) && (y<3)){
   				tile.color=0x008000;
   			}
   		}
   		if ((x>5) && (x<9)){
   			if ((y>=0) && (y<3)){
   				tile.color=0x00FF00;
   			}
   		}
   		if ((x>=0) && (x<3)){
   			if ((y>2) && (y<6)){
   				tile.color=0x00FFFF;
   			}
   		}
   		if ((x>5) && (x<9)){
   			if ((y>2) && (y<6)){
   				tile.color=0x008080;
   			}
   		}
   		if ((x>=0) && (x<3)){
   			if ((y>6) && (y<9)){
   				tile.color=0x0000FF;
   			}
   		}if ((x>2) && (x<6)){
   			if ((y>6) && (y<9)){
   				tile.color=0x01234F;
   			}
   		}if ((x>5) && (x<9)){
   			if ((y>5) && (y<9)){
   				tile.color=tileColor;
   			}
   		}
      this.tiles[x][y] = tile;
    }
  } 
};


module.exports = TicTacToeBoard;