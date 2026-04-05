import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

class Node {
  constructor(value, l, r) {
    this.value = value;
    this.r = r;
    this.l = l;
  }
}

class Tree {
  constructor(array = []) {
    if (array instanceof Array) this.array = array; // strings or numbers are not allowed
    this.root = new Node();
  }

  static buildTreeRecursive(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.l = this.buildTreeRecursive(arr, start, mid - 1);
    root.r = this.buildTreeRecursive(arr, mid + 1, end);

    return root;
  }

  levelOrderForEach(callback) {
    // were passing a function, then we execute that function with certain parameters
    let nodesQueue = [this.root]; // root is the starting node

    (function recursive(node = nodesQueue[0]) {
      if (nodesQueue.length === 0) return;
      callback(node.value);

      if (node.l) nodesQueue.push(node.l);
      if (node.r) nodesQueue.push(node.r);
      nodesQueue.shift(); // remove parent from queue

      recursive();
    })();
  }

  #findNode(value, node) {
    if (!node) return;
    if (value === node.value) return node;
    return value > node.value
      ? this.#findNode(node.r, value)
      : this.#findNode(node.l, value);
  }

  #getHeight(node, i = 0) {
    if (!node) return i - 1;
    const leftHeight = this.#getHeight(node.l, i + 1);
    const rightHeight = this.#getHeight(node.r, i + 1);
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  #checkIfBalanced(node) {
    if (!node) return -1;
    let lh = this.#checkIfBalanced(node.l);
    let rh = this.#checkIfBalanced(node.r);
    if (lh === false || rh === false) return false; // exit the function if its non-balanced
    // add one each time we move up the tree
    lh++;
    rh++;
    if (Math.abs(lh - rh) > 1) return false;
    return lh > rh ? lh : rh; // return the greater height
  }

  balanced() {
    return this.#checkIfBalanced(this.root) != false;
  }

  reBalance() {
    this.array.length = 0;
    this.inOrderForEach((value) => this.array.push(value));
    this.buildTree();
  }

  preOrderForEach(callback) {
    (function recursive(node) {
      if (!node) return;
      callback(node.value);
      recursive(node.l);
      recursive(node.r);
    })(this.root);
  }

  inOrderForEach(callback) {
    (function recursive(node) {
      if (!node) return;
      recursive(node.l);
      callback(node.value);
      recursive(node.r);
    })(this.root);
  }

  postOrderForEach(callback) {
    (function recursive(node) {
      if (!node) return;
      recursive(node.l);
      recursive(node.r);
      callback(node.value);
    })(this.root);
  }

  heigth(value) {
    const node = this.#findNode(value, this.root);
    return this.#getHeight(node);
  }

  depth(value) {
    return (function recursive(node, i = 1) {
      if (node.value === value) return i;
      if (!node) return;
      return node.value > value
        ? recursive(node.l, i + 1)
        : recursive(node.r, i + 1);
    })(this.root);
  }

  sort(array) {
    const sortedArray = array
      .sort()
      .filter((num, index) => num !== array[index + 1]);
    this.array = sortedArray;
    return sortedArray;
  }

  buildTree(array = this.array) {
    array = this.sort(array);
    this.root = Tree.buildTreeRecursive(array, 0, array.length - 1);
  }

  includes(value, node = this.root) {
    if (!node) return false;
    if (node.value === value) return true;

    let bool = this.includes(value, node.l);
    if (bool === false) bool = this.includes(value, node.r);

    return bool;
  }

  insert(value, node = this.root) {
    if (value > node.value && node.r) this.insert(value, node.r);
    else if (value > node.value) node.r = new Node(value);

    if (value < node.value && node.l) this.insert(value, node.l);
    else if (value < node.value) node.l = new Node(value);
  }

  remove(value, node = this.root) {
    if (value > node.value && node.r) {
      if (value === node.r.value) {
        delete node.r;
        return;
      }
      this.remove(value, node.r);
    }

    if (value < node.value && node.l) {
      if (value === node.l.value) {
        delete node.l;
        return;
      }
      this.remove(value, node.l);
    }

    return; // if there isnt a node.l or node.r, return, and dont do anything;
  }
}

// testing!

const array = [1, 2, 3, 4, 5];

const tree = new Tree(array);

tree.buildTree();
console.log(tree.includes(9));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.r, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.l, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

tree.insert(4.5);

tree.remove(4.5);
prettyPrint(tree.root);

console.log("levelOrder! \n");

tree.levelOrderForEach((value) => {
  console.log(value);
});

console.log("preorder! \n");
tree.preOrderForEach((value) => {
  console.log(value);
});

console.log("postorder! \n");
tree.postOrderForEach((value) => {
  console.log(value);
});

console.log("inorder! \n");
tree.inOrderForEach((value) => {
  console.log(value);
});

console.log(tree.depth(5));

console.log(`height is: ${tree.heigth(4)}`);

tree.insert(10);

tree.insert(11);

tree.insert(12);

tree.insert(13);

prettyPrint(tree.root);

console.log(tree.balanced());

prettyPrint(tree.root);

tree.reBalance();

prettyPrint(tree.root);
