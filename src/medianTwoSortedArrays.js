/**
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
 */
/**
 * 复杂度olog(m+n)的算法
 * 思路：把这个问题转换为求第k小的数字。
 * 1.比较nums1,nums2的长度，把较短的数组设为A长度设为m, 较长的数组设为B长度设为n。
 * 2.求`(k-1)/2`是否大于A的长度
 *  (1)若大于等于A的长度，则取A的最后一个参数`A[m-1]`，取B的第`k-m`个参数`B[k-m-1]`，分别设为a,b
 *     [1]若`a=b`说明有`m-1+k-m-1=k-2`个数小于a和b，则a、b为第k个数
 *     [2]若`a>b`说明小于b的数最多只有`m-1+k-m-1=k-2`个数，则b以及b之前的数不可能是第k个数，
 *        可把问题化为求A和`B[k-m...n-1]`的第`k-(k-m)=m`小的数字
 *     [3]若`a<b`说明恰好有`m+k-m-1=k-1`个数小于b，则b为第k小的数字
 *  (2)若小于A的长度，则候选参数取`A[(k-1)/2]`,`B[(k-1)/2]`，分别设为a,b
 *     [1]若`a=b`说明有`(k-1)/2+(k-1)/2=k-1`个参数小于a,b，则a、b为第k个数
 *     [2]若`a>b`说明最少有`(k-1)/2+(k-1)/2+1=k`个数小于a，并且最多有`(k-1)/2+(k-1)/2=k-1`个数小于b。注意k的奇偶，以求第1数为例知k为奇数要保留小的候选数，偶数要保留大的候选数。
 *        于是奇数化为在`A[0,...,(k-1)/2-1]`和`B[(k-1)/2,...n-1]`中找第`k-(k-1)/2=(k+1)/2`个数，偶数化为在`A[0,...,(k-1)/2]`和`B[(k-1)/2+1,...,n-1]`中找第`k-((k-1)/2+1)=(k-1)/2`个数
 *     [3]若`a<b`同理，奇数可化为在`A[(k-1)/2,...,m-1]`和`B[0,...,(k-1)/2-1]`中找第`(k+1)/2`个数，偶数化为在`A[(k-1)/2+1,...,m]`和`B[0,...,(k-1)/2]`中找第`(k-1)/2`个数
 */

var findMedianSortedArrays = function(nums1, nums2) {
  const m = nums1.length
  const n = nums2.length
  const t = m + n
  const mod = t % 2
  if (m <= n) {
    if (mod === 1) {
      return findKSortedArrays((t + 1) / 2, nums1, 0, m, nums2, 0, n)
    } else {
      return (findKSortedArrays(t / 2, nums1, 0, m, nums2, 0, n) + findKSortedArrays(t / 2 + 1, nums1, 0, m, nums2, 0, n)) / 2
    }
  } else {
    if (mod === 1) {
      return findKSortedArrays((t + 1) / 2, nums2, 0, n, nums1, 0, m)
    } else {
      return (findKSortedArrays(t / 2, nums2, 0, n, nums1, 0, m) + findKSortedArrays(t / 2 + 1, nums2, 0, n, nums1, 0, m)) / 2
    }
  }
}

const findKSortedArrays = (k, A, s1, e1, B, s2, e2) => {
  debugger
  if (s1 >= e1) {
    return B[s2 + k - 1]
  }
  const mod = k % 2
  const p = Math.floor((k - 1) / 2)
  const m = e1 - s1
  const n = e2 - s2
  if (p >= m) {
    const a = A[e1 - 1]
    const b = B[s2 + k - m - 1]
    if (a === b) {
      return a
    }
    if (a > b) {
      const bLen = n + m - k - s2
      if (bLen >= m) {
        return findKSortedArrays(m, A, s1, e1, B, s2 + k - m, n)
      } else {
        return findKSortedArrays(m, B, s2 + k - m, n, A, s1, e1)
      }
    }
    if (a < b) {
      return findKSortedArrays(k - m, A, s1, s1, B, s2, e2)
    }
  } else {
    const a = A[s1 + p]
    const b = B[s2 + p]
    // console.log(A, B)
    if (a === b) {
      return a
    }
    if (a > b) {
      if (mod === 1) {
        const bLen = n - p
        if (bLen >= p) {
          return findKSortedArrays(k - p, A, s1, s1 + p, B, s2 + p, e2)
        } else {
          return findKSortedArrays(k - p, B, s2 + p, e2, A, s1, s1 + p)
        }
      } else {
        const bLen = n - p - 1
        if (bLen >= p + 1) {
          return findKSortedArrays(k - p - 1, A, s1, s1 + p + 1, B, s2 + p + 1, e2)
        } else {
          return findKSortedArrays(k - p - 1, B, s2 + p + 1, e2, A, s1, s1 + p + 1)
        }
      }
    }
    if (a < b) {
      if (mod === 1) {
        const aLen = m - p
        if (aLen <= p) {
          return findKSortedArrays(k - p, A, s1 + p, e1, B, s2, s2 + p)
        } else {
          return findKSortedArrays(k - p, B, s2, s2 + p, A, s1 + p, e1)
        }
      } else {
        const aLen = m - p - 1
        if (aLen <= p + 1) {
          return findKSortedArrays(k - p - 1, A, s1 + p + 1, e1, B, s2, s2 + p + 1)
        } else {
          return findKSortedArrays(k - p - 1, B, s2, s2 + p + 1, A, s1 + p + 1, e1)
        }
      }
    }
  }
}
