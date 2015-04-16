var person, anotherPerson;

var Person =  function(name, age, gender){
	this.name = name;
	this.age = age;
	this.gender = gender;
	
	console.log("Hi! My name is "+ this.name + ".\n" +"I am "+ this.year +" age old ");
	return this;
};

person = Object.create(Person("Dima", 20, "male"));
console.log(person);
console.log(person.gender);

var frontEndDEveloper = new Person();
frontEndDEveloper.constructor = function(name, age, gander, skill){
	frontEndDEveloper.constructor.apply(this, argument);
	this.skill = skill||[];
	return this;	
}

var firth, second, third;
firth = new frontEndDEveloper();
firth.constructor("PAsha",20, "male", "C++");
console.log(firth);