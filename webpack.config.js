// webpack.config.js
import path from "node:path"; // get path object with functions
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/entryPoint.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(import.meta.dirname, "dist"), // return directory path of dist as a string
    clean: true, // clean outdated dist files
  },
  devtool: "eval-source-map", // otherwise the lines/files wont match up
  devServer: {
    watchFiles: ["./src/template.html"], // watch template in src
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // search for src template file, then link the dist html with main.js
    }),
  ],
  module: {
    // for imports
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
