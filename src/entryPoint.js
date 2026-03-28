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
    // default is []
    if (array instanceof Array) this.array = array; // strings or numbers are not allowed
    this.root = new Node("example");
  }

  static build(array, obj) {

    obj.l = new Node(array[0]);

  }

  buildTree(array = this.array) {
    array = array.sort().filter((num, index) => num !== array[index + 1]);
    Tree.build(array, this.root)
  }

  // buildTree(array = this.array) {
  //   // use the constructor array if no array is given
  //   // im using bfs for the node tree, nodes by layers
  //   array = array.sort().filter((num, index) => num !== array[index + 1]);

  //   let queue = { lastLayer: [this.root], buildingNewLayer: [] }; // root is the starting value

  //   while (array.length != 0) {
  //     for (const node of queue.lastLayer) {
  //       // we start grabbing the values of the array from the starting position
  //       if (array[0] === undefined) return;

  //       node.left = new Node(array[0]);
  //       array.shift();

  //       node.right = new Node(array[0]);
  //       array.shift();

  //       queue.buildingNewLayer.push(node.left, node.right);
  //     }

  //     // after finishing building, we store it as our last layer for our next iteration
  //     queue.lastLayer = Array.from(queue.buildingNewLayer); // otherwise it stores a reference value, i want a copy
  //     queue.buildingNewLayer.length = 0;
  //   }

  // }
}

const array = [9, 8, 7, 6, 6, 5, 4, 3, 2, 1];

const tree = new Tree(array);

tree.buildTree();
console.log(tree);
