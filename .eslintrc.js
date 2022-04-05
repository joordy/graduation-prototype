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
    plugins: [
        'plugin:tailwindcss/recommended',
        'react',
        'require-jsdoc-except',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'tailwindcss/classnames-order': [
            'warn',
            {
                officialSorting: true,
            },
        ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
}
