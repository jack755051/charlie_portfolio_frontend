---
title: Missing Number
difficulty: easy
tags: [array, math, bit-manipulation]
---

## 思路

給定 `[0, n]` 範圍的陣列但缺少一個數。用高斯公式算出期望總和，減去實際總和就是缺少的數。也可以用 XOR，但加法更直觀。

## 解法

```typescript
function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

時間 O(n)，空間 O(1)。
