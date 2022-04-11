module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            display: ['Inter', 'system-ui', 'sans-serif'],
            body: ['Inter', 'system-ui', 'sans-serif'],
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1536px',
        },
        colors: {
            white: '#ffffff',
            grey: {
                50: '#f8f6f6',
                100: '#C7C9CB',
                200: '#B9BBBF',
                300: '#A9ACB1',
                400: '#9A9EA4',
                500: '#8D9198',
                600: '#7E838B',
                700: '#6F747E',
                800: '#606671',
                900: '#515864',
            },
            hotpink: '#F51D85',
        },
        extend: {},
    },
    plugins: [],
}
