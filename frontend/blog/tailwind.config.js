const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({addBase, theme}) {
      addBase({
        'h1': {fontSize: theme('fontSize.3xl')},
        'h2': {fontSize: theme('fontSize.2xl')},
        'h3': {fontSize: theme('fontSize.xl')},
        'h4': {fontSize: theme('fontSize.lg')},
      })
    })
  ],
}
