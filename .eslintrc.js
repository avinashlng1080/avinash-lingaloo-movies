module.exports = {
    root: true,
    extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
    },
};
