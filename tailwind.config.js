/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter_400Regular'],
                inter: ['Inter_400Regular'],
                'inter-bold': ['Inter_700Bold'],
                arabic: ['ScheherazadeNew_400Regular'],
                'arabic-bold': ['ScheherazadeNew_700Bold'],
                poppins: ['Poppins_400Regular'],
                'poppins-medium': ['Poppins_500Medium'],
                'poppins-semibold': ['Poppins_600SemiBold'],
                'poppins-bold': ['Poppins_700Bold'],
            },
        },
    },
    plugins: [],
};
