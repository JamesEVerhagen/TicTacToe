var TableTop = require('tabletop-boardgames');
var inherits = require('util').inherits;

function TicTacToeAI(name, color, game) {
  Component.call(this);
  this.name = name;
  this.color = color;
  this.game = game;
}

inherits(TicTacToeAI, TableTop.Component);


TicTacToeAI.prototype.makeAIAction = function(position) {
    var available = this.game.emptyCells();
    var randomCell = available[Math.floor(Math.random() * available.length)];
    console.Log("randomCell chosen is: " + randomCell);
}

module.exports = TicTacToeAI;