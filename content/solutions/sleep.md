---
title: "Sleep"
difficulty: easy
tags: []
lang: javascript
runtime: "41 ms"
memory: "53 MB"
beats_runtime: 74.88
beats_memory: 85.34
problem: |
  （待填寫題目描述）
solution: |
  ```javascript
  /**
   * @param {number} millis
   * @return {Promise}
   */
  async function sleep(millis) {
      return new Promise((resolve) => setTimeout(resolve, millis));
  }
  
  /** 
   * let t = Date.now()
   * sleep(100).then(() => console.log(Date.now() - t)) // 100
   */
  ```
---
