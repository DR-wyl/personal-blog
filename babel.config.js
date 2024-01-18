module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 解决私有方法无法使用问题
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-class-properties", {
      "loose": true
    }],
    ["@babel/plugin-transform-private-property-in-object", {
      "loose": true
    }]
    // 解决私有方法无法使用问题
  ]
}
