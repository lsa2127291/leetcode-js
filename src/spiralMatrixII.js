/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    const arr = []
    let i = 1
    for (let j = 0; j < n; j++) {
      arr.push([])
    }
    const n2 = n * n
    let c = 0
    while (i <= n2) {
      for (let k = c; k < n - c; k++) {
        arr[c][k] = i++
      }
      for (k = c + 1; k < n - c; k++) {
        arr[k][n - c - 1] = i++
      }
      for (k = n - c - 2; k >= c; k--) {
        arr[n - c - 1][k] = i++
      }
      for (k = n - c - 2; k >= c + 1; k--) {
        arr[k][c] = i++
      }
      c++
    }
    return arr
};
console.log('arr', generateMatrix(5))