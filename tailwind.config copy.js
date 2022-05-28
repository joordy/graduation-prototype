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
            transparent: 'transparent',
            green: 'green',
            red: 'red',
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
            black: {
                100: 'hsla(345, 6%, 13%, 1)',
                90: 'hsla(345, 6%, 13%, 0.9)',
                80: 'hsla(345, 6%, 13%, 0.8)',
                70: 'hsla(345, 6%, 13%, 0.7)',
                60: 'hsla(345, 6%, 13%, 0.6)',
                50: 'hsla(345, 6%, 13%, 0.5)',
                40: 'hsla(345, 6%, 13%, 0.4)',
                30: 'hsla(345, 6%, 13%, 0.3)',
                20: 'hsla(345, 6%, 13%, 0.2)',
                10: 'hsla(345, 6%, 13%, 0.1)',
            },
            beige: {
                100: 'hsla(31, 51%, 71%, 1)',
                90: 'hsla(31, 51%, 71%, 0.9)',
                80: 'hsla(31, 51%, 71%, 0.8)',
                70: 'hsla(31, 51%, 71%, 0.7)',
                60: 'hsla(31, 51%, 71%, 0.6)',
                50: 'hsla(31, 51%, 71%, 0.5)',
                40: 'hsla(31, 51%, 71%, 0.4)',
                30: 'hsla(31, 51%, 71%, 0.3)',
                20: 'hsla(31, 51%, 71%, 0.2)',
                10: 'hsla(31, 51%, 71%, 0.1)',
            },
            white: {
                100: 'hsla(45, 32, 93, 1)',
                90: 'hsla(45, 32, 93, 0.9)',
                80: 'hsla(45, 32, 93, 0.8)',
                70: 'hsla(45, 32, 93, 0.7)',
                60: 'hsla(45, 32, 93, 0.6)',
                50: 'hsla(45, 32, 93, 0.5)',
                40: 'hsla(45, 32, 93, 0.4)',
                30: 'hsla(45, 32, 93, 0.3)',
                20: 'hsla(45, 32, 93, 0.2)',
                10: 'hsla(45, 32, 93, 0.1)',
            },
            blue: {
                100: 'hsla(241, 37%, 56%, 1)',
                90: 'hsla(241, 37%, 56%, 0.9)',
                80: 'hsla(241, 37%, 56%, 0.8)',
                70: 'hsla(241, 37%, 56%, 0.7)',
                60: 'hsla(241, 37%, 56%, 0.6)',
                50: 'hsla(241, 37%, 56%, 0.5)',
                40: 'hsla(241, 37%, 56%, 0.4)',
                30: 'hsla(241, 37%, 56%, 0.3)',
                20: 'hsla(241, 37%, 56%, 0.2)',
                10: 'hsla(241, 37%, 56%, 0.1)',
            },
            yellow: {
                100: 'hsla(45, 86%, 62%, 1)',
                90: 'hsla(45, 86%, 62%, 0.9)',
                80: 'hsla(45, 86%, 62%, 0.8)',
                70: 'hsla(45, 86%, 62%, 0.7)',
                60: 'hsla(45, 86%, 62%, 0.6)',
                50: 'hsla(45, 86%, 62%, 0.5)',
                40: 'hsla(45, 86%, 62%, 0.4)',
                30: 'hsla(45, 86%, 62%, 0.3)',
                20: 'hsla(45, 86%, 62%, 0.2)',
                10: 'hsla(45, 86%, 62%, 0.1)',
            },
            brown: {
                100: 'hsla(11, 39%, 55%, 1)',
                90: 'hsla(45, 32%, 93%, 0.9)',
                80: 'hsla(45, 32%, 93%, 0.8)',
                70: 'hsla(45, 32%, 93%, 0.7)',
                60: 'hsla(45, 32%, 93%, 0.6)',
                50: 'hsla(45, 32%, 93%, 0.5)',
                40: 'hsla(45, 32%, 93%, 0.4)',
                30: 'hsla(45, 32%, 93%, 0.3)',
                20: 'hsla(45, 32%, 93%, 0.2)',
                10: 'hsla(45, 32%, 93%, 0.1)',
            },
            hotpink: '#F51D85',
        },
        extend: {},
    },
    plugins: [],
}
