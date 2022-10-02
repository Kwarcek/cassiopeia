/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./frontend/**/*.vue",
        "./frontend/**/*.js",
    ],
    purge: [
        "./frontend/**/*.vue",
        "./frontend/**/*.js",
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}
