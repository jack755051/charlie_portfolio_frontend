---
title: "Remove Duplicates from Sorted Array"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "58.8 MB"
beats_runtime: 100.00
beats_memory: 45.21
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function removeDuplicates(nums: number[]): number {
      if (nums.length === 0) return 0;
  
      let slow = 0;
      
      for(let fast = 1; fast < nums.length; fast++) {
          if (nums[fast] !== nums[slow]) { 
              slow++;
              nums[slow] = nums[fast]!;
          }
      }
      
      return slow + 1;
  
  };
  ```
---
