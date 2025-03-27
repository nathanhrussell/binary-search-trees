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
        if (array.length === 0) return null;

        const midIndex = Math.floor(array.length / 2);
        const root = new Node(array[midIndex]);

        root.left = this.buildTree(array.slice(0, midIndex));
        root.right = this.buildTree(array.slice(midIndex + 1));

        return root;
    }
}