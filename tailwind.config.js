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
            mobile: '375px',
            tablet: '768px',
            desktop: '1248px',
            desktopXXL: '1440px',
        },
        // colors: {
        //     white: '#ffffff',
        //     offWhite: '#FEFDFF',
        //     flashWhite: '#F0F0F8',
        //     brightGray: '#E5E5EF',
        //     raisinBlack: '#231F20',
        //     violetBlue: '#6664B8',
        //     deepChampagne: '#F8D0A0',
        //     transparent: 'transparent',
        // },
        boxShadow: {
            sm: '0px 2px 4px 0px rgba(11, 10, 55, 0.15)',
            lg: '0px 8px 20px 0px rgba(18, 16, 99, 0.06)',
        },
        extend: {},
    },
    plugins: [],
}
