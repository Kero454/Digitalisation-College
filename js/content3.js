/* ================================================================
   content3.js — Course Content Data (Modules 6-10)
   -----------------------------------------------------------------
   Continues from content2.js. Pushes advanced BPMN modules into
   the COURSE_CONTENT array and adds more EXAM_QUESTIONS.

   New modules cover the complete BPMN 2.0 body of knowledge:
     6. BPMN Events in Depth
     7. Activities, Tasks & Subprocesses
     8. Gateways & Control-Flow Patterns
     9. Data, Artifacts, Pools, Lanes & Collaboration
    10. Advanced Topics, Best Practices & the Hands-On Editor

   Interactive diagrams use the data-driven convention:
     <div class="bpmn-diagram" data-diagram="KEY"></div>
   The interactive modeling playground uses:
     <div class="bpmn-editor-mount" data-editor="playground"></div>
   Both are wired up in bpmn-exercise.js.
   ================================================================ */

/* ==============================================================
   MODULE 6: BPMN Events in Depth
============================================================== */
COURSE_CONTENT.push({
    id: "module6",
    icon: "bi-record-circle",
    title: { en: "BPMN Events in Depth", de: "BPMN-Ereignisse im Detail" },
    description: {
        en: "Explore every event type: start, intermediate, boundary and end events with their message, timer, error, signal and other triggers.",
        de: "Erkunden Sie jeden Ereignistyp: Start-, Zwischen-, Rand- und Endereignisse mit ihren Nachrichten-, Timer-, Fehler-, Signal- und anderen Auslösern."
    },
    sections: [
        {
            title: { en: "Event Categories", de: "Ereigniskategorien" },
            html: {
                en: `<p>An <strong>event</strong> is something that "happens" during a process. Events are drawn as circles and are classified along two dimensions: <strong>position</strong> in the flow and <strong>trigger</strong> type.</p>
                <h4>By Position</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Category</th><th>Border</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Start Event</strong></td><td>Thin single line</td><td>Where a process instance begins.</td></tr>
                        <tr><td><strong>Intermediate Event</strong></td><td>Double line</td><td>Happens between start and end; can delay, catch or throw.</td></tr>
                        <tr><td><strong>End Event</strong></td><td>Thick single line</td><td>Where a path of the process finishes.</td></tr>
                        <tr><td><strong>Boundary Event</strong></td><td>Double line on an activity edge</td><td>Attached to an activity to handle interruptions (e.g. errors, timeouts).</td></tr>
                    </tbody>
                </table>
                <h4>By Behaviour: Catching vs. Throwing</h4>
                <ul>
                    <li><strong>Catching</strong> events wait for a trigger to happen (e.g. wait for a message). Their marker is unfilled.</li>
                    <li><strong>Throwing</strong> events emit a trigger (e.g. send a message). Their marker is filled/dark.</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Tip:</strong> Start events are always catching, end events are always throwing. Intermediate events can be either.</div></div>`,
                de: `<p>Ein <strong>Ereignis</strong> ist etwas, das während eines Prozesses "geschieht". Ereignisse werden als Kreise dargestellt und nach zwei Dimensionen klassifiziert: <strong>Position</strong> im Ablauf und <strong>Auslöser</strong>-Typ.</p>
                <h4>Nach Position</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Kategorie</th><th>Rand</th><th>Zweck</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Startereignis</strong></td><td>Dünne einfache Linie</td><td>Wo eine Prozessinstanz beginnt.</td></tr>
                        <tr><td><strong>Zwischenereignis</strong></td><td>Doppelte Linie</td><td>Geschieht zwischen Start und Ende; kann verzögern, fangen oder werfen.</td></tr>
                        <tr><td><strong>Endereignis</strong></td><td>Dicke einfache Linie</td><td>Wo ein Pfad des Prozesses endet.</td></tr>
                        <tr><td><strong>Randereignis</strong></td><td>Doppelte Linie am Aktivitätsrand</td><td>An eine Aktivität angehängt, um Unterbrechungen zu behandeln (z. B. Fehler, Zeitüberschreitungen).</td></tr>
                    </tbody>
                </table>
                <h4>Nach Verhalten: Fangen vs. Werfen</h4>
                <ul>
                    <li><strong>Fangende</strong> Ereignisse warten auf einen Auslöser (z. B. auf eine Nachricht). Ihr Marker ist ungefüllt.</li>
                    <li><strong>Werfende</strong> Ereignisse senden einen Auslöser (z. B. Nachricht senden). Ihr Marker ist gefüllt/dunkel.</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Tipp:</strong> Startereignisse fangen immer, Endereignisse werfen immer. Zwischenereignisse können beides sein.</div></div>`
            }
        },
        {
            title: { en: "Event Triggers", de: "Ereignisauslöser" },
            html: {
                en: `<p>The <strong>marker</strong> inside an event circle defines its trigger. These are the most important triggers to know:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Trigger</th><th>Marker</th><th>Typical Use</th></tr></thead>
                    <tbody>
                        <tr><td><strong>None</strong></td><td>Empty circle</td><td>Generic start/end without a specific cause.</td></tr>
                        <tr><td><strong>Message</strong></td><td>Envelope</td><td>Sending or receiving a message from another participant.</td></tr>
                        <tr><td><strong>Timer</strong></td><td>Clock</td><td>A fixed date, duration, or recurring cycle.</td></tr>
                        <tr><td><strong>Error</strong></td><td>Lightning bolt</td><td>Catching or throwing a business/technical error.</td></tr>
                        <tr><td><strong>Signal</strong></td><td>Triangle</td><td>Broadcast that many processes can react to.</td></tr>
                        <tr><td><strong>Conditional</strong></td><td>Lined page</td><td>Fires when a business condition becomes true.</td></tr>
                        <tr><td><strong>Escalation</strong></td><td>Upward arrow</td><td>Hand a situation to a higher level (no abort).</td></tr>
                        <tr><td><strong>Terminate</strong></td><td>Filled circle</td><td>Immediately ends ALL activity in the process.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Common mistake:</strong> A <em>terminate</em> end event stops the entire process instance, while a plain <em>none</em> end event only ends its own token/path.</div></div>`,
                de: `<p>Der <strong>Marker</strong> im Ereigniskreis definiert seinen Auslöser. Dies sind die wichtigsten Auslöser:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Auslöser</th><th>Marker</th><th>Typische Verwendung</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Kein (None)</strong></td><td>Leerer Kreis</td><td>Generischer Start/Ende ohne spezifische Ursache.</td></tr>
                        <tr><td><strong>Nachricht</strong></td><td>Umschlag</td><td>Senden oder Empfangen einer Nachricht von einem anderen Teilnehmer.</td></tr>
                        <tr><td><strong>Timer</strong></td><td>Uhr</td><td>Ein festes Datum, eine Dauer oder ein wiederkehrender Zyklus.</td></tr>
                        <tr><td><strong>Fehler</strong></td><td>Blitz</td><td>Fangen oder Werfen eines geschäftlichen/technischen Fehlers.</td></tr>
                        <tr><td><strong>Signal</strong></td><td>Dreieck</td><td>Broadcast, auf den viele Prozesse reagieren können.</td></tr>
                        <tr><td><strong>Bedingung</strong></td><td>Liniertes Blatt</td><td>Feuert, wenn eine Geschäftsbedingung wahr wird.</td></tr>
                        <tr><td><strong>Eskalation</strong></td><td>Pfeil nach oben</td><td>Situation an höhere Ebene übergeben (kein Abbruch).</td></tr>
                        <tr><td><strong>Terminierung</strong></td><td>Gefüllter Kreis</td><td>Beendet sofort ALLE Aktivitäten im Prozess.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Häufiger Fehler:</strong> Ein <em>Terminierungs</em>-Endereignis stoppt die gesamte Prozessinstanz, während ein einfaches <em>None</em>-Endereignis nur seinen eigenen Token/Pfad beendet.</div></div>`
            }
        },
        {
            title: { en: "Boundary & Timer Events (Example)", de: "Rand- & Timer-Ereignisse (Beispiel)" },
            html: {
                en: `<p><strong>Boundary events</strong> attach to the edge of an activity. If the trigger fires while the activity is running, flow leaves through the boundary event. They can be <em>interrupting</em> (double solid line) or <em>non-interrupting</em> (double dashed line).</p>
                <p>The diagram below shows an order process that starts when a <strong>message</strong> is received, then waits on a <strong>timer</strong>, and can end with an <strong>error</strong> path:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interactive Diagram:</strong> Explore the event-driven process below. Scroll to zoom, drag to pan.</div></div>
                <div class="bpmn-diagram" data-diagram="events"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Try it:</strong> In Module 10 you can open the editor and rebuild this pattern yourself.</div></div>`,
                de: `<p><strong>Randereignisse</strong> werden am Rand einer Aktivität angehängt. Wenn der Auslöser während der Aktivität feuert, verlässt der Ablauf die Aktivität über das Randereignis. Sie können <em>unterbrechend</em> (doppelte durchgezogene Linie) oder <em>nicht-unterbrechend</em> (doppelte gestrichelte Linie) sein.</p>
                <p>Das folgende Diagramm zeigt einen Bestellprozess, der beginnt, wenn eine <strong>Nachricht</strong> empfangen wird, dann auf einen <strong>Timer</strong> wartet und mit einem <strong>Fehler</strong>-Pfad enden kann:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interaktives Diagramm:</strong> Erkunden Sie den ereignisgesteuerten Prozess unten. Scrollen zum Zoomen, Ziehen zum Schwenken.</div></div>
                <div class="bpmn-diagram" data-diagram="events"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Probieren Sie es:</strong> In Modul 10 können Sie den Editor öffnen und dieses Muster selbst nachbauen.</div></div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "How is an intermediate event drawn?", de: "Wie wird ein Zwischenereignis gezeichnet?" },
            options: {
                en: ["Thick single circle", "Double-line circle", "Diamond", "Thin single circle"],
                de: ["Dicker einfacher Kreis", "Doppellinien-Kreis", "Raute", "Dünner einfacher Kreis"]
            },
            correct: 1
        },
        {
            question: { en: "A filled (dark) event marker indicates the event is:", de: "Ein gefüllter (dunkler) Ereignismarker zeigt an, dass das Ereignis:" },
            options: {
                en: ["Catching", "Throwing", "Disabled", "A gateway"],
                de: ["Fangend", "Werfend", "Deaktiviert", "Ein Gateway"]
            },
            correct: 1
        },
        {
            question: { en: "Which end event immediately stops the ENTIRE process instance?", de: "Welches Endereignis stoppt sofort die GESAMTE Prozessinstanz?" },
            options: {
                en: ["None end event", "Message end event", "Terminate end event", "Error end event"],
                de: ["None-Endereignis", "Nachrichten-Endereignis", "Terminierungs-Endereignis", "Fehler-Endereignis"]
            },
            correct: 2
        },
        {
            question: { en: "A boundary event drawn with a double DASHED line is:", de: "Ein Randereignis mit doppelter GESTRICHELTER Linie ist:" },
            options: {
                en: ["Interrupting", "Non-interrupting", "A start event", "Invalid"],
                de: ["Unterbrechend", "Nicht-unterbrechend", "Ein Startereignis", "Ungültig"]
            },
            correct: 1
        },
        {
            question: { en: "Which trigger is best for 'wait 3 days, then send a reminder'?", de: "Welcher Auslöser passt am besten zu 'warte 3 Tage, dann sende eine Erinnerung'?" },
            options: {
                en: ["Signal", "Timer", "Error", "Escalation"],
                de: ["Signal", "Timer", "Fehler", "Eskalation"]
            },
            correct: 1
        }
    ]
});

/* ==============================================================
   MODULE 7: Activities, Tasks & Subprocesses
============================================================== */
COURSE_CONTENT.push({
    id: "module7",
    icon: "bi-list-task",
    title: { en: "Activities, Tasks & Subprocesses", de: "Aktivitäten, Tasks & Teilprozesse" },
    description: {
        en: "Understand every task type, activity marker, subprocess, call activity, loops and multi-instance behaviour.",
        de: "Verstehen Sie jeden Task-Typ, Aktivitätsmarker, Teilprozess, Aufrufaktivität, Schleifen und Multi-Instanz-Verhalten."
    },
    sections: [
        {
            title: { en: "Task Types", de: "Task-Typen" },
            html: {
                en: `<p>An <strong>activity</strong> is work performed in a process. The atomic activity is a <strong>task</strong> (rounded rectangle). A small icon in the top-left corner shows the task type:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Task Type</th><th>Icon</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td><strong>User Task</strong></td><td>Person</td><td>A human performs the work with software support.</td></tr>
                        <tr><td><strong>Manual Task</strong></td><td>Hand</td><td>A human performs the work with no system involved.</td></tr>
                        <tr><td><strong>Service Task</strong></td><td>Gears</td><td>An automated system/service performs the work.</td></tr>
                        <tr><td><strong>Send Task</strong></td><td>Filled envelope</td><td>Sends a message to another participant.</td></tr>
                        <tr><td><strong>Receive Task</strong></td><td>Empty envelope</td><td>Waits for a message from another participant.</td></tr>
                        <tr><td><strong>Script Task</strong></td><td>Script</td><td>The engine runs a script automatically.</td></tr>
                        <tr><td><strong>Business Rule Task</strong></td><td>Table</td><td>Evaluates a decision/business rule (often DMN).</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Naming rule:</strong> Name every task as <em>verb + object</em>, e.g. "Approve Invoice", "Send Confirmation".</div></div>`,
                de: `<p>Eine <strong>Aktivität</strong> ist Arbeit, die in einem Prozess ausgeführt wird. Die atomare Aktivität ist ein <strong>Task</strong> (abgerundetes Rechteck). Ein kleines Symbol oben links zeigt den Task-Typ:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Task-Typ</th><th>Symbol</th><th>Bedeutung</th></tr></thead>
                    <tbody>
                        <tr><td><strong>User Task</strong></td><td>Person</td><td>Ein Mensch erledigt die Arbeit mit Softwareunterstützung.</td></tr>
                        <tr><td><strong>Manual Task</strong></td><td>Hand</td><td>Ein Mensch erledigt die Arbeit ohne System.</td></tr>
                        <tr><td><strong>Service Task</strong></td><td>Zahnräder</td><td>Ein automatisiertes System/Dienst erledigt die Arbeit.</td></tr>
                        <tr><td><strong>Send Task</strong></td><td>Gefüllter Umschlag</td><td>Sendet eine Nachricht an einen anderen Teilnehmer.</td></tr>
                        <tr><td><strong>Receive Task</strong></td><td>Leerer Umschlag</td><td>Wartet auf eine Nachricht von einem anderen Teilnehmer.</td></tr>
                        <tr><td><strong>Script Task</strong></td><td>Skript</td><td>Die Engine führt automatisch ein Skript aus.</td></tr>
                        <tr><td><strong>Business Rule Task</strong></td><td>Tabelle</td><td>Wertet eine Entscheidung/Geschäftsregel aus (oft DMN).</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Namensregel:</strong> Benennen Sie jeden Task als <em>Verb + Objekt</em>, z. B. "Rechnung genehmigen", "Bestätigung senden".</div></div>`
            }
        },
        {
            title: { en: "Subprocesses & Call Activities", de: "Teilprozesse & Aufrufaktivitäten" },
            html: {
                en: `<p>A <strong>subprocess</strong> groups a set of activities into a single higher-level step. It lets you hide detail and reuse logic.</p>
                <ul>
                    <li><strong>Collapsed subprocess:</strong> shown as a task with a <strong>[+]</strong> marker — detail is hidden.</li>
                    <li><strong>Expanded subprocess:</strong> a large rounded rectangle containing its own start/end and flow.</li>
                    <li><strong>Event subprocess:</strong> dashed border; runs only when its start event fires (inside a parent).</li>
                    <li><strong>Transaction:</strong> double-border subprocess with all-or-nothing (compensation) semantics.</li>
                    <li><strong>Call activity:</strong> thick border; invokes a reusable global process defined elsewhere.</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Subprocess vs. Call activity:</strong> A subprocess is defined <em>inline</em>; a call activity <em>references</em> a separate, reusable process.</div></div>`,
                de: `<p>Ein <strong>Teilprozess</strong> gruppiert eine Reihe von Aktivitäten zu einem übergeordneten Schritt. So können Sie Details verbergen und Logik wiederverwenden.</p>
                <ul>
                    <li><strong>Reduzierter Teilprozess:</strong> als Task mit <strong>[+]</strong>-Marker dargestellt — Details verborgen.</li>
                    <li><strong>Erweiterter Teilprozess:</strong> großes abgerundetes Rechteck mit eigenem Start/Ende und Ablauf.</li>
                    <li><strong>Ereignis-Teilprozess:</strong> gestrichelter Rand; läuft nur, wenn sein Startereignis feuert (innerhalb eines Elternprozesses).</li>
                    <li><strong>Transaktion:</strong> Teilprozess mit doppeltem Rand und Alles-oder-Nichts- (Kompensations-) Semantik.</li>
                    <li><strong>Aufrufaktivität:</strong> dicker Rand; ruft einen wiederverwendbaren globalen Prozess auf.</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Teilprozess vs. Aufrufaktivität:</strong> Ein Teilprozess wird <em>inline</em> definiert; eine Aufrufaktivität <em>referenziert</em> einen separaten, wiederverwendbaren Prozess.</div></div>`
            }
        },
        {
            title: { en: "Markers: Loops & Multi-Instance", de: "Marker: Schleifen & Multi-Instanz" },
            html: {
                en: `<p>Small markers at the bottom-center of an activity modify how it executes:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Marker</th><th>Symbol</th><th>Behaviour</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Standard Loop</strong></td><td>Circular arrow</td><td>Repeats while/until a condition holds.</td></tr>
                        <tr><td><strong>Multi-Instance (parallel)</strong></td><td>Three vertical bars</td><td>Runs many instances at the same time (e.g. get 3 quotes).</td></tr>
                        <tr><td><strong>Multi-Instance (sequential)</strong></td><td>Three horizontal bars</td><td>Runs instances one after another.</td></tr>
                        <tr><td><strong>Compensation</strong></td><td>Rewind icon</td><td>Undoes a completed activity.</td></tr>
                        <tr><td><strong>Ad-hoc</strong></td><td>Tilde (~)</td><td>Contained tasks may run in any order / any number of times.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Example:</strong> "Collect vendor quotes" for 3 vendors is a parallel multi-instance task.</div></div>`,
                de: `<p>Kleine Marker unten in der Mitte einer Aktivität verändern deren Ausführung:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Marker</th><th>Symbol</th><th>Verhalten</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Standardschleife</strong></td><td>Kreispfeil</td><td>Wiederholt, solange/bis eine Bedingung gilt.</td></tr>
                        <tr><td><strong>Multi-Instanz (parallel)</strong></td><td>Drei senkrechte Balken</td><td>Führt viele Instanzen gleichzeitig aus (z. B. 3 Angebote einholen).</td></tr>
                        <tr><td><strong>Multi-Instanz (sequenziell)</strong></td><td>Drei waagerechte Balken</td><td>Führt Instanzen nacheinander aus.</td></tr>
                        <tr><td><strong>Kompensation</strong></td><td>Rückspul-Symbol</td><td>Macht eine abgeschlossene Aktivität rückgängig.</td></tr>
                        <tr><td><strong>Ad-hoc</strong></td><td>Tilde (~)</td><td>Enthaltene Tasks können in beliebiger Reihenfolge/Anzahl laufen.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Beispiel:</strong> "Lieferantenangebote einholen" für 3 Lieferanten ist ein paralleler Multi-Instanz-Task.</div></div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "Which task type is executed automatically by a system/service?", de: "Welcher Task-Typ wird automatisch von einem System/Dienst ausgeführt?" },
            options: {
                en: ["Manual Task", "User Task", "Service Task", "Receive Task"],
                de: ["Manual Task", "User Task", "Service Task", "Receive Task"]
            },
            correct: 2
        },
        {
            question: { en: "A collapsed subprocess is shown with which marker?", de: "Ein reduzierter Teilprozess wird mit welchem Marker dargestellt?" },
            options: {
                en: ["A minus [-]", "A plus [+]", "A clock", "A person"],
                de: ["Ein Minus [-]", "Ein Plus [+]", "Eine Uhr", "Eine Person"]
            },
            correct: 1
        },
        {
            question: { en: "What does a call activity do?", de: "Was macht eine Aufrufaktivität?" },
            options: {
                en: ["Ends the process", "References a separate reusable process", "Sends a message", "Waits for a timer"],
                de: ["Beendet den Prozess", "Referenziert einen separaten wiederverwendbaren Prozess", "Sendet eine Nachricht", "Wartet auf einen Timer"]
            },
            correct: 1
        },
        {
            question: { en: "'Collect 3 vendor quotes at the same time' is modeled with:", de: "'3 Lieferantenangebote gleichzeitig einholen' wird modelliert mit:" },
            options: {
                en: ["Standard loop", "Parallel multi-instance", "Compensation", "Ad-hoc"],
                de: ["Standardschleife", "Parallele Multi-Instanz", "Kompensation", "Ad-hoc"]
            },
            correct: 1
        },
        {
            question: { en: "A task performed by a human WITHOUT any software is a:", de: "Ein von einem Menschen OHNE Software ausgeführter Task ist ein:" },
            options: {
                en: ["Service Task", "Script Task", "Manual Task", "Business Rule Task"],
                de: ["Service Task", "Script Task", "Manual Task", "Business Rule Task"]
            },
            correct: 2
        }
    ]
});

