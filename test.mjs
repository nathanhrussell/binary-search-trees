function generateRandomArray(size = 15, max = 100) {
    const array = [];
    while (array.length < size) {
        const num = Math.floor(Math.random() * max);
        array.push(num);
    }
    return array;
}

const array = generateRandomArray();
console.log(array);