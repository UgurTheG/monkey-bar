// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
    // Next.js rules (React, React Hooks, Next best practices)
    ...nextVitals,

    // Next’s TypeScript rules (pairs nicely with typed linting below)
    ...nextTs,

    // Enable type-aware rules from typescript-eslint
    // Keep this scoped to TS files
    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
        ...cfg,
        files: ['**/*.{ts,tsx}'],
    })),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                // Use TS Project Service for type-aware rules without listing tsconfigs
                projectService: true,
                // If you hit "could not find a tsconfig" issues, uncomment the next line:
                // tsconfigRootDir: new URL('.', import.meta.url).pathname,
            },
        },
    },

    // Turn off rules that conflict with Prettier — keep this LAST.
    eslintConfigPrettier,

    // Global ignores (tweak as you like)
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
    ]),
]);
