module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@typescript-eslint", "jsx-a11y"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Code propre - Interdit console.log, seulement warn et error
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-alert": "warn",
    
    // React Hooks
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    
    // TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_" 
    }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    
    // Accessibilité - Règles importantes
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    
    // Style cohérent
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "comma-dangle": ["warn", "always-multiline"],
    "indent": ["warn", 2],
    "no-trailing-spaces": "warn",
    "eol-last": "warn",
    
    // Bonnes pratiques
    "prefer-const": "warn",
    "no-var": "warn",
    "object-shorthand": "warn",
    "prefer-template": "warn",
    
    // Sécurité
    "no-eval": "warn",
    "no-implied-eval": "warn",
    "no-new-func": "warn",
    
    // Performance
    "no-loop-func": "warn",
    "no-await-in-loop": "warn",
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "build/",
    "dist/",
    "coverage/",
    "playwright-report/",
    "test-results/",
  ],
};
