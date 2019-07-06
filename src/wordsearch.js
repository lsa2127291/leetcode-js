/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const row = board.length
  const col = board[0].length
  let visit = []
  for (let i = 0; i < row; i++) {
    visit[i] = []
    for (let j = 0; j < col; j++) {
      visit[i][j] = false
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === word[0]) {
        if (visitBoard(word, board, i, j, row, col, visit)) {
          return true
        }
      }
    }
  }
  return false
  // return visitBoard(word, board, 0, 0, row, col, visit)
};

const visitBoard = (word, board, r, c, row, col, visit) => {
  if (!visit[r][c]) {
    visit[r][c] = true
    if (board[r][c] === word[0]) {
      word = word.slice(1, word.length)
    } else {
      visit[r][c] = false
      return false
    }
    if (word.length) {
      let find
      if (r < row - 1) {
        find = find || visitBoard(word, board, r + 1, c, row, col, visit)
      }
      if (r > 0) {
        find = find || visitBoard(word, board, r - 1, c, row, col, visit)
      }
      if (c < col - 1) {
        find = find || visitBoard(word, board, r, c + 1, row, col, visit)
      }
      if (c > 0) {
        find = find || visitBoard(word, board, r, c - 1, row, col, visit)
      }
      if (!find) {
        visit[r][c] = false
      }
      return find
    } else {
      return true
    }
  }
  return false
};

// const findNextAl = (board, target, r, c, row, col, visit) => {
//   if (r < row - 1) {
//     if (board[r + 1][c] === target && !visit[r + 1][c]) {
//       const next = {
//         r: r + 1,
//         c
//       }
//     }
//   }
//   if (r > 0) {
//     if (board[r - 1][c] === target && !visit[r - 1][c]) {
//       return {
//         r: r - 1,
//         c
//       }
//     }
//     // find = find || visitBoard(word, board, r - 1, c, row, col, visit)
//   }
//   if (c < col - 1) {
//     if (board[r][c + 1] === target) {
//       return {
//         r: -1
//       }
//     }
//     // find = find || visitBoard(word, board, r, c + 1, row, col, visit)
//   }
//   if (c > 0) {
//     if (board[r][c - 1] === target) {
//       return true
//     }
//     // find = find || visitBoard(word, board, r, c - 1, row, col, visit)
//   }
//   return false
// }
const board =
[
['A','B','C','E'],
['S','F','C','S'],
['A','D','E','E']
]

console.log(exist(board, 'ABCB'))


// const w = 'fsdfds'
// let a = w
// a = a.slice(1, a.length)
// console.log(w)
// console.log(a)
