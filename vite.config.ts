import path from 'path';
import {defineConfig} from 'vite';
import {buildPlugin} from 'vite-plugin-build';
import {version} from './package.json'
export default defineConfig({
    plugins: [
        buildPlugin({
            fileBuild: {
                emitDeclaration: false
            },
            libBuild: {
                buildOptions: [
                    {
                        sourcemap: 'inline',
                        rollupOptions: {
                            external: [],
                            output: {
                                globals: {}
                            },
                        },
                        lib: {
                            entry: path.resolve(__dirname, 'src/index.ts'),
                            name: 'FetchPlus',
                            fileName: (format) => `FetchPlus.${format}.js`,
                        }
                    }
                ]
            },
        }),
    ],
    define:{
        _shared_lib_version:JSON.stringify(version)
    }
});
