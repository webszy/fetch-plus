type TMethods =
    'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'delete'
    | 'options'
    | 'head'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
type TResType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData' | 'stream'

interface IFetchOptions {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean;
    simplify?:boolean;
}

interface IFetchResponse {
    data: any;
    status: number;
    statusText:string;
    headers: Record<string, string>;
    config: IFetchOptions|Record<string, string>;
    redirected:boolean;
    mode:'cors'|'same-origin'|'no-cors';
}

interface IFetchDetailConfig extends IFetchOptions {
    url?:string;
    method: TMethods;
    headers?: Record<string, string>;
    params?: string[][] | Record<string, any> | string;
    data?: any;
    responseType?: TResType;
}

export class FetchPlus {
    private credentials: 'same-origin'|'include'|'omit';
    private readonly timeout: number;
    private readonly baseURL: string;
    private simplify: boolean;

    constructor(options?: IFetchOptions) {
        const {
            baseURL='',
            timeout=0,
            withCredentials = true,
            simplify=false
        } = options ||{}
        this.baseURL = baseURL || ''

        // this.method = method.toUpperCase()
        // this.headers = headers as Record<string, string>;
        // this.data = data || undefined
        this.timeout = timeout
        if (typeof withCredentials === 'boolean') {
            this.credentials = withCredentials ? 'include' : 'omit'
        } else {
            this.credentials = 'same-origin'
        }
        this.simplify = simplify
    }
    get all(){
        return 'all'
    }
    getAll(){
        return {
            request:this.sendRequest.bind(this),
            get:this.get.bind(this),
            post:this.post.bind(this),
            put:this.put.bind(this),
            patch:this.patch.bind(this),
            options:this.options.bind(this),
            head:this.head.bind(this)
        }
    }
    sendRequest(url: string|IFetchDetailConfig, config?: IFetchDetailConfig) {
        let targetUrl = ''
        if(typeof url === 'object'){
            if(url.url){
                targetUrl = `${this.baseURL}${url.url}`
                delete url.url
                config = url
            } else {
                throw new Error('can not find url')
            }
        }
         targetUrl = `${this.baseURL}${url}`
        if (config?.params) {
            const search = this.handleParams(config.params)
            targetUrl += search
        }
        const fetchConfig:any = this.handleConfig(config)
        const baseResponse = {
            status:-1,
            statusText:'',
            redirected:false,
            data:'',
            headers:{},
            config:fetchConfig,
            mode:'cors'
        } as IFetchResponse
        if (typeof (window as any).AbortController === 'function') {
            if(this.timeout>0){
                const controller = new AbortController();
                const signal = controller.signal;
                setTimeout(() => controller.abort(), this.timeout);
                fetchConfig.signal = signal
            }

            return  window.fetch(targetUrl, fetchConfig)
                .then((res:any)=>{
                    const type = config?.responseType ?? 'json'
                    let data = null
                    Object.assign(baseResponse,{
                        status:res.status,
                        statusText:res.statusText,
                        redirected:res.redirected,
                        mode:res.type
                    })
                    const headers: Record<string, string> = {}
                    for (let [key, value] of res.headers.entries()) {
                        headers[key]= value
                    }
                    baseResponse.headers = headers
                    switch (type) {
                        case 'text':
                            return res.text()
                        case 'json':
                            return res.json()
                        case 'blob':
                            return res.blob()
                        case 'arrayBuffer':
                            return res.arrayBuffer()
                        case 'formData':
                            return res.formData()
                        case 'stream':
                           return res.blob()
                    }
                })
                .then(data=>{
                    baseResponse.data = data
                    return [null,baseResponse]
                })
                .catch(err=>[err,null])
        }
        return new Promise((resolve, reject) => {
            if(this.timeout>0){
                setTimeout(() => reject(new Error('timeout')), this.timeout);
            }
            return  (window as any).fetch(targetUrl,fetchConfig)
                .then((res:any)=>{
                    const type = config?.responseType ?? 'json'
                    let data = null
                    Object.assign(baseResponse,{
                        status:res.status,
                        statusText:res.statusText,
                        redirected:res.redirected,
                        config:config||{}
                    })
                    const headers: Record<string, string> = {}
                    for (let [key, value] of res.headers.entries()) {
                        headers[key]= value
                    }
                    baseResponse.headers = headers
                    switch (type) {
                        case 'text':
                            return res.text()
                        case 'json':
                            return res.json()
                        case 'blob':
                            return res.blob()
                        case 'arrayBuffer':
                            return res.arrayBuffer()
                        case 'formData':
                            return res.formData()
                        case 'stream':
                            return res.blob()
                    }
                })
                .then((data:any)=>{
                    baseResponse.data = data
                    return [null,baseResponse]
                })
                .catch((err:any)=>[err,null])
        })
    }

    get(url: string, config?: IFetchDetailConfig) {
        return this.sendRequest(url, config)
    }
    post(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'POST'
        }
        if(!init.method||init.method.toUpperCase()!=='POST'){
            init.method='POST'
        }
        return this.sendRequest(url, config)
    }
    put(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'PUT'
        }
        if(!init.method||init.method.toUpperCase()!=='PUT'){
            init.method='PUT'
        }
        return this.sendRequest(url, config)
    }
    patch(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'PATCH'
        }
        if(!init.method||init.method.toUpperCase()!=='PATCH'){
            init.method='PATCH'
        }
        return this.sendRequest(url, config)
    }
    delete(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'DELETE'
        }
        if(!init.method||init.method.toUpperCase()!=='DELETE'){
            init.method='DELETE'
        }
        return this.sendRequest(url, config)
    }
    options(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'OPTIONS'
        }
        if(!init.method||init.method.toUpperCase()!=='OPTIONS'){
            init.method='OPTIONS'
        }
        return this.sendRequest(url, config)
    }
    head(url: string, config?: IFetchDetailConfig){
        const init = config || {
            method:'HEAD'
        }
        if(!init.method||init.method.toUpperCase()!=='HEAD'){
            init.method='HEAD'
        }
        return this.sendRequest(url, config)
    }
    jsonp(url: string, config?: IFetchDetailConfig){

    }
    protected handleParams(params: string[][] | Record<string, any> | string) {
        if (!params) {
            return false
        }
        let str = ''
        if (typeof params === "string") {
            str = params
        } else {
            const search = new URLSearchParams(params)
            for (const [key, val] of search.entries()) {
                str += `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            }
        }
        return str
    }

    protected handleConfig(config?:IFetchDetailConfig) {
        const headers = config?.headers ?? {}
        const responseType = config?.responseType ?? 'json'
        let contentType = ''
        switch (responseType){
            default:
                contentType = 'application/json'
                break
            case 'text':
                contentType = 'text/plain'
                break
            case 'json':
                contentType = 'application/json'
                break
            case 'blob':
                contentType ='application/octet-stream'
                break
            case 'arrayBuffer':
                contentType = 'application/octet-stream'
                break
            case 'formData':
                contentType = 'multipart/form-data'
                break
            case 'stream':
                contentType ='application/octet-stream'
                break
        }
        headers['Content-Type'] = contentType
        const configInfo =  {
            method:config?.method || 'GET',
            headers,
            referrerPolicy:'no-referrer-when-downgrade',
            // integrity
            mode:'cors',
            body: undefined
        }
        if(config?.data){
            configInfo.body = config.data
        }
        return configInfo
    }
}
