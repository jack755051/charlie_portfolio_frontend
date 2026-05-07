---
title: "Jump Game"
difficulty: medium
tags: []
lang: typescript
runtime: "0 ms"
memory: "59.8 MB"
beats_runtime: 100.00
beats_memory: 58.96
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function canJump(nums: number[]): boolean {
      let maxReach = 0
      for (let i = 0; i < nums.length; i++) {
          if (i > maxReach) { return false };
  
          maxReach = Math.max(maxReach, i + nums[i]);
  
          if (maxReach > nums.length - 1){
              return true
          }
      }
  
      return true
  };
  ```
---
