function high(x){
    let alphabet = '!abcdefghijklmnopqrstuvwxyz'.split('');
    console.log(alphabet);
    let arr = x.split(' ');
    let word;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let s = 0;
        for (let j = 0; j < arr[i].length; j++) {
            s += alphabet.indexOf(arr[i].split('')[j]);
        }
        if (s > sum) {
            sum = s;
            word = arr[i];
        }
    }
    console.log(sum);
    return word;
}
console.log(high('tpymdhdpezfpurfmvzzdqa'))