/* ==============================================================
   MODULE 8: Gateways & Control-Flow Patterns
============================================================== */
COURSE_CONTENT.push({
    id: "module8",
    icon: "bi-signpost-split",
    title: { en: "Gateways & Control-Flow Patterns", de: "Gateways & Kontrollfluss-Muster" },
    description: {
        en: "Master all five gateway types and learn how to correctly split, merge and synchronize process flows.",
        de: "Beherrschen Sie alle fünf Gateway-Typen und lernen Sie, Prozessflüsse korrekt zu teilen, zusammenzuführen und zu synchronisieren."
    },
    sections: [
        {
            title: { en: "The Five Gateway Types", de: "Die fünf Gateway-Typen" },
            html: {
                en: `<p><strong>Gateways</strong> control how the flow diverges and converges. They are drawn as diamonds; the inner marker defines the behaviour.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Gateway</th><th>Marker</th><th>Behaviour</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Exclusive (XOR)</strong></td><td>X (or empty)</td><td>Takes exactly ONE path based on conditions.</td></tr>
                        <tr><td><strong>Parallel (AND)</strong></td><td>Plus +</td><td>Takes ALL paths at once; join waits for all.</td></tr>
                        <tr><td><strong>Inclusive (OR)</strong></td><td>Circle O</td><td>Takes one OR MORE paths whose conditions are true.</td></tr>
                        <tr><td><strong>Event-Based</strong></td><td>Pentagon in circle</td><td>The path is chosen by whichever event happens first.</td></tr>
                        <tr><td><strong>Complex</strong></td><td>Asterisk *</td><td>Advanced conditions (e.g. "3 of 5"). Use rarely.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Golden rule:</strong> Whatever you split with, merge with the same type. Split with AND &rarr; join with AND.</div></div>`,
                de: `<p><strong>Gateways</strong> steuern, wie sich der Fluss verzweigt und wieder zusammenführt. Sie werden als Rauten dargestellt; der innere Marker definiert das Verhalten.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Gateway</th><th>Marker</th><th>Verhalten</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Exklusiv (XOR)</strong></td><td>X (oder leer)</td><td>Nimmt genau EINEN Pfad je nach Bedingung.</td></tr>
                        <tr><td><strong>Parallel (AND)</strong></td><td>Plus +</td><td>Nimmt ALLE Pfade gleichzeitig; Join wartet auf alle.</td></tr>
                        <tr><td><strong>Inklusiv (OR)</strong></td><td>Kreis O</td><td>Nimmt einen ODER MEHRERE Pfade, deren Bedingungen wahr sind.</td></tr>
                        <tr><td><strong>Ereignisbasiert</strong></td><td>Fünfeck im Kreis</td><td>Der Pfad wird durch das zuerst eintretende Ereignis gewählt.</td></tr>
                        <tr><td><strong>Komplex</strong></td><td>Sternchen *</td><td>Erweiterte Bedingungen (z. B. "3 von 5"). Selten verwenden.</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Goldene Regel:</strong> Womit Sie teilen, damit führen Sie auch zusammen. Teilen mit AND &rarr; Zusammenführen mit AND.</div></div>`
            }
        },
        {
            title: { en: "Exclusive vs. Inclusive vs. Parallel", de: "Exklusiv vs. Inklusiv vs. Parallel" },
            html: {
                en: `<p>Choosing the right gateway is the most common modeling decision. Compare them:</p>
                <ul>
                    <li><strong>Exclusive (XOR):</strong> "Is the order &gt; &euro;1000?" &rarr; either the "yes" branch OR the "no" branch, never both.</li>
                    <li><strong>Parallel (AND):</strong> "Prepare shipment AND process payment" &rarr; both always happen simultaneously.</li>
                    <li><strong>Inclusive (OR):</strong> "Notify by email and/or SMS" &rarr; any combination of branches whose condition is true.</li>
                </ul>
                <p>The interactive diagram shows an <strong>inclusive gateway</strong> that notifies a customer by one or more channels, then synchronizes:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interactive Diagram:</strong> Inclusive (OR) split and join.</div></div>
                <div class="bpmn-diagram" data-diagram="gateways"></div>`,
                de: `<p>Die Wahl des richtigen Gateways ist die häufigste Modellierungsentscheidung. Vergleichen Sie:</p>
                <ul>
                    <li><strong>Exklusiv (XOR):</strong> "Ist die Bestellung &gt; 1000 &euro;?" &rarr; entweder der "Ja"-Zweig ODER der "Nein"-Zweig, nie beide.</li>
                    <li><strong>Parallel (AND):</strong> "Versand vorbereiten UND Zahlung verarbeiten" &rarr; beides geschieht immer gleichzeitig.</li>
                    <li><strong>Inklusiv (OR):</strong> "Per E-Mail und/oder SMS benachrichtigen" &rarr; jede Kombination von Zweigen, deren Bedingung wahr ist.</li>
                </ul>
                <p>Das interaktive Diagramm zeigt ein <strong>inklusives Gateway</strong>, das einen Kunden über einen oder mehrere Kanäle benachrichtigt und dann synchronisiert:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interaktives Diagramm:</strong> Inklusive (OR) Teilung und Zusammenführung.</div></div>
                <div class="bpmn-diagram" data-diagram="gateways"></div>`
            }
        },
        {
            title: { en: "Event-Based Gateway", de: "Ereignisbasiertes Gateway" },
            html: {
                en: `<p>The <strong>event-based gateway</strong> is special: instead of evaluating data conditions, it waits and the path is decided by <strong>whichever event happens first</strong>.</p>
                <p>Classic example: after sending a quote, wait for either the customer's <em>reply message</em> OR a <em>7-day timeout</em> — whichever occurs first.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Remember:</strong> An event-based gateway must be followed only by intermediate catch events or receive tasks — not by regular tasks.</div></div>
                <h4>Common Control-Flow Patterns</h4>
                <ul>
                    <li><strong>Simple merge:</strong> use an XOR join to bring alternative paths back together.</li>
                    <li><strong>Synchronization:</strong> use an AND join to wait for parallel branches.</li>
                    <li><strong>Deferred choice:</strong> event-based gateway waiting on competing events.</li>
                </ul>`,
                de: `<p>Das <strong>ereignisbasierte Gateway</strong> ist besonders: Statt Datenbedingungen auszuwerten, wartet es, und der Pfad wird durch das <strong>zuerst eintretende Ereignis</strong> bestimmt.</p>
                <p>Klassisches Beispiel: Nach dem Senden eines Angebots auf entweder die <em>Antwortnachricht</em> des Kunden ODER eine <em>7-Tage-Zeitüberschreitung</em> warten — was zuerst eintritt.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Merke:</strong> Auf ein ereignisbasiertes Gateway dürfen nur fangende Zwischenereignisse oder Receive-Tasks folgen — keine normalen Tasks.</div></div>
                <h4>Häufige Kontrollfluss-Muster</h4>
                <ul>
                    <li><strong>Einfache Zusammenführung:</strong> XOR-Join, um alternative Pfade zusammenzuführen.</li>
                    <li><strong>Synchronisation:</strong> AND-Join, um auf parallele Zweige zu warten.</li>
                    <li><strong>Verzögerte Auswahl:</strong> ereignisbasiertes Gateway, das auf konkurrierende Ereignisse wartet.</li>
                </ul>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "Which gateway takes exactly one path based on a condition?", de: "Welches Gateway nimmt genau einen Pfad basierend auf einer Bedingung?" },
            options: {
                en: ["Parallel (AND)", "Inclusive (OR)", "Exclusive (XOR)", "Complex"],
                de: ["Parallel (AND)", "Inklusiv (OR)", "Exklusiv (XOR)", "Komplex"]
            },
            correct: 2
        },
        {
            question: { en: "Which gateway can activate one OR MORE outgoing paths?", de: "Welches Gateway kann einen ODER MEHRERE ausgehende Pfade aktivieren?" },
            options: {
                en: ["Exclusive", "Inclusive", "Event-based", "Parallel"],
                de: ["Exklusiv", "Inklusiv", "Ereignisbasiert", "Parallel"]
            },
            correct: 1
        },
        {
            question: { en: "In an event-based gateway, the path is chosen by:", de: "Bei einem ereignisbasierten Gateway wird der Pfad bestimmt durch:" },
            options: {
                en: ["A data condition", "Whichever event occurs first", "Random selection", "The modeler at design time"],
                de: ["Eine Datenbedingung", "Das zuerst eintretende Ereignis", "Zufällige Auswahl", "Den Modellierer zur Entwurfszeit"]
            },
            correct: 1
        },
        {
            question: { en: "You split flow with a Parallel (AND) gateway. To merge, you should use:", de: "Sie teilen den Fluss mit einem Parallel-(AND)-Gateway. Zum Zusammenführen verwenden Sie:" },
            options: {
                en: ["An Exclusive gateway", "A Parallel gateway", "An end event", "No gateway"],
                de: ["Ein Exklusiv-Gateway", "Ein Parallel-Gateway", "Ein Endereignis", "Kein Gateway"]
            },
            correct: 1
        },
        {
            question: { en: "An element that may follow an event-based gateway is:", de: "Ein Element, das auf ein ereignisbasiertes Gateway folgen darf, ist:" },
            options: {
                en: ["A user task", "An intermediate catch event", "A service task", "A subprocess"],
                de: ["Ein User-Task", "Ein fangendes Zwischenereignis", "Ein Service-Task", "Ein Teilprozess"]
            },
            correct: 1
        }
    ]
});

/* ==============================================================
   MODULE 9: Data, Artifacts, Pools, Lanes & Collaboration
============================================================== */
COURSE_CONTENT.push({
    id: "module9",
    icon: "bi-diagram-2",
    title: { en: "Data, Artifacts & Collaboration", de: "Daten, Artefakte & Kollaboration" },
    description: {
        en: "Learn how to represent data, organize responsibilities with pools & lanes, and model communication between participants.",
        de: "Lernen Sie, Daten darzustellen, Verantwortlichkeiten mit Pools & Lanes zu organisieren und Kommunikation zwischen Teilnehmern zu modellieren."
    },
    sections: [
        {
            title: { en: "Data Objects & Stores", de: "Datenobjekte & Datenspeicher" },
            html: {
                en: `<p>BPMN can show the information a process consumes and produces:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Element</th><th>Symbol</th><th>Meaning</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Data Object</strong></td><td>Page with folded corner</td><td>Information (a document/record) required or produced by a task.</td></tr>
                        <tr><td><strong>Data Input / Output</strong></td><td>Page with arrow</td><td>Data entering or leaving the overall process.</td></tr>
                        <tr><td><strong>Data Store</strong></td><td>Cylinder (database)</td><td>Persistent storage that outlives the process instance.</td></tr>
                        <tr><td><strong>Collection</strong></td><td>Data object + bars</td><td>A set of items (e.g. list of orders).</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Note:</strong> Data objects are connected to activities with a dotted <strong>association</strong>, not a sequence flow.</div></div>`,
                de: `<p>BPMN kann die Informationen zeigen, die ein Prozess verbraucht und erzeugt:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Element</th><th>Symbol</th><th>Bedeutung</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Datenobjekt</strong></td><td>Blatt mit geknickter Ecke</td><td>Information (Dokument/Datensatz), die ein Task benötigt oder erzeugt.</td></tr>
                        <tr><td><strong>Dateneingabe/-ausgabe</strong></td><td>Blatt mit Pfeil</td><td>Daten, die in den Gesamtprozess ein- oder austreten.</td></tr>
                        <tr><td><strong>Datenspeicher</strong></td><td>Zylinder (Datenbank)</td><td>Persistenter Speicher, der die Prozessinstanz überdauert.</td></tr>
                        <tr><td><strong>Sammlung</strong></td><td>Datenobjekt + Balken</td><td>Eine Menge von Elementen (z. B. Liste von Bestellungen).</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Hinweis:</strong> Datenobjekte werden mit einer gepunkteten <strong>Assoziation</strong> mit Aktivitäten verbunden, nicht mit einem Sequenzfluss.</div></div>`
            }
        },
        {
            title: { en: "Pools & Lanes (Swimlanes)", de: "Pools & Lanes (Swimlanes)" },
            html: {
                en: `<p><strong>Swimlanes</strong> show <em>who</em> does <em>what</em>.</p>
                <ul>
                    <li><strong>Pool:</strong> represents a participant — a whole organization or system (e.g. "Customer", "Insurance Company"). A pool contains one process.</li>
                    <li><strong>Lane:</strong> a subdivision within a pool — usually a role or department (e.g. "Sales", "Warehouse").</li>
                </ul>
                <p>Sequence flow may <strong>not</strong> cross a pool boundary — communication between pools uses <strong>message flow</strong> (dashed arrows).</p>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Rule:</strong> Sequence flow stays inside one pool. Between pools, only message flow is allowed.</div></div>`,
                de: `<p><strong>Swimlanes</strong> zeigen, <em>wer</em> <em>was</em> tut.</p>
                <ul>
                    <li><strong>Pool:</strong> repräsentiert einen Teilnehmer — eine ganze Organisation oder ein System (z. B. "Kunde", "Versicherung"). Ein Pool enthält einen Prozess.</li>
                    <li><strong>Lane:</strong> eine Unterteilung innerhalb eines Pools — meist eine Rolle oder Abteilung (z. B. "Vertrieb", "Lager").</li>
                </ul>
                <p>Sequenzfluss darf eine Poolgrenze <strong>nicht</strong> überschreiten — die Kommunikation zwischen Pools erfolgt über <strong>Nachrichtenfluss</strong> (gestrichelte Pfeile).</p>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Regel:</strong> Sequenzfluss bleibt innerhalb eines Pools. Zwischen Pools ist nur Nachrichtenfluss erlaubt.</div></div>`
            }
        },
        {
            title: { en: "Collaboration Diagram (Example)", de: "Kollaborationsdiagramm (Beispiel)" },
            html: {
                en: `<p>A <strong>collaboration</strong> shows two or more pools exchanging messages. Below, a <strong>Customer</strong> pool and a <strong>Support Team</strong> pool communicate via message flows:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interactive Diagram:</strong> Two pools with message flow. Notice sequence flow stays inside each pool.</div></div>
                <div class="bpmn-diagram" data-diagram="collaboration"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Artifacts:</strong> Text annotations and groups add explanation without affecting the flow.</div></div>`,
                de: `<p>Eine <strong>Kollaboration</strong> zeigt zwei oder mehr Pools, die Nachrichten austauschen. Unten kommunizieren ein <strong>Kunden</strong>-Pool und ein <strong>Support-Team</strong>-Pool über Nachrichtenflüsse:</p>
                <div class="callout callout-info"><i class="bi bi-diagram-3"></i><div><strong>Interaktives Diagramm:</strong> Zwei Pools mit Nachrichtenfluss. Beachten Sie, dass der Sequenzfluss in jedem Pool bleibt.</div></div>
                <div class="bpmn-diagram" data-diagram="collaboration"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Artefakte:</strong> Textanmerkungen und Gruppen fügen Erklärungen hinzu, ohne den Ablauf zu beeinflussen.</div></div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "Which element represents persistent storage that outlives a process?", de: "Welches Element stellt persistenten Speicher dar, der einen Prozess überdauert?" },
            options: {
                en: ["Data Object", "Data Store", "Data Input", "Association"],
                de: ["Datenobjekt", "Datenspeicher", "Dateneingabe", "Assoziation"]
            },
            correct: 1
        },
        {
            question: { en: "A pool in BPMN represents:", de: "Ein Pool in BPMN repräsentiert:" },
            options: {
                en: ["A single task", "A participant (organization/system)", "A gateway", "A data object"],
                de: ["Einen einzelnen Task", "Einen Teilnehmer (Organisation/System)", "Ein Gateway", "Ein Datenobjekt"]
            },
            correct: 1
        },
        {
            question: { en: "Communication between two pools is modeled with:", de: "Die Kommunikation zwischen zwei Pools wird modelliert mit:" },
            options: {
                en: ["Sequence flow", "Message flow", "Association", "A gateway"],
                de: ["Sequenzfluss", "Nachrichtenfluss", "Assoziation", "Einem Gateway"]
            },
            correct: 1
        },
        {
            question: { en: "A lane is used to show:", de: "Eine Lane wird verwendet, um zu zeigen:" },
            options: {
                en: ["An external company", "A role or department within a pool", "A database", "A message"],
                de: ["Eine externe Firma", "Eine Rolle oder Abteilung innerhalb eines Pools", "Eine Datenbank", "Eine Nachricht"]
            },
            correct: 1
        },
        {
            question: { en: "Data objects connect to tasks using a:", de: "Datenobjekte werden mit Tasks verbunden über eine:" },
            options: {
                en: ["Solid sequence flow", "Dashed message flow", "Dotted association", "Gateway"],
                de: ["Durchgezogenen Sequenzfluss", "Gestrichelten Nachrichtenfluss", "Gepunktete Assoziation", "Gateway"]
            },
            correct: 2
        }
    ]
});

