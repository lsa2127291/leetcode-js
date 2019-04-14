/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  const rmap = {0: 'M', 1: 'C', 2: 'X', 3: 'I'}
  const hmap = {1: 'D', 2: 'L', 3: 'V'}
  const s = num.toString()
  const sLen = s.length
  let roman = ''
  for (let i = 0; i < sLen; i++) {
    let num = parseInt(s[i])
    const k = 4 - sLen + i
    if (hmap[k]) {
      if (num === 9) {
        roman += rmap[k] + rmap[k - 1]
        num = 0
      } else if (num >= 5) {
        roman += hmap[k]
        num -= 5
      } else if (num === 4) {
        roman += rmap[k] + hmap[k]
        num = 0
      }
    }
    for (let j = 0; j < num; j++) {
      roman += rmap[k]
    }
  }
  return roman
};

console.log(intToRoman(1010))
