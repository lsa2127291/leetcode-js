/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const partternMap = splitPartten(p)
  // console.log(partternMap)
  const sLen = s.length
  let start = 0
  const partternKeyArr = Array.from(partternMap.values())
  const partternValArr = Array.from(partternMap.keys())
  // console.log(partternKeyArr[0])
  const partternKeyArrLen = partternKeyArr.length
  const matchStrArrList = []
  // 将所有匹配的静态字符串的首尾存入数组中 [[[1,2], [3,4]], [[3,3], [4, 4]]
  if (partternKeyArr[partternKeyArrLen - 1] === '-') {
    for (let i = 0; i < partternKeyArrLen - 1; i++) {
      const key = partternKeyArr[i]
      const matchStrArr = matchStaticStr(s, key, start)
      if (matchStrArr) {
        start = matchStrArr[0][1] + 1
      } else {
        return false
      }
      matchStrArrList.push(matchStrArr)
    }
  } else {
    for (let i = 0; i < partternKeyArrLen; i++) {
      const key = partternKeyArr[i]
      let matchStrArr = matchStaticStr(s, key, start)
      if (matchStrArr) {
        start = matchStrArr[0][1] + 1
      } else {
        return false
      }
      if (i === partternKeyArrLen - 1) {
        if (matchStrArr[matchStrArr.length - 1][1] < sLen - 1) {
          return false
        } else {
          matchStrArr = [matchStrArr[matchStrArr.length - 1]]
        }
      }
      matchStrArrList.push(matchStrArr)
    }
  }
  // console.log(matchStrArrList)
  const run = true
  let matchStrArrListLength = matchStrArrList.length
  start = 0
  let statitcArr = []
  for (let i = 0; i < matchStrArrListLength; i++) {
    statitcArr.push(0)
  }
  while (run) {
    let minStart = 0
    let k = 0
    // 确定静态数组组合后依次匹配动态数组
    for (; k < partternKeyArrLen; k++) {
      const key = partternKeyArr[k]
      if (key !== '-') {
        const partternVal = partternValArr[k]
        // console.log(partternVal)
        // console.log(k, statitcArr[k])
        const position = matchStrArrList[k][statitcArr[k]]
        if (position[0] > minStart) {
          // console.log('minStart', minStart, matchDynamicStr(s, partternVal, minStart, position[0]))
          if (!matchDynamicStr(s, partternVal, minStart, position[0])) {
            break
          }
        } else if (position[0] < minStart) {
          break
        }
        minStart = position[1] + 1
      } else {
        const partternVal = partternValArr[k]
        let start = 0
        let end = sLen
        if (matchStrArrListLength) {
          const position = matchStrArrList[matchStrArrListLength - 1][statitcArr[matchStrArrListLength - 1]]
          start = position[1] + 1
        }
        // console.log(s, partternVal)
        if (start < sLen && !matchDynamicStr(s, partternVal, start, end)) {
          break
        }
        minStart = sLen
      }
    }
    // console.log(minStart, sLen)
    if (minStart === sLen && k === partternKeyArrLen) {
      return true
    } else {
      // 遍历匹配数组的所有可能组合
      let i = 0
      for (; i < matchStrArrListLength; i++) {
        if (statitcArr[i] < matchStrArrList[i].length - 1) {
          // console.log('fsdf', statitcArr[i], matchStrArrList[i].length)
          statitcArr[i]++
          break
        } else {
          statitcArr[i] = 0
          let j = i + 1
          while (j < matchStrArrListLength) {
            if (statitcArr[j]  < matchStrArrList[j].length - 1) {
              statitcArr[j]++
              for (let c = i + 1; c < j; c++) {
                statitcArr[c] = 0
              }
              break
            }
            j++
          }
          if (j === matchStrArrListLength) {
            return false
          } else {
            break
          }
        }
      }
      if (i === matchStrArrListLength) {
        return false
      }
    }
  }
}

// 匹配静态字符串
const matchStaticStr = (src, static, start) => {
  const srcLen = src.length
  const staticLen = static.length
  const matchStrArr = []
  if (srcLen < start + staticLen) {
    return false
  }
  let k = 0
  for (let i = start; i < srcLen; i++) {
    // if (s[i] !== t[i] && t[i] !== '.') {
    //   return false
    // }
    if (src[i] === static[k] || static[k] === '.') {
      k++
      if (k === staticLen) {
        matchStrArr.push([i - k + 1, i])
        i = i - k + 1
        k = 0
      }
    } else {
      i = i - k
      k = 0
    }
  }
  if (matchStrArr.length > 0) {
     return matchStrArr
  }
  return false
}

// 匹配动态字符串
const matchDynamicStr = (src, dynamic, start, end) => {
  const dynamicLen = dynamic.length
  let fullMatchIndex = -1
  for (let i = 0; i <= dynamicLen; i++) {
    if (dynamic[i] === '.') {
      fullMatchIndex = i
      break
    }
  }
  if (fullMatchIndex !== -1) {
    return true
  } else {
    let c = start
    for (let i = 0; i < dynamicLen; i++) {
      const str = dynamic[i]
      // let m = k
      while (str === src[c] && c < end) {
        c++
      }
      // console.log(str, src[c], c, end)
      if (c === end) {
        return true
      }
    }
  }
  return false
}

// 将字符串划分为动态和静态字符串，{[a, b]: 'a', [c, d]: 'wew'}
const splitPartten = (p) => {
  const pLen = p.length
  const partternMap = new Map ()
  let partternValue = []
  let partternKey = ''
  let i = 0, j = 1
  while (i < pLen && j < pLen) {
    if (p[j] === '*') {
      if (partternKey) {
        partternMap.set(partternValue, partternKey)
        partternKey = ''
        partternValue = []
      }
      partternValue.push(p[i])
      i = i + 2
      j = j + 2
    } else {
      partternKey += p[i]
      i++
      j++
    }
  }
  if (partternValue) {
    if (i < pLen) {
      if (partternKey) {
        partternMap.set(partternValue, partternKey + p[i])
      } else {
        partternMap.set(partternValue, p[i])
      }
    } else {
      partternMap.set(partternValue, '-')
    }
  }
  return partternMap
}

// console.log(isMatch('aasdfaaaaaaaaaaaaaaaaaaaaabbbbsdfasdfasdfas', 'a*aasdfa*.*bbsdf.*asdf.*asdf.*s'))
// console.log(isMatch('aaa', 'a*a'))
// console.log(isMatch('ab', '.*c'))
// console.log(isMatch('aaca', 'ab*a*c*a'))
// console.log(isMatch('mississippi', 'mis*is*p*.'))
// console.log(isMatch('mississippi', 'mis*is*ip*.'))
// console.log(isMatch('aaa', 'ab*ac*a'))
// console.log(isMatch('ab', '.*..'))
// console.log(isMatch('ab', '.*..c*'))
// console.log(isMatch('bbab', 'b*a*'))
// console.log(isMatch('aabcbcbcaccbcaabc', '.*a*aa*.*b*.c*.*a*'))
// console.log(isMatch('baabbbaccbccacacc', 'c*..b*a*a.*a..*c'))
// console.log(isMatch('abbaaaabaabbcba', 'a*.*ba.*c*..a*.a*.'))
// console.log(isMatch('cbaacacaaccbaabcb', 'c*b*b*.*ac*.*bc*a*'))
