const statisticContinueString1 = s => {
  const sLen = s.length
  let count = 1
  let result = ''
  let i = 0, j = 1
  for (; i < sLen - 1, j < sLen; i++, j++) {
    if (s[i] === s[j]) {
      count++
    } else {
      result = result + s[i] + count
      count = 1
    }
  }
  result = result + s[i] + count
  return result
}

const statisticContinueString2 = s => {
  const sLen = s.length
  let result = ''
  for (let i = 0; i < sLen; i++) {
    let j = i + 1
    while(s[j] === s[i]) {
      j++
    }
    result = result + s[i] + (j - i)
    i = j - 1
  }
  return result
}
// console.log(statisticContinueString2('weaccaaaaffffffffffffffe'))

