module.exports = {
    entry: 'src/SimpleMonad.js',
    output: {
        filename: 'lib/simple-monads.js',
        libraryTarget: "umd",
        library: "simpleMonads"
    },
//    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
//        "jquery": "jQuery"
//    }
}