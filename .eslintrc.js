module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      // ESlint允许自定义设置支持那些Javascript 语言。默认支持ECMAScript5,可以通过设置属性使其支持ES6，甚至JSX等模板语言。
      jsx: true,
    },
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'vue/script-setup-uses-vars': 'error', //ESLint no unused vars规则不检测<template>中使用的<script setup>中的变量。此规则将在<模板>中使用的<脚本设置>中查找变量，并将其标记为已使用。
    'vue/multi-word-component-names': 'off', //此规则要求组件名称始终为多字
    '@typescript-eslint/ban-ts-ignore': 'off', //禁止ts忽略
    '@typescript-eslint/explicit-function-return-type': 'off', //显式函数返回类型
    '@typescript-eslint/no-explicit-any': 'off', //没有明确的任何
    '@typescript-eslint/no-var-requires': 'off', //无var要求
    '@typescript-eslint/no-empty-function': 'off', //没有空函数
    'vue/custom-event-name-casing': 'off', //强制将自定义事件名称设置为camelCase。
    'no-use-before-define': 'error', //定义之前不能使用
    '@typescript-eslint/no-use-before-define': 'off', //定义之前不能使用
    '@typescript-eslint/ban-ts-comment': 'off', //禁止ts评论
    '@typescript-eslint/ban-types': 'off', //禁令类型
    '@typescript-eslint/no-non-null-assertion': 'off', //无非空断言
    '@typescript-eslint/explicit-module-boundary-types': 'off', //显式模块边界类型
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off', //函数参数前的意外空格

    'vue/attributes-order': 'off', //属性顺序
    'vue/one-component-per-file': 'off', //每个文件一个组件
    'vue/html-closing-bracket-newline': 'off', //html右括号换行符
    'vue/max-attributes-per-line': 'off', //每行的最大属性数
    'vue/multiline-html-element-content-newline': 'off', //多行html元素内容换行符
    'vue/singleline-html-element-content-newline': 'off', //单行html元素内容换行符
    'vue/attribute-hyphenation': 'off', //属性默认使用连字符
    'vue/require-default-prop': 'off', //此规则要求为每个未标记为必需的属性（布尔属性除外）设置默认值。
    'vue/html-self-closing': [
      //无需内容填充的html标签自动关闭，普通的html标签不能自动关闭，vue组件自动关闭
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
};
