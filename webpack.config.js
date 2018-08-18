const path = require('path');

module.exports = {
    entry: './src/SimpleMonads.js',
    output: {
        path: path.resolve('.'),
        filename: 'lib/simple-monads.js',
        libraryTarget: "umd",
        library: "SimpleMonads",
        globalObject: "this"
    },
    // node: {
    //     global: false
    // },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                     options: {
                         presets: ["env"]
                     }
                }]
            }
        ]
    },
//    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
//        "jquery": "jQuery"
//    }
};
