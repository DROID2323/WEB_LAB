# 🔊 Акустична варта — адаптивна верстка

> Лабораторна робота №3 з WEB-програмування: адаптивна верстка за допомогою Flexbox, CSS Grid та SCSS.

**Студент:** Гошовський Дмитро | **Група:** КН-41 | **Рік:** 2026

---

## 🔗 Живий сайт

**👉 [https://droid2323.github.io/WEB_LAB/lab_3](https://droid2323.github.io/WEB_LAB/lab_3)**

---

## 📋 Про проєкт

Розвиток проєкту «Акустична варта» з лабораторної №2 — перенесення стилів у SCSS та реалізація повної адаптивності: Mobile → Tablet → Desktop. JavaScript та CSS-фреймворки не використовуються.

**Технології:** HTML5 · SCSS (модульна структура) · CSS Grid · Flexbox · Mobile First

---

## 🗂 Структура проєкту

```
lab_3/
├── index.html
├── assets/
│   └── images/
│       └── hero.jpg
├── css/
│   └── main.css          # Скомпільований з SCSS
├── scss/
│   ├── main.scss         # Точка входу (@use)
│   ├── _variables.scss   # Дизайн-токени
│   ├── _mixins.scss      # Повторювані патерни
│   ├── _base.scss        # Reset, типографіка
│   ├── _layout.scss      # Контейнер, Grid-структури
│   └── _components.scss  # Картки, кнопки, форма тощо
└── package.json          # npm + sass компілятор
```

---

## 📐 Адаптивні breakpoints (Mobile First)

| Стан | Ширина | Поведінка |
|---|---|---|
| Mobile | < 768px | 1 колонка, вертикальний стек |
| Tablet | ≥ 768px | 2 колонки, горизонтальний header |
| Desktop | ≥ 1024px | Повний макет |

---

## 🎯 Що продемонстровано

**SCSS-архітектура:**
- Модульна структура `@use` / без legacy `@import`
- `_variables.scss` — 20+ дизайн-токенів (кольори, відступи, breakpoints, радіус)
- `_mixins.scss` — 6 mixins: `respond-to`, `flex-center`, `container`, `responsive-grid`, `card-surface`, `edge-gutter`
- Nesting до 3 рівнів (BEM-стиль: `.card`, `.card__label`, `.card:hover`)

**Flexbox** (10 застосувань):
- Header (`flex-direction: column → row`)
- Навігація (`flex-wrap`, `gap`)
- Кнопка `.btn` (`inline-flex`, `flex-center`)
- Картка `.card` (вертикальний flex-стек)
- Footer (`flex-direction: column → row`)

**CSS Grid** (3 застосування):
- `.hero` — `1fr → 1.1fr 0.9fr` (текст + фото)
- `.monitoring-grid` — `1fr → 2 → 5 колонок`
- `.services-grid` — `1fr → 2 → 4 колонки`
- `.form` — `1fr → 2fr 1fr` (поля + textarea)

**Адаптивна типографіка:**
- `h2`: `clamp(1.4rem, 3vw, 1.7rem)`
- `.hero h1`: `clamp(1.8rem, 4.2vw, 2.75rem)`

---

## ⚙️ Компіляція SCSS

```bash
npm install
npm run sass      # watch-режим
# або
npm run build     # одноразова компіляція
```

---

## ✅ Чеклист вимог (20/20)

| # | Вимога | Виконано |
|---|---|---|
| 1 | HTML базується на «Акустична варта» | ✅ |
| 2 | meta viewport | ✅ |
| 3 | Стилі у SCSS | ✅ |
| 4 | Модульна структура `@use`, без `@import` | ✅ |
| 5 | `_variables.scss` | ✅ |
| 6 | `_mixins.scss` | ✅ |
| 7 | SCSS-змінні для кольорів, spacing, breakpoints | ✅ |
| 8 | Мінімум 2 mixins (є 6) | ✅ |
| 9 | Nesting не глибше 3 рівнів | ✅ |
| 10 | Flexbox мінімум у 2 місцях (є 10) | ✅ |
| 11 | CSS Grid мінімум у 2 місцях (є 3) | ✅ |
| 12 | Media Queries mobile/tablet/desktop | ✅ |
| 13 | Hero перебудовується на вузьких екранах | ✅ |
| 14 | Monitoring: 1 → 2 → 5 колонок | ✅ |
| 15 | Services: 1 → 2 → 4 колонки | ✅ |
| 16 | Таблиця без horizontal overflow | ✅ |
| 17 | Форма одноколонкова на mobile | ✅ |
| 18 | Footer перебудовується на mobile | ✅ |
| 19 | SCSS скомпільований у CSS | ✅ |
| 20 | Перевірено через DevTools (3 viewport) | ✅ |

---

## Всі інші роботи: **👉 [https://droid2323.github.io/WEB_LAB/](https://droid2323.github.io/WEB_LAB/)**

*Лабораторна робота №3 · WEB-програмування · КН-41 · 2026*
