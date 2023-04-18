---
outline: deep
---

# new MyFetchPlus 
```ts
interface IFetchOptions {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean;
}
```
```ts
const request = new FetchPlus(options:IFetchOptions)
```
## baseURL
url前缀

## timeout
超时时间，默认设置为0，即不超时取消

## withCredentials
是否携带cookie
# getAll
解构内部api
```js
const {get} = new FetchPlus({}).getAll()
```

# get
get方法
```js
const {get} = new FetchPlus({}).getAll()
get(url,config)
```
## url
请求的路径，会自动与`baseURL`合并
## config
请求的相关配置参数
```ts
interface IFetchDetailConfig {
    url?:string;
    method: string;
    headers?: Record<string, string>;
    params?: string[][] | Record<string, any> | string;
    data?: any;
    responseType?: 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData' | 'stream';
}
```
### config.params
url参数，当传入对象时会自动处理，传入字符串则只是添加到url后面

### config.data
请求体，http body
# 其他请求方式
目前还支持`POST`、`PUT`、`DELETE`、`HEAD`、`OPTIONS`、`PATCH`等请求方式，方法与get方式近似
