/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  const originHead = head
  let len = 0
  while (head) {
    head = head.next
    len++
  }
  const nth = len - n
  head = originHead
  if (nth === 0) {
    return head.next
  }
  let pre = null
  for (i = 0; i < nth; i++) {
    pre = head
    head = head.next
  }
  pre.next = head.next
  return originHead
};
