---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MyFetchPlus"
  text: "Fetch的现代化封装"
  tagline: webszy
  actions:
    - theme: brand
      text: API
      link: /api
    - theme: alt
      text: DEMO
      link: /demo

features:
  - title: 零依赖
    details: 尽量不使用三方库，均使用原生js方法，也因此对兼容性有要求，但是能用fetch的浏览器一般都没问题
  - title: Axios Like API
    details: 接口的调用方式尽量贴合axios,方便你降级处理
  - title: 增强fetch
    details: 对fetch进行了新增了超时处理，自动转换返回值等等
---

