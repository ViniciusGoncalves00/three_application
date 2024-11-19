const path = require('path');

module.exports =
{
    entry: './three_project/src/index.js',
    output:
    {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
    devtool: "inline-source-map",
    mode: "development",
    devServer:
    {
        static:
        {
            directory: path.resolve(__dirname, "static"),
        },
        port: 3000,
        open: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: [path.resolve(__dirname, "**/templates/**/*.html")],
    },
    resolve:
    {
        extensions: ['.ts', '.js'], // Resolve .ts and .js files
    },
    module:
    {
        rules:
        [
            {
                test: /\.ts$/, // Match TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
};