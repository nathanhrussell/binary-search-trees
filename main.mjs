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

    insert(value) {
        this.root = this._insertRec(this.root, value);
    }

    _insertRec(node, value) {
        if (node === null) return new Node(value);

        if (value < node.value) {
            node.left = this._insertRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._insertRec(node.right, value);
        }

        return node;
    }

    deleteItem(value) {
        this.root = this._deleteRec(this.root, value);
    }

    _deleteRec(node, value) {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this._deleteRec(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteRec(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
        

        const successorValue = this._minValue(node.right);
        node.value = successorValue;
        node.right = this._deleteRec(node.right, successorValue);
        }

        return node;
    }


    }