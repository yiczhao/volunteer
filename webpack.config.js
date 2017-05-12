/**
 * webpack 配置
 */

var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var _package = require('./package.json')

console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        app: __dirname + '/dev/js/app.js',
        vuecore: __dirname + '/dev/js/vuecore.js'
    },
    output: {
        path:__dirname+'/dist',
        filename:'[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/dist/'
    },
    module: {
        preLoaders: [
            // {test: /\.vue$/, loader: "eslint", exclude: /node_modules/},
            // {test: /\.js$/, loader: "eslint", exclude: /node_modules/}
        ],
        loaders: [
            {   test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass-loader')},
            {   test: /\.(tpl|html)$/,
                loader: 'html'}, 
            {   test: /\.vue$/,
                loader: 'vue',}, 
            {   test: /\.js$/,
                exclude: /(.\.min\.js)|node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'},

            // {test: /\.(js|tag)$/, exclude: /node_modules/, loader: 'babel-loader'},
            {   test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    eslint: {
        configFile: __dirname+'/.eslintrc',
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new CleanWebpackPlugin(['dist','index.html'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            favicon:'./dev/img/title.png', //favicon路径
            filename:__dirname+'/index.html',    //生成的html存放路径，相对于 path
            template:'./dev/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            showErrors:true,    //显示错误信息到html
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'APP_ENV': JSON.stringify(process.env.NODE_ENV),
            'APP_VERSION':JSON.stringify(_package.version)
        }),
        new webpack.ProvidePlugin({
            'Vue':'vue',
            'VueResource':'vue-resource',
            _: 'lodash',
            swal: 'sweetalert',
            'window._':'lodash',
            echarts:'echarts'
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name:'vuecore',
          filename:'vuecore.js'
        })
    ],
    resolve: {
        // extensions: ['', '.js', '.vue'],
        alias: {
            scss: path.join(__dirname, './dev/sass/app.scss')
        }
    },
    vue: {
        loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            html: 'vue-html-loader!ks-autobem-loader?type=html'
        }
    },
    devtool: process.env.NODE_ENV != 'pro' && 'source-map'
}