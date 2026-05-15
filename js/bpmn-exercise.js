/* ================================================================
   bpmn-exercise.js — BPMN Diagram Viewer & Interactive Exercises
   -----------------------------------------------------------------
   Provides:
   1. BPMN XML definitions for example diagrams
   2. Functions to render BPMN diagrams using bpmn-js viewer
   3. Interactive drag-and-drop exercises for BPMN element matching
   
   Requires: bpmn-js navigated viewer (loaded via CDN in index.html)
   ================================================================ */

const BpmnExercise = (function () {

    /* ----------------------------------------------------------
       BPMN XML DEFINITIONS
       These are valid BPMN 2.0 XML strings that can be rendered
       by the bpmn-js viewer. Each represents a process example.
    ---------------------------------------------------------- */

    /* --- Order Processing BPMN Diagram XML --- */
    const ORDER_PROCESS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="OrderProcess" isExecutable="false" name="Order Processing">
    <startEvent id="start" name="Order Received">
      <outgoing>f1</outgoing>
    </startEvent>
    <task id="check" name="Check Order">
      <incoming>f1</incoming>
      <outgoing>f2</outgoing>
    </task>
    <exclusiveGateway id="gw1" name="Order Valid?">
      <incoming>f2</incoming>
      <outgoing>f3</outgoing>
      <outgoing>f4</outgoing>
    </exclusiveGateway>
    <task id="reject" name="Reject Order">
      <incoming>f3</incoming>
      <outgoing>f8</outgoing>
    </task>
    <endEvent id="end2" name="Order Rejected">
      <incoming>f8</incoming>
    </endEvent>
    <parallelGateway id="gw2" name="">
      <incoming>f4</incoming>
      <outgoing>f5</outgoing>
      <outgoing>f6</outgoing>
    </parallelGateway>
    <task id="payment" name="Process Payment">
      <incoming>f5</incoming>
      <outgoing>f9</outgoing>
    </task>
    <task id="shipment" name="Prepare Shipment">
      <incoming>f6</incoming>
      <outgoing>f10</outgoing>
    </task>
    <parallelGateway id="gw3" name="">
      <incoming>f9</incoming>
      <incoming>f10</incoming>
      <outgoing>f7</outgoing>
    </parallelGateway>
    <task id="send" name="Send Confirmation">
      <incoming>f7</incoming>
      <outgoing>f11</outgoing>
    </task>
    <endEvent id="end1" name="Order Completed">
      <incoming>f11</incoming>
    </endEvent>
    <sequenceFlow id="f1" sourceRef="start" targetRef="check"/>
    <sequenceFlow id="f2" sourceRef="check" targetRef="gw1"/>
    <sequenceFlow id="f3" name="No" sourceRef="gw1" targetRef="reject"/>
    <sequenceFlow id="f4" name="Yes" sourceRef="gw1" targetRef="gw2"/>
    <sequenceFlow id="f5" sourceRef="gw2" targetRef="payment"/>
    <sequenceFlow id="f6" sourceRef="gw2" targetRef="shipment"/>
    <sequenceFlow id="f9" sourceRef="payment" targetRef="gw3"/>
    <sequenceFlow id="f10" sourceRef="shipment" targetRef="gw3"/>
    <sequenceFlow id="f7" sourceRef="gw3" targetRef="send"/>
    <sequenceFlow id="f8" sourceRef="reject" targetRef="end2"/>
    <sequenceFlow id="f11" sourceRef="send" targetRef="end1"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="OrderProcess">
      <bpmndi:BPMNShape id="start_di" bpmnElement="start"><dc:Bounds x="180" y="200" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="check_di" bpmnElement="check"><dc:Bounds x="270" y="178" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw1_di" bpmnElement="gw1" isMarkerVisible="true"><dc:Bounds x="425" y="193" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="reject_di" bpmnElement="reject"><dc:Bounds x="500" y="80" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="end2_di" bpmnElement="end2"><dc:Bounds x="660" y="102" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw2_di" bpmnElement="gw2"><dc:Bounds x="525" y="193" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="payment_di" bpmnElement="payment"><dc:Bounds x="630" y="140" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shipment_di" bpmnElement="shipment"><dc:Bounds x="630" y="260" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw3_di" bpmnElement="gw3"><dc:Bounds x="785" y="193" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="send_di" bpmnElement="send"><dc:Bounds x="890" y="178" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="end1_di" bpmnElement="end1"><dc:Bounds x="1042" y="200" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="f1_di" bpmnElement="f1"><di:waypoint x="216" y="218"/><di:waypoint x="270" y="218"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f2_di" bpmnElement="f2"><di:waypoint x="370" y="218"/><di:waypoint x="425" y="218"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f3_di" bpmnElement="f3"><di:waypoint x="450" y="193"/><di:waypoint x="450" y="120"/><di:waypoint x="500" y="120"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f4_di" bpmnElement="f4"><di:waypoint x="475" y="218"/><di:waypoint x="525" y="218"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f5_di" bpmnElement="f5"><di:waypoint x="550" y="193"/><di:waypoint x="550" y="180"/><di:waypoint x="630" y="180"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f6_di" bpmnElement="f6"><di:waypoint x="550" y="243"/><di:waypoint x="550" y="300"/><di:waypoint x="630" y="300"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f9_di" bpmnElement="f9"><di:waypoint x="730" y="180"/><di:waypoint x="810" y="180"/><di:waypoint x="810" y="193"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f10_di" bpmnElement="f10"><di:waypoint x="730" y="300"/><di:waypoint x="810" y="300"/><di:waypoint x="810" y="243"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f7_di" bpmnElement="f7"><di:waypoint x="835" y="218"/><di:waypoint x="890" y="218"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f8_di" bpmnElement="f8"><di:waypoint x="600" y="120"/><di:waypoint x="660" y="120"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="f11_di" bpmnElement="f11"><di:waypoint x="990" y="218"/><di:waypoint x="1042" y="218"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* --- Employee Onboarding BPMN Diagram XML --- */
    const ONBOARDING_PROCESS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_2" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="OnboardingProcess" isExecutable="false" name="Employee Onboarding">
    <startEvent id="ob_start" name="New Employee Hired">
      <outgoing>ob_f1</outgoing>
    </startEvent>
    <task id="ob_welcome" name="Welcome Meeting">
      <incoming>ob_f1</incoming>
      <outgoing>ob_f2</outgoing>
    </task>
    <parallelGateway id="ob_gw1" name="">
      <incoming>ob_f2</incoming>
      <outgoing>ob_f3</outgoing>
      <outgoing>ob_f4</outgoing>
      <outgoing>ob_f5</outgoing>
    </parallelGateway>
    <task id="ob_it" name="Setup Workstation &amp; Accounts">
      <incoming>ob_f3</incoming>
      <outgoing>ob_f6</outgoing>
    </task>
    <task id="ob_hr" name="Complete Paperwork &amp; Training">
      <incoming>ob_f4</incoming>
      <outgoing>ob_f7</outgoing>
    </task>
    <task id="ob_team" name="Introduce to Team &amp; Mentor">
      <incoming>ob_f5</incoming>
      <outgoing>ob_f8</outgoing>
    </task>
    <parallelGateway id="ob_gw2" name="">
      <incoming>ob_f6</incoming>
      <incoming>ob_f7</incoming>
      <incoming>ob_f8</incoming>
      <outgoing>ob_f9</outgoing>
    </parallelGateway>
    <task id="ob_review" name="First-Week Review">
      <incoming>ob_f9</incoming>
      <outgoing>ob_f10</outgoing>
    </task>
    <endEvent id="ob_end" name="Onboarding Complete">
      <incoming>ob_f10</incoming>
    </endEvent>
    <sequenceFlow id="ob_f1" sourceRef="ob_start" targetRef="ob_welcome"/>
    <sequenceFlow id="ob_f2" sourceRef="ob_welcome" targetRef="ob_gw1"/>
    <sequenceFlow id="ob_f3" sourceRef="ob_gw1" targetRef="ob_it"/>
    <sequenceFlow id="ob_f4" sourceRef="ob_gw1" targetRef="ob_hr"/>
    <sequenceFlow id="ob_f5" sourceRef="ob_gw1" targetRef="ob_team"/>
    <sequenceFlow id="ob_f6" sourceRef="ob_it" targetRef="ob_gw2"/>
    <sequenceFlow id="ob_f7" sourceRef="ob_hr" targetRef="ob_gw2"/>
    <sequenceFlow id="ob_f8" sourceRef="ob_team" targetRef="ob_gw2"/>
    <sequenceFlow id="ob_f9" sourceRef="ob_gw2" targetRef="ob_review"/>
    <sequenceFlow id="ob_f10" sourceRef="ob_review" targetRef="ob_end"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_2">
    <bpmndi:BPMNPlane id="BPMNPlane_2" bpmnElement="OnboardingProcess">
      <bpmndi:BPMNShape id="ob_start_di" bpmnElement="ob_start"><dc:Bounds x="180" y="202" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_welcome_di" bpmnElement="ob_welcome"><dc:Bounds x="270" y="180" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_gw1_di" bpmnElement="ob_gw1"><dc:Bounds x="425" y="195" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_it_di" bpmnElement="ob_it"><dc:Bounds x="530" y="80" width="140" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_hr_di" bpmnElement="ob_hr"><dc:Bounds x="530" y="180" width="140" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_team_di" bpmnElement="ob_team"><dc:Bounds x="530" y="290" width="140" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_gw2_di" bpmnElement="ob_gw2"><dc:Bounds x="725" y="195" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_review_di" bpmnElement="ob_review"><dc:Bounds x="830" y="180" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ob_end_di" bpmnElement="ob_end"><dc:Bounds x="992" y="202" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="ob_f1_di" bpmnElement="ob_f1"><di:waypoint x="216" y="220"/><di:waypoint x="270" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f2_di" bpmnElement="ob_f2"><di:waypoint x="370" y="220"/><di:waypoint x="425" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f3_di" bpmnElement="ob_f3"><di:waypoint x="450" y="195"/><di:waypoint x="450" y="120"/><di:waypoint x="530" y="120"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f4_di" bpmnElement="ob_f4"><di:waypoint x="475" y="220"/><di:waypoint x="530" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f5_di" bpmnElement="ob_f5"><di:waypoint x="450" y="245"/><di:waypoint x="450" y="330"/><di:waypoint x="530" y="330"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f6_di" bpmnElement="ob_f6"><di:waypoint x="670" y="120"/><di:waypoint x="750" y="120"/><di:waypoint x="750" y="195"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f7_di" bpmnElement="ob_f7"><di:waypoint x="670" y="220"/><di:waypoint x="725" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f8_di" bpmnElement="ob_f8"><di:waypoint x="670" y="330"/><di:waypoint x="750" y="330"/><di:waypoint x="750" y="245"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f9_di" bpmnElement="ob_f9"><di:waypoint x="775" y="220"/><di:waypoint x="830" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ob_f10_di" bpmnElement="ob_f10"><di:waypoint x="930" y="220"/><di:waypoint x="992" y="220"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* ----------------------------------------------------------
       renderBpmnDiagram(containerId, xml, label)
       ---------------------------------------------------------
       Renders a BPMN 2.0 diagram into the specified container
       using the bpmn-js navigated viewer.
       
       @param containerId  CSS ID of the target container (without #)
       @param xml          BPMN 2.0 XML string
       @param label        Label shown above the diagram
    ---------------------------------------------------------- */
    function renderBpmnDiagram(containerId, xml, label) {
        const container = document.getElementById(containerId);
        if (!container) return;

        /* Create the viewer wrapper with label and canvas */
        container.innerHTML = `
            <div class="bpmn-canvas-wrapper">
                <div class="bpmn-canvas-label">
                    <i class="bi bi-diagram-3 me-2"></i>${label}
                </div>
                <div class="bpmn-canvas" id="${containerId}-canvas"></div>
                <div class="text-center py-2 bg-light border-top">
                    <small class="text-muted">
                        <i class="bi bi-mouse me-1"></i>
                        ${I18n.getLang() === 'de' ? 'Mausrad zum Zoomen, Klicken und Ziehen zum Schwenken' : 'Scroll to zoom, click and drag to pan'}
                    </small>
                </div>
            </div>
        `;

        /* Check if bpmn-js is available */
        if (typeof BpmnJS === 'undefined') {
            document.getElementById(containerId + '-canvas').innerHTML = `
                <div class="text-center p-4 text-muted">
                    <i class="bi bi-exclamation-circle fs-3"></i>
                    <p class="mt-2">BPMN viewer could not be loaded. Please check your internet connection.</p>
                </div>
            `;
            return;
        }

        /* Initialize the bpmn-js navigated viewer */
        var viewer = new BpmnJS({
            container: '#' + containerId + '-canvas'
        });

        /* Import the BPMN XML and fit the diagram to the viewport */
        viewer.importXML(xml).then(function () {
            var canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');
        }).catch(function (err) {
            console.error('BPMN rendering error:', err);
            document.getElementById(containerId + '-canvas').innerHTML = `
                <div class="text-center p-4 text-muted">
                    <i class="bi bi-exclamation-circle fs-3"></i>
                    <p class="mt-2">Error rendering BPMN diagram.</p>
                </div>
            `;
        });
    }

    /* ----------------------------------------------------------
       initDiagramsForSection()
       ---------------------------------------------------------
       Called after module content is rendered. Checks for BPMN
       diagram container divs and initializes them.
    ---------------------------------------------------------- */
    function initDiagramsForSection() {
        const lang = I18n.getLang();

        /* Order Processing diagram (Module 5, Section 2) */
        var orderContainer = document.getElementById('bpmn-order-process');
        if (orderContainer) {
            var label = lang === 'de' ? 'BPMN-Diagramm: Auftragsbearbeitung' : 'BPMN Diagram: Order Processing';
            renderBpmnDiagram('bpmn-order-process', ORDER_PROCESS_XML, label);
        }

        /* Employee Onboarding diagram (Module 5, Section 3) */
        var onboardingContainer = document.getElementById('bpmn-onboarding-process');
        if (onboardingContainer) {
            var label = lang === 'de' ? 'BPMN-Diagramm: Mitarbeiter-Onboarding' : 'BPMN Diagram: Employee Onboarding';
            renderBpmnDiagram('bpmn-onboarding-process', ONBOARDING_PROCESS_XML, label);
        }
    }

    /* ----------------------------------------------------------
       INTERACTIVE EXERCISES
       Drag-and-drop matching exercise for BPMN element types.
    ---------------------------------------------------------- */

    /* Exercise data: BPMN elements to match with descriptions */
    const EXERCISE_DATA = {
        /* Exercise 1: Match BPMN symbols to their names */
        exercise1: {
            title: {
                en: "Exercise 1: Match BPMN Symbols",
                de: "Übung 1: BPMN-Symbole zuordnen"
            },
            instruction: {
                en: "Drag each BPMN element name to its correct description.",
                de: "Ziehen Sie jeden BPMN-Elementnamen zur richtigen Beschreibung."
            },
            items: [
                { id: 'ex1_1', label: { en: 'Start Event', de: 'Startereignis' }, match: 0 },
                { id: 'ex1_2', label: { en: 'End Event', de: 'Endereignis' }, match: 1 },
                { id: 'ex1_3', label: { en: 'Exclusive Gateway', de: 'Exklusives Gateway' }, match: 2 },
                { id: 'ex1_4', label: { en: 'Parallel Gateway', de: 'Paralleles Gateway' }, match: 3 },
                { id: 'ex1_5', label: { en: 'User Task', de: 'User Task' }, match: 4 }
            ],
            targets: [
                { en: 'Thin circle — triggers the start of a process', de: 'Dünner Kreis — löst den Start eines Prozesses aus' },
                { en: 'Thick circle — marks the end of a process path', de: 'Dicker Kreis — markiert das Ende eines Prozessweges' },
                { en: 'Diamond with X — only one path is taken', de: 'Raute mit X — nur ein Pfad wird genommen' },
                { en: 'Diamond with + — all paths are taken simultaneously', de: 'Raute mit + — alle Pfade werden gleichzeitig genommen' },
                { en: 'Rounded rectangle with person icon — performed by a human', de: 'Abgerundetes Rechteck mit Personen-Symbol — von einem Menschen ausgeführt' }
            ]
        },
        /* Exercise 2: Match flow types */
        exercise2: {
            title: {
                en: "Exercise 2: Match Flow Types",
                de: "Übung 2: Flusstypen zuordnen"
            },
            instruction: {
                en: "Drag each flow type to its correct usage.",
                de: "Ziehen Sie jeden Flusstyp zur richtigen Verwendung."
            },
            items: [
                { id: 'ex2_1', label: { en: 'Sequence Flow', de: 'Sequenzfluss' }, match: 0 },
                { id: 'ex2_2', label: { en: 'Message Flow', de: 'Nachrichtenfluss' }, match: 1 },
                { id: 'ex2_3', label: { en: 'Association', de: 'Assoziation' }, match: 2 },
                { id: 'ex2_4', label: { en: 'Pool', de: 'Pool' }, match: 3 }
            ],
            targets: [
                { en: 'Solid arrow — shows order of activities within a process', de: 'Durchgezogener Pfeil — zeigt Reihenfolge der Aktivitäten innerhalb eines Prozesses' },
                { en: 'Dashed arrow — shows communication between different participants', de: 'Gestrichelter Pfeil — zeigt Kommunikation zwischen verschiedenen Teilnehmern' },
                { en: 'Dotted line — links annotations or data objects to elements', de: 'Gepunktete Linie — verknüpft Anmerkungen oder Datenobjekte mit Elementen' },
                { en: 'Large rectangle — represents a participant in a collaboration', de: 'Großes Rechteck — repräsentiert einen Teilnehmer in einer Kollaboration' }
            ]
        }
    };

    /* ----------------------------------------------------------
       renderExercises()
       ---------------------------------------------------------
       Renders the interactive drag-and-drop exercises into
       their container divs within Module 5.
    ---------------------------------------------------------- */
    function renderExercises() {
        renderSingleExercise('exercise-container-1', EXERCISE_DATA.exercise1);
        renderSingleExercise('exercise-container-2', EXERCISE_DATA.exercise2);
    }

    /* ----------------------------------------------------------
       renderSingleExercise(containerId, exerciseData)
       ---------------------------------------------------------
       Renders one drag-and-drop matching exercise.
    ---------------------------------------------------------- */
    function renderSingleExercise(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const lang = I18n.getLang();

        /* Shuffle the drag items randomly */
        let shuffledItems = data.items.slice().sort(function () {
            return Math.random() - 0.5;
        });

        let html = `
            <div class="exercise-container">
                <h4><i class="bi bi-puzzle me-2"></i>${data.title[lang]}</h4>
                <p class="text-muted">${data.instruction[lang]}</p>

                <!-- Draggable items (source) -->
                <div class="mb-3 p-3 bg-light rounded" id="${containerId}-source">
        `;

        shuffledItems.forEach(function (item) {
            html += `<span class="drag-item" draggable="true" id="${item.id}"
                           data-match="${item.match}"
                           ondragstart="BpmnExercise.handleDragStart(event)">${item.label[lang]}</span>`;
        });

        html += `</div><!-- Drop target zones -->
                <div class="row g-2" id="${containerId}-targets">`;

        data.targets.forEach(function (target, index) {
            html += `
                <div class="col-12">
                    <div class="d-flex align-items-center gap-2">
                        <div class="drop-zone"
                             id="${containerId}-drop-${index}"
                             data-target-index="${index}"
                             ondragover="BpmnExercise.handleDragOver(event)"
                             ondragleave="BpmnExercise.handleDragLeave(event)"
                             ondrop="BpmnExercise.handleDrop(event)">
                            <span class="drop-zone-label">${lang === 'de' ? 'Element hierher ziehen' : 'Drop here'}</span>
                        </div>
                        <div class="flex-grow-1 small">${target[lang]}</div>
                    </div>
                </div>
            `;
        });

        html += `</div>
                <!-- Check and Reset buttons -->
                <div class="mt-3 text-center">
                    <button class="btn btn-success me-2" onclick="BpmnExercise.checkExercise('${containerId}')">
                        <i class="bi bi-check-circle me-1"></i>${I18n.t('exercise_check')}
                    </button>
                    <button class="btn btn-outline-secondary" onclick="BpmnExercise.resetExercise('${containerId}', '${data === EXERCISE_DATA.exercise1 ? 'exercise1' : 'exercise2'}')">
                        <i class="bi bi-arrow-counterclockwise me-1"></i>${I18n.t('exercise_reset')}
                    </button>
                </div>
                <div id="${containerId}-result" class="mt-2 text-center"></div>
            </div>
        `;

        container.innerHTML = html;
    }

    /* ----------------------------------------------------------
       DRAG AND DROP EVENT HANDLERS
       HTML5 Drag and Drop API for the matching exercises.
    ---------------------------------------------------------- */

    function handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('drag-over');
    }

    function handleDragLeave(event) {
        event.currentTarget.classList.remove('drag-over');
    }

    function handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');

        var itemId = event.dataTransfer.getData('text/plain');
        var dragItem = document.getElementById(itemId);

        if (dragItem) {
            /* Remove "dragging" style */
            dragItem.classList.remove('dragging');

            /* If the drag item was in another drop zone, restore that zone's label */
            var prevZone = dragItem.parentElement;
            if (prevZone && prevZone.classList.contains('drop-zone')) {
                var prevLabel = prevZone.querySelector('.drop-zone-label');
                if (prevLabel) prevLabel.style.display = '';
            }

            /* If the target drop zone already has an item, move it back to source */
            var existingItem = event.currentTarget.querySelector('.drag-item');
            if (existingItem) {
                var exerciseContainer = event.currentTarget.closest('.exercise-container');
                var sourceContainer = exerciseContainer ? exerciseContainer.querySelector('[id$="-source"]') : null;
                if (sourceContainer) sourceContainer.appendChild(existingItem);
            }

            /* Hide the description label and append the drag item */
            var label = event.currentTarget.querySelector('.drop-zone-label');
            if (label) label.style.display = 'none';

            event.currentTarget.appendChild(dragItem);

            /* Reset any previous correct/incorrect styling */
            event.currentTarget.classList.remove('correct-drop', 'incorrect-drop');
        }
    }

    /* ----------------------------------------------------------
       checkExercise(containerId)
       ---------------------------------------------------------
       Validates all drop zones in the exercise and shows
       correct/incorrect feedback.
    ---------------------------------------------------------- */
    function checkExercise(containerId) {
        const lang = I18n.getLang();
        const container = document.getElementById(containerId);
        if (!container) return;

        var dropZones = container.querySelectorAll('.drop-zone');
        var allCorrect = true;
        var filledCount = 0;

        dropZones.forEach(function (zone) {
            var dragItem = zone.querySelector('.drag-item');
            if (!dragItem) return;
            filledCount++;

            var targetIndex = parseInt(zone.getAttribute('data-target-index'));
            var matchIndex = parseInt(dragItem.getAttribute('data-match'));

            if (targetIndex === matchIndex) {
                zone.classList.add('correct-drop');
                zone.classList.remove('incorrect-drop');
            } else {
                zone.classList.add('incorrect-drop');
                zone.classList.remove('correct-drop');
                allCorrect = false;
            }
        });

        /* Show result message */
        var resultDiv = document.getElementById(containerId + '-result');
        if (resultDiv) {
            if (filledCount === 0) {
                resultDiv.innerHTML = `<span class="text-warning"><i class="bi bi-exclamation-circle me-1"></i>${lang === 'de' ? 'Bitte platzieren Sie zuerst alle Elemente.' : 'Please place all items first.'}</span>`;
            } else if (allCorrect && filledCount === dropZones.length) {
                resultDiv.innerHTML = `<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i>${I18n.t('exercise_all_correct')}</span>`;
            } else if (!allCorrect) {
                resultDiv.innerHTML = `<span class="text-danger"><i class="bi bi-x-circle me-1"></i>${I18n.t('exercise_incorrect')}</span>`;
            }
        }
    }

    /* ----------------------------------------------------------
       resetExercise(containerId, exerciseKey)
       ---------------------------------------------------------
       Resets the exercise by re-rendering it from scratch.
    ---------------------------------------------------------- */
    function resetExercise(containerId, exerciseKey) {
        renderSingleExercise(containerId, EXERCISE_DATA[exerciseKey]);
    }

    /* Public API */
    return {
        renderBpmnDiagram: renderBpmnDiagram,
        initDiagramsForSection: initDiagramsForSection,
        renderExercises: renderExercises,
        handleDragStart: handleDragStart,
        handleDragOver: handleDragOver,
        handleDragLeave: handleDragLeave,
        handleDrop: handleDrop,
        checkExercise: checkExercise,
        resetExercise: resetExercise,
        ORDER_PROCESS_XML: ORDER_PROCESS_XML,
        ONBOARDING_PROCESS_XML: ONBOARDING_PROCESS_XML
    };

})();
