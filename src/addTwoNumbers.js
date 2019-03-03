/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

    You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Example:

    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const num1 = []
  const num2 = []
  while(l1) {
      num1.push(l1.val)
      l1 = l1.next
  }
  while (l2) {
      num2.push(l2.val)
      l2 = l2.next
  }
  // const res = parseInt(num1.reverse().join('')) + parseInt(num2.reverse().join(''))
  // const resArr = (res + '').split('').reverse()
  const num1Len = num1.length
  const num2Len = num2.length
  const minLen = Math.min(num1Len,num2Len)
  const res = []
  let d = 0
  for (let i = 0; i < minLen; i++) {
      const num = num1[i] + num2[i] + d
      let t
      if (num >= 10) {
          t = num - 10
          d = Math.floor(num / 10)
      } else {
          t = num
          d = 0
      }
      res.push(t)
  }
  if (num1Len === num2Len) {
      if (d > 0) {
        res.push(d)
      }
  } else {
      for (let i = minLen; i < num1Len; i++) {
          const num = num1[i] + d
          let t
          if (num >= 10) {
              t = num - 10
              d = Math.floor(num / 10)
          } else {
              t = num
              d = 0
          }
          res.push(t)
      }
      for (let i = minLen; i < num2Len; i++) {
          const num = num2[i] + d
          let t
          if (num >= 10) {
              t = num - 10
              d = Math.floor(num / 10)
          } else {
              t = num
              d = 0
          }
          res.push(t)
      }
      if (d > 0) {
        res.push(d)
      }
  }
  const resLen = res.length
  let l = new ListNode(res[0])
  let fl = l
  for (let i = 1; i < resLen; i++) {
      l.next = new ListNode(res[i])
      l = l.next
  }
  return fl
};