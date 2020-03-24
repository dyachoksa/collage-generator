module.exports = {
  theme: {
    extend: {
      fontFamily: {
        body: "Inter, Roboto, sans-serif"
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem"
      }
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")]
};
