class House {
    constructor (apartments, floors, entrance, adres = 'Some street') {
        this.apartments = apartments;
        this.floors = floors;
        this.entrance = entrance;
        this.buildMaterials = 'brick';
        this.adres = adres;
    }
}
const house1 = new House(12, 4, 3, 'Centralna 12 St.');
console.log(house1);

class Apartment {
    constructor(rooms, humans, bathroom = 1) {
        this.rooms = rooms;
        this.humans = humans;
        this.bathroom = bathroom;
    }
}
const apartment = new Apartment(4, 5, 2);
console.log(apartment);
class Human {
    constructor (name, age, job) {
        this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
        this.age = age;
        this.job = job;
    }
    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
const human1 = new Human('Tedd Larson', 21, 'coach');
console.log(human1);
console.log(human1.getFullName());
