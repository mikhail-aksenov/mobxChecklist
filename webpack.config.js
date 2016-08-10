var path = require('path');
var assign = require('object-assign');
var webpack = require('webpack');

var webpackDefaultOpts = {  
  entry: {
    bundle: './src/index.tsx',
    vendor: [
      'react', 'react-dom',
      'mobx', 'mobx-react', 'lodash'
    ]
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: '.',
    filename: 'bundle.chunk.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader?configFileName=tsconfig.json' },
      // { test: /\.less$/, loader: ExtractTextPlugin.extract('style!css!less') }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
};

var webpackDevOpts = assign({}, webpackDefaultOpts, {
  watch: true,
  devtool: 'source-map',
  plugins: webpackDefaultOpts.plugins.concat([
    new webpack.DefinePlugin({DEBUG: true}),
  ])
});

var webpackProdOpts = assign({}, webpackDefaultOpts, {
  plugins: webpackDefaultOpts.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({DEBUG: false}),
  ])
});

module.exports = {
    webpackDevOpts: webpackDevOpts,
    webpackProdOpts: webpackProdOpts
};
