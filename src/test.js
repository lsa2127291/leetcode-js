/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  if (!root) {
      return true
  }
  // const rootLength = root.length
  // for (let i = 0; i < rootLength; i++) {
  //   if (root[i]) {
  //     const left = root[i * 2  + 1]
  //     const right = root[i * 2 + 2]
  //     const r = root[i]
  //     if (left && r <= left) {
  //       return false
  //     } else if (right && r >= right) {
  //       return false
  //     }
  //   }
  // }
  root.ancestor = null
  const queue = [root]
  while (queue.length) {
    const head = queue.pop()
    const left = head.left
    const right = head.right
    // if (left && head.val <= left.val) {
    //   return false
    // } else if (right && head.val >= right.val) {
    //   return false
    // }
    if (left) {
      const leftVal = left.val
      if (leftVal >= head.val) {
        return false
      }
      let curHead = head
      let ancestor = head.ancestor
      while (ancestor) {
        if (ancestor.val < curHead.val && leftVal <= ancestor.val) {
          break
        }
        curHead = ancestor
        ancestor = curHead.ancestor
      }
      if (ancestor) {
        return false
      }
      left.ancestor = head
      queue.unshift(left)
    }
    if (right) {
      const rightVal = right.val
      if (rightVal <= head.val) {
        return false
      }
      let curHead = head
      let ancestor = head.ancestor
      while (ancestor) {
        if (ancestor.val > curHead.val && rightVal >= ancestor.val) {
          break
        }
        curHead = ancestor
        ancestor = curHead.ancestor
      }
      if (ancestor) {
        return false
      }
      right.ancestor = head
      queue.unshift(right)
    }
  }
  return true
};