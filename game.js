"use strict";
var game = game || {};
game.tetris = {
	canvas:    undefined,
	context:   undefined,
	minos:     undefined,
	grid:      [],
	curPiece:  [],
	numPieces: 0,
	rectSize:  0,
	input:     "",
	pause:     false,

	init: function() {
		this.canvas = document.getElementById("Game");
		if (this.canvas.getContext) {
			this.context = this.canvas.getContext("2d");
		}
		//How pieces are represented
		//Groups of X and Y coordinates for each rectangle
		//in the piece
		this.minos = {
			Box: {
				"0"    : [[0,0], [1,0], [0,1], [1,1]],
				"90"   : [[0,0], [1,0], [0,1], [1,1]],
				"180"  : [[0,0], [1,0], [0,1], [1,1]],
				"270"  : [[0,0], [1,0], [0,1], [1,1]],
				"Color": "Red"
			},

			T: {
				"0"    : [[1,0], [0,1], [1,1], [2,1]],
				"90"   : [[0,1], [1,0], [1,1], [1,2]],
				"180"  : [[1,1], [0,0], [1,0], [2,0]],
				"270"  : [[1,1], [0,0], [0,1], [0,2]],
				"Color": "Green"	
			},

			I: {
				"0"    : [[0,0], [0,1], [0,2], [0,3]],
				"90"   : [[0,1], [1,1], [2,1], [3,1]],
				"180"  : [[0,0], [0,1], [0,2], [0,3]],
				"270"  : [[0,1], [1,1], [2,1], [3,1]],
				"Color": "Blue"
			},

			J: {
				"0"    : [[0,2], [1,0], [1,1], [1,2]],
				"90"   : [[2,1], [0,0], [1,0], [2,0]],
				"180"  : [[1,0], [0,0], [0,1], [0,2]],
				"270"  : [[0,0], [0,1], [1,1], [2,1]],
				"Color": "Yellow"
			},

			L: {
				"0"    : [[1,2], [0,0], [0,1], [0,2]],
				"90"   : [[2,0], [0,1], [1,1], [2,1]],
				"180"  : [[0,0], [1,0], [1,1], [1,2]],
				"270"  : [[0,1], [0,0], [1,0], [2,0]],
				"Color": "Purple"
			},

			S: {
				"0"    : [[0,1], [1,1], [1,0], [2,0]],
				"90"   : [[1,2], [1,1], [0,1], [0,0]],
				"180"  : [[0,1], [1,1], [1,0], [2,0]],
				"270"  : [[1,2], [1,1], [0,1], [0,0]],
				"Color": "Orange"
			},

			Z: {
				"0"    : [[0,0], [1,0], [1,1], [2,1]],
				"90"   : [[1,0], [1,1], [0,1], [0,2]],
				"180"  : [[0,0], [1,0], [1,1], [2,1]],
				"270"  : [[1,0], [1,1], [0,1], [0,2]],
				"Color": "Teal"
			},

		};
		//Initialize the board
		for (var i = 0; i < 20; ++i) {
			//0 = empty spot, 1 = filled spot
			this.grid.push([0,0,0,0,0,0,0,0,0,0,0,0]);
		}
		this.rectSize = 50;
		//Handle Player Input
		this.canvas.addEventListener("keydown", 
			this.onKeyDown.bind(this), false);
		this.canvas.addEventListener("keyup", 
			this.onKeyUp.bind(this), false);
		//Get number of minos
		this.numPieces = Object.keys(this.minos).length;
		this.update();
	},

	//Handle game logic and changing game state
	update: function() {
		if (this.curPiece === []) {
			var nxtPiece = this.randomPiece();
			var direction = "0";	
		} else {
			switch (this.input) {
				case "pause":
					this.pause = (this.pause) ? false : true;
					break;
				case "rotate":
					
			}
		}
		if (!this.pause) {
			this.input = "";
			this.draw();
		}
		requestAnimationFrame(this.update.bind(this));
		
	},
	//Todo, remove state alterting. Draw should only draw.
	draw: function(nxtPiece, direction) {
		this.context.fillStyle = this.minos[nxtPiece]["Color"];
		this.minos[nxtPiece]["0"].forEach(function(array) {
			game.tetris.context.fillRect(array[0]*25, array[1]*25, 25, 25);
		});
	},

	randomPiece: function() {
		//Get random piece
		var randPiece = Math.floor(Math.random() * this.numPieces - 1) + 1;
		return Object.keys(this.minos)[randPiece];

	},

	onKeyDown: function(event) {
		switch (event.keyCode) {
			case 40: //DownArrow
				this.input = "space";
				console.log(this.input);
				break;
		}
		event.preventDefault();
	},

	onKeyUp: function(event) {
		event.preventDefault();
	}


}
window.onload = game.tetris.init();