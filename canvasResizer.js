var CanvasResizer = function(canvas){
	this.canvas = canvas;
	this.resize = function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.handleEvent("resize");
		
	}
	window.addEventListener("resize", this.resize.bind(this));
	
	this.HandlerList = [
		"resize"
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
	
	this.resize();
}