
/**
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
 */

/**
 * 思路： 4行时的走法->(0, 0) (1, 0) (2, 0) (3, 0) (2, 1) (1, 2) (1 ,3) (0, 4) 形成循环
 * 伪代码：
 * crawl[][]
 * for (k = 0; k < slen;) {
 *  j = 0
 *  for (i = 0; i < row; i++) {
 *    crawl[i][j] = s[k++]
 *  }
 *  for (i >= 0; i--) {
 *    craw[i][j++] = s[k++]
 * }
 * }
 * for (i = 0; i < row; i++) {
 *  for (c = 0; c < j; c++) {
 *    out += craw[i][c]
 * }
 * return out
 * }
 */
var convert = function(s, numRows) {
  let len = s.length
  if (numRows === 1 || !len) {
    return s
  }
  let map = new Map()
  let j = 0
  let odd = true
  for (let k = 1; k < len;) {
    if (odd) {
      for (let i = 1; i < numRows; i++) {
        map.set(`${i} ${j}`, s[k++])
        if (k === len) {
          break
        }
      }
    } else {
      for (let i = numRows - 2; i >=0; i--) {
        map.set(`${i} ${++j}`, s[k++])
        if (k === len) {
          break
        }
      }
    }
    odd = !odd
  }
  let str = s[0]
  for (let i = 0; i < numRows; i++) {
    for (let c = 0; c <= j; c++) {
      if (map.has(`${i} ${c}`)) {
        str += map.get(`${i} ${c}`)
      }
    }
  }
  return str
};
