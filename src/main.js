// Import the TableTop Framework
var TableTop = require('tabletop-boardgames');

// Import other needed classes
var TicTacToeGame = require("./tictactoe_game.js");
var TicTacToeBoard = require("./tictactoe_board.js");
var TicTacToeView = require("./tictactoe_view.js");
var TicTacToeAI = require("./tictactoe_AI.js")

// create the Board, Game, and TurnMap
var board = new TicTacToeBoard();
var game = new TicTacToeGame(board);
var view = new TicTacToeView(game);
var AI = new TicTacToeAI(game);

//create our startView
var startView = new TableTop.StartView(game); 

// create our game over view
var gameOverView = new TableTop.GameOverView(game);

//create the turnmap
var turnMap = new TableTop.ManualTurn(game, startView, view, gameOverView);
game.setTurnMap(turnMap);

// gets the ball rolling!
game.updateState("start");