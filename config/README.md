Some environment config (e.g. transpiling for running tests in Jest) bootstrapped from
`react-scripts`.

# TODO

* Consider switching from `babel-jest` to `ts-jest`. Simpler? (Edit: Nope... We need
  `babel-jest` anyway for transpiling JS in our dependencies)
* Consider using the documented `__mocks__` method to handle static assets
  (https://jestjs.io/docs/webpack) instead of the `react-scripts` way. Everest-UI uses
  the Jest-documented way.
