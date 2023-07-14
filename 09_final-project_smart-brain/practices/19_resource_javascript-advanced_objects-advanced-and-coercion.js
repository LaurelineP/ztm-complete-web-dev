//Evaluate these:
//#1
// [2] === [2] // --> false
// {} === {} // -->  false

//#2 what is the value of property a for each object.
// --if we refer to the last line all property a become 4 except obj 4
const object1 = { a: 5 }; //  --> a = 5
const object2 = object1;  //  --> a = 5
const object3 = object2;  //  --> a = 5
const object4 = { a: 5};  //  --> a = 4
object1.a = 4;  //  --> a = 4


//#3 create two classes: an Animal class and a Mammal class. 
// create a cow that accepts a name, type and color and has a sound method that moo's her name, type and color. 
class Animal {
	constructor(name, color, animalSound){
		this.name = name;
		this.color = color;
		this.animalSound = animalSound;
	}
	sound(){
		console.info(`${this.animalSound} name is ${this.name}`);
	}
}

class Mammal extends Animal {
	constructor(name, color, animalSound){
		super(name, color, animalSound);
		this.type = "mammal";
	}
}

const cow = new Mammal("Cowy", "brown and white", "Moohh");