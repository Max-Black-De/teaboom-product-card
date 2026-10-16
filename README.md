# Teaboom — карточка товара «Ананасовый улун»

Тестовое задание: вёрстка верхней части карточки товара для [Teaboom.ru](https://teaboom.ru/product/ananasovij-ulun).

**Демо:** https://max-black-de.github.io/teaboom-product-card/

Стек: HTML5, SCSS, чистый JavaScript (без фреймворков), Vite как лёгкий сборщик.

## Запуск

1. **Демо:** https://max-black-de.github.io/teaboom-product-card/
2. **Без установки:** скачайте репозиторий и откройте `index.html` двойным кликом. Страница работает прямо из файла (file://), сервер и сборка не нужны.
3. **Для разработки** нужен Node.js 22 (см. `.nvmrc`):

```bash
npm ci
npm run dev       # sass --watch + дев-сервер Vite
npm run build     # компиляция SCSS в css/main.css и статическая копия в dist/ (для Pages)
npm run preview   # просмотр dist/
```

### Почему корневой index.html статический

Скомпилированный `css/main.css` лежит в репозитории, а `js/main.js` — обычный скрипт с `defer`, без `type="module"` и `crossorigin`. Все пути относительные (`./`). Иначе браузер при открытии файлом блокирует модули и не компилирует SCSS. Отдельная папка со «сборкой» не нужна: исходники и есть готовая страница. После правок в SCSS запустите `npm run build:css` (или `npm run dev`) и закоммитьте обновлённый `css/main.css`. Vite используется только как дев-сервер, `npm run build` копирует готовые файлы в `dist/` для GitHub Pages.

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
index.html                     готовая страница: разметка и данные фасовок (data-атрибуты)
css/main.css                   скомпилированный CSS (генерируется из SCSS, коммитится)
js/main.js                     переключение фасовки, галерея, скидка, aria-live (обычный скрипт)
img/                           фото товара в WebP (основные и превью 240px)
src/styles/main.scss           исходники стилей: точка входа
src/styles/_variables.scss     палитра Teaboom, шкала шрифтов, шаг сетки 8px, брейкпоинты
src/styles/_mixins.scss        mixin hover → @media (hover: hover)
src/styles/_reset.scss, _base.scss
src/styles/components/         BEM-блоки: breadcrumbs, product, gallery, variants, price, button, specs
scripts/build.mjs              копирует статические файлы в dist/
docs/screenshots/              скриншоты 1440 / 768 / 375 px
.github/workflows/ci.yml       lint + build, деплой на GitHub Pages из main
```

## Решения

- **Семантика:** `main` → `article` с `h1`, фото в `figure`, характеристики в `dl`, покупка — `form` с `fieldset`/`legend`.
- **Фасовки** — нативные `input type="radio"` внутри `label` (чипы). Работают стрелками и Tab без JS-обвязки, по умолчанию выбрано 100 г.
- **Данные фасовок живут в разметке:** `data-sku`, `data-price`, `data-old-price` на radio. JS только читает их, поэтому страница без JS сразу показывает корректные данные для 100 г.
- **Цены** хранятся в `<data value>` и форматируются через `Intl.NumberFormat('ru-RU')`. Копейки показываются, только когда они есть (326,40 ₽, но 1 432 ₽).
- **Скидка** считается функцией `getDiscountPercent(price, oldPrice)` в `js/main.js` по формуле `Math.round((1 - price / oldPrice) * 100)`. Выводится как «−N %» (знак минус U+2212, узкий неразрывный пробел U+202F). Если старой цены нет или она не больше текущей, старая цена и бейдж скрываются. Результат: 100 г −7 %, 500 г −13 %, 1000 г −20 %, 5000 г −27 %.
- **Hover** подключается только под `@media (hover: hover)` (mixin `hover`), поэтому на тач-экранах заливка не «залипает».
- **Доступность:** смена цены объявляется через `aria-live="polite"`, видимый `:focus-visible`, превью галереи — кнопки «Показать фото N из 4» с `aria-pressed` (у картинок внутри `alt=""`), области нажатия от 48px, `prefers-reduced-motion` отключает анимации.
- **Стиль Teaboom:** акцент #f5d730, Open Sans (Google Fonts, `preconnect` + `display=swap`), кнопка с рамкой и текстом заглавными, при наведении жёлтая заливка, как `.btn.hover-theme` на сайте.
- **Сетка** на CSS Grid с шагом 8px (все отступы — переменные `$space-*`). Ширина 375 — одна колонка, фасовки 2×2. От 768 — две колонки. От 1200 — пропорция 7:5.
- **Изображения:** WebP, у всех заданы `width`/`height`, превью грузятся лениво.
- **Stylelint** проверяет имена классов на соответствие BEM.

## Порядок работы

1. Фронтенд создаёт ветку от `main` (`feat/...`, `fix/...`) и открывает PR.
2. CI должен быть зелёным (lint + build).
3. Тестировщик проверяет PR по критериям приёмки.
4. Архитектор вливает в `main` только fast-forward. Прямые пуши в `main` и force push запрещены.
5. Каждый пуш в `main` автоматически публикуется на GitHub Pages.

Фото и тексты товара взяты с сайта Teaboom.ru.
