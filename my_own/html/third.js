var Person = {
	constructor: function(name, age, gender){
		this.name = name;
		this.age = age;
		this.gender = gender;
		return this; 
	},
	greet = function(){
		 console.log("hi! my name is " +  this.name )
	}
};

var per1, per2, per3; 
per3 = Object. create(Person).constructor("Dima", 20, "male");
per2 = Object. create(Person).constructor("Pasha", 19 , "male");
console.log(per2);
console.log(per2);

var frontEndDeveloper = Object.create(Person);
frontEndDeveloper. constructor = function(name, age, gender, skills){
	Person.constructor.apply(this , argument);
	this. skills = skills||[];
	return skills;
}
frontEndDeveloper.develop = function(){
	console.log("Studing...");
};
var developer = Object.create(frontEndDeveloper).constructor("Dima", 20 ,male, ["c++", "C", "html","JS"]);
console.log(developer.skills);
console.de

