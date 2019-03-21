/**
 * 思路：
 * 1.将p分割，划分为t={{a-z || '.', 下标}...}和f={['前下标，后下标':(*(a-z || '.'))]...}
 * 2.s中找到第一个等于t{0}{0}的字符s{i},然后从f中取出对应的c=f.get('t{0}{1} t{1}{1}'),然后对c遍历，在s中依次删除所有的c{i}，删完后的s的下标为j判断s{j+1}是否等于t{1}
 *  （1）若不等返回false
 *   (2)若相当t的下标后移一位
 * 3.重复上述步骤，直至t遍历完毕或其中存在false的情况，若遍历完毕返回true
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const t = []
  const f = new Map ()
  const pLen = p.length
  for (let i = 0; i < pLen; i++) {
    if (p[i] === '*') {
      if (p[i - 2]) {
        const fval = [p[i - 1]]
        let j = i + 2
        while (p[j] === '*') {
          fval.push(p[j - 1])
          j += 2
        }
        if (j < pLen + 1) {
          f.set(`${i - 2} ${j - 1}`, fval)
          t.push([p[j - 1],  j - 1])
        }
        i = j - 1
      }
    } else {
      if (p[i + 1] !== '*') {
        t.push([p[i], i])
      }
    }
  }
  const tLen = t.length
  if (!tLen) {
    return true
  }
  const index = s.indexOf(t[0][0])
  while (index !== -1) {
    s = s.substring(index, s.length)
    if (matchString(s, t, f)) {
      return true
    } else {
      index = s.indexOf(t[0][0])
    }
  }
};
const matchString = (s, t, f) => {
  let k = 1
  let j = 1
  const tLen = t.length
  while (k < tLen) {
    const fval = f.get(`${t[k - 1][1]} ${t[k][1]}`)
    if (fval) {
      const fvalLen = fval.length
      for (let i = 0; i < fvalLen; i++) {
        while (fval[i] === s[j]) {
          j++
        }
      }
    }
    if (s[j] !== t[k][0]) {
      return false
    }
    j++
    k++
  }
  if (k === tLen) {
    return true
  }
}
console.log(isMatch('abdc', 'abd*c'))