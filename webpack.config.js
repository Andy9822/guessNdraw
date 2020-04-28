const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader']
                }
            )
        },
        {
            test: /\.(js|jsx)$/,
            use: 'react-hot-loader/webpack',
            include: /node_modules/
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: "index.html",  //target html
            template: "./public/index.html" //source html
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' }),
        new CopyPlugin([
            { from: 'public', to: 'public', ignore: ['*.html'] },
        ])
    ]
}