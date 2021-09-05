/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

const findCount = (targetNum, str) => {
    const strLen = str.length
    let count = 0
    for (let i = 0; i < strLen; i++) {
        if (targetNum === str[i]) {
            count++
        }
    }
    return count
}

var findMaxForm = function(strs, m, n) {
    const strSet = new Set(strs)
    let count = 0
    for (let str of strSet) {
        if (findCount('0', str) <= m && findCount('1', str) <= n) {
            count++
        }
    }
    return count === strSet.size() ? strs.length - 1 : count
};

console.log('findMaxForm', findMaxForm)
