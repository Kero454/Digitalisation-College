# What's New — BPM Academy Update

This document explains the two major additions made to the platform and **exactly how they were implemented in the code**:

1. **Expanded course content** — the curriculum now covers the complete BPMN 2.0 body of knowledge (10 modules instead of 5).
2. **Interactive, editable BPMN diagrams** — learners can now **create and modify** diagrams in a built-in modeler, not just view them.

---

## 1. Expanded Course Content (Modules 6–10)

### What was added
The course grew from **5 modules** to **10 modules**. The five new modules are:

| # | Module | Focus |
|---|--------|-------|
| 6 | **BPMN Events in Depth** | Start / intermediate / boundary / end events; message, timer, error, signal, escalation, terminate triggers; catching vs. throwing |
| 7 | **Activities, Tasks & Subprocesses** | All task types (user, service, send, receive, script, business rule…); subprocesses, call activities; loop & multi-instance markers |
| 8 | **Gateways & Control-Flow Patterns** | All five gateways (exclusive, parallel, inclusive, event-based, complex); split/merge rules; common patterns |
| 9 | **Data, Artifacts & Collaboration** | Data objects/stores, pools & lanes, message flow, collaboration diagrams, artifacts |
| 10 | **Advanced Topics & Hands-On Modeling** | Error handling, transactions & compensation, best practices, **+ the interactive editor** |

Each module keeps the existing structure: multiple bilingual (EN/DE) sections, followed by a **5-question quiz** that must be passed at 70% to unlock the next module.

The **final exam** grew from 20 to **30 questions** (2 new questions per new module).

### How it was done in code

**New file: `js/content3.js`**
- Follows the exact same data shape used by `content.js` / `content2.js`, so no changes to the rendering engine were needed.
- Each module is added with `COURSE_CONTENT.push({ id, icon, title, description, sections[], quiz[] })`.
- Every text field is an object `{ en: "...", de: "..." }` for bilingual support.
- Additional exam questions are appended with `EXAM_QUESTIONS.push(...)`. Because `EXAM_QUESTIONS` (defined in `content2.js`) is a `const` **array**, its binding is constant but its contents remain mutable — so pushing is safe. A guard `if (typeof EXAM_QUESTIONS !== 'undefined')` protects against load-order issues.

**Wired up in `index.html`**
```html
<script src="js/content2.js"></script>
<script src="js/content3.js"></script>   <!-- added, loaded right after content2 -->
```

**Why nothing else needed to change:** the app was already data-driven. `app.js` builds the sidebar, module cards, progress bar and unlock logic by iterating over `COURSE_CONTENT.length` and `EXAM_QUESTIONS.length`. Adding modules to the array automatically:
- adds sidebar entries and welcome-page cards,
- extends the sequential lock/unlock chain,
- recalculates the overall progress percentage,
- feeds the larger question pool into the final exam.

---

## 2. Interactive / Editable BPMN Diagrams

### What was added
Previously, lesson diagrams were **view-only** (pan/zoom). Now Module 10 includes a **full BPMN 2.0 editor** embedded in the page where learners can:

- **add** elements from a palette (events, tasks, gateways, etc.),
- **connect** elements with sequence flows,
- **rename** elements (double-click),
- **morph / change type** via the context menu,
- **delete**, **undo/redo**,
- **load templates** (blank, order processing, onboarding, inclusive gateway),
- **export** their work as **`.bpmn`** (XML) or **`.svg`**.

Three new **view-only example diagrams** were also added to illustrate the new modules: an event-driven process (Module 6), an inclusive gateway (Module 8), and a two-pool collaboration (Module 9).

### How it was done in code

