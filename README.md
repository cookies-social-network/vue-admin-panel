# НАЗВАНИЕ_ПРОЕКТА

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## NPM commands

### Install project's dependencies

```sh
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Unit tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## GitFlow

### Default

`master/main` - версия проекта соответсвующая версии на продакшене от которой идёт ответвление для `hotfix` задач  
`develop/dev` - версия проекта от которой идёт ответвление для выполнения основных задач и `bugfix` задач  
`release` - версия проекта соответсвующая версии на продакшене. Пуш в неё только при выкатывании релиза и `hotfix` от ветки `master/main`. После формируется `CHANGELOG.md`  

#### Examples

```bash
# Поступала hotfix задача (DC-321)
master -> DC-321 -> Merge Request DC-321 to master with squash commits -> Merge Request master to release without squash commits
# После, актуализировать develop
develop -> git pull origin master -> git push origin develop

# Поступала bugfix/обычная задача (DC-321)
develop -> DC-321 -> Merge Request DC-321 to develop with squash commits

# День релиза
Merge Request develop to master without squash commits -> Merge Request master to release without squash commits
```

TODO: Описывается разработчиком соглашение ветвления на проекте

## CONTRIBUTING

Просьба ознакомиться с установленными [правилами на проекте](CONTRIBUTING.md)  
Самый свежий всегда можно найти в [DC Vue Preset](https://git.dclouds.ru/vue/dc-vue-preset/-/blob/master/CONTRIBUTING.md)
