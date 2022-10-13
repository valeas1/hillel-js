class  PaginationHelper {
    constructor(arr, length) {
        this.array = arr;
        this.arr = [];
        this.arr2 = [];
        this.pageLength = length;
        this.item = arr.length;
        for (let i = 0; i < arr.length; i++) {
            this.arr2.push(arr[i]);
            if(this.arr2.length === length) {
                this.arr.push(this.arr2);
                this.arr2 = [];
            } else if (i === arr.length - 1) {
                this.arr.push(this.arr2);
            }
        }
        delete this.arr2;
    };
    pageCount() {
        return this.arr.length;
    }
    itemCount() {
        return this.item;
    }
    pageItemCount(index) {
        if (index === undefined || this.arr[index] === undefined) {return -1};
        return this.arr[index].length;
    }
    pageIndex(index) {
        let bool = this.array.includes(this.array[index]);
        if(!bool) return -1;
        if (index > this.pageLength) {
            return Math.floor(index / this.pageLength);
        } else {
            return 0;
        }
    }
}
let helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
console.log(helper);
console.log(helper.pageCount());
console.log(helper.itemCount());
console.log(helper.pageItemCount(0));
console.log(helper.pageIndex(5));
console.log(helper.pageIndex(2));
console.log(helper.pageIndex(20));
console.log(helper.pageIndex(-10));

