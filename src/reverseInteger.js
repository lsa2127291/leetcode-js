/**
Given a 32-bit signed integer, reverse digits of an integer.

Example 1:

Input: 123
Output: 321
Example 2:

Input: -123
Output: -321
Example 3:

Input: 120
Output: 21
Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let str = ''
  let s = x >= 0 ? x : Math.abs(x)
  while (s) {
    const mod = s % 10
    if (mod || str.length) {
      str += mod
    }
    s = Math.floor(s / 10)
  }
  let res = str.length ? parseInt(str) : 0
  if (x < 0) {
    if (res > Math.pow(2, 31)) {
      return 0
    }
    return -res
  } else {
    if (res > Math.pow(2, 31) - 1) {
      return 0
    }
    return res
  }
}
