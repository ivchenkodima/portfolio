var calc= function(n){
	if(n>10) throw new Error("n should be less then 10");
	return n + 10;
};
//calc(20);


try {
	calc(20);
} catch(error){
	console.log("cant calc"+ error.message);
}