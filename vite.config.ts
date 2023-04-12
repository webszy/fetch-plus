// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            formats:['es', 'umd'],
            name: 'FetchPlus',
            // the proper extensions will be added
            fileName: (format)=>`my-fetch-plus.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [''],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {},
            },
        },
    },
})
