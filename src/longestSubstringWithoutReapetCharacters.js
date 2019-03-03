/**
 * Example 1:

    Input: "abcabcbb"
    Output: 3 
    Explanation: The answer is "abc", with the length of 3. 
    Example 2:

    Input: "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    Example 3:

    Input: "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3. 
                Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let maxLen = 0
  let sLen = s.length
  let curStrArr = []
  for (let i = 0; i < sLen; i++) {
      const curStr = s[i]
      const index = curStrArr.indexOf(curStr)
      if (index === -1) {
          curStrArr.push(curStr)
      } else {
          curStrArr = curStrArr.slice(index + 1, curStrArr.length)
          curStrArr.push(curStr)
      }
      const curStrArrLen = curStrArr.length
      if (curStrArrLen > maxLen) {
          maxLen = curStrArrLen
      }
  }
  return maxLen
};