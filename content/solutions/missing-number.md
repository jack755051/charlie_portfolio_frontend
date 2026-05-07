---
title: "Missing Number"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "57.5 MB"
beats_runtime: 100.00
beats_memory: 84.79
problem: |
  Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
  
  Example: Input: nums = [3,0,1] → Output: 2
  Example: Input: nums = [9,6,4,2,3,5,7,0,1] → Output: 8
solution: |
  ```typescript
  function missingNumber(nums: number[]): number {
      const a = nums.length;
      const total = (a + 1) * a / 2;
      const sum = nums.reduce((b, c) => b + c)
  
      return total - sum
  };
  ```
---
