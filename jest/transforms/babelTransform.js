'use strict';

const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  rootMode: 'upward',
});
