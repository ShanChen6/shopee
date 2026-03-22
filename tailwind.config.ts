import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Chỉ định các file mà Tailwind sẽ quét để tối ưu hóa CSS (Tree-shaking)
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shoppe: {
          orange: "#ee4d2d",      
          lightOrange: "#ff5722", 
          bgGray: "#f5f5f5",      
          border: "rgba(0,0,0,.09)", 
        },
      },
      boxShadow: {
        'shoppe': '0 1px 1px 0 rgba(0,0,0,.05)',
      }
    },
  },
  plugins: [],
};

export default config;