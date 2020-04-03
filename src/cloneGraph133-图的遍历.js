// Given a reference of a node in a connected undirected graph.

// Return a deep copy (clone) of the graph.

// Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }
 

// Test case format:

// For simplicity sake, each node's value is the same as the node's index (1-indexed). For example, the first node with val = 1, the second node with val = 2, and so on. The graph is represented in the test case using an adjacency list.

// Adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// Example 2:


// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
// Example 3:

// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.
/**
 * 思路：
 * 从node开始进行复制，等于做一遍图的遍历,这里使用宽度优先遍历
 */

 /**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

 // bfs解法
/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if (!node) {
    return null
  }
  const queue = [node]
  const newNode = new Node(node.val)
  const newQueue = [newNode]
  const visit = []
  visit[node.val] = newNode
  while(queue.length) {
    const head = queue.shift()
    const newHead = newQueue.shift()
    const neighbors = head.neighbors
    const len = neighbors.length
    for (let i = 0; i < len; i++) {
      const neighborNode = neighbors[i]
      let newNeighborNode = null
      if (!visit[neighborNode.val]) {
        queue.push(neighborNode)
        newNeighborNode = new Node(neighborNode.val)
        visit[neighborNode.val] = newNeighborNode
        newQueue.push(newNeighborNode)
      } else {
        newNeighborNode = visit[neighborNode.val]
      }
      newHead.neighbors.push(newNeighborNode)
    }
  }
  return newNode
};

// dfs解法

var cloneGraph = function (node) {
  if (!node) {
    return node
  }
  let map = {}
  dfs(node)
  function dfs (node) {
    const newNode = new Node(node.val)
    map[node.val] = newNode
    for (const neighbor of node.neighbors) {
      newNode.neighbors.push(map[neighbor.val] || dfs(neighbor))
    }
    return newNode
  }
  return map[node.val]
}