/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) {
    return []
  }
  const queue = [root]
  const layer = [[root.val]]
  const layerIndex = new Map()
  layerIndex.set(root, 0)
  while (queue.length) {
    const node = queue.shift()
    const children = node.children
    const nextIndex = layerIndex.get(node) + 1
    for (child of children) {
      queue.push(child)
      layerIndex.set(child, nextIndex)
      if (!layer[nextIndex]) {
        layer[nextIndex] = [child.val]
      } else {
        layer[nextIndex].push(child.val)
      }
    }
  }
  return layer
};