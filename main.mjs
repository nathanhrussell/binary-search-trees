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

    _minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    find (value) {
        return this._findRec(this.root, value);
    }

    _findRec(node, value) {
        if (node === null || node.value === value) return node;

        if(value < node.value) {
            return this._findRec(node.left, value);
        } else {
            return this._findRec(node.right, value);
        }
    }

    levelOrder(callback) {
        if (this.root === null) return [];

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const current = queue.shift();

            if (callback) {
                callback(current);
            } else {
                result.push(current.value);
            }

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        if (!callback) return result;
    }

    inOrder(callback) {
        const result = [];
        this._inOrderRec(this.root, callback, result);
        if (!callback) return result;
    }

    _inOrderRec(node, callback, result) {
        if(node === null) return;
        this._inOrderRec(node.left, callback, result);
        if (callback) {
            callback(node);
        } else {
            result.push(node.value);
        } 
        this._inOrderRec(node.right, callback, result);
    }

    preOrder(callback) {
        const result = [];
        this._preOrderRec(this.root, callback, result);
        if (!callback) return result;
    }

    _preOrderRec(node, callback, result) {
        if (node === null) return;
        if (callback) {
            callback(node);
        } else {
            result.push(node.value);
        }
        this._preOrderRec(node.left, callback, result);
        this._preOrderRec(node.right, callback, result);
    }

    postOrder(callback) {
        const result = [];
        this._postOrderRec(this.root, callback, result);
        if (!callback) return result;
    }

    _postOrderRec(node, callback, result) {
        if (node === null) return;
        this._postOrderRec(node.left, callback, result);
        this._postOrderRec(node.right, callback, result);
        if (callback) {
            callback(node);
        } else {
            result.push(node.value);
        }
    }

    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(node, current = this.root, level = 0) {
        if (current === null) return -1;
        if (current === node) return level;

        if (node.value < current.value) {
            return this.depth(node, current.left, level + 1);
        } else {
            return this.depth(node, current.right, level + 1);
        }
    }

    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const sortedValues = this.inOrder();
        this.root = this.buildTree(sortedValues);
    }
}