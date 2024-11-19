const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/prefer-type-over-interface");

const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
});

ruleTester.run("prefer-type-over-interface", rule, {
    valid: [
        {
            code: "type MyType = { field: string; };",
            filename: "test.ts",
        },
    ],
    invalid: [
        {
            code: "interface MyInterface { field: string; }",
            filename: "test.ts",
            errors: [{ message: "Interface 'MyInterface' can be replaced by a type." }],
            output: "type MyInterface = { field: string; };",
        },
        {
            code: "interface MyInterface extends Parent { field: string; }",
            filename: "test.ts",
            errors: [{ message: "Interface 'MyInterface' can be replaced by a type." }],
            output: "type MyInterface = Parent & { field: string; };",
        },
    ],
});
