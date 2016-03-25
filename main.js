(function(){
	var canvas = document.getElementById("game");
	var resizer = new CanvasResizer(canvas)
	game = new touchSimplifier({
		canvas: canvas
	})
	resizer.on("resize", game.draw.bind(game));
})()