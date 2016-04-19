var webpack             = require('webpack'),
    ExtractTextPlugin   = require("extract-text-webpack-plugin"),
    pcssVars            = require('postcss-simple-vars'),
    pcssAutoprefixer    = require('autoprefixer'),
    pcssImport          = require('postcss-import'),
    pcssNested          = require('postcss-nested'),
    pcssFlexbugs        = require('postcss-flexbugs-fixes'),
    pcssAlpha           = require('postcss-color-alpha'),
    pcssVrhythm         = require('postcss-vertical-rhythm'),
    pcssNano            = require('cssnano'),
    variables           = require("./app/configs/variables");

module.exports = {
    entry : {
        app : __dirname + '/app/bootstrap'
    },

    output : {
        path : __dirname + '/public/build',
        filename : '[name].js',
        publicPath : '/build/'
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname + '/app'
            }, {
                test: /\.pcss|\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=0!postcss-loader')
            }
        ]
    },

    postcss: function () {
        return [
            pcssAutoprefixer({browsers: ['last 2 version']}),
            pcssImport,
            pcssNested,
            pcssFlexbugs,
            pcssAlpha,
            pcssVars({variables: variables}),
            pcssVrhythm,
            pcssNano({
                convertValues : false,
                mergeIdents : false,
                reduceIdents : false,
                zindex : false
            })
        ];
    },

    resolve : {
        alias : {
            core        : __dirname + '/app/core',
            configs     : __dirname + '/app/configs',
            component   : __dirname + '/app/components',
            page        : __dirname + '/app/pages'
        },

        extensions : [
            '',
            '.js',
            '.jsx',
            '.json',
            '.min.js'
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'commons',
            filename : 'commons.js',
            chunks: ['app', 'prototype-buttons']
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('[name].css')
    ]
};