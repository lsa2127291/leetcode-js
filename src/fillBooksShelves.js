// 附近的家居城促销，你买回了一直心仪的可调节书架，打算把自己的书都整理到新的书架上。

// 你把要摆放的书 books 都整理好，叠成一摞：从上往下，第 i 本书的厚度为 books[i][0]，高度为 books[i][1]。

// 按顺序 将这些书摆放到总宽度为 shelf_width 的书架上。

// 先选几本书放在书架上（它们的厚度之和小于等于书架的宽度 shelf_width），然后再建一层书架。重复这个过程，直到把所有的书都放在书架上。

// 需要注意的是，在上述过程的每个步骤中，摆放书的顺序与你整理好的顺序相同。 例如，如果这里有 5 本书，那么可能的一种摆放情况是：第一和第二本书放在第一层书架上，第三本书放在第二层书架上，第四和第五本书放在最后一层书架上。

// 每一层所摆放的书的最大高度就是这一层书架的层高，书架整体的高度为各层高之和。

// 以这种方式布置书架，返回书架整体可能的最小高度。

/** 
 * 思路： 1.一本书具体放在第几行不会影响结果
 *       2.每本书放置可以选择放到当前行或者放到下一行，得动态规划公式：min(result) = min(当前行层高, 下一行层高)
 *       3.当前的书、当前行的剩余宽度、当前行的最大宽度都一致，最终结果也是一致的，要进行去重
 */

/**
 * @param {number[][]} books
 * @param {number} shelf_width
 * @return {number}
 */
 var minHeightShelves = function(books, maxWidth) {
  // key => result of key
  const map = new Map()
  function toKey(...args) {
      return args.join('|')
  }
  
  function solve(fromIndex, restWidth, maxHeight) {
      if (fromIndex >= books.length)  return 0
  
      const key = toKey(fromIndex, restWidth, maxHeight)
      if (map.has(key))   return map.get(key)
      
      let result
      const book = books[fromIndex]
      const [width, height] = book
      
      let subresultSameRow = Infinity, subresultNewRow
      if (restWidth === maxWidth) subresultNewRow = Infinity
      
      if (restWidth >= width) {
          let heightDiff = 0
          if (height > maxHeight) {
              heightDiff = height - maxHeight
          }
          subresultSameRow =
              heightDiff + solve(1 + fromIndex, restWidth - width, Math.max(maxHeight, height))
      }
      subresultNewRow = height + solve(1 + fromIndex, maxWidth - width, height)
      
      result = Math.min(subresultSameRow, subresultNewRow)
      map.set(key, result)
      return result
  }
  
  
  let result = solve(0, maxWidth, 0)
  return result
};