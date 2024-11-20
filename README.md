
# eslint-plugin-interface-to-type

[![npm version](https://img.shields.io/npm/v/eslint-plugin-interface-to-type.svg)](https://www.npmjs.com/package/eslint-plugin-interface-to-type)  
[![downloads](https://img.shields.io/npm/dm/eslint-plugin-interface-to-type.svg)](https://www.npmjs.com/package/eslint-plugin-interface-to-type)  

An ESLint plugin that enforces the use of `type` aliases instead of `interface` declarations in TypeScript.

---

## Installation

Install the plugin as a dev dependency:

```bash
npm install eslint-plugin-interface-to-type --save-dev
```

---

## Usage

1. Add the plugin to your ESLint configuration file:

```json
{
  "plugins": ["interface-to-type"]
}
```

2. Enable the rule in your ESLint configuration:

```json
{
  "rules": {
    "interface-to-type/prefer-type-over-interface": "error"
  }
}
```

---

## Rule: `prefer-type-over-interface`

This rule enforces the use of `type` aliases over `interface` declarations in TypeScript. See the full documentation in the [`docs/rules/prefer-type-over-interface.md`](./docs/rules/prefer-type-over-interface.md).

### Incorrect Code

```typescript
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}
```

### Correct Code

```typescript
type User = {
  id: number;
  name: string;
  role: 'admin' | 'user';
};
```

---

## Why `interface` can be risky

One of the reasons to prefer `type` over `interface` is the potential for unexpected behavior with `interface` merging. In TypeScript, when two `interface` declarations share the same name, they are automatically merged into a single declaration. This behavior, known as [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), can introduce subtle bugs and unintended behaviors in your codebase.

### Example of Declaration Merging

```typescript
interface User {
  id: number;
}

interface User {
  name: string;
}

// Resulting type
interface User {
  id: number;
  name: string;
}
```

While this behavior can sometimes be useful, it often leads to confusion and makes code harder to maintain, especially in large or collaborative projects. Using `type` avoids this risk entirely, as `type` declarations with the same name will result in a compilation error.

---

## Autofix

This rule supports ESLint's `--fix` option, which can automatically convert `interface` declarations to equivalent `type` aliases.

---

## License

This project is licensed under the [MIT License](./LICENSE).
