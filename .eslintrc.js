const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/display-name': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/no-unknown-property': ['error', { ignore: ['tw'] }],
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};

module.exports = eslintConfig;
