const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {  
    historyApiFallback: true,
    
    overlay: true,
    port: 8080,
    
    },
    devtool: 'cheap-source-map',
  module : {
    rules: [
      {
        test: /\.bin$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
             options: {
               encoding: false,
               mimetype: false,
               generator: (content) => {
                 return content;
               }
             },
           },
         ],
      },
      {
        test: /\.jsx?$/, 
        exclude: /(node_modules)/, 
        loader: "babel-loader",
        options:{
            presets:[ "@babel/preset-react"]
        }
    }
    
    ]
  }

};