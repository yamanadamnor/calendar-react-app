const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      "@primary-color": "#9F72E8",
      "@secondary-color": "#978AFF",
    }
  })
);
