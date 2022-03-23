module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'google', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'require-jsdoc-except'],
    rules: {
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
}
