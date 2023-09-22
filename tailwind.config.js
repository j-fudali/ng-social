/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      flex: {
        "1/2": "0 0 50%",
      },
      backgroundImage: {
        people:
          "linear-gradient(to left, rgb(157, 209, 236, 0.7), rgb(61, 165, 217, 0.7)), url('src/assets/people.jpg')",
        "people-2":
          "linear-gradient(to left, rgb(157, 209, 236, 0.7), rgb(61, 165, 217, 0.7)), url('src/assets/people2.jpg')",
      },
      colors: {
        "green-blue": "#2364AA",
        "picton-blue": "#3DA5D9",
        "baby-blue": "#9DD1EC",
        verdigris: "#73BFB8",
        "mikado-yellow": "#FEC601",
      },
    },
  },
  plugins: [],
};
