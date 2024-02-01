// As far as I can tell, we're not using Babel at all. ts-loader does the compilation.
module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", {runtime: 'automatic'}],
    "@babel/preset-typescript",
    "jotai/babel/preset",
  ],
};