/* ==============================================================
   MODULE 10: Advanced Topics, Best Practices & Hands-On Editor
============================================================== */
COURSE_CONTENT.push({
    id: "module10",
    icon: "bi-pencil-square",
    title: { en: "Advanced Topics & Hands-On Modeling", de: "Fortgeschrittene Themen & Praktisches Modellieren" },
    description: {
        en: "Handle errors, transactions and compensation, apply modeling best practices, then build your own diagrams in the interactive editor.",
        de: "Behandeln Sie Fehler, Transaktionen und Kompensation, wenden Sie Best Practices an und erstellen Sie eigene Diagramme im interaktiven Editor."
    },
    sections: [
        {
            title: { en: "Error Handling & Exceptions", de: "Fehlerbehandlung & Ausnahmen" },
            html: {
                en: `<p>Real processes must handle things going wrong. BPMN offers dedicated constructs:</p>
                <ul>
                    <li><strong>Error boundary event:</strong> attached to an activity; diverts flow when a specific error is thrown.</li>
                    <li><strong>Error end event:</strong> throws an error out of a subprocess to be caught by the parent.</li>
                    <li><strong>Escalation:</strong> signals a higher authority without necessarily aborting (e.g. "notify manager").</li>
                    <li><strong>Event subprocess:</strong> an in-line handler that reacts to errors, timers or messages while the main flow runs.</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Pattern:</strong> Wrap risky work in a subprocess, attach an error boundary event, and route to a recovery path.</div></div>`,
                de: `<p>Reale Prozesse müssen mit Fehlern umgehen. BPMN bietet dedizierte Konstrukte:</p>
                <ul>
                    <li><strong>Fehler-Randereignis:</strong> an eine Aktivität angehängt; lenkt den Fluss um, wenn ein bestimmter Fehler geworfen wird.</li>
                    <li><strong>Fehler-Endereignis:</strong> wirft einen Fehler aus einem Teilprozess, der vom Elternprozess gefangen wird.</li>
                    <li><strong>Eskalation:</strong> signalisiert eine höhere Instanz, ohne notwendigerweise abzubrechen (z. B. "Manager benachrichtigen").</li>
                    <li><strong>Ereignis-Teilprozess:</strong> ein Inline-Handler, der auf Fehler, Timer oder Nachrichten reagiert, während der Hauptfluss läuft.</li>
                </ul>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Muster:</strong> Riskante Arbeit in einen Teilprozess kapseln, ein Fehler-Randereignis anhängen und zu einem Wiederherstellungspfad leiten.</div></div>`
            }
        },
        {
            title: { en: "Transactions & Compensation", de: "Transaktionen & Kompensation" },
            html: {
                en: `<p>Some activities must succeed <strong>all together or not at all</strong> — like booking a flight, hotel and car for one trip.</p>
                <ul>
                    <li><strong>Transaction subprocess:</strong> double-bordered; either all inner activities commit, or the whole thing is cancelled.</li>
                    <li><strong>Cancel event:</strong> triggers rollback of a transaction.</li>
                    <li><strong>Compensation:</strong> a special activity that <em>undoes</em> an already-completed step (e.g. "refund payment" compensates "charge card").</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Why it matters:</strong> Compensation lets you model realistic "undo" logic that plain sequence flow cannot express.</div></div>`,
                de: `<p>Manche Aktivitäten müssen <strong>alle zusammen oder gar nicht</strong> gelingen — wie Flug, Hotel und Auto für eine Reise zu buchen.</p>
                <ul>
                    <li><strong>Transaktions-Teilprozess:</strong> doppelter Rand; entweder alle inneren Aktivitäten werden bestätigt, oder das Ganze wird abgebrochen.</li>
                    <li><strong>Abbruch-Ereignis:</strong> löst das Rollback einer Transaktion aus.</li>
                    <li><strong>Kompensation:</strong> eine spezielle Aktivität, die einen bereits abgeschlossenen Schritt <em>rückgängig macht</em> (z. B. "Zahlung erstatten" kompensiert "Karte belasten").</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle"></i><div><strong>Warum wichtig:</strong> Kompensation ermöglicht realistische "Rückgängig"-Logik, die einfacher Sequenzfluss nicht ausdrücken kann.</div></div>`
            }
        },
        {
            title: { en: "Modeling Best Practices", de: "Best Practices der Modellierung" },
            html: {
                en: `<p>Follow these guidelines so your diagrams are understood by everyone:</p>
                <ul>
                    <li>Use <strong>verb + object</strong> names for tasks ("Approve Request").</li>
                    <li>Give <strong>every gateway a question</strong> label and label its outgoing flows ("Yes"/"No").</li>
                    <li><strong>Left-to-right</strong> flow; keep the "happy path" straight and horizontal.</li>
                    <li>Match splits and joins with the <strong>same gateway type</strong>.</li>
                    <li>Prefer explicit gateways over multiple flows leaving a task.</li>
                    <li>Use subprocesses to keep a diagram to a readable size.</li>
                    <li>One diagram should fit on <strong>one screen/page</strong> where possible.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Anti-patterns:</strong> dangling flows, unlabeled gateways, crossing lines, and mixing two languages in element names.</div></div>`,
                de: `<p>Befolgen Sie diese Richtlinien, damit Ihre Diagramme von allen verstanden werden:</p>
                <ul>
                    <li>Verwenden Sie <strong>Verb + Objekt</strong>-Namen für Tasks ("Antrag genehmigen").</li>
                    <li>Geben Sie <strong>jedem Gateway eine Frage</strong> und beschriften Sie die ausgehenden Flüsse ("Ja"/"Nein").</li>
                    <li><strong>Von links nach rechts</strong>; halten Sie den "Happy Path" gerade und horizontal.</li>
                    <li>Führen Sie Teilungen und Zusammenführungen mit dem <strong>gleichen Gateway-Typ</strong> zusammen.</li>
                    <li>Bevorzugen Sie explizite Gateways gegenüber mehreren Flüssen aus einem Task.</li>
                    <li>Nutzen Sie Teilprozesse, um ein Diagramm lesbar zu halten.</li>
                    <li>Ein Diagramm sollte möglichst auf <strong>einen Bildschirm/eine Seite</strong> passen.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle"></i><div><strong>Anti-Muster:</strong> lose Flüsse, unbeschriftete Gateways, sich kreuzende Linien und das Mischen zweier Sprachen in Elementnamen.</div></div>`
            }
        },
        {
            title: { en: "Hands-On: The BPMN Editor", de: "Praktisch: Der BPMN-Editor" },
            html: {
                en: `<p>Now it's your turn! The <strong>interactive BPMN editor</strong> below lets you <strong>create and modify</strong> diagrams — not just view them. This is a full BPMN 2.0 modeler running in your browser.</p>
                <h4>How to use it</h4>
                <ul>
                    <li><strong>Add elements:</strong> click an element in the left palette, then click the canvas — or drag it on.</li>
                    <li><strong>Connect elements:</strong> hover an element and drag from the round connection handle to another element.</li>
                    <li><strong>Rename:</strong> double-click any element to edit its label.</li>
                    <li><strong>Change type:</strong> click an element and use the wrench/context menu to morph it (e.g. task &rarr; user task).</li>
                    <li><strong>Delete:</strong> select an element and press <kbd>Delete</kbd>.</li>
                    <li><strong>Undo/Redo:</strong> <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd>.</li>
                </ul>
                <p>Use the toolbar to load a template, start a blank diagram, or export your work as <strong>.bpmn</strong> (XML) or <strong>.svg</strong>.</p>
                <div class="bpmn-editor-mount" data-editor="playground"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Challenge:</strong> Model a "Vacation Request" process — employee submits, manager approves or rejects (XOR), HR is notified. Then export it!</div></div>`,
                de: `<p>Jetzt sind Sie dran! Der <strong>interaktive BPMN-Editor</strong> unten lässt Sie Diagramme <strong>erstellen und bearbeiten</strong> — nicht nur ansehen. Dies ist ein vollständiger BPMN-2.0-Modeler, der in Ihrem Browser läuft.</p>
                <h4>So verwenden Sie ihn</h4>
                <ul>
                    <li><strong>Elemente hinzufügen:</strong> klicken Sie ein Element in der linken Palette an und dann auf die Zeichenfläche — oder ziehen Sie es hinein.</li>
                    <li><strong>Elemente verbinden:</strong> fahren Sie über ein Element und ziehen Sie vom runden Verbindungsgriff zu einem anderen Element.</li>
                    <li><strong>Umbenennen:</strong> Doppelklick auf ein Element, um seine Beschriftung zu bearbeiten.</li>
                    <li><strong>Typ ändern:</strong> Element anklicken und über das Schraubenschlüssel-/Kontextmenü umwandeln (z. B. Task &rarr; User-Task).</li>
                    <li><strong>Löschen:</strong> Element auswählen und <kbd>Entf</kbd> drücken.</li>
                    <li><strong>Rückgängig/Wiederholen:</strong> <kbd>Strg</kbd>+<kbd>Z</kbd> / <kbd>Strg</kbd>+<kbd>Y</kbd>.</li>
                </ul>
                <p>Verwenden Sie die Symbolleiste, um eine Vorlage zu laden, ein leeres Diagramm zu starten oder Ihre Arbeit als <strong>.bpmn</strong> (XML) oder <strong>.svg</strong> zu exportieren.</p>
                <div class="bpmn-editor-mount" data-editor="playground"></div>
                <div class="callout callout-tip"><i class="bi bi-lightbulb"></i><div><strong>Herausforderung:</strong> Modellieren Sie einen "Urlaubsantrag"-Prozess — Mitarbeiter reicht ein, Manager genehmigt oder lehnt ab (XOR), HR wird benachrichtigt. Dann exportieren!</div></div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "Which construct diverts flow when a specific error occurs during an activity?", de: "Welches Konstrukt lenkt den Fluss um, wenn während einer Aktivität ein bestimmter Fehler auftritt?" },
            options: {
                en: ["Timer start event", "Error boundary event", "Parallel gateway", "Data store"],
                de: ["Timer-Startereignis", "Fehler-Randereignis", "Paralleles Gateway", "Datenspeicher"]
            },
            correct: 1
        },
        {
            question: { en: "Compensation is used to:", de: "Kompensation wird verwendet, um:" },
            options: {
                en: ["Speed up a task", "Undo an already-completed activity", "Merge parallel flows", "Store data"],
                de: ["Einen Task zu beschleunigen", "Eine bereits abgeschlossene Aktivität rückgängig zu machen", "Parallele Flüsse zusammenzuführen", "Daten zu speichern"]
            },
            correct: 1
        },
        {
            question: { en: "A transaction subprocess guarantees that:", de: "Ein Transaktions-Teilprozess garantiert, dass:" },
            options: {
                en: ["Tasks run faster", "All inner activities commit together or none do", "No gateways are needed", "Data is encrypted"],
                de: ["Tasks schneller laufen", "Alle inneren Aktivitäten gemeinsam bestätigt werden oder keine", "Keine Gateways nötig sind", "Daten verschlüsselt werden"]
            },
            correct: 1
        },
        {
            question: { en: "Which is a BPMN best practice?", de: "Was ist eine BPMN-Best-Practice?" },
            options: {
                en: ["Leave gateways unlabeled", "Name tasks as verb + object", "Mix languages in labels", "Let flow go right-to-left"],
                de: ["Gateways unbeschriftet lassen", "Tasks als Verb + Objekt benennen", "Sprachen in Beschriftungen mischen", "Fluss von rechts nach links führen"]
            },
            correct: 1
        },
        {
            question: { en: "In the interactive editor, how do you edit an element's label?", de: "Wie bearbeiten Sie im interaktiven Editor die Beschriftung eines Elements?" },
            options: {
                en: ["Right-click and print", "Double-click the element", "Press Escape", "Reload the page"],
                de: ["Rechtsklick und drucken", "Doppelklick auf das Element", "Escape drücken", "Seite neu laden"]
            },
            correct: 1
        }
    ]
});

/* ==============================================================
   ADDITIONAL EXAM QUESTIONS (Modules 6-10)
   EXAM_QUESTIONS is defined in content2.js. It is a const array,
   so we may safely push more questions onto it here.
============================================================== */
if (typeof EXAM_QUESTIONS !== 'undefined') {
    EXAM_QUESTIONS.push(
        /* From Module 6 */
        {
            question: { en: "A throwing event is drawn with a marker that is:", de: "Ein werfendes Ereignis hat einen Marker, der:" },
            options: {
                en: ["Unfilled (outline)", "Filled (dark)", "Square", "Missing"],
                de: ["Ungefüllt (Umriss)", "Gefüllt (dunkel)", "Quadratisch", "Fehlend"]
            },
            correct: 1
        },
        {
            question: { en: "Which event immediately ends the entire process instance?", de: "Welches Ereignis beendet sofort die gesamte Prozessinstanz?" },
            options: {
                en: ["None end", "Terminate end", "Message end", "Link"],
                de: ["None-Ende", "Terminierungs-Ende", "Nachrichten-Ende", "Verknüpfung"]
            },
            correct: 1
        },
        /* From Module 7 */
        {
            question: { en: "Which marker means an activity runs many instances in parallel?", de: "Welcher Marker bedeutet, dass eine Aktivität viele Instanzen parallel ausführt?" },
            options: {
                en: ["Circular arrow", "Three vertical bars", "Three horizontal bars", "Tilde"],
                de: ["Kreispfeil", "Drei senkrechte Balken", "Drei waagerechte Balken", "Tilde"]
            },
            correct: 1
        },
        {
            question: { en: "A call activity is drawn with a:", de: "Eine Aufrufaktivität wird dargestellt mit:" },
            options: {
                en: ["Thin border", "Thick border", "Dashed border", "Double circle"],
                de: ["Dünnem Rand", "Dickem Rand", "Gestricheltem Rand", "Doppelkreis"]
            },
            correct: 1
        },
        /* From Module 8 */
        {
            question: { en: "Which gateway waits for whichever event happens first?", de: "Welches Gateway wartet auf das zuerst eintretende Ereignis?" },
            options: {
                en: ["Exclusive", "Parallel", "Event-based", "Complex"],
                de: ["Exklusiv", "Parallel", "Ereignisbasiert", "Komplex"]
            },
            correct: 2
        },
        {
            question: { en: "An inclusive (OR) gateway activates:", de: "Ein inklusives (OR) Gateway aktiviert:" },
            options: {
                en: ["Exactly one path", "One or more matching paths", "Always all paths", "No paths"],
                de: ["Genau einen Pfad", "Einen oder mehrere passende Pfade", "Immer alle Pfade", "Keine Pfade"]
            },
            correct: 1
        },
        /* From Module 9 */
        {
            question: { en: "Sequence flow is NOT allowed to:", de: "Sequenzfluss ist NICHT erlaubt:" },
            options: {
                en: ["Stay in a pool", "Cross a pool boundary", "Connect two tasks", "Enter a gateway"],
                de: ["In einem Pool zu bleiben", "Eine Poolgrenze zu überschreiten", "Zwei Tasks zu verbinden", "In ein Gateway zu führen"]
            },
            correct: 1
        },
        {
            question: { en: "A cylinder (database) symbol represents a:", de: "Ein Zylinder-(Datenbank-)Symbol repräsentiert einen:" },
            options: {
                en: ["Data object", "Data store", "Pool", "Message"],
                de: ["Datenobjekt", "Datenspeicher", "Pool", "Nachricht"]
            },
            correct: 1
        },
        /* From Module 10 */
        {
            question: { en: "Which subprocess type has all-or-nothing semantics?", de: "Welcher Teilprozesstyp hat Alles-oder-Nichts-Semantik?" },
            options: {
                en: ["Event subprocess", "Transaction subprocess", "Ad-hoc subprocess", "Collapsed subprocess"],
                de: ["Ereignis-Teilprozess", "Transaktions-Teilprozess", "Ad-hoc-Teilprozess", "Reduzierter Teilprozess"]
            },
            correct: 1
        },
        {
            question: { en: "Which is a recommended BPMN modeling practice?", de: "Was ist eine empfohlene BPMN-Modellierungspraxis?" },
            options: {
                en: ["Unlabeled gateways", "Right-to-left flow", "Verb + object task names", "Crossing sequence flows"],
                de: ["Unbeschriftete Gateways", "Fluss von rechts nach links", "Verb-+-Objekt-Task-Namen", "Sich kreuzende Sequenzflüsse"]
            },
            correct: 2
        }
    );
}
