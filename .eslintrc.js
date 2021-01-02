module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'sort-imports': 2,
    'vue/eqeqeq': 'error'
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ]
}
