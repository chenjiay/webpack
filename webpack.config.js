const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output : {
       
        filename :'bundle.js',
        path:path.join(__dirname,'dist'),
        // path:__dirname
        // publicPath:'http://localhost:8080/dist/'
    },

    module:{
        rules : [
            // {test : /\.js$/, use : 'babel-loader'},
            {test : /\.js$/,
             exclude : /(node-modules|bower_components)/,
             use : {
                 loader : 'babel-loader',
                 options : {
                     presets : ['@babel/preset-env']
                 }
             }},
            // { test : /\.css$/,  use : ['style-loader','css-loader'] },
            {test : /\.css$/, 
                use : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use : ['css-loader','postcss-loader']
            }) },
            {test : /\.(png|jpg|gif|jpeg|svg)$/,
             use : [{
                 loader : 'url-loader',
                 options : {
                     limit : 500,//小于500B的文件打成Base64格式，写入JS
                     outputPath : 'images/'
//                      这里配置的时候只引用了url-loader，这是因为，url-loader封装了file-loader
// 　                 　url-loader工作分两种情况：
// 　　　　                        1.文件大小小于limit参数，url-loader将会把文件转为DataURL（Base64格式）；
// 　　　　                        2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。
 
// 　　                  也就是说，其实我们只安装一个url-loader就可以了。但是为了以后的操作方便，所以顺便安装上file-loader。
//                       html中通过img引入图片
                 }
             }]},
            {test : /\.(htm|html)$/i,use : ['html-withimg-loader']},
            // {test : /\.less$/, use : ['style-loader','css-loader','less-loader']}
            { test : /\.less$/,
              use : ExtractTextPlugin.extract({
                  fallback : 'style-loader',
                  use : ['css-loader','less-loader']
              })
             
            }
           
        ]
        

    },

    devServer : {
        contentBase : path.join(__dirname,'dist'),
        host : 'localhost',//服务器的ip地址，也可以使用localhost
        compress : true,//服务端压缩是否开启
        port :8080//配置服务端端口号
    },

    plugins :[
        new CleanWebpackPlugin('dist',{}),
        new HtmlWebpackPlugin({
            filename :'index.html',
            template : './index.html',
            // chunks : ['index'],多入口文件时可以用到
            hash : true//插入的文件后面加一段随机数
        }),
        new ExtractTextPlugin({
            filename : 'index.css',
        })
        


        

    ]


}