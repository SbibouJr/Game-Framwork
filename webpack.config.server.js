const nodeExternals = require('webpack-node-externals');

const ENTRY_POINT =  "./src-server/index.js";
const PATH_INTPUT_DEV = "./";
const PATH_INTPUT_PROD = "/";
const PATH_OUTPUT_DEV = __dirname +"/dist-dev";
const PATH_OUTPUT_PROD = __dirname +"/dist";
const FILE_NAME = 'server-bundle.js';

module.exports = function(env=false){

  console.log(`
****************************************
          SERVEUR TRANSPILE
            ${env.dev?"***DEV***":"***PROD***"}
****************************************
    `);
  return {
    target: 'node',
    externals: [nodeExternals()],

    entry: [
      ENTRY_POINT
    ],
    output: {
      path: env.dev ? PATH_DEV:PATH_PROD,
      publicPath: env.dev? PATH__INTPUT_DEV:PATH__INTPUT_PROD,
      filename: FILE_NAME
    },
    resolve: {
      extensions: [
        ".js",
        ".json",
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: [
            "babel-loader"
          ],
        },
        {
          test: /\.json$/,
          loaders: [
            "json-loader",
          ],
        }
      ]
    },
    node: {
      fs: "empty",
      net: "empty",
      view: "empty"
    }
  }
  console.log(`
****************************************
          SUCCES SERVEUR TRANSPILE
          PATH : ${env.dev? PATH_OUTPUT_DEV:PATH_OUTPUT_PROD}
****************************************
    `);
};
