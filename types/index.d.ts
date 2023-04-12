type TMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
type TResType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData' | 'stream';
interface IFetchOptions {
    baseURL?: string;
    timeout?: number;
    withCredentials?: boolean | string;
}
interface IFetchDetailConfig extends IFetchOptions {
    url?: string;
    method: TMethods;
    headers?: Record<string, string>;
    params?: string[][] | Record<string, any> | string;
    data?: any;
    responseType?: TResType;
}
export declare class FetchPlus {
    private credentials;
    private readonly timeout;
    private readonly baseURL;
    constructor(options?: IFetchOptions);
    getAll(): {
        request: (url: string | IFetchDetailConfig, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        get: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        post: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        put: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        patch: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        options: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
        head: (url: string, config?: IFetchDetailConfig | undefined) => Promise<unknown>;
    };
    sendRequest(url: string | IFetchDetailConfig, config?: IFetchDetailConfig): Promise<unknown>;
    get(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    post(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    put(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    patch(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    delete(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    options(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    head(url: string, config?: IFetchDetailConfig): Promise<unknown>;
    protected handleParams(params: string[][] | Record<string, any> | string): string | false;
    protected handleConfig(config?: IFetchDetailConfig): {
        method: TMethods;
        headers: Record<string, string>;
        referrerPolicy: string;
        mode: string;
        body: undefined;
    };
}
export {};
