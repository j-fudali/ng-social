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
          "linear-gradient(to left, rgb(204, 213, 174, 0.7), rgb(212, 163, 115, 0.7)), url('src/assets/people.jpg')",
        "people-2":
          "linear-gradient(to left, rgb(204, 213, 174, 0.7), rgb(212, 163, 115, 0.7)), url('src/assets/people2.jpg')",
      },
      colors: {
        "tea-green": "#CCD5AE",
        beige: "#E9EDC9",
        cornsilk: "#FEFAE0",
        "papaya-whip": "#FAEDCD",
        buff: "#D4A373",
      },
    },
  },
  plugins: [],
};
