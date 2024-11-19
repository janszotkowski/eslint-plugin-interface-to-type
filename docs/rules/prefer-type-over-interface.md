
# prefer-type-over-interface

This ESLint rule enforces the use of `type` aliases instead of `interface` declarations in TypeScript. It aims to promote consistent and flexible code by leveraging the extended capabilities of `type`, especially in scenarios involving unions, intersections, or complex generic structures.

---

## Motivation

TypeScript provides two primary ways to define structural types: `type` and `interface`. While both serve similar purposes, `type` is often more versatile and is preferred in many projects for the following reasons:

- **Union and Intersection Types:** `type` allows you to create union and intersection types directly, enhancing flexibility.
- **Generics:** `type` is often more concise and readable when working with generics.
- **Extensibility:** Using `&` with `type` makes combining and extending types more straightforward.
- **Consistency:** Favoring `type` over `interface` reduces cognitive overhead when reading code.

---

## Examples

### Incorrect Code
❌ Using `interface`:
```typescript
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface GenericResponse<T> {
  data: T;
  error?: string;
}
```

---

### Correct Code
✅ Using `type`:
```typescript
type User = {
  id: number;
  name: string;
  role: 'admin' | 'user';
};

type GenericResponse<T> = {
  data: T;
  error?: string;
};
```

---

## Special Cases

1. **Union Types**  
   `type` is the only way to define union types:
   ```typescript
   type Role = 'admin' | 'user' | 'guest';
   ```

2. **Intersection Types**  
   Use `&` to combine multiple types:
   ```typescript
   type AdminUser = User & { permissions: string[] };
   ```

3. **Generics**  
   Generics are cleaner and easier to read with `type`:
   ```typescript
   type PaginatedResponse<T> = {
     items: T[];
     total: number;
     currentPage: number;
   };
   ```

4. **Extending Types**  
   `type` allows you to extend multiple structures seamlessly:
   ```typescript
   type ExtendedUser = User & { lastLogin: Date };
   ```

---

## Rule Details

This rule checks all `interface` declarations and suggests converting them to `type`. It preserves the structure and intent of the original `interface` while improving consistency and flexibility in the codebase.

---

## Autofix

This rule supports ESLint's `--fix` option. When enabled, it will automatically convert `interface` declarations into equivalent `type` aliases.
