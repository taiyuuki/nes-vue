module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-rational-order',
  ],
  rules: {
    'selector-class-pattern': '.*',
    'max-line-length': [120, { ignorePattern: /content/ }],
  },
}