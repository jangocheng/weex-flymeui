/**
 * Created by Suen. on 2017-10-20.
 */
"use strict";

const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const glob = require("glob");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);

console.log('Building..., Please wait a moment.');

const getEntry = dir => {
  const foundScripts = glob.sync(`${dir}/*/index.js`, {});
  // 生成 entry 映射表
  let ret = {};
  foundScripts.forEach(function (scriptPath) {
    if (!/\.entry\.js$/.test(scriptPath)) {
      ret[scriptPath.replace(/^(.*)\.js$/, '$1').replace('packages', 'components')] = './' + scriptPath;
    }
  });
  return ret;
};

const entry = getEntry('packages');

const plugins = [
  new CleanWebpackPlugin(['dist/components'], {
    verbose: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: 'shared-module',
    minChunks: (module, count) => (
      count >= 2
    )
  }),
  new HappyPack({
    id: 'babel',
    verbose: true,
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool
  }),
  new HappyPack({
    id: 'css',
    verbose: true,
    loaders: ['postcss-loader'],
    threadPool: happyThreadPool
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    },
    'global': '{}'
  }),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  })
];

const getBaseConfig = () => ({
  entry,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: `npm/${pkg.name}/[name]`,
    umdNamedDefine: false
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'happypack/loader?id=babel',
      exclude: /node_modules/
    }, {
      test: /\.vue(\?[^?]+)?$/,
      use: []
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 2048,
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: 'happypack/loader?id=sass'
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),
    ...plugins
  ],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {
      'weex-flymeui': path.resolve(__dirname, '')
    }
  }
});

const webCfg = getBaseConfig();
webCfg.output.filename = '[name].web.js';
webCfg.module.rules[1].use.push({
  loader: 'vue-loader',
  options: {
    optimizeSSR: false,
    loaders: {
      js: 'happypack/loader?id=babel'
    },
    compilerModules: [
      {
        postTransformNode: el => {
          el.staticStyle = `$processStyle(${el.staticStyle})`
          el.styleBinding = `$processStyle(${el.styleBinding})`
        }
      }
    ]
  }
});

const nativeCfg = getBaseConfig();
nativeCfg.output.filename = '[name].weex.js';
nativeCfg.module.rules[1].use.push('weex-loader');

const exportConfig = [
  webCfg,
  nativeCfg
];

module.exports = exportConfig;
