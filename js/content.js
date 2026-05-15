/* ================================================================
   content.js — Course Content Data (Modules 1-3)
   -----------------------------------------------------------------
   Contains learning content for the first 3 modules in EN and DE.
   Modules 4-5 and exam questions are in content2.js.
   
   Structure: COURSE_CONTENT array of module objects.
   Each module: { id, icon, title, description, sections[], quiz[] }
   Each section: { title, html } — both with en/de keys
   Each quiz question: { question, options, correct (index) }
   ================================================================ */

const COURSE_CONTENT = [

/* ==============================================================
   MODULE 1: Introduction to Business Process Management
============================================================== */
{
    id: "module1",
    icon: "bi-book",
    title: { en: "Introduction to BPM", de: "Einführung in BPM" },
    description: {
        en: "Learn what business processes are and why managing them is essential.",
        de: "Erfahren Sie, was Geschäftsprozesse sind und warum deren Management wichtig ist."
    },
    sections: [
        {
            title: { en: "What is a Business Process?", de: "Was ist ein Geschäftsprozess?" },
            html: {
                en: `<p>A <strong>business process</strong> is a structured set of activities performed in a specific sequence to achieve an organizational goal. Every organization relies on processes to deliver products, serve customers, and manage operations.</p>
                <h4>Key Characteristics</h4>
                <ul>
                    <li><strong>Defined Start and End:</strong> Every process has a clear trigger (input) and a defined outcome (output).</li>
                    <li><strong>Sequence of Activities:</strong> Activities are performed in a logical order, often with decision points.</li>
                    <li><strong>Participants:</strong> People, systems, or departments involved in executing the process.</li>
                    <li><strong>Value Creation:</strong> The process transforms inputs into outputs that create value.</li>
                </ul>
                <h4>Examples of Business Processes</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Process</th><th>Input</th><th>Output</th></tr></thead>
                    <tbody>
                        <tr><td>Order Fulfillment</td><td>Customer order</td><td>Delivered product</td></tr>
                        <tr><td>Employee Onboarding</td><td>Signed contract</td><td>Productive employee</td></tr>
                        <tr><td>Invoice Processing</td><td>Received invoice</td><td>Completed payment</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Key Insight:</strong> Business processes exist in every organization, whether formally documented or not. BPM makes them visible, measurable, and improvable.</div>
                </div>`,
                de: `<p>Ein <strong>Geschäftsprozess</strong> ist eine strukturierte Abfolge von Aktivitäten, die in einer bestimmten Reihenfolge ausgeführt werden, um ein organisatorisches Ziel zu erreichen. Jede Organisation ist auf Prozesse angewiesen, um Produkte zu liefern, Kunden zu bedienen und Abläufe zu steuern.</p>
                <h4>Wesentliche Merkmale</h4>
                <ul>
                    <li><strong>Definierter Anfang und Ende:</strong> Jeder Prozess hat einen klaren Auslöser (Input) und ein definiertes Ergebnis (Output).</li>
                    <li><strong>Abfolge von Aktivitäten:</strong> Aktivitäten werden in logischer Reihenfolge durchgeführt, oft mit Entscheidungspunkten.</li>
                    <li><strong>Beteiligte:</strong> Personen, Systeme oder Abteilungen, die an der Ausführung beteiligt sind.</li>
                    <li><strong>Wertschöpfung:</strong> Der Prozess wandelt Eingaben in wertschöpfende Ausgaben um.</li>
                </ul>
                <h4>Beispiele für Geschäftsprozesse</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Prozess</th><th>Eingabe</th><th>Ergebnis</th></tr></thead>
                    <tbody>
                        <tr><td>Auftragsabwicklung</td><td>Kundenbestellung</td><td>Geliefertes Produkt</td></tr>
                        <tr><td>Mitarbeiter-Onboarding</td><td>Unterschriebener Vertrag</td><td>Produktiver Mitarbeiter</td></tr>
                        <tr><td>Rechnungsbearbeitung</td><td>Eingegangene Rechnung</td><td>Abgeschlossene Zahlung</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Wichtige Erkenntnis:</strong> Geschäftsprozesse existieren in jeder Organisation, ob dokumentiert oder nicht. BPM macht sie sichtbar, messbar und verbesserbar.</div>
                </div>`
            }
        },
        {
            title: { en: "What is Business Process Management?", de: "Was ist Geschäftsprozessmanagement?" },
            html: {
                en: `<p><strong>Business Process Management (BPM)</strong> is a systematic approach to improving an organization's workflows. It involves analyzing, modeling, implementing, monitoring, and optimizing business processes.</p>
                <h4>Goals of BPM</h4>
                <ul>
                    <li><strong>Transparency:</strong> Make processes visible and understandable for all stakeholders.</li>
                    <li><strong>Efficiency:</strong> Eliminate waste, reduce processing time, streamline workflows.</li>
                    <li><strong>Quality:</strong> Standardize processes for consistent, high-quality outcomes.</li>
                    <li><strong>Agility:</strong> Enable quick adaptation when requirements change.</li>
                    <li><strong>Compliance:</strong> Ensure processes meet regulatory requirements.</li>
                </ul>
                <h4>BPM vs. Traditional Management</h4>
                <p>Traditional management focuses on <em>functional departments</em> (silos). BPM takes a <strong>cross-functional, end-to-end perspective</strong>, focusing on how value flows across departments from the customer's request to final delivery.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Remember:</strong> BPM is not a one-time project — it is a continuous management discipline requiring ongoing improvement.</div>
                </div>`,
                de: `<p><strong>Geschäftsprozessmanagement (BPM)</strong> ist ein systematischer Ansatz zur Verbesserung der Arbeitsabläufe einer Organisation. Es umfasst Analyse, Modellierung, Implementierung, Überwachung und Optimierung von Geschäftsprozessen.</p>
                <h4>Ziele des BPM</h4>
                <ul>
                    <li><strong>Transparenz:</strong> Prozesse für alle Beteiligten sichtbar und verständlich machen.</li>
                    <li><strong>Effizienz:</strong> Verschwendung beseitigen, Bearbeitungszeiten reduzieren, Abläufe optimieren.</li>
                    <li><strong>Qualität:</strong> Prozesse für gleichbleibend hochwertige Ergebnisse standardisieren.</li>
                    <li><strong>Agilität:</strong> Schnelle Anpassung bei veränderten Anforderungen ermöglichen.</li>
                    <li><strong>Compliance:</strong> Einhaltung regulatorischer Anforderungen sicherstellen.</li>
                </ul>
                <h4>BPM vs. Traditionelles Management</h4>
                <p>Traditionelles Management fokussiert auf <em>Fachabteilungen</em> (Silos). BPM verfolgt eine <strong>funktionsübergreifende End-to-End-Perspektive</strong> und betrachtet den Wertschöpfungsstrom vom Kundenauftrag bis zur Endlieferung.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Merke:</strong> BPM ist kein einmaliges Projekt — es ist eine kontinuierliche Managementdisziplin, die ständige Verbesserung erfordert.</div>
                </div>`
            }
        },
        {
            title: { en: "The BPM Lifecycle", de: "Der BPM-Lebenszyklus" },
            html: {
                en: `<p>BPM follows a <strong>continuous lifecycle</strong> with five key phases that ensure processes are continuously improved.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Phase</th><th>Description</th><th>Key Activities</th></tr></thead>
                    <tbody>
                        <tr><td><strong>1. Design</strong></td><td>Identify and define the process</td><td>Interviews, goal setting</td></tr>
                        <tr><td><strong>2. Model</strong></td><td>Document the process visually</td><td>Create BPMN models</td></tr>
                        <tr><td><strong>3. Execute</strong></td><td>Implement and run the process</td><td>Deploy, assign roles</td></tr>
                        <tr><td><strong>4. Monitor</strong></td><td>Track performance</td><td>Measure KPIs, find bottlenecks</td></tr>
                        <tr><td><strong>5. Optimize</strong></td><td>Improve the process</td><td>Analyze data, redesign</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-arrow-repeat"></i>
                    <div><strong>Continuous Cycle:</strong> After optimization, the cycle returns to Design. This iterative approach ensures processes evolve with organizational needs.</div>
                </div>`,
                de: `<p>BPM folgt einem <strong>kontinuierlichen Lebenszyklus</strong> mit fünf Schlüsselphasen, die sicherstellen, dass Prozesse kontinuierlich verbessert werden.</p>
                <table class="table table-bordered">
                    <thead><tr><th>Phase</th><th>Beschreibung</th><th>Aktivitäten</th></tr></thead>
                    <tbody>
                        <tr><td><strong>1. Design</strong></td><td>Prozess identifizieren und definieren</td><td>Interviews, Zielsetzung</td></tr>
                        <tr><td><strong>2. Modellierung</strong></td><td>Prozess visuell dokumentieren</td><td>BPMN-Modelle erstellen</td></tr>
                        <tr><td><strong>3. Ausführung</strong></td><td>Prozess implementieren und ausführen</td><td>Bereitstellen, Rollen zuweisen</td></tr>
                        <tr><td><strong>4. Überwachung</strong></td><td>Leistung verfolgen</td><td>KPIs messen, Engpässe finden</td></tr>
                        <tr><td><strong>5. Optimierung</strong></td><td>Prozess verbessern</td><td>Daten analysieren, neu gestalten</td></tr>
                    </tbody>
                </table>
                <div class="callout callout-info"><i class="bi bi-arrow-repeat"></i>
                    <div><strong>Kontinuierlicher Zyklus:</strong> Nach der Optimierung kehrt der Zyklus zur Design-Phase zurück. Dieser iterative Ansatz stellt sicher, dass sich Prozesse mit den Bedürfnissen der Organisation weiterentwickeln.</div>
                </div>`
            }
        },
        {
            title: { en: "Benefits and Challenges of BPM", de: "Vorteile und Herausforderungen von BPM" },
            html: {
                en: `<h4>Benefits</h4>
                <ul>
                    <li><strong>Cost Reduction:</strong> Eliminating redundant steps and automating tasks reduces costs.</li>
                    <li><strong>Higher Quality:</strong> Standardized processes lead to fewer errors.</li>
                    <li><strong>Better Compliance:</strong> Documented processes simplify regulatory proof.</li>
                    <li><strong>Increased Agility:</strong> Well-understood processes can be adapted quickly.</li>
                    <li><strong>Knowledge Preservation:</strong> Documented processes capture organizational know-how.</li>
                </ul>
                <h4>Challenges</h4>
                <ul>
                    <li><strong>Resistance to Change:</strong> Employees may resist new ways of working.</li>
                    <li><strong>Complexity:</strong> Large organizations may have hundreds of interconnected processes.</li>
                    <li><strong>Lack of Management Support:</strong> BPM requires leadership commitment.</li>
                    <li><strong>Tool Selection:</strong> Choosing the right tools and standards can be difficult.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Important:</strong> BPM success depends not only on tools and technology, but primarily on organizational culture and commitment at all levels.</div>
                </div>`,
                de: `<h4>Vorteile</h4>
                <ul>
                    <li><strong>Kostensenkung:</strong> Eliminierung redundanter Schritte und Automatisierung senkt Kosten.</li>
                    <li><strong>Höhere Qualität:</strong> Standardisierte Prozesse führen zu weniger Fehlern.</li>
                    <li><strong>Bessere Compliance:</strong> Dokumentierte Prozesse vereinfachen den Regulierungsnachweis.</li>
                    <li><strong>Erhöhte Agilität:</strong> Gut verstandene Prozesse lassen sich schnell anpassen.</li>
                    <li><strong>Wissenserhalt:</strong> Dokumentierte Prozesse bewahren organisatorisches Know-how.</li>
                </ul>
                <h4>Herausforderungen</h4>
                <ul>
                    <li><strong>Widerstand gegen Veränderungen:</strong> Mitarbeiter können neue Arbeitsweisen ablehnen.</li>
                    <li><strong>Komplexität:</strong> Große Organisationen haben Hunderte verknüpfter Prozesse.</li>
                    <li><strong>Fehlende Managementunterstützung:</strong> BPM erfordert Engagement der Führung.</li>
                    <li><strong>Werkzeugauswahl:</strong> Die richtige Tool- und Standardwahl ist schwierig.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Wichtig:</strong> Der Erfolg von BPM hängt nicht nur von Werkzeugen ab, sondern vor allem von der Organisationskultur und dem Engagement auf allen Ebenen.</div>
                </div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "What is a business process?", de: "Was ist ein Geschäftsprozess?" },
            options: {
                en: ["A single task by one person", "A structured set of activities to achieve an organizational goal", "A software application", "A department meeting"],
                de: ["Eine einzelne Aufgabe einer Person", "Eine strukturierte Abfolge von Aktivitäten zur Erreichung eines Ziels", "Eine Softwareanwendung", "Eine Abteilungsbesprechung"]
            },
            correct: 1
        },
        {
            question: { en: "Which is NOT a goal of BPM?", de: "Was ist KEIN Ziel von BPM?" },
            options: {
                en: ["Transparency", "Efficiency", "Eliminating all employees", "Compliance"],
                de: ["Transparenz", "Effizienz", "Alle Mitarbeiter eliminieren", "Compliance"]
            },
            correct: 2
        },
        {
            question: { en: "How many phases does the BPM lifecycle have?", de: "Wie viele Phasen hat der BPM-Lebenszyklus?" },
            options: { en: ["3", "4", "5", "7"], de: ["3", "4", "5", "7"] },
            correct: 2
        },
        {
            question: { en: "What is the correct BPM lifecycle order?", de: "Was ist die richtige BPM-Lebenszyklus-Reihenfolge?" },
            options: {
                en: ["Execute, Monitor, Design, Model, Optimize", "Design, Model, Execute, Monitor, Optimize", "Model, Design, Optimize, Execute, Monitor", "Monitor, Optimize, Design, Model, Execute"],
                de: ["Ausführen, Überwachen, Design, Modellieren, Optimieren", "Design, Modellieren, Ausführen, Überwachen, Optimieren", "Modellieren, Design, Optimieren, Ausführen, Überwachen", "Überwachen, Optimieren, Design, Modellieren, Ausführen"]
            },
            correct: 1
        },
        {
            question: { en: "What is a key benefit of BPM?", de: "Was ist ein wesentlicher Vorteil von BPM?" },
            options: {
                en: ["More complexity", "Less transparency", "Reduced costs and higher quality", "No need for management"],
                de: ["Mehr Komplexität", "Weniger Transparenz", "Geringere Kosten und höhere Qualität", "Kein Management nötig"]
            },
            correct: 2
        }
    ]
},

/* ==============================================================
   MODULE 2: Process Analysis & Documentation
============================================================== */
{
    id: "module2",
    icon: "bi-search",
    title: { en: "Process Analysis & Documentation", de: "Prozessanalyse & Dokumentation" },
    description: {
        en: "Discover how to identify, document, analyze, and improve business processes.",
        de: "Erfahren Sie, wie man Geschäftsprozesse identifiziert, dokumentiert und analysiert."
    },
    sections: [
        {
            title: { en: "Process Identification", de: "Prozessidentifikation" },
            html: {
                en: `<p>Before managing processes, you must first <strong>identify</strong> them. Process identification is the systematic discovery and cataloging of all relevant processes within an organization.</p>
                <h4>Types of Business Processes</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Category</th><th>Description</th><th>Examples</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Core Processes</strong></td><td>Directly create value for customers</td><td>Production, Sales, Service</td></tr>
                        <tr><td><strong>Support Processes</strong></td><td>Enable core processes to function</td><td>IT, HR, Accounting</td></tr>
                        <tr><td><strong>Management Processes</strong></td><td>Steer and control the organization</td><td>Strategy, Quality Mgmt</td></tr>
                    </tbody>
                </table>
                <h4>The Process Landscape</h4>
                <p>A <strong>process landscape</strong> (process map) provides a high-level overview of all major processes and their relationships. It helps stakeholders see the big picture before diving into details.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Tip:</strong> Start with the process landscape to identify the most critical processes, then prioritize which to analyze first based on impact and urgency.</div>
                </div>`,
                de: `<p>Bevor Sie Prozesse managen können, müssen Sie sie zunächst <strong>identifizieren</strong>. Die Prozessidentifikation ist die systematische Entdeckung und Katalogisierung aller relevanten Prozesse einer Organisation.</p>
                <h4>Arten von Geschäftsprozessen</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Kategorie</th><th>Beschreibung</th><th>Beispiele</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Kernprozesse</strong></td><td>Schaffen direkt Wert für Kunden</td><td>Produktion, Vertrieb, Service</td></tr>
                        <tr><td><strong>Unterstützungsprozesse</strong></td><td>Ermöglichen Kernprozesse</td><td>IT, Personal, Buchhaltung</td></tr>
                        <tr><td><strong>Managementprozesse</strong></td><td>Steuern die Organisation</td><td>Strategie, Qualitätsmgmt</td></tr>
                    </tbody>
                </table>
                <h4>Die Prozesslandkarte</h4>
                <p>Eine <strong>Prozesslandkarte</strong> bietet eine Übersicht aller wichtigen Prozesse und deren Zusammenhänge. Sie hilft Beteiligten, das Gesamtbild zu sehen, bevor sie in Details eintauchen.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Tipp:</strong> Beginnen Sie mit der Prozesslandkarte, um die kritischsten Prozesse zu identifizieren, und priorisieren Sie nach Auswirkung und Dringlichkeit.</div>
                </div>`
            }
        },
        {
            title: { en: "Process Discovery Methods", de: "Methoden der Prozesserhebung" },
            html: {
                en: `<p>Once identified, processes need to be <strong>discovered in detail</strong> and documented. This means understanding exactly how work is done today (the "As-Is" state).</p>
                <h4>Common Discovery Methods</h4>
                <ul>
                    <li><strong>Interviews:</strong> Talk to the people who perform the work — they know the real process including workarounds.</li>
                    <li><strong>Workshops:</strong> Bring multiple stakeholders together to collaboratively map the process.</li>
                    <li><strong>Observation:</strong> Watch the process being executed in real-time (Gemba Walk).</li>
                    <li><strong>Document Analysis:</strong> Review existing documentation, forms, and IT system logs.</li>
                    <li><strong>Process Mining:</strong> Automatically extract process information from IT system event logs.</li>
                </ul>
                <h4>As-Is vs. To-Be Models</h4>
                <ul>
                    <li><strong>As-Is Model:</strong> Documents the current state — how the process actually works today, including problems.</li>
                    <li><strong>To-Be Model:</strong> Describes the desired future state after improvements are implemented.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Common Mistake:</strong> Do not skip the As-Is analysis! You need to understand the current state before designing improvements.</div>
                </div>`,
                de: `<p>Sobald identifiziert, müssen Prozesse <strong>im Detail erhoben</strong> und dokumentiert werden. Das bedeutet, genau zu verstehen, wie die Arbeit heute erledigt wird (der „Ist-Zustand").</p>
                <h4>Gängige Erhebungsmethoden</h4>
                <ul>
                    <li><strong>Interviews:</strong> Sprechen Sie mit den Ausführenden — sie kennen den realen Prozess einschließlich Workarounds.</li>
                    <li><strong>Workshops:</strong> Bringen Sie mehrere Stakeholder zusammen, um den Prozess gemeinsam zu modellieren.</li>
                    <li><strong>Beobachtung:</strong> Beobachten Sie die Prozessausführung in Echtzeit (Gemba Walk).</li>
                    <li><strong>Dokumentenanalyse:</strong> Überprüfen Sie vorhandene Dokumentation, Formulare und IT-Protokolle.</li>
                    <li><strong>Process Mining:</strong> Automatische Extraktion von Prozessinformationen aus Ereignisprotokollen.</li>
                </ul>
                <h4>Ist- vs. Soll-Modelle</h4>
                <ul>
                    <li><strong>Ist-Modell:</strong> Dokumentiert den aktuellen Zustand — wie der Prozess heute tatsächlich funktioniert, einschließlich Problemen.</li>
                    <li><strong>Soll-Modell:</strong> Beschreibt den gewünschten zukünftigen Zustand nach Verbesserungen.</li>
                </ul>
                <div class="callout callout-warning"><i class="bi bi-exclamation-triangle-fill"></i>
                    <div><strong>Häufiger Fehler:</strong> Überspringen Sie nicht die Ist-Analyse! Verstehen Sie erst den aktuellen Zustand, bevor Sie Verbesserungen gestalten.</div>
                </div>`
            }
        },
        {
            title: { en: "Process Analysis Techniques", de: "Techniken der Prozessanalyse" },
            html: {
                en: `<p>After documenting the As-Is process, the next step is to <strong>analyze</strong> it systematically to find improvement opportunities.</p>
                <h4>Key Analysis Techniques</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Technique</th><th>Purpose</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Value Analysis</strong></td><td>Classify each step as value-adding, non-value-adding, or necessary waste</td></tr>
                        <tr><td><strong>Bottleneck Analysis</strong></td><td>Identify steps where work accumulates and causes delays</td></tr>
                        <tr><td><strong>Root Cause Analysis</strong></td><td>Find the underlying cause of process problems (e.g., 5-Why method)</td></tr>
                        <tr><td><strong>Time Analysis</strong></td><td>Measure cycle times, wait times, and processing times</td></tr>
                        <tr><td><strong>Stakeholder Analysis</strong></td><td>Understand who is involved and their influence on the process</td></tr>
                    </tbody>
                </table>
                <h4>Key Performance Indicators (KPIs)</h4>
                <p>Use measurable KPIs to evaluate process performance:</p>
                <ul>
                    <li><strong>Cycle Time:</strong> Total time from process start to completion</li>
                    <li><strong>Throughput:</strong> Number of process instances completed per time period</li>
                    <li><strong>Error Rate:</strong> Percentage of process instances with errors</li>
                    <li><strong>Cost per Instance:</strong> Average cost to execute one process instance</li>
                </ul>`,
                de: `<p>Nach der Dokumentation des Ist-Prozesses ist der nächste Schritt die systematische <strong>Analyse</strong>, um Verbesserungspotenziale zu finden.</p>
                <h4>Wichtige Analysetechniken</h4>
                <table class="table table-bordered">
                    <thead><tr><th>Technik</th><th>Zweck</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Wertanalyse</strong></td><td>Jeden Schritt als wertschöpfend, nicht-wertschöpfend oder notwendige Verschwendung klassifizieren</td></tr>
                        <tr><td><strong>Engpassanalyse</strong></td><td>Schritte identifizieren, an denen sich Arbeit staut und Verzögerungen entstehen</td></tr>
                        <tr><td><strong>Ursachenanalyse</strong></td><td>Die eigentliche Ursache von Prozessproblemen finden (z.B. 5-Warum-Methode)</td></tr>
                        <tr><td><strong>Zeitanalyse</strong></td><td>Durchlaufzeiten, Wartezeiten und Bearbeitungszeiten messen</td></tr>
                        <tr><td><strong>Stakeholder-Analyse</strong></td><td>Verstehen, wer beteiligt ist und welchen Einfluss sie haben</td></tr>
                    </tbody>
                </table>
                <h4>Leistungskennzahlen (KPIs)</h4>
                <p>Verwenden Sie messbare KPIs zur Bewertung der Prozessleistung:</p>
                <ul>
                    <li><strong>Durchlaufzeit:</strong> Gesamtzeit vom Prozessstart bis zum Abschluss</li>
                    <li><strong>Durchsatz:</strong> Anzahl abgeschlossener Prozessinstanzen pro Zeitraum</li>
                    <li><strong>Fehlerquote:</strong> Prozentsatz fehlerhafter Prozessinstanzen</li>
                    <li><strong>Kosten pro Instanz:</strong> Durchschnittliche Kosten einer Prozessausführung</li>
                </ul>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "Which type of process directly creates value for customers?", de: "Welche Prozessart schafft direkt Wert für Kunden?" },
            options: {
                en: ["Management Processes", "Support Processes", "Core Processes", "IT Processes"],
                de: ["Managementprozesse", "Unterstützungsprozesse", "Kernprozesse", "IT-Prozesse"]
            },
            correct: 2
        },
        {
            question: { en: "What does an As-Is model document?", de: "Was dokumentiert ein Ist-Modell?" },
            options: {
                en: ["The ideal process", "The current state of the process", "Future technology", "Employee preferences"],
                de: ["Den idealen Prozess", "Den aktuellen Zustand des Prozesses", "Zukünftige Technologie", "Mitarbeiterpräferenzen"]
            },
            correct: 1
        },
        {
            question: { en: "Which method automatically extracts process data from IT systems?", de: "Welche Methode extrahiert automatisch Prozessdaten aus IT-Systemen?" },
            options: {
                en: ["Interviews", "Observation", "Process Mining", "Workshops"],
                de: ["Interviews", "Beobachtung", "Process Mining", "Workshops"]
            },
            correct: 2
        },
        {
            question: { en: "What does bottleneck analysis identify?", de: "Was identifiziert die Engpassanalyse?" },
            options: {
                en: ["The cheapest process step", "Steps where work accumulates causing delays", "The best employees", "New software tools"],
                de: ["Den günstigsten Prozessschritt", "Schritte, an denen sich Arbeit staut", "Die besten Mitarbeiter", "Neue Softwaretools"]
            },
            correct: 1
        },
        {
            question: { en: "Which KPI measures total time from start to completion?", de: "Welcher KPI misst die Gesamtzeit vom Start bis zum Abschluss?" },
            options: {
                en: ["Error Rate", "Throughput", "Cycle Time", "Cost per Instance"],
                de: ["Fehlerquote", "Durchsatz", "Durchlaufzeit", "Kosten pro Instanz"]
            },
            correct: 2
        }
    ]
},

/* ==============================================================
   MODULE 3: Introduction to BPMN 2.0
============================================================== */
{
    id: "module3",
    icon: "bi-diagram-2",
    title: { en: "Introduction to BPMN 2.0", de: "Einführung in BPMN 2.0" },
    description: {
        en: "Learn about the BPMN standard, its history, and why it is the leading notation for process modeling.",
        de: "Lernen Sie den BPMN-Standard, seine Geschichte und warum er die führende Notation für Prozessmodellierung ist."
    },
    sections: [
        {
            title: { en: "What is BPMN?", de: "Was ist BPMN?" },
            html: {
                en: `<p><strong>BPMN</strong> stands for <em>Business Process Model and Notation</em>. It is a standardized graphical notation for modeling business processes in a workflow. BPMN provides a common visual language that is understood by both business analysts and technical developers.</p>
                <h4>Key Facts about BPMN</h4>
                <ul>
                    <li><strong>Developer:</strong> Object Management Group (OMG)</li>
                    <li><strong>Current Version:</strong> BPMN 2.0 (released January 2011)</li>
                    <li><strong>ISO Standard:</strong> ISO/IEC 19510:2013</li>
                    <li><strong>Purpose:</strong> Bridge the gap between business process design and implementation</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Why BPMN?</strong> Before BPMN, many different notations existed (flowcharts, EPC, UML Activity Diagrams). BPMN provides one standardized language that everyone can use and understand.</div>
                </div>`,
                de: `<p><strong>BPMN</strong> steht für <em>Business Process Model and Notation</em>. Es ist eine standardisierte grafische Notation zur Modellierung von Geschäftsprozessen in einem Workflow. BPMN bietet eine gemeinsame visuelle Sprache, die sowohl von Business-Analysten als auch von technischen Entwicklern verstanden wird.</p>
                <h4>Wichtige Fakten über BPMN</h4>
                <ul>
                    <li><strong>Entwickler:</strong> Object Management Group (OMG)</li>
                    <li><strong>Aktuelle Version:</strong> BPMN 2.0 (veröffentlicht Januar 2011)</li>
                    <li><strong>ISO-Standard:</strong> ISO/IEC 19510:2013</li>
                    <li><strong>Zweck:</strong> Die Lücke zwischen Geschäftsprozessdesign und Implementierung überbrücken</li>
                </ul>
                <div class="callout callout-info"><i class="bi bi-info-circle-fill"></i>
                    <div><strong>Warum BPMN?</strong> Vor BPMN existierten viele verschiedene Notationen (Flussdiagramme, EPK, UML-Aktivitätsdiagramme). BPMN bietet eine standardisierte Sprache, die alle nutzen und verstehen können.</div>
                </div>`
            }
        },
        {
            title: { en: "History & Development of BPMN", de: "Geschichte & Entwicklung von BPMN" },
            html: {
                en: `<p>BPMN has evolved significantly since its inception:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Year</th><th>Milestone</th></tr></thead>
                    <tbody>
                        <tr><td><strong>2004</strong></td><td>BPMN 1.0 released by BPMI (Business Process Management Initiative)</td></tr>
                        <tr><td><strong>2006</strong></td><td>BPMI merges with OMG; BPMN becomes an OMG standard</td></tr>
                        <tr><td><strong>2008</strong></td><td>BPMN 1.1 and 1.2 released with minor improvements</td></tr>
                        <tr><td><strong>2011</strong></td><td>BPMN 2.0 released — major update with XML serialization and execution semantics</td></tr>
                        <tr><td><strong>2013</strong></td><td>BPMN 2.0 becomes ISO standard (ISO/IEC 19510:2013)</td></tr>
                    </tbody>
                </table>
                <h4>What Changed in BPMN 2.0?</h4>
                <ul>
                    <li><strong>XML Serialization:</strong> Process models can now be stored in a standardized XML format, making them machine-readable and tool-interoperable.</li>
                    <li><strong>Execution Semantics:</strong> BPMN 2.0 defines how processes should behave when executed by a process engine.</li>
                    <li><strong>Extended Elements:</strong> New diagram types (Choreography, Conversation) and refined element definitions.</li>
                </ul>`,
                de: `<p>BPMN hat sich seit seiner Entstehung erheblich weiterentwickelt:</p>
                <table class="table table-bordered">
                    <thead><tr><th>Jahr</th><th>Meilenstein</th></tr></thead>
                    <tbody>
                        <tr><td><strong>2004</strong></td><td>BPMN 1.0 veröffentlicht durch BPMI</td></tr>
                        <tr><td><strong>2006</strong></td><td>BPMI fusioniert mit OMG; BPMN wird OMG-Standard</td></tr>
                        <tr><td><strong>2008</strong></td><td>BPMN 1.1 und 1.2 mit kleineren Verbesserungen</td></tr>
                        <tr><td><strong>2011</strong></td><td>BPMN 2.0 — großes Update mit XML-Serialisierung und Ausführungssemantik</td></tr>
                        <tr><td><strong>2013</strong></td><td>BPMN 2.0 wird ISO-Standard (ISO/IEC 19510:2013)</td></tr>
                    </tbody>
                </table>
                <h4>Was hat sich in BPMN 2.0 geändert?</h4>
                <ul>
                    <li><strong>XML-Serialisierung:</strong> Prozessmodelle können in einem standardisierten XML-Format gespeichert werden — maschinenlesbar und werkzeugübergreifend nutzbar.</li>
                    <li><strong>Ausführungssemantik:</strong> BPMN 2.0 definiert, wie Prozesse sich verhalten sollen, wenn sie von einer Process Engine ausgeführt werden.</li>
                    <li><strong>Erweiterte Elemente:</strong> Neue Diagrammtypen (Choreographie, Konversation) und verfeinerte Elementdefinitionen.</li>
                </ul>`
            }
        },
        {
            title: { en: "BPMN 2.0 Diagram Types", de: "BPMN 2.0 Diagrammtypen" },
            html: {
                en: `<p>BPMN 2.0 defines several types of diagrams for different purposes:</p>
                <h4>1. Process Diagram (Orchestration)</h4>
                <p>The most common type. Shows the sequence of activities within a single organization or participant. This is what most people think of when they hear "BPMN diagram."</p>
                <h4>2. Collaboration Diagram</h4>
                <p>Shows the interaction between two or more participants (organizations or departments). Uses <strong>Pools</strong> to represent each participant and <strong>Message Flows</strong> to show communication between them.</p>
                <h4>3. Choreography Diagram</h4>
                <p>Focuses on the message exchange between participants without showing the internal processes. Shows the order of interactions from a global perspective.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>For this course:</strong> We will focus primarily on <strong>Process Diagrams</strong> and <strong>Collaboration Diagrams</strong>, as these are the most commonly used in practice.</div>
                </div>`,
                de: `<p>BPMN 2.0 definiert verschiedene Diagrammtypen für unterschiedliche Zwecke:</p>
                <h4>1. Prozessdiagramm (Orchestrierung)</h4>
                <p>Der häufigste Typ. Zeigt die Abfolge von Aktivitäten innerhalb einer einzelnen Organisation oder eines Teilnehmers. Dies ist das typische „BPMN-Diagramm".</p>
                <h4>2. Kollaborationsdiagramm</h4>
                <p>Zeigt die Interaktion zwischen zwei oder mehr Teilnehmern (Organisationen oder Abteilungen). Verwendet <strong>Pools</strong> für jeden Teilnehmer und <strong>Nachrichtenflüsse</strong> für die Kommunikation zwischen ihnen.</p>
                <h4>3. Choreographiediagramm</h4>
                <p>Fokussiert auf den Nachrichtenaustausch zwischen Teilnehmern, ohne die internen Prozesse zu zeigen. Zeigt die Reihenfolge der Interaktionen aus einer globalen Perspektive.</p>
                <div class="callout callout-tip"><i class="bi bi-lightbulb-fill"></i>
                    <div><strong>Für diesen Kurs:</strong> Wir konzentrieren uns hauptsächlich auf <strong>Prozessdiagramme</strong> und <strong>Kollaborationsdiagramme</strong>, da diese in der Praxis am häufigsten verwendet werden.</div>
                </div>`
            }
        }
    ],
    quiz: [
        {
            question: { en: "What does BPMN stand for?", de: "Wofür steht BPMN?" },
            options: {
                en: ["Business Process Management Network", "Business Process Model and Notation", "Basic Process Modeling Notation", "Business Performance Measurement Norm"],
                de: ["Business Process Management Network", "Business Process Model and Notation", "Basic Process Modeling Notation", "Business Performance Measurement Norm"]
            },
            correct: 1
        },
        {
            question: { en: "Which organization maintains the BPMN standard?", de: "Welche Organisation pflegt den BPMN-Standard?" },
            options: {
                en: ["IEEE", "W3C", "OMG (Object Management Group)", "ISO alone"],
                de: ["IEEE", "W3C", "OMG (Object Management Group)", "Nur ISO"]
            },
            correct: 2
        },
        {
            question: { en: "When was BPMN 2.0 released?", de: "Wann wurde BPMN 2.0 veröffentlicht?" },
            options: {
                en: ["2004", "2008", "2011", "2015"],
                de: ["2004", "2008", "2011", "2015"]
            },
            correct: 2
        },
        {
            question: { en: "What is a key improvement in BPMN 2.0 over previous versions?", de: "Was ist eine Schlüsselverbesserung in BPMN 2.0?" },
            options: {
                en: ["Fewer diagram types", "XML serialization and execution semantics", "Removal of gateways", "Only supports English"],
                de: ["Weniger Diagrammtypen", "XML-Serialisierung und Ausführungssemantik", "Entfernung von Gateways", "Nur englischsprachig"]
            },
            correct: 1
        },
        {
            question: { en: "Which BPMN diagram type is most commonly used?", de: "Welcher BPMN-Diagrammtyp wird am häufigsten verwendet?" },
            options: {
                en: ["Choreography Diagram", "Conversation Diagram", "Process Diagram", "Class Diagram"],
                de: ["Choreographiediagramm", "Konversationsdiagramm", "Prozessdiagramm", "Klassendiagramm"]
            },
            correct: 2
        }
    ]
}

]; /* End of COURSE_CONTENT (continued in content2.js) */
