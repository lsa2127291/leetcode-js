/**
 * @param {string[]} strs
 * @return {string[][]}
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let res = {};
  for (let str of strs) {
      let tmp = str.split('').sort().join('');
      if (!res[tmp])
          res[tmp] = [str]
      else
          res[tmp].push(str)
  }
  return Object.values(res)
};
console.log('groupAnagrams', groupAnagrams(["eat",
"tea",
"tan",
"ate",
"nat",
"bat"]))
