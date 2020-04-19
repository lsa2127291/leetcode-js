/**
 * Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

  Example 1:

  Input: n = 12
  Output: 3 
  Explanation: 12 = 4 + 4 + 4.
  Example 2:

  Input: n = 13
  Output: 2
  Explanation: 13 = 4 + 9.
 */
// 动态规划 getMin(n) = min(getMin(n - i*i) <i * i <= n>) + 1
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    const mem = [0]
    function getMin (n) {
      // console.log(n)
      // if (n === 1) {
      //   return 1
      // }
      // if (n === 0) 
      // {
      //   // console.log(n)
      //   return 0;
      // }
      const m = Math.floor(Math.sqrt(n))
      const r = n - m * m
      let min = mem[r] >= 0 ? mem[r] : getMin(r)
      for (let i = m - 1; i >= 1; i--) {
        const ri = n - i * i
        min = Math.min(min,  mem[ri] >= 0 ? mem[ri] : getMin(ri))
      }
      mem[n] = min + 1
      return min + 1
    }
    // console.log(n)
    return getMin(n)
    // console.log(min)
};

console.log(numSquares(15))
