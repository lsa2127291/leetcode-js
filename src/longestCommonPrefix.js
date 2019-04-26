/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (!strs.length) {
    return ''
  }
  let k = 0
  let comStr = ''
  const length = strs.length
  let minStrLen = strs[0].length
  for (let i = 0; i < length; i++) {
    const length = strs[i].length
    if (length < minStrLen) {
      minStrLen = length
    }
  }
  while (k < minStrLen) {
    let isEqual = true
    const firstChar = strs[0][k]
    for (let i = 1; i < length; i++) {
      if (firstChar !== strs[i][k]) {
        isEqual = false
      }
    }
    if (isEqual) {
      comStr += strs[0][k]
      k++
    } else {
      break
    }
  }
  return comStr
};

// longestCommonPrefix(["dog","racecar","car"])