module.exports = {
  "parser": "@typescript-eslint/parser",
  // The below config enables type-aware linting, but significantly slows down
  // eslint.
  //     https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#configuration
  "parserOptions": {
    "tsconfigRootDir": __dirname,
    "project": ["./tsconfig.json"],
  },
  "plugins": [
    "@typescript-eslint",
    "react-hooks",
  ],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  "rules": {
    "eqeqeq": [
      "error",
    ],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function",
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-ignore": "allow-with-description",
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "error",
    ]
  },
}
