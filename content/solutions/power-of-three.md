---
title: Power of Three
difficulty: easy
tags: [math]
---

## 思路

判斷一個數是否為 3 的次方。最直覺的方式是不斷除以 3，看最後是否等於 1。但也可以利用數學性質：在 32-bit 整數範圍內，3 的最大次方是 `3^19 = 1162261467`，如果 `n > 0` 且 `1162261467 % n === 0`，那 `n` 就是 3 的次方。

## 解法

```typescript
function isPowerOfThree(n: number): boolean {
  return n > 0 && 1162261467 % n === 0;
}
```

用數學常數避免迴圈，時間複雜度 O(1)。
