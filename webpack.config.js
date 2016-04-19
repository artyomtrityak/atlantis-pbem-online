var webpack = require('webpack'),
  path = require('path');


module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8090',
      './javascript/index.js'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join('./build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/build/'
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  devServer: {
    port: 8090
  },
  devtool: 'source-map' // source maps with debugging, slow
  //devtool: 'eval-source-map'
};
