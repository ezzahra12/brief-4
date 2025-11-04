/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'card-bar': "url('./img/card/bar.png')",
        'card-blue': "url('./img/card/blue.png')",
        'card-body': "url('./img/card/body-img.png')",
        'card-bg': "url('./img/card/card-bg.png')",
        'coin': "url('./img/card/coin.png')",
        'card-header': "url('./img/card/header-img.png')",
        'card-red': "url('./img/card/red.png')",
      }
    },
  },
  plugins: [],
}

