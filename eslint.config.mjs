// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript", "plugin:import/recommended"), {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
}, {
  plugins: {
    import: (await import("eslint-plugin-import")).default,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { 
      argsIgnorePattern: "^_", 
      varsIgnorePattern: "^_" 
    }],
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": "warn",
    "@next/next/no-html-link-for-pages": "warn",
    "@next/next/no-img-element": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/no-empty-object-type": "warn",
    // Import rules
    "import/no-unresolved": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-absolute-path": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
