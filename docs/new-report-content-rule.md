# New Report Content Rule

Source of truth:

`/Users/erdc/Documents/ChatGPT/Kaspersky-Client/Taks Docs/Отчет длинная версия.docx`

This DOCX is the only source of truth for the new report's content.

Rules:

- The working format for the new report is A4 portrait.
- Creative pages must be generated as complete images through `image_gen`.
- Do not add or correct text with a separate programmatic overlay after image generation.
- Every illustration must be based on the exact slide context from the DOCX.
- The old PDF defines style only; the DOCX defines meaning and content.
- Do not rewrite the content.
- Do not paraphrase the content.
- Do not summarize the content unless the user explicitly asks for a separate summary artifact.
- Do not translate the content.
- Do not correct the content.
- Do not invent new headings, claims, statistics, captions, labels, or supporting text.
- Do not use the old PDF as a content source; use it only as a visual/style reference.
- Do not use earlier generated `output/*` runs as reference material.
- If a slide is too dense, split it into more slides or redesign the layout while keeping every selected text fragment verbatim.

Practical slide workflow:

1. Extract the exact source block from the DOCX.
2. Assign the block to an A4 portrait page.
3. Preserve every selected word, number, punctuation mark, and capitalization.
4. Define the illustration concept from the same DOCX block, not from a generic cybersecurity idea.
5. Generate the complete creative page through `image_gen`.
6. QA the visible page text against the DOCX before calling it final; if text fidelity fails, regenerate, do not patch text over the image.
