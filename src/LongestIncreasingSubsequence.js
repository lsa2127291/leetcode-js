const lengthOfLIS = (nums) => {
    if (!nums.length) {
        return 0
    }
    const length = nums.length
    let maxCount = 1
    let maxCurCount = 1
    const maxCountArr = []
    maxCountArr[length - 1] = 1
    const findMaxLength = (nums, start) => {
        let curCount = 1
        for (let i = start + 1; i < length; i++) {
            if (nums[start] < nums[i]) {
                curCount += maxCountArr[i]
                if (curCount > maxCount) {
                    maxCount = curCount
                }
                if (curCount > maxCurCount) {
                    maxCurCount = curCount
                }
                curCount -= maxCountArr[i]
            }
        }
    }
    for (let i = length - 2; i >= 0; i--) {
        maxCurCount = 1
        findMaxLength(nums, i)
        maxCountArr[i] = maxCurCount
    }
    return maxCount;
}

console.log(lengthOfLTS([4,10,4,3,8,9]))

const lengthOfLIS = (nums) => {
    if (!nums.length) {
        return 0
    }
    const length = nums.length
    let maxCount = 1
    let maxCurCount = 1
    const maxCountArr = []
    maxCountArr[length - 1] = 1
    const findMaxLength = (nums, end) => {
        // let curCount = 1
        // for (let i = start + 1; i < length; i++) {
        //     if (nums[start] < nums[i]) {
        //         curCount += maxCountArr[i]
        //         if (curCount > maxCount) {
        //             maxCount = curCount
        //         }
        //         if (curCount > maxCurCount) {
        //             maxCurCount = curCount
        //         }
        //         curCount -= maxCountArr[i]
        //     }
        // }
        let minNum = nums[0]
        let minIndex = 0
        for (let i = 1; i < end; i++) {
            if (minNum > nums[i]) {
                minNum = nums[i]
                minIndex = i
            }
        }
        for (let i = minIndex; i < end; i++) {
            if (minNum < nums[i]) {
                
            }
        }
    }
    for (let i = length - 2; i >= 0; i--) {
        maxCurCount = 1
        findMaxLength(nums, i)
        maxCountArr[i] = maxCurCount
    }
    return maxCount;
}
