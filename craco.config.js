const CracoAntDesignPlugin = require('craco-antd');
const path = require("path");

module.exports = {
  // module: {
  //   rules: [{
  //     test: /\.less$/,
  //     use: [{
  //       loader: 'style-loader'
  //     }, {
  //       loader: 'css-loader'
  //     }, {
  //       loader: 'less-loader'
  //     }]
  //   }]
  // },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
        options: {
          customizeThemeLessPath: path.join(
            __dirname,
            "src/customTheme.less"
          )
        }
      }
  ]
};