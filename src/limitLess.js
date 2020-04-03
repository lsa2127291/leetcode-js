 function add(...args) {
  let sum = args.reduce((acc, cur) => acc + cur);
  const tmp = function (...args) {
    sum = sum + args.reduce((acc, cur) => acc + cur);
    return tmp;
  };
  tmp.toString = function () {
    return sum;
  };
  tmp.valueOf = function () {
    return sum;
  };
  return tmp;
}
console.log(add(1, 2)(2, 3)(4, 5) + 'fef')
