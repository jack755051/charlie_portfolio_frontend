---
title: "Palindrome Number"
difficulty: easy
tags: []
lang: typescript
runtime: "2 ms"
memory: "65 MB"
beats_runtime: 99.95
beats_memory: 64.67
problem: |
  （待填寫題目描述）
solution: |
  ```typescript
  function isPalindrome(x: number): boolean {
      if (x < 0) { return false }
      let m = 0
      let o = x
      while (x > 0) {
          let n = x % 10
          m = (m * 10) + n
          x = Math.floor(x / 10)
      }
  
      return  o!= m ? false : true
  };
  ```
---
