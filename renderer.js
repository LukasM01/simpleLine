var renderer = function(){
	this.render = function(options){
		var canvas = options.canvas;
		var ctx = options.ctx;
		var data = options.data;
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		var paths = data.paths;
		
		for(var i = 0; i < paths.length; i++){
			var path = paths[i];
			
			ctx.beginPath();
			for(var p = 0; p < path.length; p++){
				var point = path[p];
				if(p == 0){
					ctx.moveTo(point.x, point.y);
				}else{
					ctx.lineTo(point.x, point.y);
				}
			}
			ctx.lineWidth = 3;
			ctx.strokeStyle = "black";
			ctx.lineCap = "round";
			ctx.stroke();
			
			for(var p = 0; p < path.length; p++){
				var point = path[p];
				ctx.beginPath();
				ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'black';
				ctx.fill();
			}
		}
		
		var activePath = data.activePath;
		
		ctx.beginPath();
		for(var p = 0; p < activePath.length; p++){
			var point = activePath[p];
			if(p == 0){
				ctx.moveTo(point.x, point.y);
			}else{
				ctx.lineTo(point.x, point.y);
			}
		}
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.lineCap = "round";
		ctx.stroke();
		for(var p = 0; p < activePath.length; p++){
			var point = activePath[p];
			ctx.beginPath();
			ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'red';
			ctx.fill();
		}
	}
}