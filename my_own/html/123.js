var Person = {
	name : "Dima",
	_age :20,
	get age(){
		return console.log(this._age);
	},
	set age(value) {
		this._age = value < 0 ? 0 : value > 122 ? 122 :value; 
}
};

console.log(Person);
console.log(Person.age);
Person.age = 21;
console.log(Person.age);