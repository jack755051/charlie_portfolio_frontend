---
title: "Power of Two"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "57.5 MB"
beats_runtime: 100.00
beats_memory: 74.42
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function isPowerOfTwo(n: number): boolean {
      if(n <= 0) return false
  
      const m = Math.log2(n).toString()
  
      return m.includes(".") ? false : true
  };
  ```
---
