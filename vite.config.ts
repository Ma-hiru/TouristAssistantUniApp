import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import uniTailwind from "@uni-helper/vite-plugin-uni-tailwind";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), uniTailwind()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
