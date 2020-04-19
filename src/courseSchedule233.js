/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
// 改成邻接图，利用dfs判断是否存在环
var canFinish = function(numCourses, prerequisites) {
    const len = prerequisites.length
    const vectors = {}
    // const notStartVectors = {}
    for (let i = 0; i < len; i++) {
      if (!vectors[prerequisites[i][0]]) {
        vectors[prerequisites[i][0]] = [prerequisites[i]]
      } else {
        vectors[prerequisites[i][0]].push(prerequisites[i])
      }
      // if (!notStartVectors[prerequisites[i][1]]) {
      //   notStartVectors[prerequisites[i][1]] = true
      // }
    }
    const graph = []
    const vs = Object.keys(vectors)
    for (let v of vs) {
      if (!graph[v]) {
        if (findRound(v, [])) {
          return false
        }
      }
    }
    function findRound (v, visit) {
      const edges = vectors[v]
      if (!edges) {
        return false
      }
      const edgesLen = edges.length
      visit[v] = true
      for (let i = 0; i < edgesLen; i++) {
        const edge = edges[i]
        if (visit[edge[1]]) {
          return true
        } else if (!graph[[edge[1]]]) {
          const res = findRound(edge[1], visit)
          if (res) {
            return true
          }
        }
      }
      visit[v] = false
      graph[v] = true
      return false
    }
    return true
};

console.log(canFinish(3, [[0, 1], [1, 0], [0, 2]]))
