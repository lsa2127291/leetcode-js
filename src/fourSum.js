var fourSum = function (nums, target) {
    const numsLength = nums.length
    const results = []
    nums = nums.sort((a, b) => a - b)
    for (let i = 0; i < numsLength - 3; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            for (let j = i + 1; j < numsLength - 2; j++) {
                if (j === i + 1 || nums[j] !== nums[j - 1]) {
                    for (let k = j + 1, c = numsLength - 1; k < c;) {
                        let sum = nums[i] + nums[j] + nums[k] + nums[c]
                        // console.log('sum', sum, nums[i], nums[j], nums[k], nums[c])
                        if (sum === target) {
                            results.push([nums[i], nums[j], nums[k], nums[c]])
                            k++
                            c--
                            while (k < c && nums[k] === nums[k - 1]) {
                                k++
                            }
                            while (k < c && nums[c] === nums [c + 1]) {
                                c--
                            }
                        } else if (sum < target) {
                            k++

                        } else {
                            c--
                        }
                    }
                }
            }
        }
    }
    return results
};

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))