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
      nodesQueue.shift() // remove parent from queue

      recursive()
    })();
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

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

tree.levelOrderForEach((value) => {
  console.log(value);
});
