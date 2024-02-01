//import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig,  presetWind, presetIcons } from "unocss"; //presetIcons, presetWebFonts,
export default defineConfig({
  cli: {
    entry: {
      patterns: ["src/**/*.{ts,tsx}"],
      outFile: "public/dist/unocss.css",
    },
  },
  presets: [presetWind(), presetIcons()],
  shortcuts:{
    'progressbar':`h-6 mb-6 overflow-hidden bg-gray-100 rounded-md shadow-inner`,
    'nt-c-0': `h-full  flex items-center  px-2`,
    'nt-c': `border-l-stone-700 border-l-1 h-full  flex items-center  px-2`,
    'nt-c-main': `border-l-stone-700 border-l-1 h-full  flex items-center  px-2 relative font-medium `,
    'nt-c-last': `border-l-stone-700 border-l-1 h-full  flex items-center  px-2 flex-1`,

  }
  //transformers: [transformerVariantGroup()],
});