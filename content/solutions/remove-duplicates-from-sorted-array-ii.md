---
title: "Remove Duplicates from Sorted Array II"
difficulty: medium
tags: []
lang: typescript
runtime: "57 ms"
memory: "60.2 MB"
beats_runtime: 54.91
beats_memory: 18.58
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function removeDuplicates(nums: number[]): number {
  
      if (nums.length <= 2) return nums.length;
  
      let slow = 2
  
      for (let fast = 2; fast < nums.length; fast++) {
          if (nums[fast] !== nums[slow - 2]) {
              nums[slow] = nums[fast];
              slow++;
          }
      }
  
      return slow
  };
  ```
---
