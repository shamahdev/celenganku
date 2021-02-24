const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: {
    main: './src/scripts/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    // new WebpackBar({
    //   name: 'Client',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public/',
          to: './',
        },
      ],
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      excludeChunks: ['server'],
    }),
    new WebpackPwaManifest({
      name: 'Celenganku',
      short_name: 'Celenganku',
      description: 'Siap menabung untuk masa depan',
      theme_color: '#EB643F',
      background_color: '#EB643F',
      start_url: '/index.html',
      display: 'standalone',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      icons: [
        {
          src: './src/public/images/icon.png',
          sizes: [96, 120, 128, 152, 167, 180, 192, 256, 384, 512, 1024],
          type: 'image/png',
          purpose: 'any maskable',
          destination: path.join('images', 'icons'),
          ios: true,
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: 'sw.js',
    }),
  ],
}
