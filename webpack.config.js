const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Cambia esto según tu punto de entrada
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Inserta CSS en el DOM
          "css-loader",   // Traduce CSS a CommonJS
          "sass-loader",  // Compila SCSS a CSS
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: "./dist",
  },
};
