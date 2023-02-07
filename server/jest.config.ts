export default {
    preset: 'ts-jest',
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "ts-jest": ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};