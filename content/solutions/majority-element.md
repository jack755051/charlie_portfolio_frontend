---
title: "Majority Element"
difficulty: easy
tags: []
lang: typescript
runtime: "2 ms"
memory: "60.3 MB"
beats_runtime: 77.69
beats_memory: 17.13
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function majorityElement(nums: number[]): number {
      let candidate = null;
      let count = 0;
  
      for (let num of nums) {
          if (count === 0) {
              candidate = num
          }
  
          count += (num === candidate) ? 1:-1
      }
  
      return candidate
  };
  ```
---
