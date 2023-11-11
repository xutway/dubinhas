module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
    'import'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  env: {
    browser: true,
    jest: true,
  },
  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    'max-len': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: false,
        trailingComma: 'all',
        tabWidth: 2,
      },
    ],
    indent: [2, 2, { SwitchCase: 1 }],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 0,
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-fragments': 'off',
    'react/jsx-wrap-multilines': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': ['off'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react(.*|$)', '^@react(.*|$)'],
          [
            '^@app(/.*|$)',
            '^@assets(/.*|$)',
            '^@libs(/.*|$)',
          ],
          ['^\\w.*'],
          ['^\\.'],
        ],
      },
    ],
    'import/newline-after-import': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
  },
  ignorePatterns: [
    'node_modules',
    'build',
    'coverage',
    'src/libs/codegen/**/*',
    '*.generated.tsx',
    'graphql.tsx',
    'metro.config.js',
    '*.js'
  ],

    root: true,
    extends: [
      'universe/native',
    ],
  };
  