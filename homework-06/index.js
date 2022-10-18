class CoffeeRecept {

    #coast = 0;  
    #sugar = 0;
    volume = 0;
    coffee = 0;
  
    constructor(){}
  
    setSugar(value = 0){
      this.#sugar = this.#sugar + value;
      this.#coast = this.#coast + value * 5;
    }
  
    addSugar(){
      this.#sugar = this.#sugar + 1;
      this.#coast = this.#coast + 5;
    }
  
    get coast(){
      return this.#coast;
    }
  
    getSugar(){
      return this.#sugar;
    }
  
    cookingEspresso(mult = 1) {
      this.coffee = this.coffee + (15 * mult);
      this.#coast = this.#coast + (20 * mult);
      this.volume = this.volume + (15 * mult);
    }
  
    getInfo() {
      return {
        coffee : this.coffee,
        volume: this.volume,
        coast: this.#coast,
        sugar: this.#sugar,
      }
    }
  }

  class EspressoRecept extends CoffeeRecept{
    constructor(){
      super();
      this.cookingEspresso();
    }
  }
  
  
//   const espresso = new EspressoRecept();
//   console.log(espresso)
//   espresso.addSugar();
  
  
//   console.log(espresso.getInfo());
  
  class AmericanoRecept extends CoffeeRecept {
    constructor(water = 0){
      super();
      this.cookingEspresso();
      this.water = water;
      this.volume = this.volume + water;
    }
  
    getInfo(){
      const result = super.getInfo();
      return {
        ...result,
        water: this.water
      }
    }
  
    addWater(water){
      this.water = this.water + water;
      this.volume = this.volume + water;
    }
  }
  
  const americano = new AmericanoRecept();
//   console.log(americano)
//   americano.cookingEspresso(2);
//   console.log(americano);
//   americano.addWater(400);
//   console.log(americano);
//   americano.cookingEspresso();
//   console.log(americano);
//   americano.addSugar();
//   americano.setSugar(2);
//   console.log(americano.getInfo())
  
  class LatteRecept extends CoffeeRecept{
    constructor(milk = 0){
      super();
      this.cookingEspresso();
      this.milk = milk;
      this.volume = this.volume + milk;
    }
    getInfo () {
        const result = super.getInfo();
        return {
            ...result,
            milk: this.milk
        }
    }
  }
  let latte = new LatteRecept(50);
//   console.log(latte);
//   latte.cookingEspresso();
//   console.log(latte.getInfo());
  
  class DoubleLatteRecept extends LatteRecept {
    constructor(milk = 0){
        super(milk);
        this.cookingEspresso();
    }
  }
  let dlatte = new DoubleLatteRecept(50);
  console.log(dlatte);
//   console.log(dlatte.getInfo());
  
  
class Glass {
    #volumeGlass;
    constructor (size, {volume, ...prop}) {
        if (size === 'small') {
            this.#volumeGlass = 100;
        } else if (size === 'medium') {
            this.#volumeGlass = 250;
        } else if (size === 'large') {
            this.#volumeGlass = 500
        }
        if (volume > this.#volumeGlass) {
            console.log('Sorry, glass is too small');
        } else {
            this.drink = {
                valume: volume,
                ...prop
            }
        }
    }
    divDrink() {
        let drinkOne = {};
        let drinkTwo = {};
        for (let i = 0; i < Object.keys(this.drink).length; i++) {
            drinkOne[Object.keys(this.drink)[i]] = this.drink[Object.keys(this.drink)[i]]/2;
            drinkTwo[Object.keys(this.drink)[i]] = this.drink[Object.keys(this.drink)[i]]/2;
        }
        return [drinkOne, drinkTwo];
    }
}
let glass = new Glass('small', dlatte);
console.log(glass);
console.log(glass.divDrink());

