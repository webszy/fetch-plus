# MyFetchPlus API

## 安装
> npm i my-fetch-plus

or

> yarn add my-fetch-plus

## 使用
**初始化**
````
```js{4}
import FetchPlus from 'my-fetch-plus
const request = new FetchPlus()
```
````
**基本使用**
````
```js{4}
function test(){
    const [err,res] = await request.get('xxxx')
    console.log(res.data)
}
```
````
