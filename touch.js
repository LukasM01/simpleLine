var touchManager = function(canvas){

	this.canvas = canvas;
	this.mousePos = {x: 0, y: 0};
	this.pressed = false;

	this.mousePressed = false;
	this.mousePos = {x: 0, y: 0};
	
	this.getPos = function(pos){
		var rect = this.canvas.getBoundingClientRect();
		return {
			x: pos.x - rect.left,
			y: pos.y - rect.top
		}
	}

	this.mouseDown = function(e){
		this.mousePressed = true;
		this.mousePos = this.getPos({x:e.clientX, y:e.clientY})
		this.handleEvent("touchStart", {
			x: this.mousePos.x,
			y: this.mousePos.y
		})
		
	}

	this.mouseUp = function(e){
		this.mousePressed = false;
		this.mousePos = this.getPos({x:e.clientX, y:e.clientY})
		this.handleEvent("touchEnd", {
			x: this.mousePos.x,
			y: this.mousePos.y
		})
	}
	
	this.mouseMove = function(e){
		var pos = this.getPos({x:e.clientX, y:e.clientY})
		var deltaX = Math.abs(this.mousePos.x - pos.x);
		var deltaY = Math.abs(this.mousePos.y - pos.y);
		var delta = (deltaX+deltaY)/2
		if(this.mousePressed && delta > 1){
			this.mousePos = pos;
			this.handleEvent("touchMove", {
				x: this.mousePos.x,
				y: this.mousePos.y
			})
		}
	}
	

	this.touchStart = function(e){
		this.mousePos = this.getPos({x:e.touches[0].clientX, y:e.touches[0].clientY})
		this.handleEvent("touchStart", {
			x: this.mousePos.x,
			y: this.mousePos.y
		})
	}

	this.touchMove = function(e){
		this.mousePos = this.getPos({x:e.touches[0].clientX, y:e.touches[0].clientY})
		this.handleEvent("touchMove", {
			x: this.mousePos.x,
			y: this.mousePos.y
		})
	}
	
	this.touchEnd = function(e){
		this.mousePos = this.getPos({x:e.touches[0].clientX, y:e.touches[0].clientY})
		this.handleEvent("touchEnd", {
			x: this.mousePos.x,
			y: this.mousePos.y
		})
	}
	
	this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
	this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
	this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));

	this.canvas.addEventListener("touchstart", this.touchStart.bind(this), false);
	this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
	this.canvas.addEventListener("touchend", this.touchEnd.bind(this), false);
	
	this.HandlerList = [
		"touchStart",
		"touchMove",
		"touchEnd"
	]
	this.onHandlers = {};
	this.onceHandlers = {};
	
	this.handleEvent = function(event, arguments){
		var onFunctions = this.onHandlers[event];
		var onceFunctions = this.onceHandlers[event];
		
		this.onceHandlers[event] = [];
		this.callFunctions(onFunctions, arguments);
		this.callFunctions(onceFunctions, arguments);	 
	}
	this.on = function(evt, cb){
		if(this.HandlerList.indexOf(evt) != -1){
			if(this.onHandlers[evt] === undefined){
				this.onHandlers[evt] = []
			}
			this.onHandlers[evt].push(cb)
		}
		return this.onHandlers.length-1
	}
	this.addEventListener = this.on
	
	this.once = function(evt, cb){
		if(this.HandlerList.indexOf(evt) != -1){
			if(this.onceHandlers[evt] === undefined){
				this.onceHandlers[evt] = []
			}
			this.onceHandlers[evt].push(cb)
		}
		return this.onceHandlers[evt].length-1
	}
	this.removeOn = function(evt, id){
		if(this.HandlerList.indexOf(evt) != -1){
			delete this.onHandlers[evt][id]
		}
	}
	this.removeOnce = function(evt, id){
		if(this.HandlerList.indexOf(evt) != -1){
			delete this.onceHandlers[evt][id]
		}
	}
	this.callFunctions = function(b, a){
		if(b == undefined){
			return true;
		}
		b.forEach(function(c){
			c(a);
		})
	}
}

