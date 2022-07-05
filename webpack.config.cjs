const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const devConfig = {
    plugins: [
        new webpack.EnvironmentPlugin({
            APPLICATION_ENVIRONMENT: 'development'
        }),

    ],

    devtool: 'cheap-module-source-map',

    devServer : {
        proxy: {
            "/apps/orders/api": {
                target: "http://localhost:3000",
                pathRewrite: { '^/apps/orders/api': '' },
            }
        }
    },
};

const prodConfig = {
    plugins: [
        new webpack.EnvironmentPlugin({
            APPLICATION_ENVIRONMENT: 'production'
        })
    ]
};

const config = {
    entry: {
      "order-data": ['./src/index.ts'],
      "order-history": ['./src/profile.ts']
    },
    output: {
        filename: '[name].bundle.js',
        path: process.env.WEBPACK_OUTPUT_PATH || path.resolve(__dirname, 'dist'),
        // for Cesium
        sourcePrefix: '',
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx'],
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/i,
                use : [
                    {
                        loader : "style-loader",
                    },
                    {
                        loader : "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader : "less-loader",
                        options : {
                            sourceMap: true,
                        },
                    },
                ],
            },
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              type: 'asset/inline'
            },
            { test: /\.jsx?$/, enforce: 'pre', loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Order Data Interface',
            chunks: ['order-data'],
            inject: 'body',
            template: './public/order-data.html',
            filename: 'order-data.html',
            appMountId: 'order-data',
            links,
            scripts
        }),
        new HtmlWebpackPlugin({
            title: 'Order History Interface',
            chunks: ['order-history'],
            inject: 'body',
            template: './public/order-history.html',
            filename: 'order-history.html',
            appMountId: 'order-history',
            links,
            scripts
        }),
        new webpack.EnvironmentPlugin({
            VERSION: JSON.stringify(require("./package.json").version),
        }),
        new WriteFilePlugin(),
    ]
};

module.exports = (env, argv) => {
    let mergedConfig = {};

    if (argv.mode !== 'production') {
        mergedConfig = merge(devConfig, config);
    }
    else {
        mergedConfig = merge(prodConfig, config);
    }

    return mergedConfig;
};
