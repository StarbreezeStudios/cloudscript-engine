const path = require("path");

module.exports = {
    mode: "none",
    entry: "./dev/webpack.js",
    output: {
        path: path.resolve("./tmp"),
        filename: "webpack.js"
    },
    optimization: {
        namedModules: true
    }
};
