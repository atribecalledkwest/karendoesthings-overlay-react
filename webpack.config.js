const globby = require("globby");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const baseConfig = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheat-source-map",
    resolve: {
        extensions: [ '.js', '.jsx' ]
    }
};

const makeConfig = (name) => {
    let entry = {};
    const files = globby.sync(`./src/${name}/*/*.jsx`);
    if(files.length === 0) {
        return false;
    }
    for(const file of files) {
        entry[path.basename(file, ".jsx")] = file;
    }

    return {
        ...baseConfig,
        name,
        entry,
        output: {
            path: path.resolve(__dirname, name),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.s?css$/,
                    exclude: /node_modules/,
                    loaders: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            ...Object.keys(entry).map((entryName) => {
                return new HTMLWebpackPlugin({
                    filename: `${entryName}.html`,
                    chunks: [entryName],
                    title: entryName,
                    template: `./src/${name}/${entryName}/${entryName}.html`
                })
            })
        ]
    };
};

let e = [];
const places = ["graphics", "dashboard"];
for(const place of places) {
    let conf = makeConfig(place);
    if(!conf) continue;
    e.push(conf);
}

module.exports = e;
