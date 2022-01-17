import { defineConfig } from 'umi';
import px2vw from 'postcss-px-to-viewport';
import routes from './routes';

export default defineConfig({
  hash: true,
  // history: {
  //   type: 'hash',
  // },
  publicPath: './', // 如果域名存在后缀，则使用相对路径
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // }, // 通过cdn加载react，减少包大小
  // scripts: [
  //    // 引入jssdk
  //   'https://unpkg.com/react@16.12.0/umd/react.production.min.js',
  //   'https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js',
  // ],
  cssLoader: {
    localsConvention: 'camelCase',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  extraPostCSSPlugins: [
    px2vw({
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['am-', 'adm-', 'art-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    }),
  ],
  title: false,
  antd: { mobile: false },
  plugins: [
    // 'umi-plugin-cache-route',
  ],
  routes: routes,
  fastRefresh: {},
  targets: {
    //配置浏览器最低版本,比如兼容ie11
    ie: 11,
  },
});
