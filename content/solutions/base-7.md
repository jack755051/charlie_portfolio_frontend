---
title: "Base 7"
difficulty: easy
tags: []
lang: typescript
runtime: "0 ms"
memory: "55.1 MB"
beats_runtime: 100.00
beats_memory: 80.95
problem: |
  Given an integer num, return a string of its base 7 representation.
  
  Example: Input: num = 100 → Output: "202"
  Example: Input: num = -7 → Output: "-10"
solution: |
  ```typescript
  function convertToBase7(num: number): string {
      return num.toString(7)
  };
  ```
---
