import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

class Node {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array = []) {
    // default is []
    if (array instanceof Array) this.array = array; // strings or numbers are not allowed
    this.root;
  }

  buildTree(array = this.array) {
    // use the constructor array if no array is given
    // im using bfs for the node tree, nodes by layers
    
  }
}

const array = [9, 8, 7, 6, 6, 5, 4, 3, 2, 1];

const tree = new Tree(array);
