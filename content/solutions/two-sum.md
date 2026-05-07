---
title: "Two Sum"
difficulty: easy
tags: []
lang: typescript
runtime: "2 ms"
memory: "57.9 MB"
beats_runtime: 71.69
beats_memory: 20.67
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function twoSum(nums: number[], target: number): number[] {
      let m = new Map();
  
      for (let i = 0; i < nums.length; i++) {
          let n = target - nums[i];
  
          if(m.has(n)){
              return [m.get(n), i];
          }else{
              m.set(nums[i], i);
          }
      }
  };
  ```
---
