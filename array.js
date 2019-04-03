const memory = require('./memory')

let Memory = new memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = Memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return Memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = Memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        Memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

function main(){
    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    // Remove last item from the array
    arr.pop();
    arr.pop();
    arr.pop();
    arr.pop();
    arr.pop();
    arr.pop();

    // Add "tauhida" to the array
    arr.push("tauhida");

    console.log(arr);
    console.log(arr.get(0))
}

// main();

/*
2.a
The length, capacity and memory address of your array are 1, 3 and 0, respectively.
2.b
The length, capacity and memory address of your array are 6, 12 and 3, respectively.
3.
The length, capacity and memory address of your array are 3, 12 and 3, respectively.
At each time arr.pop() is called, only arr length decremented by one, but capacity and address
of the array still remains unchanged.
4.a
The first item in the array is 3.
4.b
After "tauhida" added to the array, arr.get(0) return NaN as the memory only accepts numbers,
so that when "tauhida" push to the memory, it was stored as NaN due `this.memory = new Float64Array(1024)` 
4.c
The _resize() is a private method only to array class. When it is called, it will move the array to
the new pointer in the memory and then it will free prevous pointer from the memory 
*/


/* 5.*/
function URLify(str){
    let newStr = '';
    for(let i=0; i<str.length; i++){
        if(str[i] === ' ') newStr+='%20';
        else newStr+=str[i]
    }
    return newStr;
}

// console.log(URLify('www.thinkful.com /tauh ida parv een'))

/* 6.*/

function filter(arr){
    const newArr = []
    for(let i=0; i<arr.length; i++){
        if(arr[i] >= 5) newArr.push(arr[i])
    }
    return newArr;
}

// console.log(filter([1,5,7,8,5,4]))

/* 7.*/
function maxSum(arr){
    let maxSum = 0;
    let currentSum = 0;
    for(let i=0; i<arr.length; i++){
        currentSum+=arr[i];
        if(maxSum < currentSum){
            maxSum=currentSum;
        }
    }
    return maxSum;
}

// console.log(maxSum([4, 6, -3, 5, -2, 1]))

/* 8.*/

function merger(arr1, arr2) {
    let idx1 = 0, idx2 = 0;
    const ret = [];
    
    while(idx1 < arr1.length && idx2 < arr2.length) {
        if(arr1[idx1] <= arr2[idx2]) {
            ret.push(arr1[idx1++]);
        } else {
            ret.push(arr2[idx2++]);
        }
    }
    //one of the arrays is now empty
    //joining the rest of the other array on
    if(idx2 < arr2.length) {
        idx1 = idx2;
        arr1 = arr2;
    }
    while(idx1 < arr1.length) {
        ret.push(arr1[idx1++]);
    }
    return ret;
}

// console.log(merger([1, 3, 4, 5, 8, 11] , [2, 3, 7, 8, 9, 10]))

/* 9.*/
function removeChar(str){
    let ret = '';
    for(let i=0; i<str.length; i++){
        if(str[i] === 'a'||str[i] === 'e'||str[i] === 'i'||str[i] === 'o'||str[i] === 'u'){
            ret+='';
        } else {
            ret+=str[i];
        }
    }
    return ret;
}

// console.log(removeChar('Battle of the Vowels: Hawaii vs. Grozny'))

/* 10.*/

function totalMultiplied(nums){
    let totalMultiplied = 1;
    for(let i=0; i<nums.length; i++){
        totalMultiplied*=nums[i];
    }
    return totalMultiplied
}

function products(arr){
    let ret = []
    for(let i=0; i<arr.length; i++){
        ret.push(totalMultiplied(arr)/arr[i])
    }
    return ret;
}

// console.log(products([1, 3, 9, 4]))

/* 11.*/

// const each = (arr, callback) => {
//     for(let i=0; i<arr.length; i++){
//         callback(arr[i], i)
//     }
// }

// const array = [[1,0,1,1,0],
//                 [0,1,1,1,0],
//                 [1,1,1,1,1],
//                 [1,0,1,1,1],
//                 [1,1,1,1,1]];

// const isZero = (num) => {
//     return num === 0;
// }

// function arr2D(arr, callback){
//     let ret = []
//     let temp = null;
//     for(let i=0; i<arr.length; i++){
//       let tempArr = arr[i]
//         each(arr[i], (num, idx) => {
//             if(callback(num)){
//                 temp = idx;
              
//             }
//         })
//         ret.push(tempArr)
//     }
//     return ret;
// }


// console.log(arr2D(array, isZero));


function arr2D(arr){
    let rows = []
    let cols = []
    for(let i=0; i<arr.length; i++){
        for(let k=0; k<arr[i].length; k++){
            if(arr[i][k] === 0){
                rows.push(i)
                cols.push(k)
            }
        }
    }
    // console.log(rows, cols)
    for(let i=0; i<rows.length; i++){
        for(let j=0; j<arr[rows[i]].length; j++){
            arr[rows[i]][j]=0
        }
    }

    for(let i=0; i<cols.length; i++){
        for(let j=0; j<arr.length; j++){
            arr[j][cols[i]]=0;
        }
    }


    return arr;
}

console.log(arr2D([[1,0,1,1,0],
                    [0,1,1,1,0],
                    [1,1,1,1,1],
                    [1,0,1,1,1],
                    [1,1,1,1,1]]
            ));