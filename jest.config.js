module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/*.{js,jsx}',
        '!<rootDir>/node_modules/',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};
