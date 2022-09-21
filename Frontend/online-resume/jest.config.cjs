module.exports = {
    preset: 'ts-jest',
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                isolatedModules: true
            }
        ]
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "^@/([^assets].*)$": "<rootDir>/src/$1",
        "\\.(scss|sass|css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy"
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFiles: ["./setupTests.ts"]
};
