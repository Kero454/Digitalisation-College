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

    /* --- Events Example: message start, timer, error boundary --- */
    const EVENTS_PROCESS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_Ev" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="EventsProcess" isExecutable="false" name="Event-Driven Order">
    <startEvent id="ev_start" name="Order Message Received">
      <outgoing>ev_f1</outgoing>
      <messageEventDefinition id="ev_msgdef"/>
    </startEvent>
    <task id="ev_receive" name="Register Order">
      <incoming>ev_f1</incoming>
      <outgoing>ev_f2</outgoing>
    </task>
    <intermediateCatchEvent id="ev_timer" name="Wait 2 Days">
      <incoming>ev_f2</incoming>
      <outgoing>ev_f3</outgoing>
      <timerEventDefinition id="ev_timerdef"/>
    </intermediateCatchEvent>
    <task id="ev_ship" name="Ship Order">
      <incoming>ev_f3</incoming>
      <outgoing>ev_f4</outgoing>
    </task>
    <endEvent id="ev_end_ok" name="Order Shipped">
      <incoming>ev_f4</incoming>
    </endEvent>
    <boundaryEvent id="ev_boundary" name="Shipping Failed" attachedToRef="ev_ship">
      <outgoing>ev_f5</outgoing>
      <errorEventDefinition id="ev_errdef1"/>
    </boundaryEvent>
    <task id="ev_handle" name="Handle Failure">
      <incoming>ev_f5</incoming>
      <outgoing>ev_f6</outgoing>
    </task>
    <endEvent id="ev_end_err" name="Order Failed">
      <incoming>ev_f6</incoming>
      <errorEventDefinition id="ev_errdef2"/>
    </endEvent>
    <sequenceFlow id="ev_f1" sourceRef="ev_start" targetRef="ev_receive"/>
    <sequenceFlow id="ev_f2" sourceRef="ev_receive" targetRef="ev_timer"/>
    <sequenceFlow id="ev_f3" sourceRef="ev_timer" targetRef="ev_ship"/>
    <sequenceFlow id="ev_f4" sourceRef="ev_ship" targetRef="ev_end_ok"/>
    <sequenceFlow id="ev_f5" sourceRef="ev_boundary" targetRef="ev_handle"/>
    <sequenceFlow id="ev_f6" sourceRef="ev_handle" targetRef="ev_end_err"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Ev">
    <bpmndi:BPMNPlane id="BPMNPlane_Ev" bpmnElement="EventsProcess">
      <bpmndi:BPMNShape id="ev_start_di" bpmnElement="ev_start"><dc:Bounds x="160" y="182" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_receive_di" bpmnElement="ev_receive"><dc:Bounds x="250" y="160" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_timer_di" bpmnElement="ev_timer"><dc:Bounds x="410" y="182" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_ship_di" bpmnElement="ev_ship"><dc:Bounds x="510" y="160" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_end_ok_di" bpmnElement="ev_end_ok"><dc:Bounds x="680" y="182" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_boundary_di" bpmnElement="ev_boundary"><dc:Bounds x="542" y="222" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_handle_di" bpmnElement="ev_handle"><dc:Bounds x="510" y="320" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ev_end_err_di" bpmnElement="ev_end_err"><dc:Bounds x="680" y="342" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="ev_f1_di" bpmnElement="ev_f1"><di:waypoint x="196" y="200"/><di:waypoint x="250" y="200"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ev_f2_di" bpmnElement="ev_f2"><di:waypoint x="350" y="200"/><di:waypoint x="410" y="200"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ev_f3_di" bpmnElement="ev_f3"><di:waypoint x="446" y="200"/><di:waypoint x="510" y="200"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ev_f4_di" bpmnElement="ev_f4"><di:waypoint x="610" y="200"/><di:waypoint x="680" y="200"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ev_f5_di" bpmnElement="ev_f5"><di:waypoint x="560" y="258"/><di:waypoint x="560" y="320"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="ev_f6_di" bpmnElement="ev_f6"><di:waypoint x="610" y="360"/><di:waypoint x="680" y="360"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* --- Gateways Example: inclusive (OR) split and join --- */
    const GATEWAYS_PROCESS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_Gw" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="GatewaysProcess" isExecutable="false" name="Customer Notification">
    <startEvent id="gw_start" name="Notify Customer">
      <outgoing>gw_f1</outgoing>
    </startEvent>
    <task id="gw_prep" name="Prepare Message">
      <incoming>gw_f1</incoming>
      <outgoing>gw_f2</outgoing>
    </task>
    <inclusiveGateway id="gw_split" name="Which channels?">
      <incoming>gw_f2</incoming>
      <outgoing>gw_f3</outgoing>
      <outgoing>gw_f4</outgoing>
    </inclusiveGateway>
    <task id="gw_email" name="Send Email">
      <incoming>gw_f3</incoming>
      <outgoing>gw_f5</outgoing>
    </task>
    <task id="gw_sms" name="Send SMS">
      <incoming>gw_f4</incoming>
      <outgoing>gw_f6</outgoing>
    </task>
    <inclusiveGateway id="gw_join" name="">
      <incoming>gw_f5</incoming>
      <incoming>gw_f6</incoming>
      <outgoing>gw_f7</outgoing>
    </inclusiveGateway>
    <endEvent id="gw_end" name="Customer Notified">
      <incoming>gw_f7</incoming>
    </endEvent>
    <sequenceFlow id="gw_f1" sourceRef="gw_start" targetRef="gw_prep"/>
    <sequenceFlow id="gw_f2" sourceRef="gw_prep" targetRef="gw_split"/>
    <sequenceFlow id="gw_f3" name="Email?" sourceRef="gw_split" targetRef="gw_email"/>
    <sequenceFlow id="gw_f4" name="SMS?" sourceRef="gw_split" targetRef="gw_sms"/>
    <sequenceFlow id="gw_f5" sourceRef="gw_email" targetRef="gw_join"/>
    <sequenceFlow id="gw_f6" sourceRef="gw_sms" targetRef="gw_join"/>
    <sequenceFlow id="gw_f7" sourceRef="gw_join" targetRef="gw_end"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Gw">
    <bpmndi:BPMNPlane id="BPMNPlane_Gw" bpmnElement="GatewaysProcess">
      <bpmndi:BPMNShape id="gw_start_di" bpmnElement="gw_start"><dc:Bounds x="160" y="202" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_prep_di" bpmnElement="gw_prep"><dc:Bounds x="240" y="180" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_split_di" bpmnElement="gw_split" isMarkerVisible="true"><dc:Bounds x="400" y="195" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_email_di" bpmnElement="gw_email"><dc:Bounds x="520" y="100" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_sms_di" bpmnElement="gw_sms"><dc:Bounds x="520" y="260" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_join_di" bpmnElement="gw_join" isMarkerVisible="true"><dc:Bounds x="690" y="195" width="50" height="50"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_end_di" bpmnElement="gw_end"><dc:Bounds x="800" y="202" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="gw_f1_di" bpmnElement="gw_f1"><di:waypoint x="196" y="220"/><di:waypoint x="240" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f2_di" bpmnElement="gw_f2"><di:waypoint x="340" y="220"/><di:waypoint x="400" y="220"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f3_di" bpmnElement="gw_f3"><di:waypoint x="425" y="195"/><di:waypoint x="425" y="140"/><di:waypoint x="520" y="140"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f4_di" bpmnElement="gw_f4"><di:waypoint x="425" y="245"/><di:waypoint x="425" y="300"/><di:waypoint x="520" y="300"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f5_di" bpmnElement="gw_f5"><di:waypoint x="620" y="140"/><di:waypoint x="715" y="140"/><di:waypoint x="715" y="195"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f6_di" bpmnElement="gw_f6"><di:waypoint x="620" y="300"/><di:waypoint x="715" y="300"/><di:waypoint x="715" y="245"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="gw_f7_di" bpmnElement="gw_f7"><di:waypoint x="740" y="220"/><di:waypoint x="800" y="220"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* --- Collaboration Example: two pools with message flow --- */
    const COLLABORATION_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_Col" targetNamespace="http://bpmn.io/schema/bpmn">
  <collaboration id="Collab_1">
    <participant id="part_customer" name="Customer" processRef="CustomerProc"/>
    <participant id="part_support" name="Support Team" processRef="SupportProc"/>
    <messageFlow id="mf1" sourceRef="c_send" targetRef="s_start"/>
    <messageFlow id="mf2" sourceRef="s_send" targetRef="c_recv"/>
  </collaboration>
  <process id="CustomerProc" isExecutable="false">
    <startEvent id="c_start" name="Issue Occurs"><outgoing>c_f1</outgoing></startEvent>
    <task id="c_send" name="Send Request"><incoming>c_f1</incoming><outgoing>c_f2</outgoing></task>
    <task id="c_recv" name="Receive Response"><incoming>c_f2</incoming><outgoing>c_f3</outgoing></task>
    <endEvent id="c_end" name="Issue Resolved"><incoming>c_f3</incoming></endEvent>
    <sequenceFlow id="c_f1" sourceRef="c_start" targetRef="c_send"/>
    <sequenceFlow id="c_f2" sourceRef="c_send" targetRef="c_recv"/>
    <sequenceFlow id="c_f3" sourceRef="c_recv" targetRef="c_end"/>
  </process>
  <process id="SupportProc" isExecutable="false">
    <startEvent id="s_start" name="Request Received"><outgoing>s_f1</outgoing><messageEventDefinition id="s_msgdef"/></startEvent>
    <task id="s_handle" name="Handle Request"><incoming>s_f1</incoming><outgoing>s_f2</outgoing></task>
    <task id="s_send" name="Send Response"><incoming>s_f2</incoming><outgoing>s_f3</outgoing></task>
    <endEvent id="s_end" name="Request Closed"><incoming>s_f3</incoming></endEvent>
    <sequenceFlow id="s_f1" sourceRef="s_start" targetRef="s_handle"/>
    <sequenceFlow id="s_f2" sourceRef="s_handle" targetRef="s_send"/>
    <sequenceFlow id="s_f3" sourceRef="s_send" targetRef="s_end"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Col">
    <bpmndi:BPMNPlane id="BPMNPlane_Col" bpmnElement="Collab_1">
      <bpmndi:BPMNShape id="part_customer_di" bpmnElement="part_customer" isHorizontal="true"><dc:Bounds x="160" y="80" width="640" height="160"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="c_start_di" bpmnElement="c_start"><dc:Bounds x="210" y="142" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="c_send_di" bpmnElement="c_send"><dc:Bounds x="300" y="120" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="c_recv_di" bpmnElement="c_recv"><dc:Bounds x="520" y="120" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="c_end_di" bpmnElement="c_end"><dc:Bounds x="690" y="142" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="part_support_di" bpmnElement="part_support" isHorizontal="true"><dc:Bounds x="160" y="300" width="640" height="160"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="s_start_di" bpmnElement="s_start"><dc:Bounds x="332" y="362" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="s_handle_di" bpmnElement="s_handle"><dc:Bounds x="410" y="340" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="s_send_di" bpmnElement="s_send"><dc:Bounds x="520" y="340" width="100" height="80"/></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="s_end_di" bpmnElement="s_end"><dc:Bounds x="690" y="362" width="36" height="36"/></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="c_f1_di" bpmnElement="c_f1"><di:waypoint x="246" y="160"/><di:waypoint x="300" y="160"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="c_f2_di" bpmnElement="c_f2"><di:waypoint x="400" y="160"/><di:waypoint x="520" y="160"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="c_f3_di" bpmnElement="c_f3"><di:waypoint x="620" y="160"/><di:waypoint x="690" y="160"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="s_f1_di" bpmnElement="s_f1"><di:waypoint x="368" y="380"/><di:waypoint x="410" y="380"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="s_f2_di" bpmnElement="s_f2"><di:waypoint x="510" y="380"/><di:waypoint x="520" y="380"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="s_f3_di" bpmnElement="s_f3"><di:waypoint x="620" y="380"/><di:waypoint x="690" y="380"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="mf1_di" bpmnElement="mf1"><di:waypoint x="350" y="200"/><di:waypoint x="350" y="362"/></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="mf2_di" bpmnElement="mf2"><di:waypoint x="570" y="340"/><di:waypoint x="570" y="200"/></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* --- Blank starter diagram for the editor --- */
    const BLANK_DIAGRAM_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             id="Definitions_Blank" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process_Blank" isExecutable="false">
    <startEvent id="StartEvent_1" name="Start"/>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Blank">
    <bpmndi:BPMNPlane id="BPMNPlane_Blank" bpmnElement="Process_Blank">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1"><dc:Bounds x="180" y="160" width="36" height="36"/></bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

    /* ----------------------------------------------------------
       DIAGRAM REGISTRY
       Maps a data-diagram key to its XML and bilingual label.
       Lesson diagrams use: <div class="bpmn-diagram" data-diagram="KEY">
    ---------------------------------------------------------- */
    const DIAGRAM_REGISTRY = {
        order: { xml: ORDER_PROCESS_XML, label: { en: 'BPMN Diagram: Order Processing', de: 'BPMN-Diagramm: Auftragsbearbeitung' } },
        onboarding: { xml: ONBOARDING_PROCESS_XML, label: { en: 'BPMN Diagram: Employee Onboarding', de: 'BPMN-Diagramm: Mitarbeiter-Onboarding' } },
        events: { xml: EVENTS_PROCESS_XML, label: { en: 'BPMN Diagram: Event-Driven Process', de: 'BPMN-Diagramm: Ereignisgesteuerter Prozess' } },
        gateways: { xml: GATEWAYS_PROCESS_XML, label: { en: 'BPMN Diagram: Inclusive Gateway', de: 'BPMN-Diagramm: Inklusives Gateway' } },
        collaboration: { xml: COLLABORATION_XML, label: { en: 'BPMN Collaboration: Customer & Support', de: 'BPMN-Kollaboration: Kunde & Support' } }
    };

    /* Templates available in the editor's "Load Template" dropdown */
    const EDITOR_TEMPLATES = {
        blank: { xml: BLANK_DIAGRAM_XML, label: { en: 'Blank diagram', de: 'Leeres Diagramm' } },
        order: { xml: ORDER_PROCESS_XML, label: { en: 'Order Processing', de: 'Auftragsbearbeitung' } },
        onboarding: { xml: ONBOARDING_PROCESS_XML, label: { en: 'Employee Onboarding', de: 'Mitarbeiter-Onboarding' } },
        gateways: { xml: GATEWAYS_PROCESS_XML, label: { en: 'Inclusive Gateway', de: 'Inklusives Gateway' } }
    };

    /* Holds the active editor (bpmn-js Modeler) instance */
    let activeModeler = null;

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

        /* Resolve the viewer constructor. We prefer the dedicated
           BpmnViewer global (captured in index.html) so that loading
           the Modeler bundle does not clobber the view-only renderer. */
        var ViewerCtor = (typeof BpmnViewer !== 'undefined') ? BpmnViewer
                       : (typeof BpmnJS !== 'undefined') ? BpmnJS
                       : null;

        if (!ViewerCtor) {
            document.getElementById(containerId + '-canvas').innerHTML = `
                <div class="text-center p-4 text-muted">
                    <i class="bi bi-exclamation-circle fs-3"></i>
                    <p class="mt-2">BPMN viewer could not be loaded. Please check your internet connection.</p>
                </div>
            `;
            return;
        }

        /* Initialize the bpmn-js navigated viewer */
        var viewer = new ViewerCtor({
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
       Called after module content is rendered. Renders all BPMN
       lesson diagrams and mounts any interactive editors present
       on the page.

       Data-driven convention:
         <div class="bpmn-diagram" data-diagram="KEY"></div>
       KEY is looked up in DIAGRAM_REGISTRY. Legacy fixed IDs
       (bpmn-order-process / bpmn-onboarding-process) are still
       supported for backward compatibility.
    ---------------------------------------------------------- */
    let diagramSeq = 0;
    function initDiagramsForSection() {
        const lang = I18n.getLang();

        /* --- Data-driven lesson diagrams --- */
        document.querySelectorAll('.bpmn-diagram[data-diagram]').forEach(function (el) {
            if (el.getAttribute('data-rendered') === 'true') return;
            var key = el.getAttribute('data-diagram');
            var reg = DIAGRAM_REGISTRY[key];
            if (!reg) return;

            /* Ensure the container has a unique id for renderBpmnDiagram */
            if (!el.id) {
                el.id = 'bpmn-diagram-' + (diagramSeq++);
            }
            el.setAttribute('data-rendered', 'true');
            renderBpmnDiagram(el.id, reg.xml, reg.label[lang] || reg.label.en);
        });

        /* --- Legacy fixed-ID containers (Module 5) --- */
        var orderContainer = document.getElementById('bpmn-order-process');
        if (orderContainer && orderContainer.getAttribute('data-rendered') !== 'true') {
            orderContainer.setAttribute('data-rendered', 'true');
            var lbl1 = lang === 'de' ? 'BPMN-Diagramm: Auftragsbearbeitung' : 'BPMN Diagram: Order Processing';
            renderBpmnDiagram('bpmn-order-process', ORDER_PROCESS_XML, lbl1);
        }
        var onboardingContainer = document.getElementById('bpmn-onboarding-process');
        if (onboardingContainer && onboardingContainer.getAttribute('data-rendered') !== 'true') {
            onboardingContainer.setAttribute('data-rendered', 'true');
            var lbl2 = lang === 'de' ? 'BPMN-Diagramm: Mitarbeiter-Onboarding' : 'BPMN Diagram: Employee Onboarding';
            renderBpmnDiagram('bpmn-onboarding-process', ONBOARDING_PROCESS_XML, lbl2);
        }

        /* --- Interactive editor(s) --- */
        initEditorsForSection();
    }

    /* ==========================================================
       INTERACTIVE BPMN EDITOR (bpmn-js Modeler)
       ----------------------------------------------------------
       Unlike the view-only diagrams above, the editor lets the
       learner CREATE and MODIFY diagrams: add elements from the
       palette, connect, rename, morph, delete, undo/redo, and
       export the result as .bpmn (XML) or .svg.

       Mount convention:
         <div class="bpmn-editor-mount" data-editor="playground"></div>
    ========================================================== */
    function initEditorsForSection() {
        const lang = I18n.getLang();

        document.querySelectorAll('.bpmn-editor-mount').forEach(function (mount) {
            if (mount.getAttribute('data-rendered') === 'true') return;
            mount.setAttribute('data-rendered', 'true');

            if (!mount.id) mount.id = 'bpmn-editor-' + (diagramSeq++);
            var canvasId = mount.id + '-canvas';

            /* Build the toolbar + canvas scaffold */
            var toolbarLabel = lang === 'de' ? 'BPMN-Editor (bearbeitbar)' : 'BPMN Editor (editable)';
            var templateLabel = lang === 'de' ? 'Vorlage laden…' : 'Load template…';
            var templateOptions = Object.keys(EDITOR_TEMPLATES).map(function (k) {
                return '<option value="' + k + '">' + (EDITOR_TEMPLATES[k].label[lang] || EDITOR_TEMPLATES[k].label.en) + '</option>';
            }).join('');

            mount.innerHTML = `
                <div class="bpmn-editor-wrapper">
                    <div class="bpmn-editor-toolbar">
                        <span class="bpmn-editor-title"><i class="bi bi-pencil-square me-1"></i>${toolbarLabel}</span>
                        <div class="bpmn-editor-actions">
                            <select class="form-select form-select-sm bpmn-editor-template"
                                    onchange="BpmnExercise.editorLoadTemplate('${mount.id}', this.value); this.selectedIndex=0;">
                                <option value="">${templateLabel}</option>
                                ${templateOptions}
                            </select>
                            <button class="btn btn-sm btn-outline-light" title="${I18n.t('editor_new')}" onclick="BpmnExercise.editorNew('${mount.id}')"><i class="bi bi-file-earmark"></i></button>
                            <button class="btn btn-sm btn-outline-light" title="${I18n.t('editor_zoom_fit')}" onclick="BpmnExercise.editorZoomFit('${mount.id}')"><i class="bi bi-arrows-fullscreen"></i></button>
                            <button class="btn btn-sm btn-outline-light" title="${I18n.t('editor_undo')}" onclick="BpmnExercise.editorUndo('${mount.id}')"><i class="bi bi-arrow-counterclockwise"></i></button>
                            <button class="btn btn-sm btn-outline-light" title="${I18n.t('editor_redo')}" onclick="BpmnExercise.editorRedo('${mount.id}')"><i class="bi bi-arrow-clockwise"></i></button>
                            <button class="btn btn-sm btn-light" onclick="BpmnExercise.editorDownloadXML('${mount.id}')"><i class="bi bi-download me-1"></i>.bpmn</button>
                            <button class="btn btn-sm btn-light" onclick="BpmnExercise.editorDownloadSVG('${mount.id}')"><i class="bi bi-image me-1"></i>.svg</button>
                        </div>
                    </div>
                    <div class="bpmn-editor-canvas" id="${canvasId}"></div>
                </div>
            `;

            /* Resolve the Modeler constructor (captured in index.html) */
            var ModelerCtor = (typeof BpmnModeler !== 'undefined') ? BpmnModeler : null;
            if (!ModelerCtor) {
                document.getElementById(canvasId).innerHTML = `
                    <div class="text-center p-5 text-muted">
                        <i class="bi bi-exclamation-circle fs-3"></i>
                        <p class="mt-2">${lang === 'de' ? 'Der BPMN-Editor konnte nicht geladen werden. Bitte prüfen Sie Ihre Internetverbindung.' : 'The BPMN editor could not be loaded. Please check your internet connection.'}</p>
                    </div>`;
                return;
            }

            /* Create the modeler and store it on the mount element */
            var modeler = new ModelerCtor({ container: '#' + canvasId });
            mount._modeler = modeler;
            activeModeler = modeler;

            modeler.importXML(BLANK_DIAGRAM_XML).then(function () {
                modeler.get('canvas').zoom('fit-viewport');
            }).catch(function (err) {
                console.error('BPMN editor import error:', err);
            });
        });
    }

    /* Helper: get the modeler instance for a mount id */
    function getModeler(mountId) {
        var mount = document.getElementById(mountId);
        return mount ? mount._modeler : null;
    }

    /* Toolbar: start a new blank diagram */
    function editorNew(mountId) {
        var modeler = getModeler(mountId);
        if (!modeler) return;
        modeler.importXML(BLANK_DIAGRAM_XML).then(function () {
            modeler.get('canvas').zoom('fit-viewport');
        });
    }

    /* Toolbar: load a template from EDITOR_TEMPLATES */
    function editorLoadTemplate(mountId, key) {
        if (!key) return;
        var modeler = getModeler(mountId);
        var tpl = EDITOR_TEMPLATES[key];
        if (!modeler || !tpl) return;
        modeler.importXML(tpl.xml).then(function () {
            modeler.get('canvas').zoom('fit-viewport');
        }).catch(function (err) {
            console.error('Template load error:', err);
        });
    }

    /* Toolbar: fit diagram to the viewport */
    function editorZoomFit(mountId) {
        var modeler = getModeler(mountId);
        if (modeler) modeler.get('canvas').zoom('fit-viewport');
    }

    /* Toolbar: undo / redo via the commandStack */
    function editorUndo(mountId) {
        var modeler = getModeler(mountId);
        if (modeler) { try { modeler.get('commandStack').undo(); } catch (e) {} }
    }
    function editorRedo(mountId) {
        var modeler = getModeler(mountId);
        if (modeler) { try { modeler.get('commandStack').redo(); } catch (e) {} }
    }

    /* Helper: trigger a browser download of a text blob */
    function downloadBlob(filename, mime, text) {
        var blob = new Blob([text], { type: mime });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /* Toolbar: export the current diagram as .bpmn (XML) */
    function editorDownloadXML(mountId) {
        var modeler = getModeler(mountId);
        if (!modeler) return;
        modeler.saveXML({ format: true }).then(function (result) {
            downloadBlob('diagram.bpmn', 'application/xml', result.xml);
        }).catch(function (err) {
            console.error('Export XML error:', err);
        });
    }

    /* Toolbar: export the current diagram as .svg */
    function editorDownloadSVG(mountId) {
        var modeler = getModeler(mountId);
        if (!modeler) return;
        modeler.saveSVG().then(function (result) {
            downloadBlob('diagram.svg', 'image/svg+xml', result.svg);
        }).catch(function (err) {
            console.error('Export SVG error:', err);
        });
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
        initEditorsForSection: initEditorsForSection,
        renderExercises: renderExercises,
        handleDragStart: handleDragStart,
        handleDragOver: handleDragOver,
        handleDragLeave: handleDragLeave,
        handleDrop: handleDrop,
        checkExercise: checkExercise,
        resetExercise: resetExercise,
        /* Interactive editor toolbar handlers */
        editorNew: editorNew,
        editorLoadTemplate: editorLoadTemplate,
        editorZoomFit: editorZoomFit,
        editorUndo: editorUndo,
        editorRedo: editorRedo,
        editorDownloadXML: editorDownloadXML,
        editorDownloadSVG: editorDownloadSVG,
        ORDER_PROCESS_XML: ORDER_PROCESS_XML,
        ONBOARDING_PROCESS_XML: ONBOARDING_PROCESS_XML
    };

})();
