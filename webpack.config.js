const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all" // Разделение bundles на 2 файла: с кодом разработчика и со сторонним кодом (кодом jquery, например)
    }
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]; // Минифицирует файлы CSS в проде
  }

  return config;
};

const cssLoaders = (addition) => {
  const config = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    "css-loader"
  ];

  if (addition) {
    config.push(addition);
  }
  return config;
};

const babelOptions = (addition) => {
  const options = {
    presets: ["@babel/preset-env"]
  };

  if (addition) {
    options.presets.push(addition);
  }
  return options;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./index.jsx"],
    analytics: "./analytics.js",
    typescript: "./typescript.ts"
  },
  output: {
    filename: filename("js"),
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
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: false,
    open: true // Сообщает dev-серверу открыть браузер после запуска сервера. Установите значение true, чтобы открыть браузер по умолчанию.
  },
  devtool: isDev ? "source-map" : false,
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
    }),
    new MiniCssExtractPlugin({
      filename: filename("css")
    }) // Извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS, который содержит CSS.
  ],
  module: {
    // Loaders позволяют делать импорты файлов форматов не JS и JSON
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader")
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader")
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript")
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react")
        }
      }
    ]
  }
};
