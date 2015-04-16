var Vec2 = function(x,y){
	this.x = x;
	this.y = y;
};
var  Vec2.prototype.add = function(vec){
 	this.x += vec.x;
 	this.y += vec.y;
 	return this; 
 };
 var Vec2.prototype.multiplyScalar = function(scalar){
 	this.x *= scalar;
 	this.y *= scalar;
 	return this;
 };

var world = {
	wind : new Vec2(2,2),
	airResistance : .9,
	gravity: new Vec2(0,1)
};

var object ={
	position: new Vec2(10,6),
	speed : new Vec2(1,5), 
	update: function(){
		object speed:
		.add(world.wind)
		.add(world.gravity)
		.multiplyScalar(world.airResistance));

		return this.position.add(this.speed)
	}
};

console.log(object.update());
console.log(object.update());
console.log(object.update());
console.log(object.update());
console.log(object.update());
console.log(object.update());