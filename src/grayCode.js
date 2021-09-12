// 解题思路:

// 当n=2时候, 预先设定答案arr=['00', '01', '11', '10'];
// 当n=3时候, 将arr1设定为arr的每个元素前加'0'; 将arr2设定为arr的每个元素前加'1'; 这时候arr1=['000', '001', '011', '010']; arr2=['100', '101', '111', '110']; 因为前加'0', '1'的缘故, 导致确定两个数组的最后一个元素肯定只差'0'/'1'; 又又由于数组间只差一个元素所以将arr2倒序, 然后拼接起来.
// 代码:

var grayCode = function(n) {
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  let arr = ['00', '01', '11', '10'];
  n -= 2;
  while (n--) {
    const arr1 = arr.map(_a => `0${_a}`);
    const arr2 = arr.map(_a => `1${_a}`).reverse();
    arr = arr1.concat(arr2);
  }
  
  return arr.map(_a => parseInt(_a, 2));
};
// const calNumber  =  (n, arr, bits, positive) => {
//   // if (positive !== undefined) {
//   if (positive) {
//     bits[n] = 1
//   } else {
//     bits[bits.length - n - 1] = 0
//   }
//   console.log(bits)
//   arr.push(parseInt(bits.join(''), 2))
//   // }
//   if (n > 0 && n < bits.length) {
//     calNumber(n - 1, arr, bits, 1)
//     calNumber(n - 1, arr, bits, 0)
//   }
// };
