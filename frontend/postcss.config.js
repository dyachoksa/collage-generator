const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.tsx"],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

const cssnano = require("cssnano")({
  preset: "default"
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env"),
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
  ]
};
