import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import webpack from "webpack"
import { GenerateSW } from "workbox-webpack-plugin"

module.exports = {
  entry: {
    app: ["./src/store/client/index.js"],
    theme: ["theme"],
  },

  performance: {
    hints: false,
  },

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "theme"),
    filename: "assets/js/[name]-[chunkhash].js",
    chunkFilename: "assets/js/[name]-[chunkhash].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "theme",
          test: "theme",
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve("theme/assets/js/app-*.js"),
        path.resolve("theme/assets/js/theme-*.js"),
        path.resolve("theme/assets/css/bundle-*.css"),
        path.resolve("theme/assets/sw.js"),
        path.resolve("theme/assets/workbox-*.js"),
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/bundle-[contenthash].css",
      chunkFilename: "assets/css/bundle-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "theme/index.html",
      inject: "body",
      filename: "assets/index.html",
    }),
    new GenerateSW({
      swDest: "assets/sw.js",
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: /\/(images|assets|admin-assets)\//,
          handler: "NetworkFirst",
        },
        {
          urlPattern: /\/api\//,
          handler: "NetworkOnly",
        },
        {
          urlPattern: /\/ajax\/payment_form_settings/,
          handler: "NetworkOnly",
        },
        {
          urlPattern: /\//,
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 10,
          },
        },
      ],
    }),
    new webpack.BannerPlugin({
      banner: `Created: ${new Date().toUTCString()}`,
      raw: false,
      entryOnly: false,
    }),
    new webpack.EnvironmentPlugin({
      APP_ENV: "development",
    }),
  ],

  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
}
