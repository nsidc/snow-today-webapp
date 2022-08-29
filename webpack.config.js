// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';


const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
  },
  devtool: isProduction ? false : 'eval-source-map',
  devServer: isProduction ? {} : {
    open: true,
    // Enable "external" access (i.e. from outside Docker container)
    host: '0.0.0.0',
    // Resolve "Invalid Host header" error when running dev server in Docker
    allowedHosts: 'all',
    // Enable hot reloading over websocket port through Docker port map:
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.DefinePlugin({
      '__ENVIRONMENT__': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // Simplify deployment by turning off JS chunking. Critical for delivering
    // the app over a CDN.
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  stats: {
    errorDetails: true,
  },
};

module.exports = () => {
    if (isProduction) {
      config.mode = 'production';
      config.plugins.push(new MiniCssExtractPlugin());
    } else {
      config.mode = 'development';
    }
    return config;
};
