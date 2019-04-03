let path = require('path');
const fs = require('fs');
const root = __dirname;

const src = path.join(root, './src');
const HtmlPlugin = require('html-webpack-plugin');
const dist = path.join(root, 'dist');
const javascript = path.join(dist, 'javascript');

const htmlPluginConfig = new HtmlPlugin({
  template: path.join(src, 'index.html'),
  filename: path.join(dist, 'index.html')
});

function getJSXFiles(filePath) {
  const fileList = fs.readdirSync(filePath);
  const filter = fileList.filter(function(file) {
    return file.endsWith('.jsx');
  });
  const listToAbsolutePath = filter.map(function(fileName) {
    return path.join(filePath, fileName);
  });
  return listToAbsolutePath;
}

function JSXEntries(jsxList) {
  const entries = {};
  jsxList.forEach(function(file) {
    const name = path.basename(file).slice(0, -4);
    entries[name] = file;
  });
  return entries;
}

const mode = process.env.SETUP || "development";
console.log(mode,'>>>>>>>>')
module.exports = {
  stats: {
    assets: true,
    entrypoints: false,
    version: false,
    hash: false,
    modules: false
  },
  mode,
  entry: path.join(src, 'index.jsx'),
  output: {
    path: dist,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@pages': path.join(src, 'pages'),
      '@asset': path.join(src, 'asset'),
      '@images': path.join(src, 'asset/images'),
      '@common': path.join(src, 'pages/common'),
      '@style': path.join(src, 'asset/style'),
      '@script': path.join(src, 'asset/script'),
      '@src': src,
      '@redux': path.join(src, 'redux')
    }
  },
  plugins: [htmlPluginConfig],
  devServer: {
    port: 8000,
    open: true,
    historyApiFallback: true
  },
  devtool: 'source-map'
};
