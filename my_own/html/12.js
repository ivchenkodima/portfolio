var Person =function(name){
	this.name = name;
};
Person.prototype.greet = function(){
	return console.log("Hi! My name is "+ this.name);
};

Developer = function(name, skills){
	Person.apply(this, arguments);
	this.skills = skills || [];
};
Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;

var developer = new Developer("Dima",["C++","JS"]);
console.log(developer.greet());
console.log(developer.name);

console.log(developer instanceof Developer);


var typeOfObject = function(object){
	return Object.prototype.toString.call(object);
};

console.log(typeOfObject(23));

console.log(typeOfObject("sdfs3"));

console.log(typeOfObject(true));

console.log(typeOfObject([]));

