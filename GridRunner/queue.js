export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(data) {
    const newNode = { next: null, data: data };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;
    const removedNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return removedNode.data;
  }

  nodeAt(index) {
    let count = 0;
    let currentNode = this.head;

    while (currentNode) {
      if (count === index) {
        return currentNode;
      }
      count++;
      currentNode = currentNode.next;
    }

    return null;
  }

  size() {
    let count = 0;
    let currentNode = this.head;

    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }

    return count;
  }

  get(index) {
    const node = this.nodeAt(index);
    return node ? node.data : null;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  dumpList() {
    let node = this.head;
    console.log(`
    
              Linked List
              ============
                head: ${this.head?.data}
                tail: ${this.tail?.data}
              ============
            `);

    while (node) {
      console.log(`
      
              Node: ${node.data}
              ----------------
                next: ${node.next?.data}
              `);
      node = node.next;
    }
  }
}

const node1 = {
  next: null,
  data: "C",
};

const node2 = {
  next: null,
  data: "A",
};

const node3 = {
  next: null,
  data: "T",
};

node1.next = node2;
node2.next = node3;
