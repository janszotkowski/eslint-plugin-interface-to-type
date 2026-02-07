const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/prefer-type-over-interface");
const parser = require("@typescript-eslint/parser");

// Mock context pro simulaci starších verzí ESLintu (před v9)
const mockContextV8 = {
    getSourceCode: () => ({
        getText: (node) => {
            if (!node) return "mock source code";
            if (node.type === "TSTypeParameterDeclaration") return "<T>";
            if (node.type === "TSInterfaceBody") return "{ prop: string }";
            if (node.name === "Parent") return "Parent";
            return "getText result";
        }
    }),
    report: () => {}
};

// Mock context pro ESLint v9/v10
const mockContextV10 = {
    sourceCode: {
        getText: (node) => {
            if (!node) return "mock source code";
            return "getText result";
        }
    },
    report: () => {}
};

describe("Kompatibilita verzí ESLint", () => {
    it("mělo by fungovat s context.getSourceCode() (pro ESLint < 9)", () => {
        const ruleInstance = rule.create(mockContextV8);
        const node = {
            id: { name: "Test" },
            body: { range: [0, 10] },
            typeParameters: { type: "TSTypeParameterDeclaration" }
        };
        // Nemělo by vyhodit chybu
        ruleInstance.TSInterfaceDeclaration(node);
    });

    it("mělo by fungovat s context.sourceCode (pro ESLint >= 9)", () => {
        const ruleInstance = rule.create(mockContextV10);
        const node = {
            id: { name: "Test" },
            body: { range: [0, 10] },
            typeParameters: { type: "TSTypeParameterDeclaration" }
        };
        // Nemělo by vyhodit chybu
        ruleInstance.TSInterfaceDeclaration(node);
    });
});

const ruleTester = new RuleTester({
    languageOptions: {
        parser: parser,
        ecmaVersion: 2020,
        sourceType: "module",
    },
});

ruleTester.run("prefer-type-over-interface-v10-compatibility", rule, {
    valid: [
        {
            code: "type MyType = { field: string; };",
        },
    ],
    invalid: [
        {
            code: "interface MyInterface { field: string; }",
            errors: [{ message: "Interface 'MyInterface' can be replaced by a type." }],
            output: "type MyInterface = { field: string; };",
        },
        {
            code: "interface MyInterface<T> { field: T; }",
            errors: [{ message: "Interface 'MyInterface' can be replaced by a type." }],
            output: "type MyInterface<T> = { field: T; };",
        },
        {
            code: "interface MyInterface extends Parent { field: string; }",
            errors: [{ message: "Interface 'MyInterface' can be replaced by a type." }],
            output: "type MyInterface = Parent & { field: string; };",
        },
    ],
});
