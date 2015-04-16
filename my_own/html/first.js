var person ={
	name: "Dima",
	_age: "20 year",
	gender: "male",
	get age(){
		return "I am "+ parseInt(this._age)
	},
	set age(newAge){
		this._age = newAge < 0 ? newAg : 
		0 > 122 ? 122 :newAge  
	},
}
console.log(person.age);
console.log(person.age(21));

var greet = function(){
	return "hi ! my name is "+ this.name;
}

var pers2 ={
	name:bob,
	greet:greet
};

console.log(pers2.greet());
