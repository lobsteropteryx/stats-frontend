import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
const __dirname = import.meta.dirname;

const config = {
    entry: './app/App.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/],
                use: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html'
        })
    ],
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: true
                },
            }),
        ],
    }
};

export default config;
