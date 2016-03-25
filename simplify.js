var simplify = function(){
	//Douglas-Peucker-Algorithmus
	this.simple = function(path){
		
		var dmax = 0;
		var index = 0;
		for(var i = 1; i < path.length -1; i++){
			var point = path[i];
			var d = this.dPointLine(path[0],path[path.length-1], point.x, point.y);
			if(d > dmax){
				index = i;
				dmax = d;
			}
		}
		var epsilon = document.getElementById("slider1").value;
		if(dmax >= epsilon){
			var res1 = this.simple(path.slice(0,index+1));
		
			var res2 = this.simple(path.slice(index, path.length));
			
			return res1.slice(0,res1.length-1).concat(res2);
		}else{
			return [path[0], path[path.length-1]];
		}
	}
	this.dPointLine = function(P1, P2, x0, y0){
		var x1 = P1.x;
		var y1 = P1.y;
		
		var x2 = P2.x;
		var y2 = P2.y;
		
		var res = ((y2-y1)*x0) - ((x2-x1)*y0) + (x2*y1) - (y2*x1);
		res = Math.abs(res)/this.dPointPoint(P1,P2);
		
		return res;
	},
	this.dPointPoint = function(P1, P2){
		return Math.sqrt((P1.x-P2.x)*(P1.x-P2.x)+(P1.y-P2.y)*(P1.y-P2.y));
	}
}