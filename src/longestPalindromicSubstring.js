/**
  Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

  Example 1:

  Input: "babad"
  Output: "bab"
  Note: "aba" is also a valid answer.
  Example 2:

  Input: "cbbd"
  Output: "bb"
 */
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const sLen = s.length
  for (let k = sLen; k >=1; k--) {
    for (let i = 0; i <= sLen - k; i++) {
      if (isPalindromic(s, i, i + k)) {
        return s.substring(i, i + k)
      }
    }
  }
  return ''
};
const isPalindromic = (s, start, end) => {
  let sLen = end - start
  if (!sLen) {
    return true
  }
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
