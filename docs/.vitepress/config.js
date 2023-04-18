import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MyFetchPlus文档",
  description: "十年开发总结出来的fetch封装",
  outDir:'./dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DEMO', link: '/demo' },
      { text: 'API', link: '/api' },
      { text: '未来规划', link: '/todo' },
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: 'DEMO', link: '/demo' },
          { text: 'API', link: '/api' },
          { text: '未来规划', link: '/todo' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webszy/fetch-plus' }
    ]
  }
})
