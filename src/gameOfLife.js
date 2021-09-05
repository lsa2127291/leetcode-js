// 思路：环形路线计算并缓存值3*3窗口，中心点移动的时候清除中心点缓存
// 中心点右移计算最右边3组数据，中心点下移动计算

const calculateValue = (board, i, j) => {
    let count = 0
    for (let a = i - 1; a < i + 2; a++) {
        for (let b = j - 1; b < j + 2; b++) {
            if (board[a] && board[a][b] !== undefined) {
                count += board[a][b]
            }
        }
    }
    if (count < 2 || count > 3) {
        board[i][j] = 0
    } else if (count === 3) {
        board[i][j] = 1
    }
}

const gameOfLife = (board) => {
    const boardLength = board.length
    const nextBoard = []
    for (let i = 0; i < boardLength; i++) {
        const rowBoardLength = board[i].length
        nextBoard[i] = []
        for (let j = 0; j < rowBoardLength; j++) {
            let count = 0
            for (let a = i - 1; a < i + 2; a++) {
                for (let b = j - 1; b < j + 2; b++) {
                    if (a === i && b === j) {
                        continue
                    }
                    if (board[a] && board[a][b] !== undefined) {
                        count += board[a][b]
                    }
                }
            }
            if (count < 2 || count > 3) {
                nextBoard[i][j] = 0
            } else if (count === 3) {
                nextBoard[i][j] = 1
            } else {
                nextBoard[i][j] = board[i][j]
            }
        }
    }
    for (let i = 0; i < boardLength; i++) {
        const rowBoardLength = board[i].length
        for (let j = 0; j < rowBoardLength; j++) {
            board[i][j] = nextBoard[i][j]
        }
    }
}

// 空间复杂度为1

// class Solution {
//     public void gameOfLife(int[][] board) {
//         int n = board.length;
//         if (n == 0) return;
//         int m = board[0].length;
//         for (int i = 0; i < n; i++) {
//             for (int j = 0; j < m; j++) {
//                 int count = getAroundAlive(board, i, j);
//                 if ((board[i][j] >> 0 & 1) == 1) {
//                     if (count >= 2 && count <= 3) {
//                         //surve 11
//                        board[i][j] |= 1 << 1;
//                     }
//                 }else {
//                     if (count == 3) {
//                         //survice 10
//                         board[i][j] |= 1 << 1;
//                     }
//                 }
//             }
//         }
//         for (int i = 0; i < n; i++) {
//             for (int j = 0; j < m; j++) {
//                 board[i][j] = board[i][j] >> 1 & 1;
//             }
//         }
//     } 
//     private int getAroundAlive(int[][]board, int i, int j) {
//         int n = board.length;
//         int m = board[0].length;
//         int count = 0;
//         for (int x = -1; x <= 1; x++) {
//             for (int y = -1; y <= 1; y++) {
//                 if (x == 0 && y == 0) continue;
//                 int nx = x + i, ny = y + j;
//                 if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
//                     continue;
//                 }
//                 if ((board[nx][ny] >> 0 & 1) == 1) {
//                     count++;
//                 }
//             }
//         }
//         return count;
//     }
// }


const input = [
    [0,1,0],
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ]
