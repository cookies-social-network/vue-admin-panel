# Внутреннее соглашение на проекте

> Стараться всегда поддерживать актуальность файла [README.md](README.md)

## Оглавление

- [Рекомендаци перед началом разработки, после разворачивания проекта](CONTRIBUTING.md#first-commit)
- [Рекомендаци по содеражнию README.md](CONTRIBUTING.md#readme)
- [Правила для скриптов](CONTRIBUTING.md#scripts)
- [Правила для разметки](CONTRIBUTING.md#templates)
- [Правила для стилей](CONTRIBUTING.md#styles)
- [Правила для комментариев](CONTRIBUTING.md#comments)
- [Структура проекта](ARCHITECTURE.md#структура-проекта)
- ["Соглашение трёх амиго"](CONTRIBUTING.md#three-amigos-rules)
- [Code & File Style](CONTRIBUTING.md#code-&-file-style)
- [Работа с репозиторием](CONTRIBUTING.md#git)
- [Полезные ссылки](CONTRIBUTING.md#helpfull-links)
<!-- - [Package.json](CONTRIBUTING.md#packagejson) -->
<!-- TODO: перед npm install проверять версию npm init vue@latest (официальной версии пресета) -->

## First Commit

1. package.json>name заменить на актуальное название проекта
1. `НАЗВАНИЕ_ПРОЕКТА` в [README.md](README.md) заменить на актуальное название проекта
1. В [GitFlow](README.md#gitflow) описать соглашение ветвления на проекте

## Readme

- [NPM commands](README.md#npm-commands) Список команд из консоли для проекта.
- [GitFlow](README.md#gitflow) Правила ветвления на проекте.
- [Features](README.md#features) (Опционально) Описание уникальных тонкостей проекта, способствующие скорейшему погружению в проект.
- [Description](README.md#description) (Опционально) Описание ключевых моментов в настройке проекта, не связанные с разработкой.

## Scripts

- Методы-обработчики именуются: `handle{{цель}}{{действие}}`. Пример: `handleUserChange`.
- Булевские переменные именуются: `is{{цель}}{{условие}}`. Пример: `isModalVisible`, `hasModalTitle`.
- Методы-действия именуются: `{{глагол}}{{контекст}}`. Пример: `getUser`, `generateStyle` и т.д. Так же глагол должен использоваться один и тот же во всех методах-действиях одного типа. Например, получение чего-либо - всегда `get...`, не использовать синонимы, по типу `take` и прочие. Если `generate` - всегда `generate`, не нужно мешать с, например, `make`.
- Стараемся типизировать всё (`any` не приветствуется (P.S. если тип неизвестен, лучше использовать `unknown`, чем `any`)). Если есть место, где по каким-то причинам получается использовать только `any`, то лучше этот момент описать или вынести на обсуждение (при необходимости).
- Используем синтаксический сахар `<script setup>`, рекомендуемый при Composition API внутри SFC
- Любые кастомные типы пишутся в `PascaleCase` и обязательно должны иметь в конце имени постфикс `Type`. Например:  
  Типы компонента - `type {{ПолноеНазваниеФайлаКомпонента}}{{НазваниеТипа}}Type = ...` => `type CGButtonModeType = ...`  
  Swagger типы (API) - `type Api{{ApiПапка}}{{НазваниеТипа}}Type = ...` => `type ApiAuthorizationUserDataResponseType = ...`  
  Обычные типы - `type {{НазваниеТипа}}Type = ...` => `type DatetimeFormatType = ...`

## Templates

- порядок смысловых элементов в следующей последовательности:
  - диалоги
  - основной шаблон vue файла

```html
<!-- Example.vue -->
<template>
  <el-dialog v-model="isVisible" ... />
  <el-dialog v-model="isVisible" ... />

  <div class="example">
    ...
  </div
</template>
```

- Именование компонентов используется в стиле `kebab-case` и используется 2 или более слова (включая префикс) во избежание коллизий с нативным HTML. Пример:

```html
<c-g-button ...$attrs />
<c-a-my-component ...$attrs />
<c-b-page-name-component ...$attrs />
```

## Styles

- Именование классов по методологии BEM `block-name__item-name--modificator`
- Именование айдишников `kebab-case`
- Название SASS переменной формируется: `$scope-name--param-name`
- Название CSS переменной формируется: `--kebab-case`  
  Хорошим тоном будет добавление такой же переменной, градиентов, с постфиксом `-rgb` для использования её в методах `css` такие как `rgba()`. Потому что у дизайнеров есть причуда применять на граиентах `opacity`. Например:

```scss
:root {
  --color-violent: #FF00FF;
  --color-violent-rgb: 255, 0, 255;
}

.some-class {
  color: rgba(--color-violent-rgb, 0.8);
}
```

- Локальная стилизация компонента находится в нём же (паттерн SFC) и не затрагивает внешние модули (scoped)

```html
<template>
  <div class="с-card">
    <div class="с-card__header" id="c-card-header">
      <h2>Header</h2>
    </div>
    <div class="с-card__info">
      <span>Info</span>
    </div>
    <div class="с-card__price с-card__price--hidden">
      <span>1000</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .с-card {
    $root: &;
    $height--primary: 100px;

    --с-card--height: $height--primary * 0.5;

    :deep(.c-class) {
      #{$root}__info {
        height: var(--с-card--height);
      }
    }
  }
</style>
```

- Глобальные классы
  - Отступы: `{{вид_отступа}}-{{размер_экрана_если_требуется}}-{{размер_отступа}}`. Пример: `m-4`, `ml-4`, `ml-lg-4`, `p-4`, `pl-4`, `pl-lg-4`
  - Цвета: `{{вид_заливки}}-{{наименование_цвета}}`. Пример: `color-primary`, `bg-color-secondary`
  - Не используем в проекте `font-weight`, `font-size` и `font-family`, вместо этого используем абстрактные классы `.h1`, `.text-sm`, `.bold` и т. д.
- В svg-файлах в папке `src/assets/icons` в заливку (fill) ставить `currentColor`
- Избегайте использование `!important`, линтеры будут выкидывать warning. Если не удаётся отказаться от него: добавляем исключение и описываем почему используем:

```scss
.input {
  // описываем почему используем !important
  content: none !important; /* stylelint-disable-line declaration-no-important */
}
```

## Comments

- Бывают случаи, когда приходится работать с необычными сценариями, в которых отсутствуют общепринятые соглашения. Комментирование такого кода, объясняющее, что он делает и в каком контексте рассматривается, поможет другим программистам, а также послужит напоминанием для тебя, когда вернетешься к нему в будущем
- Все тегированные комментарии должны быть оформлены строчными комментариями, а если требуется подробное описание, то ниже новый многострочный комментарий
- Если в задаче требуется **временно** скрыть кусок приложения, то эта часть оборачивается соответствующими правила для каждого из блоков файла и выше ставится тег `HACK`, номер задачи и причину (чтобы иметь основания о проделанной работе, при возникновении вопросов от менеджера/заказчика, мол это не мы придумали и не наша ошибка). Например:

```html
<!-- HACK(CH-3322): Скрыт по инициативе дизайнера (и настойчиво рекомендуется оставить комментарий в задаче) -->
<!-- <div /> -->
```

```scss
// HACK(CH-3322): Скрыт по инициативе дизайнера (и настойчиво рекомендуется оставить комментарий в задаче)
// display: flex;
```

- Если нужно времено отложить разработку в текущем месте приложения и чтобы не забыть доработать, условимся помечать такие места двумя способами `FIXME: description`, `DEBT: description` или `TODO: description`.
- `FIXME:` - маркируется то место в коде, которое необходимо закончить в рамках текущей задачи, и если в пришедшем МР есть хотя бы один такой комментарий, моментально возвращать задачу на доработку.
- `TODO:` - маркируется то место в коде, которое планируется выполнить в другой задаче.
- `API:` - маркируется то место в коде, где задумано добавить код интеграции в другой задаче.
- `DEBT:` - маркируется то место в коде, которое отправляется в технический долг.
- `description`: краткое описание, но передающее основной смысл. Писать так, чтобы другой человек понял ваш комментарий. Не приветствуются комментарии следующего содержания `не забыть поправить` или `Петя сказал, что поправит это своим МР` (не указана цель правки). Например:
- Когда нужно обозначить какой то огромный блок, который указанием обычного комментария будет неочевидно, что это относится к куску кода а не строчке, и при этом он должен работать, предлагается оборачивать соответствующим тегом `START` & `END`. (Пример ниже)

```html
<!-- TODO: Здесь запланировано место для шапки -->
```

```ts
// DEBT | START: Сделать утилиту и перенести все зависимости туда
const DISCOUNTS_OBJECT = {
  promo: 10,
  newYear: 7,
  blackFriday: 25
} as const

const DISCOUNTS_ARRAY = ['first', 'seconds'] as const

type DiscountsEventType = keyof typeof DISCOUNTS_OBJECT // "promo | newYear | blackFriday"

type DiscountsValueType = typeof DISCOUNTS_OBJECT[DiscountsEventType] // "10 | 7 | 25", если бы не было "as const", то было бы "number"

type DiscountsType = typeof DISCOUNTS_ARRAY[number] // "first | seconds", вместо "string[]"
// DEBT | END: Сделать утилиту и перенести все зависимости туда

// API: Заменить фейковый запрос

// FIXME: При загрузке приложение падает, спросить SOMEBODY чтобы помог

// DEBT: Решить проблему с дублированием кода
/**
 * Здесь можно продолжить описание технического долга...
 */
```

```scss
// FIXME: разобраться почему стили не применяются в сафари
// display: flex;
```

<!-- ## Package.json -->

## Three Amigos Rules

1. Не повторять код. Избегать примитивного copy/paste. В случае обнаружения потенциального дублирования кода:
1. Оценить затрачиваемое время на оптимизацию кода
1. Озвучить оценку наставнику/менеджеру, если оценка оптимизации не была изначально включена в итоговую оценку задачи
1. В случае отказа наставником/менеджером в увеличении итоговой оценки (горят сроки, например), пометить `DEBT:` комментарием, с описание того что нужно сделать (см. правилами [комментирования](CONTRIBUTING.md#comments)), и попросить наставника/менеджера добавить задачу в эпик технического долга и выполнить вынужденный copy/paste.

## Code & File Style

### File Style

- Для именования SingleFileComponent использовать 2 или более слова (включая префикс). Имя компонента должно состоять из полных слов (без сокращений). Пример: `WCard.vue`, `SFormItem.vue`.
- Директории модулей (`HomePage`, `WSidebar`) именуются в стиле `PascalCase`. Подпапки в стиле `camelCase` (`ui`, `composables`, `components`, `api`, `types`).
- Для именования файл-компонентов, использовать следующий шаблон `{{S|E|F|W|A}}{{НазваниеВключающееРодительскоеНазваниеПапки}}.vue` (`WHeaderPanel.vue`). Для именования страниц в стиле `kebab-case`. Для именовани остальных файлов в стиле `camelCase` (`route.ts`, `vCustomLoading.ts`)

### Code Style

- В script определённый порядок (сверху вниз) описания переменных, методов и т. д., а именно:
  - model
  - props/emits и их типизация
  - composables
  - ref/reactive
  - computed
  - watch
  - lifecycle hooks:
    - onServerPrefetch
    - onActivated
    - onBeforeMount
    - onMounted
    - onBeforeUpdate
    - onUpdated
    - onDeactivated
    - onBeforeUnmount
    - onUnmounted
    - onErrorCaptured
  - methods
- Template компонента должен быть максимально чистым (за исключением самостоятельных компонентов)
- В template осуждается использование "голых" выражений, например: `<c-card @click="isModalVisible = !isModalVisible" />`, `<div>{{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount) }}</div>`. Вместо этого вынести подобную логику, либо в метод-обработчик/действие, либо, если позволяет логика, в `computed`, для чистоты кода
- Все константы именуются `UPPER_CASE`
- Любой объект/массив в файле констант помечать `as const`

```ts
const DISCOUNTS = {
  promo: 10,
  newYear: 7,
  blackFriday: 25
} as const

const DISCOUNTS = ['first', 'seconds'] as const

type DiscountsEventType = keyof typeof DISCOUNTS // "promo | newYear | blackFriday"

type DiscountsValueType = typeof DISCOUNTS[DiscountsEventType] // "10 | 7 | 25", если бы не было "as const", то было бы "number"

type DiscountsType = keyof typeof DISCOUNTS // "first | seconds", вместо "string[]"
```

- В style (только scoped) именование селектора должно соответствовать названию файла. Например: `CCard.vue` => `.c-card { ... }`
- Пример `single file component`:

```html
<!-- CCard.vue -->
<template>
  <div class="c-card">
    <div class="c-card__info">
      <span> {{ userWithId }} </span>
      <span v-if="!isMobile"> Баланс: {{ balance }} </span>
    </div>
    <button class="c-card__action c-card__action--secondary" @click="handleUserChange"> Click to change user </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  type Props = {
    // some params...
  }

  type Emits = {
    // some params...
  }

  const props = defineProps<Props>()
  // Опционально, если надо дефолтные значения указать
  // const props = withDefaults(defineProps<Props>(), {
  //   // some params...
  // })
  const emit = defineEmits<Emits>()

  const { isMobile } = useScreen()

  let id = ref(1)

  const userWithId = computed(() => `Пользователь ${id}`)
  const balance = computed(() => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(props.balance))

  onMounted(() => {
    //some logic...
  })

  const handleUserChange = () => {
    id.value += 1
  }
</script>

<style scoped lang="scss">
  --c-card--text: #c0c0c0;
  --c-card--btn-background: #a0a0c0;

  .c-card {
    $root: &;

    display: flex;
    align-items: center;
    justify-content: center;

    &__info {
      color: var(--c-card--text);
    }

    &__action {
      ...
      &--secondary {
        background: var(--c-card--btn-background);
      }
      #{$root}__some-another-class {
        ...
      }
    }
  }
</style>
```

### Composables

```TypeScript
// src/composables/user.ts

/**
 * Определяем "глобальные" переменные,
 * изменение которых осуществляется только через вспомогательные функции
 */
const user = ref<UserType>()
const isLoading = ref(false)

/**
 * Вспомогательные функции
 */
const setUser = (paylod: UserType) => {
  user.value = payload
}

/**
 * Основной кастомный экземпляр composition Api
 */
export const useUser = () => {
  /**
   * Часто используемые данные
   */
  const isAdmin = computed<boolean>(() => user.value?.type === 'admin')

  return {
    /**
     * Все переменные должны быть readonly,
     * чтобы не было случайных изменений
     */
    user: readonly(user),
    isLoading: readonly(isLoading),
    isAdmin: readonly(isAdmin)
    setUser,
  }
}

/**
 * Функции-фабрики, функции-мэперы
 */
export const userFetchFactory = async () => {
  isLoading.value = true

  const [error, response] = await UserApi.getUser()

  isLoading.value = false

  if (response) {
    setUser(response.data)
  }
}
```

### Ветки и коммиты

- Название ветки формируется из `TASK-ID`, где `TASK-ID` - Id задачи в Git, без каких либо вложенностей (такие как: `feat/CP-1111` не приветствуются, просто `CP-1111`)
- В случае когда нужно нескольким разработчикам работать над одной большой задачей одновременно:
  1. Попросить ТимЛида или Менеджера разбить на более мелкие задачи с указанием иерархии и зависимости (какая какую блокирует через инструмент линкования в джире)
  1. Создать ветку с основным `TASK-ID` и запушить
- Ответвиться от ветки `TASK-ID` добавив модификатор с никнеймом разработчика, например: `CP-2023-saitama`
- По завершению выполнения сделать МР в `TASK-ID`
- По завершению, с окончательным результатом, сделать МР в `dev`/`develop`

### Pull requests

Pull request формируется, следующим образом `Draft: TYPE(SCOPE): TITLE`, где:

- `Draft` - опциональный модификатор, указывающий что МР не готов к проверке ревьюером.
- `TYPE` - модификатор указывающий вид проводимых работ (в какой раздел попадает в CHANGELOG.md):
  - **feat**：Новые фичи
  - **fix**：bugfix
  - **docs**：Обновление документации
  - **style**：Модификации кода, не влияющие на логику программы (изменение пробельных символов, форматирование отступов, заполнение отсутствующих точек с запятой и т. д. без изменения логики кода)
  - **refactor**：Рефакторинг кода (ни новых функций, ни исправлений ошибок)
  - **perf**：Производительность, оптимизация
  - **test**：Добавление новых тестов или обновление существующих
  - **build**：Основная цель - изменить фиксацию системы сборки проекта (например, глюк, новый веб-пакет, конфигурация накопительного пакета и т.д.).
  - **ci**：Основная цель - изменить коммиты, в которых проект продолжает процесс интеграции (например, Travis, Jenkins, GitLab CI, Circle и т. д.).
  - **chore**：Другие типы, не принадлежащие к указанным выше типам
  - **revert**：Откатить предыдущий коммит
- `SCOPE` - один из вариантов:
  - `TASK-ID` - Id задачи в Git, например: `DC-3205`
  - **no-release** - помечает коммит, который не триггерит поднятие версии проекта
- `TITLE` - один из вариантов:
  - `TASK-TITLE` - полное название задачи в Git (заголовок)
  - Краткое описание изменений, если коммит не связан с задачей

#### Требования к PR

> **Важно!** Если случилось так, что код достался без обработки линтера и преттира. В таком случае вынести форматирование в отдельный МР, не смешивая с кодом основной задачи, с пометкой **style:**. В противном случае, МР будет отклонён и отправлен на исправление

- Заголовок должен кратко изложить суть данного изменения/нововведения.
- PR должен иметь код только по задаче указанной в теме.
- Каждый свой МР разработчик **обязан** сам:
  1. Просмотреть на наличие недочетов в коде, опираясь на текущий контрибутинг.
  1. Проанализировать на предмет улучшения кодовой базы.
     - Если есть код который можно оптимизировать, правки задевают другие файлы несвязанные с задачей, и сам процесс займёт не более 30 минут, то сделать ответвление от ветки задачи, внести правки и сделать отдельный МР в ветку задачи
     - Определить эстетичные решения и предложить наставнику вынести их в библиотеку сниппетов, для последующего переиспользования в других проектах. После согласования пометить кусок код `TODO:` комментарием, с описание того что нужно сделать (см. правилами [комментирования](CONTRIBUTING.md#comments))
     - Всё не в ходящее в выше перечисленное необходимо пометить `DEBT:` комментарием, с описание того что нужно сделать (см. правилами [комментирования](CONTRIBUTING.md#comments)), и попросить наставника/менеджера добавить задачу в эпик технического долга

## Helpfull Links

- [Style Guide](https://vuejs.org/style-guide/) (обязательно к прочтению)
- [Style Guide (Ru)](https://v3.ru.vuejs.org/ru/style-guide/) (обязательно к прочтению)
- [Composition API](https://vuejs.org/api/options-composition.html)
- [Best Practices from Vue](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Tips & Best Practices](https://medium.com/js-dojo/vue-3-tips-best-practices-54aec91d95dc)
- [6 Tips for Building Large Scale Applications](https://vueschool.io/articles/vuejs-tutorials/6-tips-for-building-large-scale-vue-js-3-applications/)
- [Script setup](https://vuejs.org/api/sfc-script-setup.html#script-setup)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript. Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript. Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [SCSS. Documentation (Ru)](https://sass-scss.ru/documentation/)
- [SCSS. Documentation](https://sass-lang.com/documentation)
- [SCSS. Playground](https://www.sassmeister.com/)
