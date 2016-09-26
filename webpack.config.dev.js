var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path')

module.exports = {
  debug:true,
  devtool: 'cheap-module-eval-source-map',
  noInfo:false, //setting this to false means webpack will display list of all the files that it is bundling

  entry: {
    app: [
      'eventsource-polyfill',    //for hot reloading with IE
      'webpack-hot-middleware/client?reload=true',   //reloads the page if hot reloading page reload fails
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',  //application entry point:always add it last, order matters
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  target:'web', //means we are building up an app that browser can understnd,other value could be node

  output: {     //tells webpack where to create the web bundle:webpack doesn't actually create physical file. physical files are created only by npm run build command does. It only serves files from the memory. It also means that the files in production would be served from dist folder
    path: __dirname + '/client/',
    filename: 'bundle.js',
    publicPath: 'http://0.0.0.0:8000/',
    //publicPath: 'http://localhost:8000/',

    //publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {   //tell webpack the types of files we want it to handle
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,     //handle js files and while doing that also use babel to transpile our code
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
      // ,{
      //   test: /\.scss$/,
      //   loaders: ["style", "css", "sass"]
      // },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' +
        'includePaths[]=' +
        (encodeURIComponent(
          path.resolve(process.cwd(), './node_modules')
        )) +
        '&includePaths[]=' +
        (encodeURIComponent(
            path.resolve( process.cwd(),
              './node_modules/grommet/node_modules'))
        )
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),   //enables to replace modules without a full browser refresh
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
