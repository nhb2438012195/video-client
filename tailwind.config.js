/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  plugins: [],
    theme: {
    extend: {
      screens: {
        // 覆盖默认断点
        'sm': '600px',      // 原来是 640px
        'md': '768px',
        'lg': '1200px',     // 原来是 1024px
        'xl': '1400px',

        // 添加自定义断点
        '2xl': '1600px',
        '3xl': '1920px',

        // 或者语义化命名
        'mobile': '480px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1600px',
      },
      zIndex: {
        '100': '100',
        '999': '999',
        'max': '2147483647' // 最大安全整数
      }
    },
  },
}

