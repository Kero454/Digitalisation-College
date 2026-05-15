# BPM Academy — E-Learning Platform

An interactive online course covering **Business Process Management (BPM)** and **BPMN 2.0** fundamentals. Built with classic web technologies for easy integration and deployment.

## Features

- **5 Learning Modules** covering BPM basics through practical BPMN 2.0 modeling
- **Bilingual** — full content in English and German (switchable)
- **Interactive BPMN Diagrams** — powered by [bpmn.io](https://bpmn.io/) viewer
- **Drag-and-Drop Exercises** — match BPMN elements to their descriptions
- **Section Quizzes** — knowledge checks at the end of each module (70% to pass)
- **Final Exam** — 20 multiple-choice questions across all modules
- **PDF Certificate** — downloadable certificate upon passing the exam
- **Progress Tracking** — automatic progress saving via localStorage
- **Responsive Design** — works on desktop, tablet, and mobile

## Technology Stack

| Technology    | Purpose                              |
|---------------|--------------------------------------|
| HTML5         | Page structure and semantics         |
| CSS3          | Custom styling and layout            |
| JavaScript    | Application logic and interactivity  |
| Bootstrap 5   | Responsive UI framework (CDN)        |
| bpmn-js       | BPMN 2.0 diagram rendering (CDN)    |
| jsPDF         | Client-side PDF generation (CDN)     |
| localStorage  | Client-side progress persistence     |

## Course Modules

1. **Introduction to BPM** — What are business processes? What is BPM? The BPM lifecycle.
2. **Process Analysis & Documentation** — Process identification, discovery methods, analysis techniques.
3. **Introduction to BPMN 2.0** — History, purpose, and diagram types.
4. **BPMN 2.0 Elements & Notation** — Events, Activities, Gateways, Flows, Swimlanes.
5. **Practical BPMN 2.0 Modeling** — Best practices, worked examples, interactive exercises.
6. **Final Exam** — 20 questions, 70% required to pass.
7. **Certificate** — Downloadable PDF with name, score, and date.

## Project Structure

```
├── index.html              Main application page
├── css/
│   └── style.css           Custom styles (extends Bootstrap)
├── js/
│   ├── i18n.js             Internationalization (UI translations EN/DE)
│   ├── content.js          Course content: Modules 1-3
│   ├── content2.js         Course content: Modules 4-5 + Exam questions
│   ├── quiz.js             Quiz rendering and scoring engine
│   ├── certificate.js      PDF certificate generation (jsPDF)
│   ├── bpmn-exercise.js    BPMN diagram viewer + drag-and-drop exercises
│   └── app.js              Main application controller
└── README.md               This file
```

## How to Run

1. **No build step required** — just open `index.html` in a web browser.
2. An internet connection is needed for CDN-loaded libraries (Bootstrap, bpmn-js, jsPDF).
3. For local development, you can use any static file server:
   ```bash
   # Python
   python -m http.server 8080

   # Node.js
   npx serve .
   ```

## How It Works

- **Single-page application** pattern using vanilla JavaScript
- Content is stored as structured data objects in `content.js` / `content2.js`
- The `app.js` controller dynamically renders the active view (welcome, module, quiz, exam, certificate)
- Progress is tracked in the browser's `localStorage` — no server required
- Language can be switched at any time via the EN/DE toggle in the navbar
- Modules unlock sequentially — each module's quiz must be passed before the next module becomes available

## Browser Support

Tested on modern browsers: Chrome, Firefox, Edge, Safari.

## License

Educational project — Digitalisation College, Summer Semester 2026.
