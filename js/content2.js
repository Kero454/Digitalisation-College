/* ================================================================
   content2.js — Course Content Data (Modules 4-5 + Final Exam)
   -----------------------------------------------------------------
   Continues from content.js. Pushes Modules 4 and 5 into the
   COURSE_CONTENT array and defines the EXAM_QUESTIONS array.
   ================================================================ */

/* ==============================================================
   MODULE 4: BPMN 2.0 Elements & Notation
   Covers: Events, Activities, Gateways, Flows, Pools/Lanes, Artifacts
============================================================== */
COURSE_CONTENT.push({
    id: "module4",
    icon: "bi-puzzle",
    title: { en: "BPMN 2.0 Elements & Notation", de: "BPMN 2.0 Elemente & Notation" },
    description: {
        en: "Master the core BPMN elements: Events, Activities, Gateways, Flows, and Swimlanes.",
        de: "Beherrschen Sie die BPMN-Kernelemente: Ereignisse, Aktivitäten, Gateways, Flüsse und Swimlanes."
    },
    sections: [
        {
            title: { en: "Events", de: "Ereignisse (Events)" },
            html: {
                en: `<p><strong>Events</strong> represent something that happens during a process. They are shown as <strong>circles</strong> and affect the flow of the process. BPMN distinguishes three main event types based on when they occur:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Event Type</th><th>Symbol</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Start Event</strong></td><td><span class="bpmn-symbol bpmn-start-event"></span></td><td>Triggers the process. Thin single border circle. Every process needs at least one.</td></tr>
                        <tr><td><strong>Intermediate Event</strong></td><td><span class="bpmn-symbol bpmn-intermediate-event"></span></td><td>Occurs during the process. Double border circle. Can catch or throw events.</td></tr>
                        <tr><td><strong>End Event</strong></td><td><span class="bpmn-symbol bpmn-end-event"></span></td><td>Marks the end of a process path. Thick single border circle.</td></tr>
                    </tbody>
                </table>
                <h4>Event Triggers (Markers)</h4>
                <p>Events can have internal markers that specify what triggers them:</p>
                <ul>
                    <li><strong>None (blank):</strong> Generic start/end with no specific trigger</li>
                    <li><strong>Message (envelope icon):</strong> Triggered by receiving or sending a message</li>
                    <li><strong>Timer (clock icon):</strong> Triggered by a specific time or cycle</li>
                    <li><strong>Error (lightning icon):</strong> Triggered by an error condition</li>
                    <li><strong>Signal (triangle icon):</strong> Triggered by a broadcast signal</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Remember:</strong> Start Events are thin circles, Intermediate Events have double borders, and End Events have thick borders. The inner marker tells you the trigger type.</div>
                </div>`,
                de: `<p><strong>Ereignisse (Events)</strong> repräsentieren etwas, das während eines Prozesses geschieht. Sie werden als <strong>Kreise</strong> dargestellt und beeinflussen den Prozessfluss. BPMN unterscheidet drei Haupttypen nach ihrem Auftreten:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Ereignistyp</th><th>Symbol</th><th>Beschreibung</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Startereignis</strong></td><td><span class="bpmn-symbol bpmn-start-event"></span></td><td>Löst den Prozess aus. Dünner Kreisrand. Jeder Prozess braucht mindestens eines.</td></tr>
                        <tr><td><strong>Zwischenereignis</strong></td><td><span class="bpmn-symbol bpmn-intermediate-event"></span></td><td>Tritt während des Prozesses auf. Doppelter Kreisrand. Kann Ereignisse empfangen oder senden.</td></tr>
                        <tr><td><strong>Endereignis</strong></td><td><span class="bpmn-symbol bpmn-end-event"></span></td><td>Markiert das Ende eines Prozessweges. Dicker Kreisrand.</td></tr>
                    </tbody>
                </table>
                <h4>Ereignisauslöser (Marker)</h4>
                <p>Ereignisse können innere Marker haben, die den Auslöser angeben:</p>
                <ul>
                    <li><strong>Keiner (leer):</strong> Generischer Start/Ende ohne spezifischen Auslöser</li>
                    <li><strong>Nachricht (Briefumschlag):</strong> Durch Empfang oder Versand einer Nachricht ausgelöst</li>
                    <li><strong>Timer (Uhr):</strong> Durch eine bestimmte Zeit oder einen Zyklus ausgelöst</li>
                    <li><strong>Fehler (Blitz):</strong> Durch eine Fehlerbedingung ausgelöst</li>
                    <li><strong>Signal (Dreieck):</strong> Durch ein Broadcast-Signal ausgelöst</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Merke:</strong> Startereignisse haben dünne Kreise, Zwischenereignisse doppelte Ränder, und Endereignisse dicke Ränder. Der innere Marker zeigt den Auslösertyp.</div>
                </div>`
            }
        },
        {
            title: { en: "Activities (Tasks & Sub-Processes)", de: "Aktivitäten (Tasks & Teilprozesse)" },
            html: {
                en: `<p><strong>Activities</strong> represent work that is performed in the process. They are shown as <strong>rounded rectangles</strong> <span class="bpmn-symbol bpmn-task">Task</span>.</p>
                <h4>Types of Tasks</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Task Type</th><th>Marker</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><strong>User Task</strong></td><td>Person icon</td><td>Performed by a human user, often with a form or UI</td></tr>
                        <tr><td><strong>Service Task</strong></td><td>Gear icon</td><td>Automated task performed by a software system</td></tr>
                        <tr><td><strong>Manual Task</strong></td><td>Hand icon</td><td>Physical work done without IT system support</td></tr>
                        <tr><td><strong>Script Task</strong></td><td>Script icon</td><td>Executed by a business process engine (script/code)</td></tr>
                        <tr><td><strong>Send Task</strong></td><td>Filled envelope</td><td>Sends a message to an external participant</td></tr>
                        <tr><td><strong>Receive Task</strong></td><td>Empty envelope</td><td>Waits for a message from an external participant</td></tr>
                    </tbody>
                </table>
                <h4>Sub-Processes</h4>
                <p>A <strong>Sub-Process</strong> is an activity that contains its own internal process. It can be shown collapsed (with a [+] marker) or expanded (showing the contained elements).</p>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Best Practice:</strong> Use sub-processes to encapsulate complex logic. This keeps the main diagram clean and readable while allowing drill-down into details.</div>
                </div>`,
                de: `<p><strong>Aktivitäten</strong> repräsentieren Arbeit, die im Prozess ausgeführt wird. Sie werden als <strong>abgerundete Rechtecke</strong> <span class="bpmn-symbol bpmn-task">Task</span> dargestellt.</p>
                <h4>Arten von Tasks</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Task-Typ</th><th>Marker</th><th>Beschreibung</th></tr></thead>
                    <tbody>
                        <tr><td><strong>User Task</strong></td><td>Personen-Symbol</td><td>Wird von einem menschlichen Benutzer ausgeführt, oft mit Formular</td></tr>
                        <tr><td><strong>Service Task</strong></td><td>Zahnrad-Symbol</td><td>Automatisierte Aufgabe durch ein Softwaresystem</td></tr>
                        <tr><td><strong>Manual Task</strong></td><td>Hand-Symbol</td><td>Physische Arbeit ohne IT-Systemunterstützung</td></tr>
                        <tr><td><strong>Script Task</strong></td><td>Skript-Symbol</td><td>Durch eine Process Engine ausgeführt (Skript/Code)</td></tr>
                        <tr><td><strong>Send Task</strong></td><td>Gefüllter Briefumschlag</td><td>Sendet eine Nachricht an einen externen Teilnehmer</td></tr>
                        <tr><td><strong>Receive Task</strong></td><td>Leerer Briefumschlag</td><td>Wartet auf eine Nachricht eines externen Teilnehmers</td></tr>
                    </tbody>
                </table>
                <h4>Teilprozesse (Sub-Processes)</h4>
                <p>Ein <strong>Teilprozess</strong> ist eine Aktivität, die einen eigenen internen Prozess enthält. Er kann eingeklappt (mit [+]-Marker) oder ausgeklappt (mit sichtbaren Elementen) dargestellt werden.</p>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Best Practice:</strong> Verwenden Sie Teilprozesse, um komplexe Logik zu kapseln. So bleibt das Hauptdiagramm übersichtlich und lesbar.</div>
                </div>`
            }
        },
        {
            title: { en: "Gateways", de: "Gateways" },
            html: {
                en: `<p><strong>Gateways</strong> control the flow of a process — they determine branching, forking, merging, and joining of paths. They are shown as <strong>diamond shapes</strong> <span class="bpmn-symbol bpmn-gateway"><span class="bpmn-gateway-inner">X</span></span>.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Gateway</th><th>Symbol</th><th>Behavior</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Exclusive (XOR)</strong></td><td>X or empty diamond</td><td>Only <strong>one</strong> path is taken based on a condition. Like an "if-else" decision.</td></tr>
                        <tr><td><strong>Parallel (AND)</strong></td><td>+ inside diamond</td><td><strong>All</strong> paths are taken simultaneously. Used to fork and synchronize parallel work.</td></tr>
                        <tr><td><strong>Inclusive (OR)</strong></td><td>O inside diamond</td><td><strong>One or more</strong> paths can be taken based on conditions.</td></tr>
                        <tr><td><strong>Event-Based</strong></td><td>Pentagon inside diamond</td><td>The path is determined by which event occurs first (e.g., message received vs. timer expired).</td></tr>
                    </tbody>
                </table>
                <h4>Splitting vs. Merging</h4>
                <ul>
                    <li><strong>Split (Diverging):</strong> One incoming flow, multiple outgoing flows — the gateway decides which path(s) to take.</li>
                    <li><strong>Merge (Converging):</strong> Multiple incoming flows, one outgoing flow — the gateway synchronizes or merges the paths.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Common Error:</strong> Always use the same gateway type for splitting and merging. If you split with a Parallel Gateway, you must merge with a Parallel Gateway!</div>
                </div>`,
                de: `<p><strong>Gateways</strong> steuern den Prozessfluss — sie bestimmen Verzweigungen, Aufspaltungen, Zusammenführungen und Synchronisationen. Sie werden als <strong>Rauten</strong> <span class="bpmn-symbol bpmn-gateway"><span class="bpmn-gateway-inner">X</span></span> dargestellt.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Gateway</th><th>Symbol</th><th>Verhalten</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Exklusiv (XOR)</strong></td><td>X oder leere Raute</td><td>Nur <strong>ein</strong> Pfad wird basierend auf einer Bedingung gewählt. Wie eine „Wenn-Dann"-Entscheidung.</td></tr>
                        <tr><td><strong>Parallel (AND)</strong></td><td>+ in der Raute</td><td><strong>Alle</strong> Pfade werden gleichzeitig genommen. Für parallele Arbeit.</td></tr>
                        <tr><td><strong>Inklusiv (OR)</strong></td><td>O in der Raute</td><td><strong>Ein oder mehrere</strong> Pfade können basierend auf Bedingungen gewählt werden.</td></tr>
                        <tr><td><strong>Ereignisbasiert</strong></td><td>Pentagon in der Raute</td><td>Der Pfad wird durch das zuerst eintretende Ereignis bestimmt.</td></tr>
                    </tbody>
                </table>
                <h4>Aufspaltung vs. Zusammenführung</h4>
                <ul>
                    <li><strong>Aufspaltung (Divergierend):</strong> Ein eingehender Fluss, mehrere ausgehende — das Gateway entscheidet über den/die Pfad(e).</li>
                    <li><strong>Zusammenführung (Konvergierend):</strong> Mehrere eingehende Flüsse, ein ausgehender — das Gateway synchronisiert oder führt zusammen.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Häufiger Fehler:</strong> Verwenden Sie immer den gleichen Gateway-Typ zum Aufspalten und Zusammenführen. Wenn Sie mit einem Parallel-Gateway aufspalten, müssen Sie auch mit einem Parallel-Gateway zusammenführen!</div>
                </div>`
            }
        },
        {
            title: { en: "Connecting Objects & Swimlanes", de: "Verbindungsobjekte & Swimlanes" },
            html: {
                en: `<h4>Connecting Objects</h4>
                <p>These elements connect flow objects to each other:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Element</th><th>Visual</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Sequence Flow</strong></td><td>Solid arrow →</td><td>Shows the order of activities within a process. The main flow.</td></tr>
                        <tr><td><strong>Message Flow</strong></td><td>Dashed arrow ⇢</td><td>Shows communication between different participants (across pools).</td></tr>
                        <tr><td><strong>Association</strong></td><td>Dotted line ···</td><td>Links artifacts (data objects, annotations) to flow elements.</td></tr>
                    </tbody>
                </table>
                <h4>Swimlanes: Pools and Lanes</h4>
                <p><strong>Pools</strong> represent participants (e.g., organizations, departments). Each pool contains its own process. <strong>Lanes</strong> subdivide a pool to show which role or department performs each activity.</p>
                <ul>
                    <li><strong>Pool:</strong> A container for a complete process of one participant. Shown as a large rectangle with a label.</li>
                    <li><strong>Lane:</strong> A horizontal or vertical partition within a pool. Each lane represents a role (e.g., "Manager", "Employee", "System").</li>
                </ul>
                <h4>Artifacts</h4>
                <ul>
                    <li><strong>Data Object:</strong> Represents information used or produced by activities (document icon).</li>
                    <li><strong>Group:</strong> A dashed rounded rectangle that visually groups elements for documentation purposes.</li>
                    <li><strong>Text Annotation:</strong> A note attached to an element to provide additional information.</li>
                </ul>`,
                de: `<h4>Verbindungsobjekte</h4>
                <p>Diese Elemente verbinden Flussobjekte miteinander:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Element</th><th>Darstellung</th><th>Zweck</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Sequenzfluss</strong></td><td>Durchgezogener Pfeil →</td><td>Zeigt die Reihenfolge der Aktivitäten innerhalb eines Prozesses.</td></tr>
                        <tr><td><strong>Nachrichtenfluss</strong></td><td>Gestrichelter Pfeil ⇢</td><td>Zeigt Kommunikation zwischen verschiedenen Teilnehmern (über Pools hinweg).</td></tr>
                        <tr><td><strong>Assoziation</strong></td><td>Gepunktete Linie ···</td><td>Verknüpft Artefakte (Datenobjekte, Anmerkungen) mit Flusselementen.</td></tr>
                    </tbody>
                </table>
                <h4>Swimlanes: Pools und Lanes</h4>
                <p><strong>Pools</strong> repräsentieren Teilnehmer (z.B. Organisationen, Abteilungen). Jeder Pool enthält seinen eigenen Prozess. <strong>Lanes</strong> unterteilen einen Pool, um zu zeigen, welche Rolle welche Aktivität ausführt.</p>
                <ul>
                    <li><strong>Pool:</strong> Ein Container für den kompletten Prozess eines Teilnehmers. Dargestellt als großes Rechteck mit Bezeichnung.</li>
                    <li><strong>Lane:</strong> Eine horizontale oder vertikale Unterteilung innerhalb eines Pools. Jede Lane repräsentiert eine Rolle (z.B. „Manager", „Mitarbeiter", „System").</li>
                </ul>
                <h4>Artefakte</h4>
                <ul>
                    <li><strong>Datenobjekt:</strong> Repräsentiert Informationen, die von Aktivitäten genutzt oder erzeugt werden (Dokument-Symbol).</li>
                    <li><strong>Gruppe:</strong> Ein gestricheltes, abgerundetes Rechteck zur visuellen Gruppierung von Elementen.</li>
                    <li><strong>Textanmerkung:</strong> Eine Notiz, die an ein Element angehängt wird, um zusätzliche Informationen zu liefern.</li>
                </ul>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "How is a Start Event represented in BPMN?", de: "Wie wird ein Startereignis in BPMN dargestellt?" },
            options: {
                en: ["Thick circle", "Thin single circle", "Diamond shape", "Rounded rectangle"],
                de: ["Dicker Kreis", "Dünner einfacher Kreis", "Rautenform", "Abgerundetes Rechteck"]
            },
            correct: 1
        },
        {
            question: { en: "What does an Exclusive Gateway (XOR) do?", de: "Was macht ein exklusives Gateway (XOR)?" },
            options: {
                en: ["Takes all paths simultaneously", "Takes exactly one path based on a condition", "Waits for all incoming paths", "Sends a message"],
                de: ["Nimmt alle Pfade gleichzeitig", "Nimmt genau einen Pfad basierend auf einer Bedingung", "Wartet auf alle eingehenden Pfade", "Sendet eine Nachricht"]
            },
            correct: 1
        },
        {
            question: { en: "What is the difference between Sequence Flow and Message Flow?", de: "Was ist der Unterschied zwischen Sequenz- und Nachrichtenfluss?" },
            options: {
                en: ["They are the same", "Sequence Flow is within a process; Message Flow is between participants", "Message Flow is faster", "Sequence Flow uses dashed lines"],
                de: ["Sie sind identisch", "Sequenzfluss ist innerhalb eines Prozesses; Nachrichtenfluss zwischen Teilnehmern", "Nachrichtenfluss ist schneller", "Sequenzfluss verwendet gestrichelte Linien"]
            },
            correct: 1
        },
        {
            question: { en: "What is a Lane in BPMN?", de: "Was ist eine Lane in BPMN?" },
            options: {
                en: ["A type of event", "A subdivision within a Pool showing roles", "A type of gateway", "A connection between tasks"],
                de: ["Eine Art Ereignis", "Eine Unterteilung innerhalb eines Pools für Rollen", "Eine Art Gateway", "Eine Verbindung zwischen Tasks"]
            },
            correct: 1
        },
        {
            question: { en: "Which task type is performed by a software system automatically?", de: "Welcher Task-Typ wird automatisch von einem Softwaresystem ausgeführt?" },
            options: {
                en: ["User Task", "Manual Task", "Service Task", "Script Task"],
                de: ["User Task", "Manual Task", "Service Task", "Script Task"]
            },
            correct: 2
        }
    ]
});

/* ==============================================================
   MODULE 5: Practical BPMN 2.0 Modeling
   Covers: Best practices, worked examples with BPMN viewer,
   and interactive exercises.
============================================================== */
COURSE_CONTENT.push({
    id: "module5",
    icon: "bi-pencil-square",
    title: { en: "Practical BPMN 2.0 Modeling", de: "Praktische BPMN 2.0 Modellierung" },
    description: {
        en: "Apply your knowledge with real examples, interactive diagrams, and hands-on exercises.",
        de: "Wenden Sie Ihr Wissen mit realen Beispielen, interaktiven Diagrammen und praktischen Übungen an."
    },
    sections: [
        {
            title: { en: "Modeling Best Practices", de: "Best Practices der Modellierung" },
            html: {
                en: `<p>Creating good BPMN models is both an art and a science. Follow these best practices to ensure your diagrams are clear and useful:</p>
                <h4>Naming Conventions</h4>
                <ul>
                    <li><strong>Activities:</strong> Use verb + noun format — e.g., "Review Application", "Send Confirmation", "Process Payment"</li>
                    <li><strong>Events:</strong> Use noun + past participle — e.g., "Order Received", "Payment Completed"</li>
                    <li><strong>Gateways:</strong> Use a question — e.g., "Order valid?", "Amount > 1000€?"</li>
                </ul>
                <h4>Structural Guidelines</h4>
                <ul>
                    <li>Every process should have <strong>one start event</strong> and at least one end event</li>
                    <li>Sequence flows should generally go <strong>left to right</strong> or <strong>top to bottom</strong></li>
                    <li>Avoid crossing sequence flows whenever possible</li>
                    <li>Match split gateways with corresponding merge gateways of the <strong>same type</strong></li>
                    <li>Use sub-processes to manage complexity — don't put more than 15-20 elements on one level</li>
                </ul>
                <h4>Common Mistakes to Avoid</h4>
                <ul>
                    <li>Missing end events or having dead-end paths</li>
                    <li>Using sequence flows between different pools (use message flows instead!)</li>
                    <li>Mixing up exclusive and parallel gateways</li>
                    <li>Creating overly detailed models that are hard to read</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Golden Rule:</strong> A good BPMN model should be understandable without needing additional explanation. If someone needs to ask "what does this mean?", the model needs improvement.</div>
                </div>`,
                de: `<p>Gute BPMN-Modelle zu erstellen ist Kunst und Wissenschaft zugleich. Befolgen Sie diese Best Practices für klare und nützliche Diagramme:</p>
                <h4>Namenskonventionen</h4>
                <ul>
                    <li><strong>Aktivitäten:</strong> Verwenden Sie Verb + Substantiv — z.B. „Antrag prüfen", „Bestätigung senden", „Zahlung verarbeiten"</li>
                    <li><strong>Ereignisse:</strong> Verwenden Sie Substantiv + Partizip — z.B. „Bestellung eingegangen", „Zahlung abgeschlossen"</li>
                    <li><strong>Gateways:</strong> Verwenden Sie eine Frage — z.B. „Bestellung gültig?", „Betrag > 1000€?"</li>
                </ul>
                <h4>Strukturelle Richtlinien</h4>
                <ul>
                    <li>Jeder Prozess sollte <strong>ein Startereignis</strong> und mindestens ein Endereignis haben</li>
                    <li>Sequenzflüsse sollten von <strong>links nach rechts</strong> oder <strong>oben nach unten</strong> verlaufen</li>
                    <li>Vermeiden Sie sich kreuzende Sequenzflüsse</li>
                    <li>Verwenden Sie zum Zusammenführen den <strong>gleichen Gateway-Typ</strong> wie zum Aufspalten</li>
                    <li>Nutzen Sie Teilprozesse bei Komplexität — nicht mehr als 15-20 Elemente pro Ebene</li>
                </ul>
                <h4>Häufige Fehler vermeiden</h4>
                <ul>
                    <li>Fehlende Endereignisse oder Sackgassen</li>
                    <li>Sequenzflüsse zwischen verschiedenen Pools (verwenden Sie Nachrichtenflüsse!)</li>
                    <li>Verwechslung von exklusiven und parallelen Gateways</li>
                    <li>Zu detaillierte Modelle, die schwer lesbar sind</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Goldene Regel:</strong> Ein gutes BPMN-Modell sollte ohne zusätzliche Erklärung verständlich sein. Wenn jemand fragen muss „Was bedeutet das?", muss das Modell verbessert werden.</div>
                </div>`
            }
        },
        {
            title: { en: "Example: Order Processing", de: "Beispiel: Auftragsbearbeitung" },
            html: {
                en: `<p>Let's walk through a complete BPMN example of an <strong>Order Processing</strong> workflow. This process covers what happens from receiving a customer order to delivering the product.</p>
                <h4>Process Description</h4>
                <ol>
                    <li>The process starts when a <strong>customer order is received</strong> (Start Event)</li>
                    <li>An employee <strong>checks the order</strong> for completeness and validity</li>
                    <li>An Exclusive Gateway checks: <strong>"Is the order valid?"</strong></li>
                    <li>If <strong>No</strong>: The order is <strong>rejected</strong>, and a rejection notice is sent (End Event)</li>
                    <li>If <strong>Yes</strong>: A Parallel Gateway splits into two parallel activities:
                        <ul>
                            <li><strong>Process payment</strong></li>
                            <li><strong>Prepare shipment</strong></li>
                        </ul>
                    </li>
                    <li>After both activities complete (Parallel Gateway merge), the <strong>order is shipped</strong></li>
                    <li>A <strong>confirmation email</strong> is sent to the customer (End Event)</li>
                </ol>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i>
                    <div><strong>Interactive Diagram:</strong> Below you can see this process modeled in BPMN 2.0. Use the mouse to pan and zoom within the diagram.</div>
                </div>
                <div id="bpmn-order-process"></div>`,
                de: `<p>Betrachten wir ein vollständiges BPMN-Beispiel eines <strong>Auftragsbearbeitungs</strong>-Workflows. Dieser Prozess deckt ab, was vom Eingang einer Kundenbestellung bis zur Produktlieferung geschieht.</p>
                <h4>Prozessbeschreibung</h4>
                <ol>
                    <li>Der Prozess startet, wenn eine <strong>Kundenbestellung eingeht</strong> (Startereignis)</li>
                    <li>Ein Mitarbeiter <strong>prüft die Bestellung</strong> auf Vollständigkeit und Gültigkeit</li>
                    <li>Ein Exklusives Gateway prüft: <strong>„Ist die Bestellung gültig?"</strong></li>
                    <li>Falls <strong>Nein</strong>: Die Bestellung wird <strong>abgelehnt</strong> und eine Absage gesendet (Endereignis)</li>
                    <li>Falls <strong>Ja</strong>: Ein Paralleles Gateway teilt in zwei parallele Aktivitäten auf:
                        <ul>
                            <li><strong>Zahlung verarbeiten</strong></li>
                            <li><strong>Versand vorbereiten</strong></li>
                        </ul>
                    </li>
                    <li>Nach Abschluss beider Aktivitäten (Paralleles Gateway Zusammenführung) wird die <strong>Bestellung versendet</strong></li>
                    <li>Eine <strong>Bestätigungs-E-Mail</strong> wird an den Kunden gesendet (Endereignis)</li>
                </ol>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i>
                    <div><strong>Interaktives Diagramm:</strong> Unten sehen Sie diesen Prozess in BPMN 2.0 modelliert. Verwenden Sie die Maus zum Schwenken und Zoomen.</div>
                </div>
                <div id="bpmn-order-process"></div>`
            }
        },
        {
            title: { en: "Example: Employee Onboarding", de: "Beispiel: Mitarbeiter-Onboarding" },
            html: {
                en: `<p>This example demonstrates a <strong>parallel process pattern</strong> commonly found in employee onboarding:</p>
                <h4>Process Description</h4>
                <ol>
                    <li><strong>New employee hired</strong> (Start Event)</li>
                    <li>HR performs an <strong>initial welcome</strong> and orientation meeting</li>
                    <li>A Parallel Gateway splits into three parallel activities:
                        <ul>
                            <li>IT department: <strong>Set up workstation & accounts</strong></li>
                            <li>HR department: <strong>Complete paperwork & compliance training</strong></li>
                            <li>Team lead: <strong>Introduce to team & assign mentor</strong></li>
                        </ul>
                    </li>
                    <li>After all three activities complete (Parallel Gateway merge)</li>
                    <li>Manager conducts a <strong>first-week review</strong></li>
                    <li><strong>Onboarding complete</strong> (End Event)</li>
                </ol>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i>
                    <div><strong>Interactive Diagram:</strong> Below you can see this onboarding process modeled in BPMN 2.0.</div>
                </div>
                <div id="bpmn-onboarding-process"></div>`,
                de: `<p>Dieses Beispiel demonstriert ein <strong>paralleles Prozessmuster</strong>, das häufig beim Mitarbeiter-Onboarding vorkommt:</p>
                <h4>Prozessbeschreibung</h4>
                <ol>
                    <li><strong>Neuer Mitarbeiter eingestellt</strong> (Startereignis)</li>
                    <li>HR führt ein <strong>Willkommensgespräch</strong> und eine Orientierung durch</li>
                    <li>Ein Paralleles Gateway teilt in drei parallele Aktivitäten auf:
                        <ul>
                            <li>IT-Abteilung: <strong>Arbeitsplatz & Konten einrichten</strong></li>
                            <li>HR-Abteilung: <strong>Formulare & Compliance-Schulung abschließen</strong></li>
                            <li>Teamleiter: <strong>Team vorstellen & Mentor zuweisen</strong></li>
                        </ul>
                    </li>
                    <li>Nach Abschluss aller drei Aktivitäten (Paralleles Gateway Zusammenführung)</li>
                    <li>Manager führt ein <strong>Erstwochen-Review</strong> durch</li>
                    <li><strong>Onboarding abgeschlossen</strong> (Endereignis)</li>
                </ol>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i>
                    <div><strong>Interaktives Diagramm:</strong> Unten sehen Sie diesen Onboarding-Prozess in BPMN 2.0 modelliert.</div>
                </div>
                <div id="bpmn-onboarding-process"></div>`
            }
        },
        {
            title: { en: "Interactive Exercises", de: "Interaktive Übungen" },
            html: {
                en: `<p>Now it's time to test your practical knowledge! Complete the following interactive exercises to reinforce what you've learned about BPMN 2.0 elements.</p>
                <div id="exercise-container-1"></div>
                <div id="exercise-container-2"></div>`,
                de: `<p>Jetzt ist es Zeit, Ihr praktisches Wissen zu testen! Absolvieren Sie die folgenden interaktiven Übungen, um Ihr Wissen über BPMN 2.0 Elemente zu festigen.</p>
                <div id="exercise-container-1"></div>
                <div id="exercise-container-2"></div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "What naming convention should be used for BPMN activities?", de: "Welche Namenskonvention sollte für BPMN-Aktivitäten verwendet werden?" },
            options: {
                en: ["Noun only", "Verb + Noun (e.g., 'Review Application')", "Adjective + Noun", "Number + Description"],
                de: ["Nur Substantiv", "Verb + Substantiv (z.B. 'Antrag prüfen')", "Adjektiv + Substantiv", "Nummer + Beschreibung"]
            },
            correct: 1
        },
        {
            question: { en: "In the order processing example, what happens when the order is valid?", de: "Was passiert im Bestellbeispiel, wenn die Bestellung gültig ist?" },
            options: {
                en: ["The order is rejected", "Payment and shipment happen in parallel", "The order is deleted", "The customer is called"],
                de: ["Die Bestellung wird abgelehnt", "Zahlung und Versand erfolgen parallel", "Die Bestellung wird gelöscht", "Der Kunde wird angerufen"]
            },
            correct: 1
        },
        {
            question: { en: "How should you handle complexity in BPMN models?", de: "Wie sollte man Komplexität in BPMN-Modellen handhaben?" },
            options: {
                en: ["Add more elements to one diagram", "Use sub-processes to encapsulate details", "Remove important steps", "Ignore best practices"],
                de: ["Mehr Elemente in ein Diagramm", "Teilprozesse zur Kapselung von Details nutzen", "Wichtige Schritte entfernen", "Best Practices ignorieren"]
            },
            correct: 1
        },
        {
            question: { en: "What type of flow connects activities between different pools?", de: "Welche Flussart verbindet Aktivitäten zwischen verschiedenen Pools?" },
            options: {
                en: ["Sequence Flow", "Message Flow", "Association", "Data Flow"],
                de: ["Sequenzfluss", "Nachrichtenfluss", "Assoziation", "Datenfluss"]
            },
            correct: 1
        },
        {
            question: { en: "Which gateway was used in the onboarding example to split into parallel activities?", de: "Welches Gateway wurde im Onboarding-Beispiel für parallele Aktivitäten verwendet?" },
            options: {
                en: ["Exclusive Gateway", "Inclusive Gateway", "Parallel Gateway", "Event-Based Gateway"],
                de: ["Exklusives Gateway", "Inklusives Gateway", "Paralleles Gateway", "Ereignisbasiertes Gateway"]
            },
            correct: 2
        }
    ]
});


