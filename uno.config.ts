import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
  ],
  shortcuts: [
    ['h2', 'text-left my-2 font-bold text-2xl'],
  ],
})
