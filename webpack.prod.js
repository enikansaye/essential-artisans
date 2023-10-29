const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  // Add other webpack configurations here as needed.
  // For example, entry points, output paths, loaders, and plugins.

  plugins: [
    new CompressionPlugin({
      test: `/\.(js|css)$`, // Compress JavaScript and CSS files
      threshold: 8192,     // Files larger than 8KB will be compressed
    }),

    // Optionally, add a BundleAnalyzerPlugin for bundle analysis
    new BundleAnalyzerPlugin(),
  ],

  // Other Webpack module and optimization settings.
};
