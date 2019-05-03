/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (digits.length === 0) {
      return []
    }
    const phoneMap = {
      2: ['a', 'b', 'c'],
      3: ['d', 'e', 'f'],
      4: ['g', 'h', 'i'],
      5: ['j', 'k', 'l'],
      6: ['m', 'n', 'o'],
      7: ['p', 'q', 'r', 's'],
      8: ['t', 'u', 'v'],
      9: ['w', 'x', 'y', 'z']
    }
    digits = digits + ''
    const digitsLen = digits.length
    const lettersIndexArr = []
    const digitsArr = []
    for (let i = 0; i < digitsLen; i++) {
      lettersIndexArr.push(0)
      digitsArr.push(phoneMap[digits[i]])
    }
    let results = []
    let k = digitsLen - 1
    while (true) {
      let str = ''
     for (let i = 0; i < digitsLen; i++) {
       str += digitsArr[i][lettersIndexArr[i]]
     }
     results.push(str)
      // for (let i = 0; i < digitsLen; i++) {
      //   phoneMap[digits[i][0]]
      // }
      // if (lettersIndexArr[k] === digitsArr[k].length - 1) {
      //   lettersIndexArr[k] = 0
      //   // if (k < 0) {
      //   //   break
      //   // }
      // }
      lettersIndexArr[k]++
      let f = k
      while (lettersIndexArr[f] === digitsArr[f].length) {
        if (f === 0) {
          return results
        }
        lettersIndexArr[f] = 0
        lettersIndexArr[f - 1]++
        f--
      }
    }
    // return results
};
