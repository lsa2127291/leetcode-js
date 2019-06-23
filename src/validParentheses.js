/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = []
    const charMap = {
      '(': 0,
      '[': 1,
      '{': 2,
      ')': 3,
      ']': 4,
      '}': 5
    }
    const sLen = s.length
    for (let i = 0; i < sLen; i++) {
      if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
        stack.push(s[i])
      } else {
        if (charMap[stack[stack.length - 1]] + 3 === charMap[s[i]]) {
          stack.pop()
        } else {
          return false
        }
      }
    }
    // console.log('stack', stack)
    if (!stack.length) {
      return true
    }
    return false
};
console.log(isValid('{[]}'))