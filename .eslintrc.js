module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'jsx-a11y/click-events-have-key-events': 0,
    'react/require-default-props': 1,
    'no-underscore-dangle': ['error', { allow: ['_id'] }], // for mongoDB,
  },
};
