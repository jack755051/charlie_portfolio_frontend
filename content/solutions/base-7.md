---
title: Base 7
difficulty: easy
tags: [math]
---

## 思路

把十進位整數轉成七進位字串。處理負數和零的邊界，然後不斷取餘數再除以 7，最後反轉結果。

## 解法

```typescript
function convertToBase7(num: number): string {
  if (num === 0) return '0';
  const isNegative = num < 0;
  let n = Math.abs(num);
  let result = '';
  while (n > 0) {
    result = (n % 7) + result;
    n = Math.floor(n / 7);
  }
  return isNegative ? '-' + result : result;
}
```

時間 O(log₇n)。
