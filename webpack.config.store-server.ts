import path from "path"
import webpack from 'webpack';

module.exports = {
  target: "node",

  entry: {
    'store-server': path.resolve(__dirname, "src/store/server/index.js"),
  },

  performance: {
    hints: false,
  },

  output: {
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/admin/client"),
      routes: path.resolve(__dirname, "src/admin/client/routes"),
      modules: path.resolve(__dirname, "src/admin/client/modules"),
      lib: path.resolve(__dirname, "src/admin/client/lib"),
    },
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s?css$/,
        use: "null-loader",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
