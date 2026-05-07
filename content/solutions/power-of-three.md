---
title: "Power of Three"
difficulty: easy
tags: []
lang: typescript
runtime: "5 ms"
memory: "65.6 MB"
beats_runtime: 81.01
beats_memory: 56.98
problem: |
  Given an integer n, return true if it is a power of three. Otherwise, return false.
  An integer n is a power of three if there exists an integer x such that n == 3^x.
  
  Example: Input: n = 27 → Output: true
  Example: Input: n = 0 → Output: false
solution: |
  ```typescript
  function isPowerOfThree(n: number): boolean {
      if (n <= 0) return false;
  
      while (n % 3 === 0) {
          n /= 3; 
      }
  
      return n===1
  };
  ```
---
