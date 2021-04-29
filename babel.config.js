module.exports = {
  "presets": [
    ["@babel/preset-env"],
    // "@babel/preset-typescript" // 有ts-loader 就无需 
  ],
  "plugins": [["@babel/plugin-transform-runtime", {
    "corejs": 3
  }]]
}
