class SuperMath {
    obj = {
        znak: '+', 
        x: 12, 
        y: 3
    };
    constructor() {
    }
    input() {
        this.obj.znak = prompt('Какую операцию вы хотите сделать? "+" - сложение;  "-" - вычитание; "*" - умножение; "/" - деление; "%" - деление по модулю');
        this.obj.x = +prompt('Введите первое число');
        this.obj.y = +prompt('Введите второе число');
    }
    check(obj = this.obj) {
        let a = confirm(`Вы хотите совершить действия указаные в аргументе? ${obj.x} ${obj.znak} ${obj.y}`);
        if (a) {
            switch(obj.znak) {
                case '+':
                    alert(obj.x + obj.y);
                    break;
                case '-':
                    alert(obj.x - obj.y);
                    break;
                case '/':
                    alert(obj.x / obj.y);
                    break;
                case '*':
                    alert(obj.x * obj.y);
                    break;
                case '%':
                    alert(obj.x % obj.y);
                    break;
            }
        } else {
            this.input();
            this.check(this.obj);
        }
    }
}
const plus = new SuperMath();
console.log(plus)
// plus.check({znak: '+', x: 12, y: 3})
plus.check();
plus.check({
    znak: '+', 
    x: 100, 
    y: 50
});
