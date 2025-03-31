import { Node, Tree } from "./main.mjs";

function generateRandomArray(size = 15, max = 100) {
    const array = [];
    while (array.length < size) {
        const num = Math.floor(Math.random() * max);
        array.push(num);
    }
    return array;
}

const array = generateRandomArray();
const tree = new Tree(array);
tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log(tree.isBalanced());

