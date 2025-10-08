const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = function override(config) {
  // 🔹 Disable problematic CSS minifier plugin
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer = config.optimization.minimizer.filter(
      plugin => !(plugin instanceof CssMinimizerPlugin)
    );
  }
  console.log('⚙️  Disabled CSS minification to fix Unexpected "/" issue.');
  return config;
};
