import globals from "globals";
import js from "@eslint/js";

/** @type {import("@eslint/eslintrc").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "warn", // Avisar sobre console.log
      "no-unused-vars": "warn", // Avisar sobre variáveis não utilizadas
      eqeqeq: ["error", "always"], // Exigir uso de ===
      curly: ["error", "all"], // Sempre usar chaves
      semi: ["error", "always"], // Exigir ponto e vírgula
    },
  },
];
