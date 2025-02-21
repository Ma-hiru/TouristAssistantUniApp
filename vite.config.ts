import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import uniTailwind from "@uni-helper/vite-plugin-uni-tailwind";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";

export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log(env);
  return {
    plugins: [uni(), uniTailwind()],
    build: {
      sourcemap: process.env.NODE_ENV === "development",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    envPrefix: "VITE_",
  };
});
