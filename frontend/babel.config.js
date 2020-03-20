module.exports = {
  presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }], "@babel/react"],
  plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"],
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/typescript", "@babel/react", "jest"]
    }
  }
};
