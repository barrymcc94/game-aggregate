const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [path.join(__dirname, 'src/index.js')],
    mode: 'production',
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[id][contenthash].js',
        chunkFilename: '[id][contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(pdf|jpg|png|svg|ico|gif|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: '[id][contenthash].css',
        }),
        new htmlPlugin({
            title: 'Game Aggregate',
            template: 'index.html',
            filename: 'index.html',
            meta: {
                viewport:
                    'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no',
                description: 'Game Aggregate',
                ['theme-color']: '#303030',
            },
            hash: true,
            inject: true,
            minify: true,
            showErrors: false,
        }),
        new workboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    optimization: {
        minimize: true,
    },
    target: 'web',
};
