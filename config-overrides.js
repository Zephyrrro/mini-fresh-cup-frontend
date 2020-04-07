const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  overrideDevServer,
} = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

const addProxy = () => config => {
  config.proxy = {
    '/api': {
      target: 'http://47.106.250.72:8889',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  };
  return config;
};

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
    }),
    addWebpackAlias({
      '@': resolve('src'),
    })
  ),
  devServer: overrideDevServer(addProxy()),
};
