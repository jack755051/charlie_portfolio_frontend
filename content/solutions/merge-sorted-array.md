---
title: "Merge Sorted Array"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "54.2 MB"
beats_runtime: 100.00
beats_memory: 98.27
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  /**
   Do not return anything, modify nums1 in-place instead.
   */
  function merge(nums1: number[], m: number, nums2: number[], n: number): void {
          nums1.splice(m, nums1.length - m, ...nums2);
      nums1.sort((a, b) => a - b);
  };
  ```
---
