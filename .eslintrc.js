module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'sort-imports': 2,
    'vue/eqeqeq': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
