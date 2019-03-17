/**
Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:

Input: 121
Output: true
Example 2:

Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
Follow up:

Coud you solve it without converting the integer to a string?
 */
var isPalindrome = (x) => {
  let s = x.toString()
  let sLen = s.length
  if (!sLen) {
    return true
  }
  let start = 0
  let end = sLen
  let m = start + Math.floor(sLen / 2)
  if (sLen % 2 === 1) {
    for (let i = m - 1, j = m + 1; i >= start, j < end; i--, j++) {
      if (s[i] !== s[j]) {
        return false
      }
    }
    return true
  } else {
    for (let i = m - 1, j = m; i >= start, j < end; i--, j++) {
      if (s[i] !== s[j]) {
        return false
      }
    }
    return true
  }
}
