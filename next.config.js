const withTM = require('next-transpile-modules')([
    'react-pdf',
    'pdfjs-dist',
]);

module.exports = withTM({
    webpack: (config) => {
        config.module.rules.push({
            test: /pdf\.worker\.(min\.)?js/,
            use: 'file-loader',
        });

        return config;
    },
});
