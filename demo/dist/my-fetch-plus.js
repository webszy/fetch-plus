var c = Object.defineProperty;
var b = (h, e, t) => e in h ? c(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var u = (h, e, t) => (b(h, typeof e != "symbol" ? e + "" : e, t), t);
class y {
  constructor(e) {
    u(this, "credentials");
    u(this, "timeout");
    u(this, "baseURL");
    const {
      baseURL: t = "",
      timeout: s = 0,
      withCredentials: a = !0
    } = e || {};
    this.baseURL = t || "", this.timeout = s, typeof a == "boolean" ? this.credentials = a ? "include" : "omit" : this.credentials = "same-origin";
  }
  getAll() {
    return {
      request: this.sendRequest.bind(this),
      get: this.get.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
      options: this.options.bind(this),
      head: this.head.bind(this)
    };
  }
  sendRequest(e, t) {
    let s = "";
    if (typeof e == "object")
      if (e.url)
        s = `${this.baseURL}${e.url}`, delete e.url, t = e;
      else
        throw new Error("can not find url");
    if (s = `${this.baseURL}${e}`, t != null && t.params) {
      const r = this.handleParams(t.params);
      s += r;
    }
    const a = this.handleConfig(t), n = {
      status: -1,
      statusText: "",
      redirected: !1,
      data: "",
      headers: {},
      config: a,
      mode: "cors"
    };
    if (typeof window.AbortController == "function") {
      if (this.timeout > 0) {
        const r = new AbortController(), d = r.signal;
        setTimeout(() => r.abort(), this.timeout), a.signal = d;
      }
      return window.fetch(s, a).then((r) => {
        const d = (t == null ? void 0 : t.responseType) ?? "json";
        Object.assign(n, {
          status: r.status,
          statusText: r.statusText,
          redirected: r.redirected,
          mode: r.type
        });
        const o = {};
        for (let [l, i] of r.headers.entries())
          o[l] = i;
        switch (n.headers = o, d) {
          case "text":
            return r.text();
          case "json":
            return r.json();
          case "blob":
            return r.blob();
          case "arrayBuffer":
            return r.arrayBuffer();
          case "formData":
            return r.formData();
          case "stream":
            return r.blob();
        }
      }).then((r) => (n.data = r, [null, n])).catch((r) => [r, null]);
    }
    return new Promise((r, d) => (this.timeout > 0 && setTimeout(() => d(new Error("timeout")), this.timeout), window.fetch(s, a).then((o) => {
      const l = (t == null ? void 0 : t.responseType) ?? "json";
      Object.assign(n, {
        status: o.status,
        statusText: o.statusText,
        redirected: o.redirected,
        config: t || {}
      });
      const i = {};
      for (let [m, p] of o.headers.entries())
        i[m] = p;
      switch (n.headers = i, l) {
        case "text":
          return o.text();
        case "json":
          return o.json();
        case "blob":
          return o.blob();
        case "arrayBuffer":
          return o.arrayBuffer();
        case "formData":
          return o.formData();
        case "stream":
          return o.blob();
      }
    }).then((o) => (n.data = o, [null, n])).catch((o) => [o, null])));
  }
  get(e, t) {
    return this.sendRequest(e, t);
  }
  post(e, t) {
    const s = t || {
      method: "POST"
    };
    return (!s.method || s.method.toUpperCase() !== "POST") && (s.method = "POST"), this.sendRequest(e, t);
  }
  put(e, t) {
    const s = t || {
      method: "PUT"
    };
    return (!s.method || s.method.toUpperCase() !== "PUT") && (s.method = "PUT"), this.sendRequest(e, t);
  }
  patch(e, t) {
    const s = t || {
      method: "PATCH"
    };
    return (!s.method || s.method.toUpperCase() !== "PATCH") && (s.method = "PATCH"), this.sendRequest(e, t);
  }
  delete(e, t) {
    const s = t || {
      method: "DELETE"
    };
    return (!s.method || s.method.toUpperCase() !== "DELETE") && (s.method = "DELETE"), this.sendRequest(e, t);
  }
  options(e, t) {
    const s = t || {
      method: "OPTIONS"
    };
    return (!s.method || s.method.toUpperCase() !== "OPTIONS") && (s.method = "OPTIONS"), this.sendRequest(e, t);
  }
  head(e, t) {
    const s = t || {
      method: "HEAD"
    };
    return (!s.method || s.method.toUpperCase() !== "HEAD") && (s.method = "HEAD"), this.sendRequest(e, t);
  }
  handleParams(e) {
    if (!e)
      return !1;
    let t = "";
    if (typeof e == "string")
      t = e;
    else {
      const s = new URLSearchParams(e);
      for (const [a, n] of s.entries())
        t += `${encodeURIComponent(a)}=${encodeURIComponent(n)}`;
    }
    return t;
  }
  handleConfig(e) {
    const t = (e == null ? void 0 : e.headers) ?? {}, s = (e == null ? void 0 : e.responseType) ?? "json";
    let a = "";
    switch (s) {
      default:
        a = "application/json";
        break;
      case "text":
        a = "text/plain";
        break;
      case "json":
        a = "application/json";
        break;
      case "blob":
        a = "application/octet-stream";
        break;
      case "arrayBuffer":
        break;
      case "formData":
        a = "multipart/form-data";
        break;
      case "stream":
        a = "application/octet-stream";
        break;
    }
    t["Content-Type"] = a;
    const n = {
      method: (e == null ? void 0 : e.method) || "GET",
      headers: t,
      referrerPolicy: "no-referrer-when-downgrade",
      // integrity
      mode: "cors",
      body: void 0
    };
    return e != null && e.data && (n.body = e.data), n;
  }
}
export {
  y as FetchPlus
};
