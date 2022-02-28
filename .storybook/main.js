const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async config => {
    config.resolve.alias['@styles'] = path.resolve(__dirname, '../src/styles');
    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
