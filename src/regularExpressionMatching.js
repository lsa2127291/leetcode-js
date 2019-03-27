// /**
//  * 思路：
//  * 1.将p分割，划分为t={{a-z || '.', 下标}...}和f={['前下标，后下标':(*(a-z || '.'))]...}
//  * 2.s中找到第一个等于t{0}{0}的字符s{i},然后从f中取出对应的c=f.get('t{0}{1} t{1}{1}'),然后对c遍历，在s中依次删除所有的c{i}，删完后的s的下标为j判断s{j+1}是否等于t{1}
//  *  （1）若不等返回false
//  *   (2)若相当t的下标后移一位
//  * 3.重复上述步骤，直至t遍历完毕或其中存在false的情况，若遍历完毕返回true
//  */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const t = []
  const f = new Map ()
  const pLen = p.length
  let i = 0
  const fval = []
  while (p[i + 1] === '*' && i < pLen) {
    fval.push(p[i])
    i += 2
  }
  if (fval.length) {
    f.set(-1, fval)
  }
  for (let i = 0; i < pLen; i++) {
    if (p[i] === '*') {
      if (p[i - 2] && p[i - 2] !== '*') {
        const fval = [p[i - 1]]
        let j = i + 2
        while (p[j] === '*') {
          fval.push(p[j - 1])
          j += 2
        }
        if (j < pLen + 1) {
          f.set(`${i - 2} ${j - 1}`, fval)
          t.push([p[j - 1],  j - 1])
        } else if (j === pLen + 1) {
          f.set(`${i - 2}`, fval)
        }
        i = j - 1
      }
    } else {
      if (p[i + 1] !== '*') {
        t.push([p[i], i])
      }
     }
  }
  return matchString(s, t, f)
}
const isEqual = (s, t) => {
  const sLen = s.length
  const tLen = t.length
  if (sLen !== tLen) {
    return false
  }
  for (let i = 0; i < sLen; i++) {
    if (s[i] !== t[i] && t[i] !== '.') {
      return false
    }
  }
  return true
}
const matchString = (s, t, f) => {
  let k = 0
  let j = 0
  let fval = f.get(-1)
  const tLen = t.length
  const sLen = s.length
  if (fval) {
    const fvalLen = fval.length
    let fullMatchIndex = -1
    for (let i = 0; i <fvalLen; i++) {
      if (fval[i] === '.') {
        fullMatchIndex = i
        break
      }
    }
    if (fullMatchIndex !== -1) {
      let c = j
      let m = k
      let needMatchStr = ''
      if (t[m]) {
        while (t[m]) {
          const fval = t[m + 1] ? f.get(`${t[m][1]} ${t[m + 1][1]}`) : f.get(`${t[m][1]}`)
          if (fval) {
            break
          }
          needMatchStr += t[m][0]
          m++
        }
      } else {
        return true
      }
      const needMatchStrLen = needMatchStr.length
      let fillStr = ''
      let matched = false
      if (needMatchStrLen) {
        while (c < sLen) {
          fillStr += s[c]
          c++
          if (isEqual(fillStr, needMatchStr)) {
            if (s[c] && t[m]) {
              if (s[c]  === t[m][0] || t[m][0] === '.') {
                matched = true
                break
              }
            } else if (c === sLen) {
              matched = true
              break
            }
          }
          if (fillStr.length === needMatchStrLen) {
            fillStr = fillStr.substring(1, fillStr.length)
          }
        }
      } else {
        matched = true
      }
      if (matched) {
        k = m
        j = c
      } else {
        return false
      }
    } else {
      let finalInfo = [null, 0]
      let c = j
      for (let i = 0; i < fvalLen; i++) {
        const fvali = fval[i]
        // let m = k
        while (fvali === s[c]) {
          c++
          finalInfo = [fvali, c - j]
          // if (m < tLen && t[m][0] === fvali) {
          //   m++
          // }
        }
        // if (m < tLen && t[m][0] === fvali) {
        //   return false
        // }
        j = c
      }
      const matchChar = finalInfo[0]
      // console.log(finalInfo)
      if (matchChar) {
        let c = 0
        let total = finalInfo[1]
        let m = k
        while (m < tLen && t[m][0] === matchChar && c < total) {
          c++
          m++
        }
        k = m
      }
    }
  }
  // console.log(tLen, sLen, k, j)
  while (k < tLen && j < sLen) {
    console.log(s[j], t[k])
    if (s[j] !== t[k][0] && t[k][0] !== '.') {
      return false
    }
    let fval
    if (k + 1 < tLen) {
      fval = f.get(`${t[k][1]} ${t[k + 1][1]}`)
    }
    if (!fval) {
      fval = f.get(`${t[k][1]}`)
    }
    if (fval) {
      let hasMove
      const fvalLen = fval.length
      let fullMatchIndex = -1
      for (let i = 0; i <fvalLen; i++) {
        if (fval[i] === '.') {
          fullMatchIndex = i
          break
        }
      }
      if (fullMatchIndex !== -1) {
        let c = j + 1
        let m = k + 1
        let needMatchStr = ''
        if (t[m]) {
          while (t[m]) {
            const fval = t[m + 1] ? f.get(`${t[m][1]} ${t[m + 1][1]}`) : f.get(`${t[m][1]}`)
            if (fval) {
              break
            }
            needMatchStr += t[m][0]
            m++
          }
        } else {
          return true
        }
        const needMatchStrLen = needMatchStr.length
        let fillStr = ''
        let matched = false
        if (needMatchStrLen) {
          while (c < sLen) {
            fillStr += s[c]
            c++
            if (isEqual(fillStr, needMatchStr)) {
              if (s[c] && t[m]) {
                if (s[c]  === t[m][0] || t[m][0] === '.') {
                  matched = true
                  break
                }
              } else if (c === sLen) {
                matched = true
                break
              }
            }
            if (fillStr.length === needMatchStrLen) {
              fillStr = fillStr.substring(1, fillStr.length)
            }
          }
        } else {
          matched = true
        }
        if (matched) {
          k = m
          j = c
          hasMove = true
        } else {
          return false
        }
      } else {
        let finalInfo = [null, 0]
        let c = j + 1
        for (let i = 0; i < fvalLen; i++) {
          const fvali = fval[i]
          // let m = k
          // console.log(fvali, s[c], i)
          while (fvali === s[c]) {
            c++
            finalInfo = [fvali, c - j - 1]
            // if (m < tLen && t[m][0] === fvali) {
            //   m++
            // }
          }
          // if (m < tLen && t[m][0] === fvali) {
          //   return false
          // }
          hasMove = true
          j = c
        }
        const matchChar = finalInfo[0]
        // console.log(finalInfo)
        // console.log(matchChar, k)
        if (matchChar) {
          let c = 0
          let total = finalInfo[1]
          let m = k + 1
          console.log(m, t[m][0], matchChar)
          while (m < tLen && t[m][0] === matchChar && c < total) {
            c++
            m++
          }
          console.log(t[m][0])
          k = m
        } else if (hasMove) {
          k++
        }
      }
      if (!hasMove) {
        k++
        j++
      }
    } else {
      j++
      k++
    }
    if (j === sLen) {
      break
    }
  }
  // console.log('fsdf', j, sLen, k, tLen)
  if (k === tLen && j === sLen) {
    return true
  }
  return false
}
// console.log(isMatch('aasdfaaaaaaaaaaaaaaaaaaaaabbbbsdfasdfasdfas', 'a*aasdfa*.*bbsdf.*asdf.*asdf.*s'))
// console.log(isMatch('aa', 'a*'))
// console.log(isMatch('ab', '.*c'))
// console.log(isMatch('aaca', 'ab*a*c*a'))
// console.log(isMatch('mississippi', 'mis*is*p*.'))
// console.log(isMatch('mississippi', 'mis*is*ip*.'))
// console.log(isMatch('aaa', 'ab*ac*a'))
// console.log(isMatch('ab', '.*..'))
// console.log(isMatch('ab', '.*..c*'))
// console.log(isMatch('bbab', 'b*a*'))
// console.log(isMatch('aabcbcbcaccbcaabc', '.*a*aa*.*b*.c*.*a*'))
console.log(isMatch('baabbbaccbccacacc', 'c*..b*a*a.*a..*c'))
