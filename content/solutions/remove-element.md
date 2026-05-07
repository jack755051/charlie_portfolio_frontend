---
title: "Remove Element"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "55.4 MB"
beats_runtime: 100.00
beats_memory: 55.56
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function removeElement(nums: number[], val: number): number {
      let m = 0;
      for (let i = 0; i < nums.length; i++) {
          if (nums[i] !== val) {
              nums[m] = nums[i]
              m++
  
          }
  
      }
  
  
      return m
  };
  ```
---
