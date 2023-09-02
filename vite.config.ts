import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import EslintPlugin from 'vite-plugin-eslint'
import StyleLintPlugin from 'vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()],
})

const componentsConfig = Components({
  resolvers: [ElementPlusResolver()],
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/app/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

export default defineConfig({
  plugins: [vue(), styleLintConfig, eslintConfig, svgLoader(), svgIconsConfig, autoImportConfig, componentsConfig],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "app/styles/resources" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      app: fileURLToPath(new URL('./src/app', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
})
