function validSolution(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j= 0; j < arr[i].length; j++) {
            if (arr[i][j] === 0) return false;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        const count = arr[i].reduce((acc, item) => {acc[item] = acc[item] ? acc[item] + 1 : 1; return acc}, {});
        const result = Object.keys(count).filter((item) => count[item] > 1);
        if (result.length > 0) return false;
    }
    const arr2 = [];
    function fillArr (arr, index = 3) {
        let arr3 = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = index - 3; j < index; j++) {
                arr3.push(arr[i][j]);
                if(arr3.length === 9) {
                    arr2.push(arr3);
                    arr3 = [];
                }
            }
        }
        if (arr2.length !== 9) {
            fillArr(arr, index + 3);
        }
    }
    fillArr(arr);
    for (let i = 0; i < arr2.length; i++) {
        const count = arr2[i].reduce((acc, item) => {acc[item] = acc[item] ? acc[item] + 1 : 1; return acc}, {});
        const result = Object.keys(count).filter((item) => count[item] > 1);
        if (result.length > 0) return false;
    }
    return true;
};



console.log(validSolution([ [5, 3, 4, 6, 7, 8, 9, 1, 2],
                            [6, 7, 2, 1, 9, 5, 3, 4, 8],
                            [1, 9, 8, 3, 4, 2, 5, 6, 7],
                            [8, 5, 9, 7, 6, 1, 4, 2, 3],
                            [4, 2, 6, 8, 5, 3, 7, 9, 1],
                            [7, 1, 3, 9, 2, 4, 8, 5, 6],
                            [9, 6, 1, 5, 3, 7, 2, 8, 4],
                            [2, 8, 7, 4, 1, 9, 6, 3, 5],
                            [3, 4, 5, 2, 8, 6, 1, 7, 9] ]));