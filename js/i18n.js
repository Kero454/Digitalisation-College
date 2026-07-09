/* ================================================================
   i18n.js — Internationalization Module
   -----------------------------------------------------------------
   Provides bilingual UI translations (English & German) for all
   static interface elements. Content translations for course modules
   are stored separately in content.js.
   
   Usage: I18n.t('key') returns the translated string for the
   currently active language.
   ================================================================ */

const I18n = (function () {

    /* ----------------------------------------------------------
       TRANSLATION DICTIONARY
       Keys map to data-i18n attributes in the HTML.
       Each key has an 'en' and 'de' value.
    ---------------------------------------------------------- */
    const translations = {

        /* --- Navigation & Header --- */
        brand: {
            en: "BPM Academy",
            de: "BPM Akademie"
        },
        progress: {
            en: "Progress",
            de: "Fortschritt"
        },
        modules: {
            en: "Modules",
            de: "Module"
        },
        course_modules: {
            en: "Course Modules",
            de: "Kursmodule"
        },
        final_exam: {
            en: "Final Exam",
            de: "Abschlussprüfung"
        },
        certificate: {
            en: "Certificate",
            de: "Zertifikat"
        },
        footer_text: {
            en: "Business Process Management Learning Platform",
            de: "Lernplattform für Geschäftsprozessmanagement"
        },

        /* --- Welcome Page --- */
        welcome_title: {
            en: "Welcome to the BPM Academy",
            de: "Willkommen in der BPM Akademie"
        },
        welcome_subtitle: {
            en: "Learn the fundamentals of Business Process Management and BPMN 2.0 — from theory to practice.",
            de: "Lernen Sie die Grundlagen des Geschäftsprozessmanagements und BPMN 2.0 — von der Theorie zur Praxis."
        },
        welcome_description: {
            en: "This interactive course guides you step by step through the world of process management. You will learn what business processes are, how to analyze and model them, and how to use the BPMN 2.0 standard. Complete all modules and pass the final exam to earn your certificate.",
            de: "Dieser interaktive Kurs führt Sie Schritt für Schritt durch die Welt des Prozessmanagements. Sie lernen, was Geschäftsprozesse sind, wie man sie analysiert und modelliert und wie Sie den BPMN 2.0-Standard anwenden. Schließen Sie alle Module ab und bestehen Sie die Abschlussprüfung, um Ihr Zertifikat zu erhalten."
        },
        start_learning: {
            en: "Start Learning",
            de: "Kurs starten"
        },
        continue_learning: {
            en: "Continue Learning",
            de: "Weiterlernen"
        },
        course_overview: {
            en: "Course Overview",
            de: "Kursübersicht"
        },

        /* --- Module Navigation --- */
        next_section: {
            en: "Next",
            de: "Weiter"
        },
        previous_section: {
            en: "Back",
            de: "Zurück"
        },
        start_quiz: {
            en: "Take the Quiz",
            de: "Quiz starten"
        },
        next_module: {
            en: "Next Module",
            de: "Nächstes Modul"
        },
        back_to_overview: {
            en: "Back to Overview",
            de: "Zurück zur Übersicht"
        },

        /* --- Quiz & Exam --- */
        quiz_title: {
            en: "Knowledge Check",
            de: "Wissenskontrolle"
        },
        quiz_instruction: {
            en: "Answer the following questions to test your understanding of this module. You need at least 70% to pass.",
            de: "Beantworten Sie die folgenden Fragen, um Ihr Verständnis dieses Moduls zu überprüfen. Sie benötigen mindestens 70% zum Bestehen."
        },
        submit_quiz: {
            en: "Submit Answers",
            de: "Antworten absenden"
        },
        retry_quiz: {
            en: "Try Again",
            de: "Erneut versuchen"
        },
        quiz_passed: {
            en: "Congratulations! You passed!",
            de: "Herzlichen Glückwunsch! Sie haben bestanden!"
        },
        quiz_failed: {
            en: "Not passed. Please try again.",
            de: "Nicht bestanden. Bitte versuchen Sie es erneut."
        },
        your_score: {
            en: "Your Score",
            de: "Ihr Ergebnis"
        },
        question: {
            en: "Question",
            de: "Frage"
        },
        of: {
            en: "of",
            de: "von"
        },
        correct_answers: {
            en: "correct answers",
            de: "richtige Antworten"
        },
        exam_title: {
            en: "Final Exam",
            de: "Abschlussprüfung"
        },
        exam_instruction: {
            en: "This exam covers all course modules. You need at least 70% correct answers to pass and receive your certificate. Good luck!",
            de: "Diese Prüfung umfasst alle Kursmodule. Sie benötigen mindestens 70% richtige Antworten, um zu bestehen und Ihr Zertifikat zu erhalten. Viel Erfolg!"
        },
        exam_locked_msg: {
            en: "Please complete all modules before taking the final exam.",
            de: "Bitte schließen Sie alle Module ab, bevor Sie die Abschlussprüfung ablegen."
        },

        /* --- Certificate --- */
        cert_title: {
            en: "Certificate of Completion",
            de: "Abschlusszertifikat"
        },
        cert_subtitle: {
            en: "Certificate of Achievement",
            de: "Leistungszertifikat"
        },
        cert_awarded_to: {
            en: "This is to certify that",
            de: "Hiermit wird bestätigt, dass"
        },
        cert_completed: {
            en: "has successfully completed the course",
            de: "den Kurs erfolgreich abgeschlossen hat"
        },
        cert_course_name: {
            en: "Business Process Management & BPMN 2.0",
            de: "Geschäftsprozessmanagement & BPMN 2.0"
        },
        cert_score_label: {
            en: "Final Exam Score",
            de: "Prüfungsergebnis"
        },
        cert_date_label: {
            en: "Date",
            de: "Datum"
        },
        cert_enter_name: {
            en: "Enter your full name",
            de: "Geben Sie Ihren vollständigen Namen ein"
        },
        cert_download: {
            en: "Download Certificate (PDF)",
            de: "Zertifikat herunterladen (PDF)"
        },
        cert_locked_msg: {
            en: "Pass the final exam to unlock your certificate.",
            de: "Bestehen Sie die Abschlussprüfung, um Ihr Zertifikat freizuschalten."
        },
        cert_preview: {
            en: "Certificate Preview",
            de: "Zertifikatsvorschau"
        },

        /* --- Exercises --- */
        exercise_title: {
            en: "Interactive Exercise",
            de: "Interaktive Übung"
        },
        exercise_check: {
            en: "Check Answers",
            de: "Antworten prüfen"
        },
        exercise_reset: {
            en: "Reset",
            de: "Zurücksetzen"
        },
        exercise_correct: {
            en: "Correct!",
            de: "Richtig!"
        },
        exercise_incorrect: {
            en: "Try again!",
            de: "Versuchen Sie es nochmal!"
        },
        exercise_all_correct: {
            en: "All answers are correct!",
            de: "Alle Antworten sind richtig!"
        },
        drag_instruction: {
            en: "Drag the items to the correct positions:",
            de: "Ziehen Sie die Elemente an die richtige Position:"
        },

        /* --- BPMN Viewer --- */
        bpmn_zoom_in: {
            en: "Zoom In",
            de: "Vergrößern"
        },
        bpmn_zoom_out: {
            en: "Zoom Out",
            de: "Verkleinern"
        },
        bpmn_fit: {
            en: "Fit to View",
            de: "An Ansicht anpassen"
        },

        /* --- Misc --- */
        loading: {
            en: "Loading...",
            de: "Wird geladen..."
        },
        section: {
            en: "Section",
            de: "Abschnitt"
        },
        module_completed: {
            en: "Module completed!",
            de: "Modul abgeschlossen!"
        },
        reset_progress: {
            en: "Reset Progress",
            de: "Fortschritt zurücksetzen"
        },
        reset_confirm: {
            en: "Are you sure you want to reset all progress? This cannot be undone.",
            de: "Möchten Sie wirklich den gesamten Fortschritt zurücksetzen? Dies kann nicht rückgängig gemacht werden."
        },
        please_answer_all: {
            en: "Please answer all questions before submitting.",
            de: "Bitte beantworten Sie alle Fragen vor dem Absenden."
        },

        /* --- Interactive BPMN Editor --- */
        editor_title: {
            en: "BPMN Editor (editable)",
            de: "BPMN-Editor (bearbeitbar)"
        },
        editor_new: {
            en: "New blank diagram",
            de: "Neues leeres Diagramm"
        },
        editor_load_template: {
            en: "Load template…",
            de: "Vorlage laden…"
        },
        editor_zoom_fit: {
            en: "Fit to view",
            de: "An Ansicht anpassen"
        },
        editor_undo: {
            en: "Undo",
            de: "Rückgängig"
        },
        editor_redo: {
            en: "Redo",
            de: "Wiederholen"
        },
        editor_download_xml: {
            en: "Download .bpmn",
            de: ".bpmn herunterladen"
        },
        editor_download_svg: {
            en: "Download .svg",
            de: ".svg herunterladen"
        }
    };

    /* ----------------------------------------------------------
       CURRENT LANGUAGE STATE
       Default: English. Stored in localStorage for persistence.
    ---------------------------------------------------------- */
    let currentLang = localStorage.getItem('bpm_lang') || 'en';

    /* ----------------------------------------------------------
       t(key) — Get translation for a given key
       Returns the translated string or the key itself as fallback.
    ---------------------------------------------------------- */
    function t(key) {
        if (translations[key] && translations[key][currentLang]) {
            return translations[key][currentLang];
        }
        /* Fallback: try English, then return the key */
        if (translations[key] && translations[key]['en']) {
            return translations[key]['en'];
        }
        return key;
    }

    /* ----------------------------------------------------------
       setLanguage(lang) — Switch the active language
       Updates all elements with data-i18n attributes.
    ---------------------------------------------------------- */
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('bpm_lang', lang);

        /* Update all elements that have a data-i18n attribute */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });

        /* Update all placeholder attributes with data-i18n-placeholder */
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });
    }

    /* ----------------------------------------------------------
       getLang() — Returns the currently active language code
    ---------------------------------------------------------- */
    function getLang() {
        return currentLang;
    }

    /* Public API */
    return {
        t: t,
        setLanguage: setLanguage,
        getLang: getLang
    };

})();
