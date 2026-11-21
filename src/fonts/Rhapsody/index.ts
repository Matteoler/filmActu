import localFont from 'next/font/local';

export const rhapsody = localFont({
    src: [
        {
            path: './GeistVF.woff',
            weight:  'normal',
            style: 'normal',
        }
    ],
    variable: "--rhapsody",
    fallback: ["serif"],
});
