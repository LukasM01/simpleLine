var touchSimplifier = function(options){
	this.options = options;
	this.canvas = this.options.canvas;
	this.ctx = this.canvas.getContext("2d");
	
	this.renderer = new renderer();
	this.touch = new touchManager(this.canvas);
	this.simplify = new simplify();
	
	this.data = {
		paths: [
			
		],
		activePath: []
	}
	
	this.draw = function(){
		this.renderer.render({
			data: this.data,
			canvas: this.canvas,
			ctx: this.ctx
		})
	}
	
	this.moveLine = function(pos){
		this.data.activePath.push(pos);
		this.draw();
	}
	
	this.endLine = function(pos){
		this.data.activePath.push(pos);
		var simple = this.simplify.simple(this.data.activePath);
		this.data.paths.push(simple);
		this.data.activePath = [];
		this.draw();
	}
	
	this.touch.on("touchStart", this.moveLine.bind(this));
	this.touch.on("touchMove", this.moveLine.bind(this));
	this.touch.on("touchEnd", this.endLine.bind(this));
	
	this.draw();
	
	
}