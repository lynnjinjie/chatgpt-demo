import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  shortcuts: [
    ['h2', 'text-left my-2 font-bold text-2xl'],
  ],
})
