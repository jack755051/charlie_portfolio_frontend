---
title: "Plus One"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "55.7 MB"
beats_runtime: 100.00
beats_memory: 30.28
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function plusOne(digits: number[]): number[] {
      // 從最後一位 (n-1) 往第一位 (0) 走
      for (let i = digits.length - 1; i >= 0; i--) {
          if (digits[i] === 9) {
              // 如果是 9，把它變 0，然後「不要 return」
              // 這樣迴圈就會繼續跑到下一個 i (也就是前一位)
              digits[i] = 0;
          } else {
              // 如果不是 9，直接加 1
              digits[i] += 1;
              // 加完之後，任務完成，直接把整個陣列丟回去！
              return digits;
          }
      }
      return [1, ...digits];
  };
  ```
---
