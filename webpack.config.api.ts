import path from "path"
import webpack from 'webpack';

module.exports = {
  target: "node",

  entry: {
    api: path.resolve(__dirname, "src/api/server/index.ts"),
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
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
