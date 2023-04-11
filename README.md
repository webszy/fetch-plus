# FetchPlus
> 一个fetch的现代化封装

# 基本使用
## 安装

> npm i @webszy/fetch-plus --save

or

> yarn add @webszy/fetch-plus
## 引入

可以通过import或require引入
```javasvript
import {FetchPlus} from '@webszy/fetch-plus'
const http = new FetchPlus({
	withCredentials:true
})
http.get('xxxx')
```
# TODO

- [x] 基本请求封装
- [ ] 只发送简单请求
- [ ] 单元测试

# 参考资料
+ [Fetch API 教程 - 阮一峰](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html "Fetch-API")
+ [redaxios - github](https://github.com/developit/redaxios/blob/master/src/index.js)
