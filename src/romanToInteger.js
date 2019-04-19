/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const romanMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
      IV: 4,
      XL: 40,
      CD: 400,
      IX: 9,
      XC: 90,
      CM: 900
    }
    const sLen = s.length
    let total = 0
    for(let i = 0, j = 1; i < sLen; i++, j++) {
      if (romanMap[s[i] + s[j]]) {
        total += romanMap[s[i] + s[j]]
        i = j
        j++
      } else {
        total += romanMap[s[i]]
      }
    }
    return total
};

console.log(romanToInt('MIX'))