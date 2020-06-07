const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [path.join(__dirname, 'src/index.js')],
    mode: "development",
    output: {
        path: path.join(__dirname, '/'),
        filename: 'src/index.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 3000,
        proxy: {
            '/api/*': {
                target: 'https://www.giantbomb.com',
                changeOrigin: true
            }
        },
        overlay: {
            errors: true,
            warnings: true
        }
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.jsx', ".json"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            enforce: "pre",
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "source-map-loader"
        }, {
            test: /\.(css|scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                }
            }]
        }, {
            test: /\.(pdf|jpg|png|svg|ico|gif|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static',
                    publicPath: 'static',
                    limit: 100000,
                }
            }
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: 'styles.css',
        }), new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }), new htmlPlugin({
            title: 'Game Aggregate',
            template: 'index.html',
            filename: 'index.html',
            meta: {
                viewport: "width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no",
                description: "Game Aggregate",
                ['theme-color']: "#303030"
            },
            hash: false,
            inject: true,
            minify: false,
            showErrors: true
        })
    ],
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                sourceMap: true
            })
        ]
    },
    target: 'web',
}
