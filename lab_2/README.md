# 🔊 Акустична варта

> Лабораторна робота №2 з WEB-програмування: верстка односторінкового сайту компанії (HTML/CSS).

**Студент:** Гошовський Дмитро | **Група:** КН-41 | **Рік:** 2026

---

## 🔗 Живий сайт

**👉 [https://droid2323.github.io/WEB_LAB/lab_2](https://droid2323.github.io/WEB_LAB/lab_2)**

---

## 📋 Про проєкт

Односторінковий сайт сервісу акустичного моніторингу «Акустична варта». Сторінка показує поточні вимірювання шуму, напрями роботи, попередження та форму замовлення дослідження. JavaScript та CSS-фреймворки не використовуються.

**Технології:** HTML5 · CSS3 (зовнішній файл) · без JS та фреймворків

---

## 🗂 Структура проєкту

```
lab_2/
├── index.html      # Односторінковий сайт
├── css/
│   └── style.css   # Зовнішній CSS (підключений через <link>)
└── images/
    └── hero.jpg    # Фонове зображення hero-секції
```

---

## 🧩 Семантична структура HTML

```
<body>
 ├── <header>  — логотип, слоган, <nav>
 ├── <main>
 │    ├── <section id="intro">       — вступ + hero з фоном
 │    ├── <section id="monitoring">  — 5 карток поточного моніторингу
 │    ├── <section id="services">    — 4 <article>-картки напрямів
 │    ├── <aside id="warning">       — попередження про перевищення
 │    ├── <section id="log">         — журнал вимірювань <table>
 │    └── <section id="order">       — форма замовлення
 └── <footer>  — контакти, навігація, копірайт
```

---

## 🎯 Що продемонстровано

| CSS-модуль | Де використано |
|---|---|
| Selectors | `*` (скидання), `p` / `h1,h2,h3` (елемент + групування), `.card` / `.btn` (клас), `#warning-text` (id), `input[type="email"]` (атрибут) |
| Colors | Текст, фон секцій, бейджі статусу (норма/перевищення) |
| Backgrounds & Borders | Hero: `background` + `linear-gradient` поверх `hero.jpg`; рамки карток; `.warning` |
| Fonts & Text | Ієрархія заголовків, `font-weight`, `line-height`, `font-size` |
| Box Model | `.measure-card` з `box-sizing: border-box`, `padding`, `margin`, `border` |
| Display | `block` (header, секції), `inline` (nav-links), `inline-block` (картки, колонки форми) |
| Position | `.warning` → `position: relative`; `.point-mark` → `position: absolute` |
| Transform | `.sensor-decor` → `rotate(-15deg) scale(0.95)`, при hover `rotate(15deg) scale(1.15)` |
| Transitions | Кнопка (колір + translateY), картки (підйом + тінь), nav-link (колір) |
| Cascade / Specificity | Навмисний конфлікт на `#warning-text` (деталі нижче) |

---

## ⚡ Приклад каскаду та специфічності

Три правила діють на один елемент `<p id="warning-text" class="warning-text">`:

```css
p             { color: darkslategray; }  /* (0,0,1) — найнижча */
.warning-text { color: #7a1f1f; }        /* (0,1,0) */
#warning-text { color: #b3261e; }        /* (1,0,0) ← перемагає */
```

У DevTools перші два правила будуть перекреслені. Також у файлі є два правила `.status-bad` з однаковою специфічністю — перемагає те, що стоїть нижче в файлі.

---

## Всі інші роботи: **👉 [https://droid2323.github.io/WEB_LAB/](https://droid2323.github.io/WEB_LAB/)**

*Лабораторна робота №2 · WEB-програмування · КН-41 · 2026*