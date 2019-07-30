module.exports = {
  extends: [ 'standard' ],
  plugins: [ 'react', 'promise' ],
  parser: 'babel-eslint',
  rules: {
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1
  },
  env: {
    'browser': true
  }
}
