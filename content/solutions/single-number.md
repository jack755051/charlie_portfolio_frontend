---
title: "Single Number"
difficulty: easy
tags: []
lang: typescript
runtime: "1 ms"
memory: "56.8 MB"
beats_runtime: 73.87
beats_memory: 76.71
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function singleNumber(nums: number[]): number {
      let result = 0
      for (let i = 0; i < nums.length; i++) { 
           result ^=nums[i]
      }
      return result
  };
  ```
---
