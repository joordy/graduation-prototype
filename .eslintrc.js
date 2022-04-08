module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'google',
        'prettier',
        'plugin:prettier/recommended',
    ],
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
        'tailwindcss/classnames-order': [
            'warn',
            {
                officialSorting: true,
            },
        ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
}
