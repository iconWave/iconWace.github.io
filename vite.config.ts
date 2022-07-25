import { defineConfig } from 'vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import visualizer from 'rollup-plugin-visualizer'; //包依赖分析可视化
import compressPlugin from 'vite-plugin-compression'; //代码压缩
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

import { configManualChunk } from './config/optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({ importStyle: 'less' }), // ant-design-vue
        // ElementPlusResolver(), // Element Plus
        // VantResolver(), // Vant
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      // allow auto import and register components
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],

      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    compressPlugin({
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ],
  server: {
    port: 8080, // 启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080,
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
  // build
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: configManualChunk,
      },
    },
    chunkSizeWarningLimit: 2000,
  },
});
