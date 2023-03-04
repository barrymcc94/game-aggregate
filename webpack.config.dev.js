const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [path.join(__dirname, 'src/index.js')],
    mode: 'development',
    output: {
        path: path.join(__dirname, '/'),
        filename: 'src/index.js',
        publicPath: '/',
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        hot: true,
        port: 3000,
        proxy: {
            '/app/myapp/*': {
                target: 'https://www.giantbomb.com',
                changeOrigin: true,
            },
            '/api/*': {
                target: 'https://www.giantbomb.com',
                changeOrigin: true,
            },
        },
        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
            progress: true,
        },
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc',
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(pdf|jpg|png|svg|ico|gif|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development'),
        }),
        new Dotenv({systemvars: true}),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: 'styles.css',
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
            hash: false,
            inject: true,
            minify: false,
            showErrors: true,
        }),
    ],
    optimization: {
        minimize: false,
    },
    target: 'web',
};
