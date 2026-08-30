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

- `Header`: fixed, blur-backed, выровнен по общей 12-колоночной сетке; menu, brand, section counter, report CTA.
- `Menu panel`: полноэкранная навигация из четырех разделов с morphing-иконками.
- `Hero`: короткий тезис и CTA слева; интерактивный decision-field canvas и прозрачный 3D-объект справа.
- `Decision`: lead и supporting copy вынесены из hero в отдельную смысловую сцену.
- `Shift cards`: единая 4-колоночная система, четыре состояния и синхронизированная предметная метафора.
- `Evidence`: пять результатов отчета оформлены отдельной интерактивной сценой.
- `90-day framework`: отдельная intro-сцена и три постоянно видимых 30/60/90 карточки.
- `Download`: типографический финал и dialog-интеграция для будущего PDF.

## Сетка

- Максимальная ширина content frame: 1440 px.
- Desktop: единая 12-колоночная сетка с одинаковыми gutters в header и всех секциях.
- Tablet ≤1080 px: одна колонка, visual ниже текста.
- Mobile ≤760 px: 18 px поля, compact header, full-width CTA, без scroll snap.
- Минимальная ширина: 320 px.

## Motion

- Reveal: 760 ms, `cubic-bezier(.2,.8,.2,1)`.
- Menu: 280 ms.
- Hover: 180–260 ms.
- Hero canvas: четыре входных сигнала сходятся к интерактивному focus point.
- Иконки: `morphicons` + Lucide data, interruptible spring `snappy`; все функциональные пиктограммы меняют смысловое состояние.
- При `prefers-reduced-motion: reduce` длительности схлопываются до 0.01 ms.

## Контент и tone of voice

Текст executive, конкретный и business-first. Не добавлять fear language, технический жаргон или generic promises. Все четыре shifts и 30/60/90 формулировки берутся из `docs/content-map.md`.

## Правила дальнейшей замены ассетов

1. Сохранять предметную метафору и существующий focal point.
2. Не вставлять изображения с текстом внутрь crop-зоны.
3. Hero asset должен быть PNG/WebP с настоящим alpha channel и выдерживать portrait crop на mobile и split crop на desktop.
4. Все новые предметные иллюстрации генерируются без фона, текста и логотипов.
5. Не использовать hacker/hoodie/lock/shield clichés.
6. После каждой замены повторять desktop и mobile browser QA.

## Известная интеграционная точка

Финальный PDF не был приложен. Сейчас CTA открывает явное служебное состояние. После получения файла добавить `public/the-critical-90.pdf` и заменить кнопку на реальное скачивание.
