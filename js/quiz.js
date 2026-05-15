/* ================================================================
   quiz.js — Quiz & Exam Engine
   -----------------------------------------------------------------
   Handles rendering and scoring of:
   - Section quizzes (at the end of each module)
   - Final exam (comprehensive test across all modules)
   
   Quizzes require 70% correct answers to pass.
   Results are stored in localStorage for progress tracking.
   ================================================================ */

const Quiz = (function () {

    /* ----------------------------------------------------------
       CONSTANTS
    ---------------------------------------------------------- */
    const PASS_THRESHOLD = 0.7; /* 70% required to pass */

    /* ----------------------------------------------------------
       renderQuiz(questions, containerId, type, moduleIndex)
       ---------------------------------------------------------
       Renders a set of multiple-choice questions into the
       specified container element.
       
       @param questions   Array of question objects from content.js
       @param containerId CSS selector for the target container
       @param type        'quiz' for section quiz, 'exam' for final
       @param moduleIndex Index of the module (for section quizzes)
    ---------------------------------------------------------- */
    function renderQuiz(questions, containerId, type, moduleIndex) {
        const lang = I18n.getLang();
        const container = document.querySelector(containerId);
        if (!container) return;

        /* Build the quiz title and instruction text */
        let titleKey = type === 'exam' ? 'exam_title' : 'quiz_title';
        let instructionKey = type === 'exam' ? 'exam_instruction' : 'quiz_instruction';

        let html = `
            <div class="quiz-container">
                <h3><i class="bi bi-clipboard-check me-2"></i>${I18n.t(titleKey)}</h3>
                <p class="text-muted mb-4">${I18n.t(instructionKey)}</p>
                <form id="quiz-form" onsubmit="return false;">
        `;

        /* Render each question */
        questions.forEach(function (q, index) {
            html += `
                <div class="quiz-question" id="question-${index}">
                    <div class="quiz-question-number">${I18n.t('question')} ${index + 1} ${I18n.t('of')} ${questions.length}</div>
                    <div class="quiz-question-text">${q.question[lang] || q.question['en']}</div>
            `;

            /* Render answer options as radio buttons */
            const options = q.options[lang] || q.options['en'];
            options.forEach(function (option, optIndex) {
                const inputName = 'q_' + index;
                const inputId = 'q_' + index + '_opt_' + optIndex;
                html += `
                    <div class="quiz-option" onclick="Quiz.selectOption('${inputId}')">
                        <input type="radio" name="${inputName}" id="${inputId}" value="${optIndex}">
                        <label for="${inputId}">${option}</label>
                    </div>
                `;
            });

            html += `</div>`;
        });

        /* Submit button */
        html += `
                </form>
                <div class="text-center mt-4">
                    <button class="btn-quiz-submit" id="btn-submit-quiz"
                            onclick="Quiz.submitQuiz('${type}', ${moduleIndex || 0})">
                        <i class="bi bi-check-circle me-2"></i>${I18n.t('submit_quiz')}
                    </button>
                </div>
                <div id="quiz-result-area"></div>
            </div>
        `;

        container.innerHTML = html;

        /* Scroll to top of quiz */
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ----------------------------------------------------------
       selectOption(inputId)
       ---------------------------------------------------------
       Programmatically selects a radio button when the user
       clicks on the surrounding option card (for better UX).
    ---------------------------------------------------------- */
    function selectOption(inputId) {
        const radio = document.getElementById(inputId);
        if (radio) {
            radio.checked = true;
        }
    }

    /* ----------------------------------------------------------
       submitQuiz(type, moduleIndex)
       ---------------------------------------------------------
       Evaluates all answers, calculates the score, highlights
       correct/incorrect answers, and displays the result.
       
       @param type        'quiz' or 'exam'
       @param moduleIndex Index of the module (for section quizzes)
    ---------------------------------------------------------- */
    function submitQuiz(type, moduleIndex) {
        const lang = I18n.getLang();

        /* Determine which questions to evaluate */
        let questions;
        if (type === 'exam') {
            questions = EXAM_QUESTIONS;
        } else {
            questions = COURSE_CONTENT[moduleIndex].quiz;
        }

        /* Check if all questions have been answered */
        let allAnswered = true;
        let correctCount = 0;

        questions.forEach(function (q, index) {
            const selected = document.querySelector(`input[name="q_${index}"]:checked`);
            if (!selected) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            alert(I18n.t('please_answer_all'));
            return;
        }

        /* Disable the submit button to prevent re-submission */
        const submitBtn = document.getElementById('btn-submit-quiz');
        if (submitBtn) submitBtn.disabled = true;

        /* Evaluate each question and highlight answers */
        questions.forEach(function (q, index) {
            const selected = document.querySelector(`input[name="q_${index}"]:checked`);
            const selectedValue = parseInt(selected.value);
            const isCorrect = selectedValue === q.correct;

            if (isCorrect) correctCount++;

            /* Highlight the selected option */
            const questionDiv = document.getElementById('question-' + index);
            const allOptions = questionDiv.querySelectorAll('.quiz-option');

            /* Disable all radio buttons */
            questionDiv.querySelectorAll('input[type="radio"]').forEach(function (r) {
                r.disabled = true;
            });

            /* Mark correct and incorrect answers */
            allOptions.forEach(function (optDiv, optIndex) {
                if (optIndex === q.correct) {
                    /* This is the correct answer — always highlight green */
                    optDiv.classList.add('correct');
                }
                if (optIndex === selectedValue && !isCorrect) {
                    /* User selected this wrong answer — highlight red */
                    optDiv.classList.add('incorrect');
                }
            });
        });

        /* Calculate percentage score */
        const score = correctCount / questions.length;
        const percentage = Math.round(score * 100);
        const passed = score >= PASS_THRESHOLD;

        /* Display result */
        showResult(passed, percentage, correctCount, questions.length, type, moduleIndex);

        /* Save result to localStorage */
        saveResult(type, moduleIndex, percentage, passed);
    }

    /* ----------------------------------------------------------
       showResult(passed, percentage, correct, total, type, moduleIndex)
       ---------------------------------------------------------
       Displays the quiz/exam result with score and next actions.
    ---------------------------------------------------------- */
    function showResult(passed, percentage, correct, total, type, moduleIndex) {
        const resultArea = document.getElementById('quiz-result-area');
        if (!resultArea) return;

        let resultClass = passed ? 'passed' : 'failed';
        let resultIcon = passed ? 'bi-trophy-fill' : 'bi-x-circle-fill';
        let resultText = passed ? I18n.t('quiz_passed') : I18n.t('quiz_failed');
        let resultColor = passed ? '#27ae60' : '#e74c3c';

        let buttonsHtml = '';

        if (passed) {
            if (type === 'exam') {
                /* Exam passed — show certificate button */
                buttonsHtml = `
                    <button class="btn btn-success btn-lg mt-3" onclick="App.showCertificate()">
                        <i class="bi bi-award me-2"></i>${I18n.t('certificate')}
                    </button>
                `;
            } else {
                /* Module quiz passed — show next module button */
                const nextModuleIndex = moduleIndex + 1;
                if (nextModuleIndex < COURSE_CONTENT.length) {
                    buttonsHtml = `
                        <button class="btn btn-success btn-lg mt-3" onclick="App.showModule(${nextModuleIndex})">
                            <i class="bi bi-arrow-right me-2"></i>${I18n.t('next_module')}
                        </button>
                    `;
                } else {
                    buttonsHtml = `
                        <button class="btn btn-success btn-lg mt-3" onclick="App.showExam()">
                            <i class="bi bi-clipboard-check me-2"></i>${I18n.t('final_exam')}
                        </button>
                    `;
                }
            }
        } else {
            /* Failed — show retry button */
            buttonsHtml = `
                <button class="btn btn-warning btn-lg mt-3" onclick="Quiz.retry('${type}', ${moduleIndex})">
                    <i class="bi bi-arrow-counterclockwise me-2"></i>${I18n.t('retry_quiz')}
                </button>
            `;
        }

        resultArea.innerHTML = `
            <div class="quiz-result ${resultClass}">
                <i class="bi ${resultIcon}" style="font-size: 3rem; color: ${resultColor};"></i>
                <h4 class="mt-2">${resultText}</h4>
                <div class="score" style="color: ${resultColor};">${percentage}%</div>
                <p>${correct} ${I18n.t('of')} ${total} ${I18n.t('correct_answers')}</p>
                ${buttonsHtml}
            </div>
        `;

        /* Scroll to result */
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });

        /* Update the sidebar and progress bar */
        if (typeof App !== 'undefined') {
            App.updateProgress();
            App.updateSidebar();
        }
    }

    /* ----------------------------------------------------------
       retry(type, moduleIndex)
       ---------------------------------------------------------
       Re-renders the quiz so the user can try again.
    ---------------------------------------------------------- */
    function retry(type, moduleIndex) {
        if (type === 'exam') {
            App.showExam();
        } else {
            /* Re-show the full module quiz page (with header and nav) */
            var totalSections = COURSE_CONTENT[moduleIndex].sections.length;
            App.showSection(moduleIndex, totalSections);
        }
    }

    /* ----------------------------------------------------------
       saveResult(type, moduleIndex, percentage, passed)
       ---------------------------------------------------------
       Persists quiz/exam results to localStorage.
    ---------------------------------------------------------- */
    function saveResult(type, moduleIndex, percentage, passed) {
        let progress = JSON.parse(localStorage.getItem('bpm_progress') || '{}');

        if (type === 'exam') {
            progress.examScore = percentage;
            progress.examPassed = passed;
        } else {
            if (!progress.modules) progress.modules = {};
            const moduleId = COURSE_CONTENT[moduleIndex].id;
            progress.modules[moduleId] = {
                quizScore: percentage,
                quizPassed: passed,
                completed: passed
            };
        }

        localStorage.setItem('bpm_progress', JSON.stringify(progress));
    }

    /* ----------------------------------------------------------
       getResult(type, moduleIndex)
       ---------------------------------------------------------
       Retrieves stored quiz/exam results from localStorage.
       Returns { score, passed } or null if not yet taken.
    ---------------------------------------------------------- */
    function getResult(type, moduleIndex) {
        let progress = JSON.parse(localStorage.getItem('bpm_progress') || '{}');

        if (type === 'exam') {
            if (progress.examScore !== undefined) {
                return { score: progress.examScore, passed: progress.examPassed };
            }
            return null;
        } else {
            if (!progress.modules) return null;
            const moduleId = COURSE_CONTENT[moduleIndex].id;
            if (progress.modules[moduleId]) {
                return {
                    score: progress.modules[moduleId].quizScore,
                    passed: progress.modules[moduleId].quizPassed
                };
            }
            return null;
        }
    }

    /* Public API */
    return {
        renderQuiz: renderQuiz,
        selectOption: selectOption,
        submitQuiz: submitQuiz,
        retry: retry,
        getResult: getResult
    };

})();
