class Human {
    constructor (name, age, job = 'Secret') {
        this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
        this.age = age;
        this.job;
        if(age < 14) {
            this.job = 'it is too early'
        } else {
            this.job = job;
        }
    }
    getAge() { return this.age }
    getFirstName() { return this.firstName}
    getLastName() { return this.lastName}
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
const human = new Human('Ted Larson', 14);
console.log(human.getFullName());

class Car {
    #owner;
    constructor (brand, model, year, owner) {
        this.brand = brand;
        if (owner === undefined) {
            this.#owner = 'Shop';
        } else {
            this.#owner = owner;
        }
        this.model = model;
        this.year = year;
    }
    getInfo() {
        return `${this.brand} ${this.model} ${this.year} Owner: ${this.#owner}`;
    }
    setOwner(newOwner) {
        this.#owner = newOwner;
    }
}
const mazda = new Car('mazda', 'RX-7', 1999);
console.log(mazda);
mazda.setOwner('Bill');
console.log(mazda);
console.log(mazda.getInfo());