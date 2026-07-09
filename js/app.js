/* ================================================================
   app.js — Main Application Controller
   -----------------------------------------------------------------
   Central controller for the BPM Academy e-learning platform.
   Handles:
   - Application initialization
   - Sidebar navigation rendering and state management
   - Module content rendering (sections with pagination)
   - Welcome/landing page
   - Language switching
   - Progress tracking (localStorage)
   - Coordination between Quiz, Certificate, and BPMN modules
   
   This file is loaded LAST so all dependencies are available.
   ================================================================ */

const App = (function () {

    /* ----------------------------------------------------------
       STATE VARIABLES
       Track the current view, module, and section.
    ---------------------------------------------------------- */
    let currentModuleIndex = -1;   /* -1 = welcome page */
    let currentSectionIndex = 0;

    /* ----------------------------------------------------------
       TEMPORARY: DISABLE SEQUENTIAL LOCKING
       ---------------------------------------------------------
       When true, every module and the final exam are unlocked
       regardless of quiz progress (useful for demos/testing).
       Set back to false to restore normal sequential unlocking.
    ---------------------------------------------------------- */
    const UNLOCK_ALL = true;

    /* ----------------------------------------------------------
       init()
       ---------------------------------------------------------
       Called when the page loads. Sets up the initial state:
       - Applies saved language preference
       - Renders the sidebar navigation
       - Shows the welcome page
       - Updates the progress bar
    ---------------------------------------------------------- */
    function init() {
        /* Apply stored language preference */
        var savedLang = localStorage.getItem('bpm_lang') || 'en';
        setLanguage(savedLang);

        /* Render the sidebar module list */
        renderSidebar();

        /* Show the welcome/landing page */
        showWelcome();

        /* Update the overall progress bar */
        updateProgress();
    }

    /* ----------------------------------------------------------
       setLanguage(lang)
       ---------------------------------------------------------
       Switches the interface language and re-renders current view.
       @param lang  'en' or 'de'
    ---------------------------------------------------------- */
    function setLanguage(lang) {
        /* Update I18n module */
        I18n.setLanguage(lang);

        /* Update language toggle button active states */
        document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('btn-lang-de').classList.toggle('active', lang === 'de');

        /* Update the HTML lang attribute */
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        /* Re-render the sidebar with translated module names */
        renderSidebar();

        /* Re-render the current view to update content language */
        if (currentModuleIndex === -1) {
            showWelcome();
        } else if (currentModuleIndex === -2) {
            /* -2 = exam page */
            showExam();
        } else if (currentModuleIndex === -3) {
            /* -3 = certificate page */
            showCertificate();
        } else {
            showSection(currentModuleIndex, currentSectionIndex);
        }

        updateProgress();
    }

    /* ----------------------------------------------------------
       SIDEBAR RENDERING
       Builds the sidebar navigation list with module items,
       including completion status and lock indicators.
    ---------------------------------------------------------- */
    function renderSidebar() {
        var lang = I18n.getLang();
        var sidebar = document.getElementById('sidebar-modules');
        if (!sidebar) return;

        var html = '';

        COURSE_CONTENT.forEach(function (module, index) {
            var isCompleted = isModuleCompleted(index);
            var isUnlocked = isModuleUnlocked(index);
            var isActive = currentModuleIndex === index;

            /* Build CSS classes based on state */
            var classes = 'nav-link sidebar-link';
            if (isActive) classes += ' active';
            if (isCompleted) classes += ' completed';
            if (!isUnlocked) classes += ' locked';
            if (isUnlocked) classes += ' unlocked';

            html += `
                <li class="nav-item">
                    <a class="${classes}" href="#"
                       id="nav-module-${index}"
                       onclick="App.showModule(${index}); return false;">
                        <i class="bi ${module.icon} me-2"></i>
                        <span>${index + 1}. ${module.title[lang] || module.title['en']}</span>
                        ${!isUnlocked ? '<i class="bi bi-lock-fill ms-auto sidebar-lock"></i>' : ''}
                    </a>
                </li>
            `;
        });

        sidebar.innerHTML = html;

        /* Update exam and certificate lock icons */
        updateExamCertLocks();
    }

    /* Alias for external calls */
    function updateSidebar() {
        renderSidebar();
    }

    /* ----------------------------------------------------------
       updateExamCertLocks()
       ---------------------------------------------------------
       Updates the lock icons on the Exam and Certificate
       sidebar links based on progress.
    ---------------------------------------------------------- */
    function updateExamCertLocks() {
        var examLink = document.getElementById('nav-exam');
        var certLink = document.getElementById('nav-certificate');
        var examLock = document.getElementById('exam-lock');
        var certLock = document.getElementById('cert-lock');

        var allModulesCompleted = areAllModulesCompleted();
        var examPassed = isExamPassed();

        /* Exam: unlocked when all modules are completed */
        if (examLink) {
            if (allModulesCompleted) {
                examLink.classList.remove('locked');
                examLink.classList.add('unlocked');
                if (examLock) examLock.style.display = 'none';
            } else {
                examLink.classList.add('locked');
                examLink.classList.remove('unlocked');
                if (examLock) examLock.style.display = '';
            }
            /* Highlight if active */
            examLink.classList.toggle('active', currentModuleIndex === -2);
            if (examPassed) examLink.classList.add('completed');
        }

        /* Certificate: unlocked when exam is passed */
        if (certLink) {
            if (examPassed) {
                certLink.classList.remove('locked');
                certLink.classList.add('unlocked');
                if (certLock) certLock.style.display = 'none';
            } else {
                certLink.classList.add('locked');
                certLink.classList.remove('unlocked');
                if (certLock) certLock.style.display = '';
            }
            certLink.classList.toggle('active', currentModuleIndex === -3);
            if (examPassed) certLink.classList.add('completed');
        }
    }

    /* ----------------------------------------------------------
       WELCOME / LANDING PAGE
    ---------------------------------------------------------- */
    function showWelcome() {
        currentModuleIndex = -1;
        currentSectionIndex = 0;
        renderSidebar();

        var lang = I18n.getLang();
        var contentArea = document.getElementById('content-area');

        /* Determine if user has started or is continuing */
        var progress = JSON.parse(localStorage.getItem('bpm_progress') || '{}');
        var hasProgress = progress.modules && Object.keys(progress.modules).length > 0;
        var btnLabel = hasProgress ? I18n.t('continue_learning') : I18n.t('start_learning');
        var nextModule = getNextIncompleteModule();

        /* Build the welcome page HTML */
        var html = `
            <!-- Hero banner -->
            <div class="welcome-hero">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h1><i class="bi bi-diagram-3-fill me-2"></i>${I18n.t('welcome_title')}</h1>
                        <p>${I18n.t('welcome_subtitle')}</p>
                        <p class="mb-4" style="opacity:0.85;">${I18n.t('welcome_description')}</p>
                        <button class="btn btn-light btn-lg fw-bold" onclick="App.showModule(${nextModule})">
                            <i class="bi bi-play-circle me-2"></i>${btnLabel}
                        </button>
                    </div>
                    <div class="col-lg-4 text-center d-none d-lg-block">
                        <i class="bi bi-diagram-3" style="font-size: 8rem; opacity: 0.3;"></i>
                    </div>
                </div>
            </div>

            <!-- Course Overview heading -->
            <h4 class="mb-3"><i class="bi bi-grid me-2"></i>${I18n.t('course_overview')}</h4>

            <!-- Module cards grid -->
            <div class="row g-3 mb-4">
        `;

        /* Render a card for each module */
        COURSE_CONTENT.forEach(function (module, index) {
            var completed = isModuleCompleted(index);
            var unlocked = isModuleUnlocked(index);
            var statusIcon = completed ? '<i class="bi bi-check-circle-fill text-success"></i>'
                           : unlocked ? '<i class="bi bi-unlock text-primary"></i>'
                           : '<i class="bi bi-lock-fill text-muted"></i>';

            html += `
                <div class="col-md-6 col-lg-4">
                    <div class="card module-card ${!unlocked ? 'opacity-50' : ''}"
                         onclick="${unlocked ? 'App.showModule(' + index + ')' : ''}">
                        <div class="card-header">
                            <span class="module-number">${index + 1}</span>
                            ${module.title[lang] || module.title['en']}
                        </div>
                        <div class="card-body">
                            <p class="card-text small">${module.description[lang] || module.description['en']}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">${module.sections.length} ${lang === 'de' ? 'Abschnitte' : 'sections'}</small>
                                ${statusIcon}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        /* Add exam and certificate cards */
        var allDone = areAllModulesCompleted();
        var examDone = isExamPassed();

        html += `
                <div class="col-md-6 col-lg-4">
                    <div class="card module-card ${!allDone ? 'opacity-50' : ''}"
                         onclick="${allDone ? 'App.showExam()' : ''}">
                        <div class="card-header" style="background: linear-gradient(135deg, #e67e22, #f39c12);">
                            <i class="bi bi-clipboard-check me-2"></i>${I18n.t('final_exam')}
                        </div>
                        <div class="card-body">
                            <p class="card-text small">${I18n.t('exam_instruction').substring(0, 100)}...</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">20 ${lang === 'de' ? 'Fragen' : 'questions'}</small>
                                ${examDone ? '<i class="bi bi-check-circle-fill text-success"></i>' : allDone ? '<i class="bi bi-unlock text-primary"></i>' : '<i class="bi bi-lock-fill text-muted"></i>'}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card module-card ${!examDone ? 'opacity-50' : ''}"
                         onclick="${examDone ? 'App.showCertificate()' : ''}">
                        <div class="card-header" style="background: linear-gradient(135deg, #c9a84c, #d4ac0d);">
                            <i class="bi bi-award me-2"></i>${I18n.t('certificate')}
                        </div>
                        <div class="card-body">
                            <p class="card-text small">${I18n.t('cert_locked_msg')}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">PDF</small>
                                ${examDone ? '<i class="bi bi-check-circle-fill text-success"></i>' : '<i class="bi bi-lock-fill text-muted"></i>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset progress button (only shown if there's progress) -->
            ${hasProgress ? `
                <div class="text-center mt-4">
                    <button class="btn btn-sm btn-outline-danger" onclick="App.resetProgress()">
                        <i class="bi bi-trash me-1"></i>${I18n.t('reset_progress')}
                    </button>
                </div>
            ` : ''}
        `;

        contentArea.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ----------------------------------------------------------
       MODULE CONTENT RENDERING
       Shows a specific module and navigates between its sections.
    ---------------------------------------------------------- */

    /* showModule(index) — Opens a module at its first section */
    function showModule(index) {
        if (index < 0 || index >= COURSE_CONTENT.length) return;
        if (!isModuleUnlocked(index)) return;

        currentModuleIndex = index;
        currentSectionIndex = 0;
        showSection(index, 0);
        renderSidebar();
    }

    /* showSection(moduleIndex, sectionIndex) — Shows a specific section */
    function showSection(moduleIndex, sectionIndex) {
        var lang = I18n.getLang();
        var module = COURSE_CONTENT[moduleIndex];
        if (!module) return;

        currentModuleIndex = moduleIndex;
        currentSectionIndex = sectionIndex;

        var contentArea = document.getElementById('content-area');
        var totalSections = module.sections.length;

        /* Determine if we're showing a content section or the quiz */
        var isQuizSection = sectionIndex >= totalSections;

        if (isQuizSection) {
            /* Show the module quiz */
            showModuleQuiz(moduleIndex);
            return;
        }

        var section = module.sections[sectionIndex];

        /* Build section progress dots */
        var dotsHtml = '<div class="section-progress">';
        for (var i = 0; i < totalSections; i++) {
            var dotClass = 'section-dot';
            if (i === sectionIndex) dotClass += ' active';
            else if (i < sectionIndex) dotClass += ' visited';
            dotsHtml += `<span class="${dotClass}" onclick="App.showSection(${moduleIndex}, ${i})" title="${I18n.t('section')} ${i + 1}"></span>`;
            if (i < totalSections - 1) dotsHtml += '<span class="section-dot-line"></span>';
        }
        /* Add quiz dot at the end */
        dotsHtml += '<span class="section-dot-line"></span>';
        dotsHtml += `<span class="section-dot ${isQuizSection ? 'active' : ''}" onclick="App.showSection(${moduleIndex}, ${totalSections})" title="${I18n.t('quiz_title')}"><i class="bi bi-question-circle" style="font-size:0.6rem;"></i></span>`;
        dotsHtml += '</div>';

        /* Build the full section HTML */
        var html = `
            <!-- Module header -->
            <div class="module-header">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h2><i class="bi ${module.icon} me-2"></i>${module.title[lang] || module.title['en']}</h2>
                    <span class="module-badge">${I18n.t('section')} ${sectionIndex + 1} ${I18n.t('of')} ${totalSections}</span>
                </div>
            </div>

            <!-- Section progress indicator -->
            ${dotsHtml}

            <!-- Section content -->
            <div class="content-section">
                <h3>${section.title[lang] || section.title['en']}</h3>
                ${section.html[lang] || section.html['en']}
            </div>

            <!-- Navigation buttons (Previous / Next) -->
            <div class="section-nav">
                ${sectionIndex > 0
                    ? `<button class="btn btn-nav btn-nav-outline" onclick="App.showSection(${moduleIndex}, ${sectionIndex - 1})">
                        <i class="bi bi-arrow-left me-1"></i>${I18n.t('previous_section')}
                       </button>`
                    : `<button class="btn btn-nav btn-nav-outline" onclick="App.showWelcome()">
                        <i class="bi bi-house me-1"></i>${I18n.t('back_to_overview')}
                       </button>`
                }

                ${sectionIndex < totalSections - 1
                    ? `<button class="btn btn-nav btn-nav-primary" onclick="App.showSection(${moduleIndex}, ${sectionIndex + 1})">
                        ${I18n.t('next_section')}<i class="bi bi-arrow-right ms-1"></i>
                       </button>`
                    : `<button class="btn btn-nav btn-nav-primary" onclick="App.showSection(${moduleIndex}, ${totalSections})">
                        ${I18n.t('start_quiz')}<i class="bi bi-clipboard-check ms-1"></i>
                       </button>`
                }
            </div>
        `;

        contentArea.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        /* Initialize BPMN diagrams and exercises if present */
        setTimeout(function () {
            BpmnExercise.initDiagramsForSection();
            BpmnExercise.renderExercises();
        }, 100);
    }

    /* ----------------------------------------------------------
       showModuleQuiz(moduleIndex)
       ---------------------------------------------------------
       Renders the knowledge check quiz at the end of a module.
    ---------------------------------------------------------- */
    function showModuleQuiz(moduleIndex) {
        var lang = I18n.getLang();
        var module = COURSE_CONTENT[moduleIndex];
        var contentArea = document.getElementById('content-area');

        /* Build section progress dots with quiz active */
        var totalSections = module.sections.length;
        var dotsHtml = '<div class="section-progress">';
        for (var i = 0; i < totalSections; i++) {
            dotsHtml += `<span class="section-dot visited" onclick="App.showSection(${moduleIndex}, ${i})" title="${I18n.t('section')} ${i + 1}"></span>`;
            if (i < totalSections - 1) dotsHtml += '<span class="section-dot-line"></span>';
        }
        dotsHtml += '<span class="section-dot-line"></span>';
        dotsHtml += '<span class="section-dot active" title="Quiz"><i class="bi bi-question-circle" style="font-size:0.6rem;"></i></span>';
        dotsHtml += '</div>';

        contentArea.innerHTML = `
            <div class="module-header">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h2><i class="bi ${module.icon} me-2"></i>${module.title[lang] || module.title['en']}</h2>
                    <span class="module-badge">${I18n.t('quiz_title')}</span>
                </div>
            </div>
            ${dotsHtml}
            <div id="quiz-area"></div>
            <div class="section-nav mt-3">
                <button class="btn btn-nav btn-nav-outline" onclick="App.showSection(${moduleIndex}, ${totalSections - 1})">
                    <i class="bi bi-arrow-left me-1"></i>${I18n.t('previous_section')}
                </button>
                <span></span>
            </div>
        `;

        /* Render the quiz questions */
        Quiz.renderQuiz(module.quiz, '#quiz-area', 'quiz', moduleIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ----------------------------------------------------------
       showExam()
       ---------------------------------------------------------
       Shows the final exam page (if all modules are completed).
    ---------------------------------------------------------- */
    function showExam() {
        if (!areAllModulesCompleted()) {
            /* Show a message that modules must be completed first */
            currentModuleIndex = -2;
            var contentArea = document.getElementById('content-area');
            contentArea.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-lock-fill" style="font-size: 4rem; color: var(--text-secondary);"></i>
                    <h3 class="mt-3">${I18n.t('final_exam')}</h3>
                    <p class="text-muted">${I18n.t('exam_locked_msg')}</p>
                    <button class="btn btn-primary mt-3" onclick="App.showWelcome()">
                        <i class="bi bi-house me-1"></i>${I18n.t('back_to_overview')}
                    </button>
                </div>
            `;
            renderSidebar();
            return;
        }

        currentModuleIndex = -2;
        renderSidebar();

        var contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div id="exam-area"></div>';

        /* Render the final exam */
        Quiz.renderQuiz(EXAM_QUESTIONS, '#exam-area', 'exam', 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ----------------------------------------------------------
       showCertificate()
       ---------------------------------------------------------
       Shows the certificate page (if the exam is passed).
    ---------------------------------------------------------- */
    function showCertificate() {
        currentModuleIndex = -3;
        renderSidebar();
        Certificate.renderCertificatePage('#content-area');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ----------------------------------------------------------
       PROGRESS TRACKING
       Uses localStorage to persist learner progress across sessions.
    ---------------------------------------------------------- */

    /* isModuleCompleted(index) — Check if a module's quiz has been passed */
    function isModuleCompleted(index) {
        var result = Quiz.getResult('quiz', index);
        return result !== null && result.passed === true;
    }

    /* isModuleUnlocked(index) — A module is unlocked if the previous one is completed (or it's module 0) */
    function isModuleUnlocked(index) {
        if (UNLOCK_ALL) return true; /* TEMPORARY: locks disabled */
        if (index === 0) return true;
        return isModuleCompleted(index - 1);
    }

    /* areAllModulesCompleted() — Check if all module quizzes have been passed */
    function areAllModulesCompleted() {
        if (UNLOCK_ALL) return true; /* TEMPORARY: locks disabled — unlocks the exam */
        for (var i = 0; i < COURSE_CONTENT.length; i++) {
            if (!isModuleCompleted(i)) return false;
        }
        return true;
    }

    /* isExamPassed() — Check if the final exam has been passed */
    function isExamPassed() {
        var result = Quiz.getResult('exam', 0);
        return result !== null && result.passed === true;
    }

    /* getNextIncompleteModule() — Returns the index of the next module to work on */
    function getNextIncompleteModule() {
        for (var i = 0; i < COURSE_CONTENT.length; i++) {
            if (!isModuleCompleted(i)) return i;
        }
        return 0; /* All completed, return first */
    }

    /* updateProgress() — Updates the overall progress bar in the navbar */
    function updateProgress() {
        var totalSteps = COURSE_CONTENT.length + 1; /* modules + exam */
        var completedSteps = 0;

        for (var i = 0; i < COURSE_CONTENT.length; i++) {
            if (isModuleCompleted(i)) completedSteps++;
        }
        if (isExamPassed()) completedSteps++;

        var percentage = Math.round((completedSteps / totalSteps) * 100);

        /* Update the progress bar width */
        var progressBar = document.getElementById('overall-progress');
        var progressText = document.getElementById('progress-text');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.setAttribute('aria-valuenow', percentage);
        }
        if (progressText) {
            progressText.textContent = percentage + '%';
        }
    }

    /* resetProgress() — Clears all progress data after confirmation */
    function resetProgress() {
        if (confirm(I18n.t('reset_confirm'))) {
            localStorage.removeItem('bpm_progress');
            localStorage.removeItem('bpm_user_name');
            showWelcome();
            updateProgress();
            renderSidebar();
        }
    }

    /* ----------------------------------------------------------
       INITIALIZATION
       Run init() when the DOM is fully loaded.
    ---------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', init);

    /* Public API — exposed for onclick handlers and cross-module calls */
    return {
        init: init,
        setLanguage: setLanguage,
        showWelcome: showWelcome,
        showModule: showModule,
        showSection: showSection,
        showExam: showExam,
        showCertificate: showCertificate,
        updateProgress: updateProgress,
        updateSidebar: updateSidebar,
        renderSidebar: renderSidebar,
        resetProgress: resetProgress
    };

})();
