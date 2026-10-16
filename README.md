# Teaboom — карточка товара «Ананасовый улун»

Тестовое задание: вёрстка верхней части карточки товара для [Teaboom.ru](https://teaboom.ru/product/ananasovij-ulun).

**Демо:** https://max-black-de.github.io/teaboom-product-card/

Стек: HTML5, SCSS, чистый JavaScript (без фреймворков), Vite как лёгкий сборщик.

## Запуск

Нужен Node.js 22 (см. `.nvmrc`).

```bash
npm ci
npm run dev       # дев-сервер с автообновлением
```

Сборка и просмотр собранной версии:

```bash
npm run build     # результат в dist/
npm run preview
```

Собранный `dist/` использует относительные пути, поэтому его можно открыть через любой статический сервер (например, `npx serve dist`).

## Скрипты

| Скрипт     | Что делает                                 |
| ---------- | ------------------------------------------ |
| `dev`      | дев-сервер Vite                            |
| `build`    | продакшн-сборка в `dist/`                  |
| `preview`  | локальный просмотр сборки                  |
| `lint`     | ESLint + Stylelint                         |
| `lint:js`  | ESLint (flat config, recommended)          |
| `lint:css` | Stylelint (stylelint-config-standard-scss) |
| `format`   | Prettier                                   |

## Структура

```
index.html               семантический каркас карточки
src/main.js              данные фасовок и логика переключения
src/styles/main.scss     точка входа стилей
src/styles/_variables.scss  палитра и константы Teaboom
src/styles/_reset.scss   сброс стилей
public/img/              изображения
.github/workflows/ci.yml lint + build, деплой на GitHub Pages из main
```

## Порядок работы

1. Фронтенд создаёт ветку от `main` (`feat/...`, `fix/...`) и открывает PR.
2. CI должен быть зелёным (lint + build).
3. Тестировщик проверяет PR по критериям приёмки.
4. Архитектор вливает в `main` только fast-forward. Прямые пуши в `main` и force push запрещены.
5. Каждый пуш в `main` автоматически публикуется на GitHub Pages.

Фото и тексты товара взяты с сайта Teaboom.ru.
