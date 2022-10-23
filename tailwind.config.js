/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./frontend/**/*.vue", "./frontend/**/*.js", "./frontend/**/*.ts"],
    purge: ["./frontend/**/*.vue", "./frontend/**/*.js", "./frontend/**/*.ts"],
    theme: {
        extend: {},
    },
    plugins: [],
}
