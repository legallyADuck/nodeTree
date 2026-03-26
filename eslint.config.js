import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  // 1. Base JS rules
  js.configs.recommended,
  
  // 2. Your custom Jest config
  {
    files: ["**/*.js", "**/__tests__/**/*"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  
  // 3. Prettier config (must be last to disable conflicting rules)
  prettierConfig,
];