module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'vue'],
}