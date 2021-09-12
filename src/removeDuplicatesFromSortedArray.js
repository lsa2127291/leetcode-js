/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (let i = 0; i < nums.length;) {
      j = i + 1
      if (nums[i] === nums[j]) {
        nums.splice(i, 1)
      } else {
        i++
      }
    }
    return nums
};
console.log(removeDuplicates([1,1,2,2,2,3,3,3,3]))
