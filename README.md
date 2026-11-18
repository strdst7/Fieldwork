# Fieldwork: AI Foundations

A complete, non-technical AI course presented as an interactive field guide. The course is designed for six hours of self-paced study over three weeks.

## Course materials

- `COURSE-OUTLINE.md`: an editable outline with objectives, audience, pace, modules, learning outcomes, activities, tools, and next steps.
- `public/AI-Foundations-Course-Guide.pdf`: a 10-page printable guide with the full readings, practice activities, glossary, and answer key. The website's **Download syllabus** link downloads this file.
- `src/course.ts`: the curriculum, cases, exercises, quizzes, glossary, and resource library used in the application.

## Run locally

1. Install packages with `npm install`.
2. Start the development server with `npm run dev`.
3. Run `npx tsc --noEmit` to check TypeScript.
4. Create a production build with `npm run build` and serve it with `npm run preview`.

## Learning experience

To verify the learning workflows, install the test browser once with `npx playwright install --with-deps chromium`, start the development server, and run `node tests/course-flows.cjs`. Set `TEST_URL` to check a production preview instead. The checks cover all six modules, quiz feedback, notes, bookmarks, downloads, persistence, and mobile navigation.

After editing the curriculum, run `node scripts/export-course-guide.cjs` to regenerate the printable PDF. The exporter checks all ten pages for content overflow before saving the guide.

The overview introduces the course and its six expandable modules. Each module offers a reading, a paper-friendly exercise, a private reflection, and a knowledge check with explanations and retries. Learners can follow the suggested sequence or open any module directly.

Progress, notes, resource bookmarks, and exercise drafts are stored locally in the browser. The notebook supports creating, editing, deleting, and exporting notes. No account, backend, AI API key, or paid AI service is required. Clearing browser storage removes saved work; notebook export provides a portable copy.

## Project structure

- `src/App.tsx`: application entry component and shared learning state.
- `src/components/`: overview, curriculum, module reader, resource library, notebook, and shared visual elements.
- `src/lib.ts`: local persistence and hash-based routing, including browser back and forward navigation.
- `src/index.css`: responsive paper-and-ink visual system, motion, and reduced-motion support.
- `public/fonts/`: locally served typefaces and their open font licenses.
- `public/images/computer-study.webp`: optimized original course illustration.

The application uses React, TypeScript, Vite, and Tailwind CSS v4. All learning content is available locally; only the optional external resources require visiting other websites.
