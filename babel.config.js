module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.tsx', '.ts', '.js'],
                alias: {
                    '@app/types': './app/types',
                    '@assets': './app/assets',
                    '@components': './app/components',
                    '@data': './app/data',
                    '@navigation': './app/navigation',
                    '@screens': './app/screens',
                    '@utils': './app/utils',
                },
            },
        ],
    ],
};
