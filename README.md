
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

## Autofix

This rule supports ESLint's `--fix` option, which can automatically convert `interface` declarations to equivalent `type` aliases.

---

## License

This project is licensed under the [MIT License](./LICENSE).
