module.exports = {
    purge: [
        './src/components/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/pages/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                192: '35rem',
            },
        },
    },
    variants: {},
    plugins: [],
    corePlugins: {
        fontFamily: false,
    },
};
