# Kaspersky Client — The Critical 90

В репозитории живут два связанных направления: исходная A4-концепция executive guide и интерактивный промосайт The Critical 90.

## Website

Рабочая ветка: `feat/critical-90-website`.

Сайт собран на React 19 + Vite 6. В нем четыре смысловые секции, полноэкранное меню, интерактивные карточки четырех cyber shifts, вкладки 30/60/90 и подготовленная точка подключения финального PDF.

```bash
npm install
npm run dev
```

Production-проверка:

```bash
npm run build
```

Ключевые документы:

- `docs/esg-site-audit.md` — технический и визуальный аудит `esg.kaspersky.com`.
- `docs/website-foundations.md` — зафиксированные токены, шрифты, сетка, компоненты, motion и правила адаптива.
- `docs/content-map.md` — утвержденная структура и текст лендинга.
- `design-qa.md` — визуальный QA, история исправлений и финальный статус.
- `qa/` — исходные и итоговые визуальные доказательства сравнения.

Чтобы включить реальное скачивание, добавьте утвержденный файл в `public/the-critical-90.pdf` и замените подготовленное состояние в `DownloadSection` на ссылку с атрибутом `download`.

## A4-концепция

Материалы исходного направления остаются в `docs/reference-style-analysis.md`, `docs/visual-concept.md`, `prompts/` и `outputs/`. Правила A4 не распространяются на responsive-реализацию сайта; разграничение зафиксировано в `AGENTS.md`.