/* ==============================================================
   FINAL EXAM QUESTIONS
   -----------------------------------------------------------------
   20 questions drawn from all 5 modules. Used for the final exam
   that learners must pass to receive their certificate.
============================================================== */
const EXAM_QUESTIONS = [
    /* From Module 1 */
    {
        question: { en: "What is the primary goal of Business Process Management?", de: "Was ist das Hauptziel des Geschäftsprozessmanagements?" },
        options: {
            en: ["Hiring more employees", "Systematically improving organizational workflows", "Reducing the number of departments", "Purchasing new software"],
            de: ["Mehr Mitarbeiter einstellen", "Systematische Verbesserung organisatorischer Abläufe", "Anzahl der Abteilungen reduzieren", "Neue Software kaufen"]
        },
        correct: 1
    },
    {
        question: { en: "BPM takes which perspective on processes?", de: "BPM betrachtet Prozesse aus welcher Perspektive?" },
        options: {
            en: ["Department-focused (silo)", "Cross-functional end-to-end", "Technology-only", "Finance-only"],
            de: ["Abteilungsbezogen (Silo)", "Funktionsübergreifend End-to-End", "Nur Technologie", "Nur Finanzen"]
        },
        correct: 1
    },
    {
        question: { en: "Which BPM lifecycle phase involves creating visual models?", de: "In welcher BPM-Phase werden visuelle Modelle erstellt?" },
        options: {
            en: ["Design", "Model", "Execute", "Monitor"],
            de: ["Design", "Modellierung", "Ausführung", "Überwachung"]
        },
        correct: 1
    },
    {
        question: { en: "What characterizes a business process?", de: "Was kennzeichnet einen Geschäftsprozess?" },
        options: {
            en: ["Random unrelated tasks", "Structured activities with defined start, end, and value creation", "Only automated computer tasks", "Activities without any goal"],
            de: ["Zufällige, unzusammenhängende Aufgaben", "Strukturierte Aktivitäten mit definiertem Start, Ende und Wertschöpfung", "Nur automatisierte Computeraufgaben", "Aktivitäten ohne jedes Ziel"]
        },
        correct: 1
    },
    /* From Module 2 */
    {
        question: { en: "Which process type directly creates customer value?", de: "Welcher Prozesstyp schafft direkt Kundenwert?" },
        options: {
            en: ["Support Processes", "Management Processes", "Core Processes", "IT Processes"],
            de: ["Unterstützungsprozesse", "Managementprozesse", "Kernprozesse", "IT-Prozesse"]
        },
        correct: 2
    },
    {
        question: { en: "What is Process Mining?", de: "Was ist Process Mining?" },
        options: {
            en: ["Manual observation of work", "Automatic extraction of process data from IT event logs", "Interviewing employees about processes", "Drawing process diagrams by hand"],
            de: ["Manuelle Beobachtung der Arbeit", "Automatische Extraktion von Prozessdaten aus IT-Ereignisprotokollen", "Mitarbeiter über Prozesse befragen", "Prozessdiagramme von Hand zeichnen"]
        },
        correct: 1
    },
    {
        question: { en: "An As-Is model documents:", de: "Ein Ist-Modell dokumentiert:" },
        options: {
            en: ["The ideal future process", "The current state of the process", "Only the problems", "The competitor's process"],
            de: ["Den idealen zukünftigen Prozess", "Den aktuellen Zustand des Prozesses", "Nur die Probleme", "Den Prozess des Wettbewerbers"]
        },
        correct: 1
    },
    {
        question: { en: "What does the 5-Why method help identify?", de: "Was hilft die 5-Warum-Methode zu identifizieren?" },
        options: {
            en: ["The five best employees", "Root causes of problems", "Five new processes", "Five KPI targets"],
            de: ["Die fünf besten Mitarbeiter", "Grundursachen von Problemen", "Fünf neue Prozesse", "Fünf KPI-Ziele"]
        },
        correct: 1
    },
    /* From Module 3 */
    {
        question: { en: "BPMN was developed by which organization?", de: "BPMN wurde von welcher Organisation entwickelt?" },
        options: {
            en: ["Microsoft", "OMG (Object Management Group)", "Google", "SAP"],
            de: ["Microsoft", "OMG (Object Management Group)", "Google", "SAP"]
        },
        correct: 1
    },
    {
        question: { en: "What major feature was added in BPMN 2.0?", de: "Welches wichtige Feature wurde in BPMN 2.0 hinzugefügt?" },
        options: {
            en: ["Color coding", "XML serialization and execution semantics", "3D diagrams", "Voice commands"],
            de: ["Farbcodierung", "XML-Serialisierung und Ausführungssemantik", "3D-Diagramme", "Sprachbefehle"]
        },
        correct: 1
    },
    {
        question: { en: "Which BPMN diagram shows interaction between organizations?", de: "Welches BPMN-Diagramm zeigt Interaktion zwischen Organisationen?" },
        options: {
            en: ["Process Diagram", "Collaboration Diagram", "Class Diagram", "State Diagram"],
            de: ["Prozessdiagramm", "Kollaborationsdiagramm", "Klassendiagramm", "Zustandsdiagramm"]
        },
        correct: 1
    },
    {
        question: { en: "BPMN 2.0 is also an ISO standard. Which one?", de: "BPMN 2.0 ist auch ein ISO-Standard. Welcher?" },
        options: {
            en: ["ISO 9001", "ISO 27001", "ISO/IEC 19510", "ISO 14001"],
            de: ["ISO 9001", "ISO 27001", "ISO/IEC 19510", "ISO 14001"]
        },
        correct: 2
    },
    /* From Module 4 */
    {
        question: { en: "An End Event in BPMN is represented by:", de: "Ein Endereignis in BPMN wird dargestellt durch:" },
        options: {
            en: ["A thin circle", "A diamond", "A thick circle", "A rounded rectangle"],
            de: ["Einen dünnen Kreis", "Eine Raute", "Einen dicken Kreis", "Ein abgerundetes Rechteck"]
        },
        correct: 2
    },
    {
        question: { en: "A Parallel Gateway (AND) does what?", de: "Was macht ein Paralleles Gateway (AND)?" },
        options: {
            en: ["Chooses one path", "Activates all outgoing paths simultaneously", "Ends the process", "Creates a sub-process"],
            de: ["Wählt einen Pfad", "Aktiviert alle ausgehenden Pfade gleichzeitig", "Beendet den Prozess", "Erstellt einen Teilprozess"]
        },
        correct: 1
    },
    {
        question: { en: "A Service Task is:", de: "Ein Service Task ist:" },
        options: {
            en: ["A manual physical task", "An automated task performed by software", "A meeting with stakeholders", "A document review"],
            de: ["Eine manuelle physische Aufgabe", "Eine automatisierte Aufgabe durch Software", "Ein Stakeholder-Meeting", "Eine Dokumentenprüfung"]
        },
        correct: 1
    },
    {
        question: { en: "Message Flow is used to connect:", de: "Nachrichtenfluss wird verwendet, um zu verbinden:" },
        options: {
            en: ["Activities within the same pool", "Activities in different pools", "Gateways to events", "Text annotations only"],
            de: ["Aktivitäten innerhalb desselben Pools", "Aktivitäten in verschiedenen Pools", "Gateways mit Ereignissen", "Nur Textanmerkungen"]
        },
        correct: 1
    },
    /* From Module 5 */
    {
        question: { en: "What naming format should BPMN events use?", de: "Welches Namensformat sollten BPMN-Ereignisse verwenden?" },
        options: {
            en: ["Verb + Noun", "Noun + Past Participle (e.g., 'Order Received')", "Just a number", "Abbreviations only"],
            de: ["Verb + Substantiv", "Substantiv + Partizip (z.B. 'Bestellung eingegangen')", "Nur eine Nummer", "Nur Abkürzungen"]
        },
        correct: 1
    },
    {
        question: { en: "What is the recommended maximum number of elements per diagram level?", de: "Was ist die empfohlene maximale Elementanzahl pro Diagrammebene?" },
        options: {
            en: ["5", "10", "15-20", "100"],
            de: ["5", "10", "15-20", "100"]
        },
        correct: 2
    },
    {
        question: { en: "When a process splits with a Parallel Gateway, it should merge with:", de: "Wenn ein Prozess mit einem Parallel-Gateway aufteilt, sollte er zusammengeführt werden mit:" },
        options: {
            en: ["An Exclusive Gateway", "An Inclusive Gateway", "A Parallel Gateway", "An End Event directly"],
            de: ["Einem Exklusiven Gateway", "Einem Inklusiven Gateway", "Einem Parallelen Gateway", "Direkt einem Endereignis"]
        },
        correct: 2
    },
    {
        question: { en: "A well-made BPMN diagram should be:", de: "Ein gut erstelltes BPMN-Diagramm sollte:" },
        options: {
            en: ["As complex as possible", "Understandable without additional explanation", "Only readable by developers", "Kept secret from stakeholders"],
            de: ["So komplex wie möglich", "Ohne zusätzliche Erklärung verständlich", "Nur für Entwickler lesbar", "Vor Stakeholdern geheim gehalten"]
        },
        correct: 1
    }
];
