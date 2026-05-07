---
title: "Number of 1 Bits"
difficulty: easy
tags: []
lang: typescript
runtime: "1 ms"
memory: "57.4 MB"
beats_runtime: 38.34
beats_memory: 30.57
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function hammingWeight(n: number): number {
  
      let a = n.toString(2);
  
      let b = a.split('');
  
      let c = b.filter(d => d != "0");
  
      return c.length
  };
  ```
---
