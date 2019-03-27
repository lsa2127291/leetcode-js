const matchStaticStr = (src, static) => {
  const srcLen = src.length
  const staticLen = static.length
  if (srcLen < staticLen) {
    return false
  }
  let k = 0
  for (let i = 0; i < srcLen;) {
    // if (s[i] !== t[i] && t[i] !== '.') {
    //   return false
    // }
    if (s[i] === static[k] || t[k] === '.') {
      k++
      if (k === staticLen) {
        return [i - k + 1, i]
      }
    } else {
      k = 0
    }
  }
  return false
}
const matchDynamicStr = (src, dynamic) => {
  const dynamicLen = dynamic.length
  const srcLen = src.length
  let fullMatchIndex = -1
  for (let i = 0; i < dynamicLen; i++) {
    if (fval[i] === '.') {
      fullMatchIndex = i
      break
    }
  }
  if (fullMatchIndex !== -1) {
    return true
  } else {
    let c = 0
    for (let i = 0; i < fvalLen; i++) {
      const fvali = fval[i]
      // let m = k
      while (fvali === src[c]) {
        c++
      }
      if (c === srcLen) {
        return true
      }
    }
  }
}
const splitPartten = (p) => {
  const strArr = p.split(/[\w\.]\*/)
  // const t = []
  // const f = []
  // const pLen = p.length
  // let i = 0
  // const fval = []
  // while (p[i + 1] === '*' && i < pLen) {
  //   fval.push(p[i])
  //   i += 2
  // }
  // if (fval.length) {
  //   f[0] = fval
  // }
  // for (let i = 0; i < pLen; i++) {
  //   if (p[i] === '*') {
  //     if (p[i - 2] && p[i - 2] !== '*') {
  //       const fval = [p[i - 1]]
  //       let j = i + 2
  //       while (p[j] === '*') {
  //         fval.push(p[j - 1])
  //         j += 2
  //       }
  //       if (j < pLen + 1) {
  //         f.push(fval)
  //         t.push([p[j - 1],  j - 1])
  //       } else if (j === pLen + 1) {
  //         f.push(fval)
  //       }
  //       i = j - 1
  //     }
  //   } else {
  //     let str = ''
  //     let j = i + 1
  //     while (p[j] !== '*') {
  //       str += p[j - 1]
  //       j++
  //     }
  //     t.push(str)
  //    }
  // }
}