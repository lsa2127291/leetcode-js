/**
 * Given an array of integers with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.

Note:
The array size can be very large. Solution that uses too much extra space will not pass the judge.

Example:

int[] nums = new int[] {1,2,3,3,3};
Solution solution = new Solution(nums);

// pick(3) should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
solution.pick(3);

// pick(1) should return 0. Since in the array only nums[0] is equal to 1.
solution.pick(1);
 * @param {number[]} nums
 */
var Solution = function(nums) {
    const nums_hash = {}
    const len = nums.length
    for (let i = 0; i < len; i++) {
      const num = nums[i]
      if (!nums_hash[num]) {
        nums_hash[num] = [i]
      } else {
        nums_hash[num].push(i)
      }
    }
    this.nums_hash = nums_hash
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
    const hash_arr = this.nums_hash[target]
    const len = hash_arr.length
    const rIndex = Math.floor(parseInt(Math.random() * len))
    return hash_arr[rIndex]
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 * */
