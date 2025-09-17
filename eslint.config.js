import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"

export default [
  { ignores: ["dist"] },

  // Regras para o BACKEND
  {
    files: ["backend/**/*.js"], // <- corrigido (tudo minúsculo)
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // <- habilita process, __dirname etc
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module", // <- usa import/export, não commonjs
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "off", // <- desativa erro falso do process
    },
  },

  // Regras para o FRONTEND (React)
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
