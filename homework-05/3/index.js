class Burger {
    prices = {
        small: 50,
        big: 100,
        cheese: 10,
        salad: 20,
        potato: 15,
        spice: 15,
        mayo: 20
    }
    energy = {
        small: 20,
        big: 40,
        cheese: 20,
        salad: 5,
        potato: 10,
        spice: 0,
        mayo: 5
    }
    constructor(size, ...additive) {
        this.price = this.prices[size];
        this.calories = this.energy[size];
        if (additive.length > 0) {
            for(let i of additive) {
                this.price += this.prices[i];
                this.calories += this.energy[i];
            }
        }
    }
    addSome(...additive) {
        for (let i of additive) {
            this.price += this.prices[i];
            this.calories += this.energy[i];
        }
    }
    calculateCalories() {
        return this.calories;
    }
    calculatePrice() {
        return this.price;
    }
}

const burger = new Burger('big', 'cheese');
console.log(burger);
burger.addSome('mayo');
console.log('Calories: ' + burger.calculateCalories());
console.log('Price: ' + burger.calculatePrice());
burger.addSome('spice');
console.log('Price: ' + burger.calculatePrice());

