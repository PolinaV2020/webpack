const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// const isDev = process.env.NODE_ENV === "development";
// console.log("isDev", isDev);

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
    analytics: "./analytics.js"
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    // Если несколько файлов имеют одно и то же имя, но разные расширения,
    //  webpack разрешит файл с расширением, указанным первым в массиве,
    //  и пропустит остальные.
    //  Позволяет пользователям не указывать расширение при импорте.
    extensions: [".js", ".json"],
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all" // Разделение bundles на 2 файла: с кодом разработчика и со сторонним кодом (кодом jquery, например)
    }
  },
  devServer: {
    port: 3000
  },
  plugins: [
    // Plugin для автозамены bundles при внесении изменений в файлах
    new HTMLWebpackPlugin({
      template: "./index.html"
    }),
    // Plugin для очистки папки dist от неактуальных bundles
    new CleanWebpackPlugin(),
    // Plugin для лопирования отдельных файлов или целых каталогов, которые уже существуют, в каталог сборки
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/hamburger.ico.png"),
          to: path.resolve(__dirname, "dist")
        }
      ]
    })
  ],
  module: {
    // Loaders позволяют делать импорты файлов форматов не JS и JSON
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"]
      },
      // Для картинок и шрифтов вместо loaders прописывается type
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource"
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource"
      }
    ]
  }
};
