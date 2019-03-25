// /**
//  * 思路：
//  * 1.将p分割，划分为t={{a-z || '.', 下标}...}和f={['前下标，后下标':(*(a-z || '.'))]...}
//  * 2.s中找到第一个等于t{0}{0}的字符s{i},然后从f中取出对应的c=f.get('t{0}{1} t{1}{1}'),然后对c遍历，在s中依次删除所有的c{i}，删完后的s的下标为j判断s{j+1}是否等于t{1}
//  *  （1）若不等返回false
//  *   (2)若相当t的下标后移一位
//  * 3.重复上述步骤，直至t遍历完毕或其中存在false的情况，若遍历完毕返回true
//  */
// /**
//  * @param {string} s
//  * @param {string} p
//  * @return {boolean}
//  */
// var isMatch = function(s, p) {
//   const t = []
//   const f = new Map ()
//   const pLen = p.length
//   let i = 0
//   const fval = []
//   while (p[i + 1] === '*' && i < pLen) {
//     fval.push(p[i])
//     i += 2
//   }
//   if (fval.length) {
//     f.set(-1, fval)
//   }
//   for (let i = 0; i < pLen; i++) {
//     if (p[i] === '*') {
//       if (p[i - 2] && p[i - 2] !== '*') {
//         const fval = [p[i - 1]]
//         let j = i + 2
//         while (p[j] === '*') {
//           fval.push(p[j - 1])
//           j += 2
//         }
//         if (j < pLen + 1) {
//           f.set(`${i - 2} ${j - 1}`, fval)
//           t.push([p[j - 1],  j - 1])
//         } else if (j === pLen + 1) {
//           f.set(`${i - 2}`, fval)
//         }
//         i = j - 1
//       }
//     } else {
//       if (p[i + 1] !== '*') {
//         t.push([p[i], i])
//       }
//      }
//   }
//   return matchString(s, t, f)
// }

// const matchString = (s, t, f) => {
//   let k = 0
//   let j = 0
//   let fval = f.get(-1)
//   const tLen = t.length
//   const sLen = s.length
//   if (fval) {
//     const fvalLen = fval.length
//     for (let i = 0; i < fvalLen; i++) {
//       let c = j
//       const fvali = fval[i]
//       if (fvali === s[c]) {
//         let m = k
//         while (fvali === s[c]) {
//           if (m < tLen && t[m][0] === fvali) {
//             m++
//           }
//           c++
//         }
//         if (m  < tLen && t[m][0] === fvali) {
//           return false
//         }
//         j = c
//         k = m
//       } else if (fvali === '.') {
//         let m = k
//         let needMatchStr = ''
//         if (t[m]) {
//           while (t[m]) {
//             const fval = t[m + 1] ? f.get(`${t[m][1]} ${t[m + 1][1]}`) : f.get(`${t[m][1]}`)
//             if (fval) {
//               break
//             }
//             needMatchStr += t[m][0]
//             m++
//           }
//         } else {
//           return true
//         }
//         const needMatchStrLen = needMatchStr.length
//         let fillStr = ''
//         let matched = false
//         while (c < sLen) {
//           fillStr += s[c]
//           c++
//           if (fillStr === needMatchStr) {
//             if (s[c] && t[m]) {
//               if (s[c]  === t[m][0]) {
//                 matched = true
//                 break
//               }
//             } else if (c === sLen) {
//               matched = true
//               break
//             }
//           }
//           if (fillStr.length === needMatchStrLen) {
//             fillStr = fillStr.substring(1, fillStr.length)
//           }
//         }
//         if (matched) {
//           k = m
//           j = c
//           break
//         } else {
//           return false
//         }
//       }
//     }  
//   }
//   while (k < tLen && j < sLen) {
//     if (s[j] !== t[k][0] && t[k][0] !== '.') {
//       return false
//     }
//     let fval
//     if (k + 1 < tLen) {
//       fval = f.get(`${t[k][1]} ${t[k + 1][1]}`)
//     }
//     if (!fval) {
//       fval = f.get(`${t[k][1]}`)
//     }
//     if (fval) {
//       const fvalLen = fval.length
//       let hasMove = false
//       let c = j
//       for (let i = 0; i < fvalLen; i++) {
//         const fvali = fval[i]
//         if (fvali === s[c]) {
//           let m = k
//           while (fvali === s[c]) {
//             c++
//             if (m < tLen && t[m][0] === fvali) {
//               m++
//             }
//            }
//           // if (m < tLen && t[m][0] === fvali) {
//           //   return false
//           // }
//            j = c 
//            k = m
//           hasMove = true
//           console.log(fvali, c, s[c], m, t[m])
//         } else if (fvali === '.') {
//           let m = k + 1
//           let needMatchStr = ''
//           if (t[m]) {
//             while (t[m]) {
//               const fval = t[m + 1] ? f.get(`${t[m][1]} ${t[m + 1][1]}`) : f.get(`${t[m][1]}`)
//               if (fval) {
//                 break
//               }
//               needMatchStr += t[m][0]
//               m++
//             }
//           } else {
//             return true
//           }
//           const needMatchStrLen = needMatchStr.length
//           let fillStr = ''
//           let matched = false
//           while (c < sLen) {
//             fillStr += s[c]
//             c++
//             if (fillStr === needMatchStr) {
//               if (s[c] && t[m]) {
//                 if (s[c]  === t[m][0]) {
//                   matched = true
//                   break
//                 }
//               } else if (c === sLen) {
//                 matched = true
//                 break
//               }
//             }
//             if (fillStr.length === needMatchStrLen) {
//               fillStr = fillStr.substring(1, fillStr.length)
//             }
//           }
//           if (matched) {
//             k = m
//             j = c
//             hasMove = true
//             break
//           } else {
//             return false
//           }
//         }
//       }
//       if (!hasMove) {
//         k++
//         j++
//       }
//     } else {
//       j++
//       k++
//     }
//     if (j === sLen) {
//       break
//     }
//   }
//   console.log(j, k)
//   if (k === tLen && j === sLen) {
//     return true
//   }
//   return false
// }
// // console.log(isMatch('aasdfaaaaaaaaaaaaaaaaaaaaabbbbsdfasdfasdfas', 'a*aasdfa*.*bbsdf.*asdf.*asdf.*s'))
// // console.log(isMatch('aaa', 'aa*a'))
// // console.log(isMatch('ab', '.*c'))
// console.log(isMatch('aaca', 'ab*a*c*a'))
