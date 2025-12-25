import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                maroon: {
                    50: '#fdf2f2',
                    100: '#fce8e8',
                    200: '#fbd5d5',
                    300: '#f8b4b4',
                    400: '#f18282',
                    500: '#e53e3e',
                    600: '#c53030',
                    700: '#9b2c2c',
                    800: '#822727',
                    900: '#63171b',
                },
                gold: {
                    300: '#f6e05e',
                    400: '#ecc94b',
                    500: '#d69e2e',
                    600: '#b7791f',
                }
            }
        },
    },

    plugins: [forms],
};
