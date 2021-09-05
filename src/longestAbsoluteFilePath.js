class DirTreeNode {
  length;
  isFile;
  deepth;
  startPos;
  constructor (length, isFile, deepth, startPos) {
    this.length = length;
    this.isFile = isFile;
    this.deepth = deepth;
    this.startPos = startPos;
  }
}

const getInput = (inputString) => {
  const startPos = 0;
  let deepth = 0;
  while (inputString[startPos] === '\\') {
    startPos += 1;
    deepth += 1;
  }
  const res = inputString.replace(/^\t+/, ($1) => {
    deepth = $1.length;
    return '';
  });
  return {
    length: res.length,
    isFile: res.indexOf('.') !== -1 && res[res.length - 1] !== '.',
    deepth
  }
}

const getMaxDirLength = (inputArray, initStartPos, initEndPos) => {
  let maxLength = 0;
  const currentInput = getInput(inputArray[initStartPos]);
  const dirTree = [new DirTreeNode(currentInput.length, currentInput.isFile, currentInput.deepth, initStartPos)];
  while (dirTree && dirTree.length) {
    const rootNode = dirTree.shift();
    debugger
    if (rootNode.isFile && maxLength < rootNode.length) {
      maxLength = rootNode.length;
    }
    if (!dirTree[0] || dirTree[0].deepth !== rootNode.deepth) {
      endPos = initEndPos;
    } else {
      endPos = dirTree[0].startPos;
    }
    // console.log(rootNode.startPos, endPos);
    for (let i = rootNode.startPos; i < endPos; i++) {
      const currentInput = getInput(inputArray[i]);
      if (currentInput.deepth === rootNode.deepth + 1) {
        dirTree.push(new DirTreeNode(currentInput.length + rootNode.length + 1, currentInput.isFile, currentInput.deepth, i));
      }
    }
  }
  return maxLength;
}

/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function(input) {
    if (input && input.length) {
    const inputArray = input.split('\n');
    const length = inputArray.length;
    let maxLength = 0;
    if (length) {
      for (let i = 0; i < length; i++) {
        const currentInput = getInput(inputArray[i]);
        let initEndPos = length;
        if (currentInput.deepth === 0) {
          let j = i + 1;
          while (j < initEndPos && getInput(inputArray[j]).deepth !== 0) {
            j++;
          }
          if (j < initEndPos) {
            initEndPos = j;
          }
          const treeMaxLength = getMaxDirLength(inputArray, i, initEndPos)
          if (maxLength < treeMaxLength) {
            maxLength = treeMaxLength;
          };
        }
      }
      return maxLength;
    }
    return 0;
   }
   return 0;
};

console.log('xxx', lengthLongestPath("file1.txt\nfile2.txt\nlongfile.txt"))