# MyFetchPlus
> 一个fetch的现代化封装
# 基本功能

+ 以es6 class封装fetch
+ 自动格式化URL QueryString
+ 根据responseType自动格式化Data
+ 超时取消请求
+ 返回值遵循error first 原则

# 基本使用
## 安装

> npm i my-fetch-plus --save

or

> yarn add my-fetch-plus

## 引入

可以通过import或require引入
```javascript
import {FetchPlus} from 'fetch-plus'
const http = new FetchPlus({
	withCredentials:true
})
http.get('xxxx')
```
# TODO

- [x] 基本请求封装
- [ ] 只发送简单请求
- [ ] 单元测试
- [ ] 失败重试

# 参考资料
+ [Fetch API 教程 - 阮一峰](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html "Fetch-API")
+ [redaxios - github](https://github.com/developit/redaxios/blob/master/src/index.js)
