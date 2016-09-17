"Use strict";
var game = game || {};
game.tetris = {
	canvas:  undefined,
	context: undefined,
	tiles:   [],
	shapes:  [],
	colors:  [],

	init: function() {
		this.canvas = document.getElementById("Game");
		if (this.canvas.getContext) {
			this.context = this.canvas.getContext("2d");
		}
		this.update();
		this.tiles.push()
	},

	update: function() {
		this.draw();
		requestAnimationFrame(this.update.bind(this));
	},
	
	draw: function() {
		this.context.fillStyle = "black";
		this.context.fillRect(0,0, 150, 150);
	}
}
window.onload = game.tetris.init();