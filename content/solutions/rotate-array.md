---
title: "Rotate Array"
difficulty: medium
tags: []
lang: typescript
runtime: "7 ms"
memory: "66.5 MB"
beats_runtime: 31.63
beats_memory: 52.69
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  /**
   Do not return anything, modify nums in-place instead.
   */
  function rotate(nums: number[], k: number): void {
      let m = [];
      nums.map((item, index) => {
          const n = (index + k) % nums.length;
          m[n] =item
      })
  
      for (let i = 0; i <nums.length ; i++) {
          nums[i] = m[i];
      }
  };
  ```
---
