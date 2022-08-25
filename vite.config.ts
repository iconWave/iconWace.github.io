import { UserConfig, ConfigEnv } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import visualizer from 'rollup-plugin-visualizer' //包依赖分析可视化
import compressPlugin from 'vite-plugin-compression' //代码压缩
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import * as path from 'path'
import { configManualChunk } from './config/optimizer'

const { resolve } = path
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
    resolve: {
      alias: {
        '/@/': pathResolve('src') + '/'
      }
    },
    plugins: [
      vue(),
      // JSX支持
      vueJsx(),
      Components({
        resolvers: [
          AntDesignVueResolver({ importStyle: 'less' }) // ant-design-vue
          // ElementPlusResolver(), // Element Plus
          // VantResolver(), // Vant
        ],
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue'],

        // allow auto import and register components
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

        dts: 'src/components.d.ts'
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts'
      }),
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild, // 为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
        // 开发环境无需关心
        // injectCode 只受prodEnabled影响
        // https://github.com/anncwb/vite-plugin-mock/issues/9
        // 下面这段代码会被注入 main.ts
        injectCode: `
           import { setupProdMockServer } from '../mock/_createProductionServer'
     
           setupProdMockServer()
           `
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          //modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: 8080, // 启动端口
      hmr: {
        host: '127.0.0.1',
        port: 8080
      },
      // 设置 https 代理
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), '')
        }
      }
    },
    // build
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: configManualChunk
        }
      },
      chunkSizeWarningLimit: 2000
    }
  }
}
