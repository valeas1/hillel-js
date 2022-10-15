function repeat(func, times, thi) {
    for (let x = 0; x < times; x++) {
      func.call(thi);
    }
}
class Student {
    constructor (firstName, lastName, year, arr) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.marks = arr;
        this.timesSheets = Array(25);
    }
    getYear () {
        return this.year;
    }
    getGpa () {
        return (this.marks.reduce((a, b) => a + b) / this.marks.length).toFixed(2);
    }
    present() {
        for (let i = 0; i < this.timesSheets.length; i++) {
            if (this.timesSheets[i] === undefined) {
                this.timesSheets[i] = true;
                break
            }
        }
        return this;
    }
    absent() {
        for (let i = 0; i < this.timesSheets.length; i++) {
            if (this.timesSheets[i] === undefined) {
                this.timesSheets[i] = false;
                break
            }
        }
        return this;
    }
    summary() {
        let gpa = this.getGpa();
        let ratio = this.timesSheets.map(el => +el).reduce((a, b) => a + b) / this.timesSheets.filter(el => el !== undefined).length;
        console.log(gpa);
        console.log(ratio);
        if (gpa >= 90 && ratio >= 0.9) {
            return 'Молодец!';
        } else if (gpa >= 90 || ratio >= 0.9) {
            return 'Хорошо, но можно лучше';
        } else {
            return 'Редиска!'
        }
    }
}

const mark = new Student('Mark', 'Volt', 2000, [100, 100, 80, 76, 85, 100]);
// console.log(mark);
console.log(mark.getYear());
console.log(mark.getGpa());
// console.log(mark.timesSheets);
mark.present();
mark.absent().present().absent();
// repeat(mark.present, 20, mark);
console.log(mark.timesSheets);
console.log(mark.summary());
const milla = new Student('Milla', 'Vonk', 2001, [70, 22, 45, 14, 85, 15]);
// console.log(milla);
console.log(milla.getYear());
console.log(milla.getGpa());
// console.log(milla.timesSheets);
milla.present();
milla.absent().present().absent();
// repeat(milla.present, 20, milla);
console.log(milla.timesSheets);
console.log(milla.summary());

