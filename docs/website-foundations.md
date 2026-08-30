# Website foundations — The Critical 90

## Дизайн-направление

Рабочая формула: **Kaspersky corporate web discipline × Decision Spectrum art direction**.

Основа — почти черный холст, точная белая типографика, mint как функциональный сигнал и крупные предметные сцены из презентации. На светлой секции 30/60/90 используется аналитический режим `#F4F4F4`, чтобы визуально отделить action plan от threat narrative.

## Типографика

Единственное основное семейство: `Kaspersky Sans Display`, локально в WOFF2.

- Display: weight 400, tight tracking `-0.035em`, line-height 0.94–0.98.
- Lead: 22–32 px, line-height 1.25.
- Body: 17–22 px, line-height 1.42.
- Eyebrow: 14 px, weight 500, uppercase, tracking 0.09em.
- UI: 13–18 px, weight 400–600.
- Fallback: Arial, sans-serif.

## Design tokens

```css
--green: #29ccb1;
--green-bright: #3de8ca;
--green-link: #00a88e;
--graphite: #1d1d1b;
--ink: #121514;
--grey-extra: #f4f4f4;
--blue: #264e8a;
--violet: #7350bc;
--page-pad: clamp(20px, 4vw, 64px);
--header-height: 72px;
--radius: 20px;
```

## Компоненты

- `Header`: fixed, blur-backed, menu, brand, section counter, report CTA.
- `Menu panel`: полноэкранная навигация из четырех разделов плюс prism-art.
- `Hero`: 55/45 split, ключевой тезис, supporting copy, cover scene.
- `Shift cards`: Swiper, четыре интерактивных состояния, один активный media stage.
- `90-day framework`: light section, tabs 30/60/90, synchronized detail and tower.
- `Download`: видео-финал, крупный CTA, dialog-интеграция для будущего PDF.

## Сетка

- Максимальная ширина content frame: 1600 px.
- Desktop: двухколоночные split-секции.
- Tablet ≤1080 px: одна колонка, visual ниже текста.
- Mobile ≤760 px: 18 px поля, compact header, full-width CTA, без scroll snap.
- Минимальная ширина: 320 px.

## Motion

- Reveal: 760 ms, `cubic-bezier(.2,.8,.2,1)`.
- Menu: 280 ms.
- Hover: 180 ms.
- Media hover: 900 ms.
- При `prefers-reduced-motion: reduce` длительности схлопываются до 0.01 ms.

## Контент и tone of voice

Текст executive, конкретный и business-first. Не добавлять fear language, технический жаргон или generic promises. Все четыре shifts и 30/60/90 формулировки берутся из `docs/content-map.md`.

## Правила дальнейшей замены ассетов

1. Сохранять предметную метафору и существующий focal point.
2. Не вставлять изображения с текстом внутрь crop-зоны.
3. Hero asset должен выдерживать portrait crop на mobile и split crop на desktop.
4. Фоновое видео: MP4 H.264, muted loop, желательно до 8–10 MB после финальной оптимизации.
5. Для каждого видео нужен WebP poster.
6. Не использовать hacker/hoodie/lock/shield clichés.
7. После каждой замены повторять desktop и mobile browser QA.

## Известная интеграционная точка

Финальный PDF не был приложен. Сейчас CTA открывает явное служебное состояние. После получения файла добавить `public/the-critical-90.pdf` и заменить кнопку на реальное скачивание.
