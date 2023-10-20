(function(d,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(d=typeof globalThis<"u"?globalThis:d||self,i(d.FetchPlus={}))})(this,function(d){"use strict";var f=Object.defineProperty;var T=(d,i,h)=>i in d?f(d,i,{enumerable:!0,configurable:!0,writable:!0,value:h}):d[i]=h;var l=(d,i,h)=>(T(d,typeof i!="symbol"?i+"":i,h),h);class i{constructor(t){l(this,"credentials");l(this,"timeout");l(this,"baseURL");l(this,"simplify");const{baseURL:e="",timeout:s=0,withCredentials:a=!0,simplify:n=!1}=t||{};this.baseURL=e||"",this.timeout=s,typeof a=="boolean"?this.credentials=a?"include":"omit":this.credentials="same-origin",this.simplify=n}get all(){return"all"}getAll(){return{request:this.sendRequest.bind(this),get:this.get.bind(this),post:this.post.bind(this),put:this.put.bind(this),patch:this.patch.bind(this),options:this.options.bind(this),head:this.head.bind(this)}}sendRequest(t,e){let s="";if(typeof t=="object")if(t.url)s=`${this.baseURL}${t.url}`,delete t.url,e=t;else throw new Error("can not find url");if(s=`${this.baseURL}${t}`,e!=null&&e.params){const r=this.handleParams(e.params);s+=r}const a=this.handleConfig(e),n={status:-1,statusText:"",redirected:!1,data:"",headers:{},config:a,mode:"cors"};if(typeof window.AbortController=="function"){if(this.timeout>0){const r=new AbortController,u=r.signal;setTimeout(()=>r.abort(),this.timeout),a.signal=u}return window.fetch(s,a).then(r=>{const u=(e==null?void 0:e.responseType)??"json";Object.assign(n,{status:r.status,statusText:r.statusText,redirected:r.redirected,mode:r.type});const o={};for(let[m,p]of r.headers.entries())o[m]=p;switch(n.headers=o,u){case"text":return r.text();case"json":return r.json();case"blob":return r.blob();case"arrayBuffer":return r.arrayBuffer();case"formData":return r.formData();case"stream":return r.blob()}}).then(r=>(n.data=r,[null,n])).catch(r=>[r,null])}return new Promise((r,u)=>(this.timeout>0&&setTimeout(()=>u(new Error("timeout")),this.timeout),window.fetch(s,a).then(o=>{const m=(e==null?void 0:e.responseType)??"json";Object.assign(n,{status:o.status,statusText:o.statusText,redirected:o.redirected,config:e||{}});const p={};for(let[c,b]of o.headers.entries())p[c]=b;switch(n.headers=p,m){case"text":return o.text();case"json":return o.json();case"blob":return o.blob();case"arrayBuffer":return o.arrayBuffer();case"formData":return o.formData();case"stream":return o.blob()}}).then(o=>(n.data=o,[null,n])).catch(o=>[o,null])))}get(t,e){return this.sendRequest(t,e)}post(t,e){const s=e||{method:"POST"};return(!s.method||s.method.toUpperCase()!=="POST")&&(s.method="POST"),this.sendRequest(t,e)}put(t,e){const s=e||{method:"PUT"};return(!s.method||s.method.toUpperCase()!=="PUT")&&(s.method="PUT"),this.sendRequest(t,e)}patch(t,e){const s=e||{method:"PATCH"};return(!s.method||s.method.toUpperCase()!=="PATCH")&&(s.method="PATCH"),this.sendRequest(t,e)}delete(t,e){const s=e||{method:"DELETE"};return(!s.method||s.method.toUpperCase()!=="DELETE")&&(s.method="DELETE"),this.sendRequest(t,e)}options(t,e){const s=e||{method:"OPTIONS"};return(!s.method||s.method.toUpperCase()!=="OPTIONS")&&(s.method="OPTIONS"),this.sendRequest(t,e)}head(t,e){const s=e||{method:"HEAD"};return(!s.method||s.method.toUpperCase()!=="HEAD")&&(s.method="HEAD"),this.sendRequest(t,e)}jsonp(t,e){}handleParams(t){if(!t)return!1;let e="";if(typeof t=="string")e=t;else{const s=new URLSearchParams(t);for(const[a,n]of s.entries())e+=`${encodeURIComponent(a)}=${encodeURIComponent(n)}`}return e}handleConfig(t){const e=(t==null?void 0:t.headers)??{},s=(t==null?void 0:t.responseType)??"json";let a="";switch(s){default:a="application/json";break;case"text":a="text/plain";break;case"json":a="application/json";break;case"blob":a="application/octet-stream";break;case"arrayBuffer":a="application/octet-stream";break;case"formData":a="multipart/form-data";break;case"stream":a="application/octet-stream";break}e["Content-Type"]=a;const n={method:(t==null?void 0:t.method)||"GET",headers:e,referrerPolicy:"no-referrer-when-downgrade",mode:"cors",body:void 0};return t!=null&&t.data&&(n.body=t.data),n}}d.FetchPlus=i,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
