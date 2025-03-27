class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedUniqueArray);
    }

    buildTree(array) {
        
    }
}