#### a) Loading a real modeler (the key change) — `index.html`
The platform uses the official [`bpmn-js`](https://bpmn.io) library. The **viewer** and **modeler** bundles *both* register the same global `window.BpmnJS`, so loading them naively would cause the second to overwrite the first. The fix is to **capture each global under its own name immediately after it loads**:

```html
<!-- View-only renderer for lesson diagrams -->
<script src=".../bpmn-navigated-viewer.development.js"></script>
<script>window.BpmnViewer = window.BpmnJS;</script>

<!-- Full editable modeler for the hands-on editor -->
<script src=".../bpmn-modeler.development.js"></script>
<script>window.BpmnModeler = window.BpmnJS;</script>
```

The modeler also needs its stylesheets for the palette, context pad and BPMN icon font, added to `<head>`:
```html
<link rel="stylesheet" href=".../assets/diagram-js.css">
<link rel="stylesheet" href=".../assets/bpmn-js.css">
<link rel="stylesheet" href=".../assets/bpmn-font/css/bpmn.css">
```

#### b) Rendering logic — `js/bpmn-exercise.js`
The file was refactored in three ways:

**1. View-only diagrams are now data-driven.**
Instead of hard-coding two container IDs, lesson content just drops a div:
```html
<div class="bpmn-diagram" data-diagram="events"></div>
```
A registry maps each key to its XML + bilingual label:
```js
const DIAGRAM_REGISTRY = {
  order:         { xml: ORDER_PROCESS_XML,     label: {en, de} },
  onboarding:    { xml: ONBOARDING_PROCESS_XML, label: {en, de} },
  events:        { xml: EVENTS_PROCESS_XML,     label: {en, de} },
  gateways:      { xml: GATEWAYS_PROCESS_XML,   label: {en, de} },
  collaboration: { xml: COLLABORATION_XML,      label: {en, de} }
};
```
`initDiagramsForSection()` now scans `document.querySelectorAll('.bpmn-diagram[data-diagram]')`, assigns each an id if missing, marks it `data-rendered="true"` (so it isn't rendered twice), and calls `renderBpmnDiagram()`. The two legacy Module-5 IDs are still handled for backward compatibility.

`renderBpmnDiagram()` was updated to use the dedicated **`BpmnViewer`** global (falling back to `BpmnJS`) so the modeler bundle can no longer break the read-only diagrams.

**2. New `initEditorsForSection()` mounts the editor.**
Lesson content drops:
```html
<div class="bpmn-editor-mount" data-editor="playground"></div>
```
For each mount, the code:
- injects a **toolbar** (template dropdown, New, Fit, Undo, Redo, Download `.bpmn`, Download `.svg`) plus a canvas div,
- instantiates the modeler: `new BpmnModeler({ container: '#<id>-canvas' })`,
- stores the instance on the DOM node (`mount._modeler`) so multiple editors can coexist,
- imports a blank starter diagram and fits it to the viewport.

**3. Toolbar handlers (exposed on the `BpmnExercise` public API):**
```js
editorNew(id)            // importXML(BLANK_DIAGRAM_XML)
editorLoadTemplate(id,k) // importXML(EDITOR_TEMPLATES[k].xml)
editorZoomFit(id)        // canvas.zoom('fit-viewport')
editorUndo(id)/Redo(id)  // commandStack.undo()/redo()
editorDownloadXML(id)    // modeler.saveXML({format:true}) -> Blob download
editorDownloadSVG(id)    // modeler.saveSVG()             -> Blob download
```
Exports use `saveXML` / `saveSVG` (the modeler's built-in serializers) and a small `downloadBlob()` helper that creates an object URL and triggers a download — **fully client-side, no server involved**.

#### c) Hooking into the existing flow — `js/app.js` (no change required)
`app.js` already calls, after rendering any section:
```js
setTimeout(() => {
  BpmnExercise.initDiagramsForSection();
  BpmnExercise.renderExercises();
}, 100);
```
Since `initDiagramsForSection()` now *also* calls `initEditorsForSection()` internally, both the new diagrams and the editor initialize automatically — **no controller changes were needed.**

#### d) New BPMN example diagrams — `js/bpmn-exercise.js`
Three new valid BPMN 2.0 XML strings were authored **with full Diagram Interchange (DI)** coordinates so they render correctly:
- `EVENTS_PROCESS_XML` — message start, timer intermediate catch, **error boundary event** on a task routing to a failure path.
- `GATEWAYS_PROCESS_XML` — an **inclusive (OR)** gateway split/join (email and/or SMS).
- `COLLABORATION_XML` — **two pools** (Customer, Support Team) with **message flows** between them, demonstrating that sequence flow stays inside a pool.
- `BLANK_DIAGRAM_XML` — a one-element starter used by the editor's "New".

#### e) Styling — `css/style.css`
Added `.bpmn-editor-wrapper`, `.bpmn-editor-toolbar`, `.bpmn-editor-actions`, and `.bpmn-editor-canvas` (with a subtle dot grid and a 520px height, responsive down to 380px on mobile).

#### f) Translations — `js/i18n.js`
Added `editor_*` keys (title, new, load template, fit, undo, redo, download xml/svg) in English and German, used for the toolbar button tooltips.

---

## Files Changed / Added

| File | Change |
|------|--------|
| `js/content3.js` | **New** — Modules 6–10 + 10 extra exam questions |
| `js/bpmn-exercise.js` | Data-driven diagram registry, new example diagrams, **full editor** (mount + toolbar + export) |
| `js/i18n.js` | New `editor_*` bilingual strings |
| `index.html` | Load bpmn-js **Modeler** (+CSS), capture `BpmnViewer`/`BpmnModeler` globals, add `content3.js` |
| `css/style.css` | Editor toolbar + canvas styles |

## How to Run
```bash
python -m http.server 8080
# then open http://localhost:8080
```
Navigate to **Module 10 → "Hands-On: The BPMN Editor"** to try creating and exporting your own diagram. (Modules unlock sequentially — pass each module quiz to reach Module 10, or this can be adjusted for demos.)

## Verification Performed
- `node --check` syntax validation on all modified JS files.
- Content integrity test: confirmed **10 modules** load and the exam has **30 questions**.
- BPMN XML validation: all **6 diagrams** have balanced `<definitions>` and every DI `bpmnElement` reference resolves to a real element id.
- All files serve over HTTP 200 from the local server.
