module.exports = {
    "env": {
        "es6": true,
        "node": true,
        // "es2016": true,
        "mocha": true
    },
    "extends": [
        // Базовый набор правил eslint
        "eslint:recommended",
        // Отключаем правила из базового набора
        "plugin:@typescript-eslint/eslint-recommended",
        // Базовые правила для TypeScript
        "plugin:@typescript-eslint/recommended",
        // Правила TS, требующие инфо о типах
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    // Движок парсинга
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "tsconfigRootDir": ".",
        // "ecmaFeatures": {
        //     "jsx": false
        // },
        // "ecmaVersion": 2018,
        // "sourceType": "module"
    },
    // Плагин с наборами правил для TypeScript
	"plugins": ["@typescript-eslint"],
    "rules": {}
    //     "indent": [
    //         "error",
    //         2
    //     ],
    //     "linebreak-style": [
    //         "error",
    //         "windows"
    //     ],
    //     "quotes": [
    //         "error",
    //         "single"
    //     ],
    //     "semi": [
    //         "error",
    //         "always"
    //     ],
    //     "no-console": "off"
    // }
};