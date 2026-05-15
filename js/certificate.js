/* ================================================================
   certificate.js — PDF Certificate Generation
   -----------------------------------------------------------------
   Generates a downloadable PDF certificate using the jsPDF library.
   The certificate includes:
   - Course title and subtitle
   - Learner's name
   - Final exam score
   - Completion date
   - Decorative borders and styling
   
   Requires: jsPDF (loaded via CDN in index.html)
   ================================================================ */

const Certificate = (function () {

    /* ----------------------------------------------------------
       renderCertificatePage(containerSelector)
       ---------------------------------------------------------
       Renders the certificate preview page into the content area.
       Shows a visual preview and a download button.
       If the exam hasn't been passed, shows a locked message.
    ---------------------------------------------------------- */
    function renderCertificatePage(containerSelector) {
        const lang = I18n.getLang();
        const container = document.querySelector(containerSelector);
        if (!container) return;

        /* Check if exam has been passed */
        const progress = JSON.parse(localStorage.getItem('bpm_progress') || '{}');
        const examPassed = progress.examPassed === true;
        const examScore = progress.examScore || 0;

        if (!examPassed) {
            /* Exam not passed — show locked message */
            container.innerHTML = `
                <div class="certificate-container">
                    <i class="bi bi-lock-fill" style="font-size: 4rem; color: var(--text-secondary);"></i>
                    <h3 class="mt-3">${I18n.t('certificate')}</h3>
                    <p class="text-muted">${I18n.t('cert_locked_msg')}</p>
                    <button class="btn btn-primary mt-3" onclick="App.showExam()">
                        <i class="bi bi-clipboard-check me-2"></i>${I18n.t('final_exam')}
                    </button>
                </div>
            `;
            return;
        }

        /* Get stored name or use placeholder */
        const storedName = localStorage.getItem('bpm_user_name') || '';
        const today = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        /* Render certificate preview and download form */
        container.innerHTML = `
            <div class="certificate-container">
                <h3 class="mb-4"><i class="bi bi-award me-2"></i>${I18n.t('cert_preview')}</h3>

                <!-- Name input field -->
                <div class="name-input-group mb-4">
                    <label class="form-label fw-bold">${I18n.t('cert_enter_name')}</label>
                    <input type="text" class="form-control" id="cert-name-input"
                           value="${storedName}"
                           placeholder="${I18n.t('cert_enter_name')}"
                           data-i18n-placeholder="cert_enter_name"
                           oninput="Certificate.updatePreview()">
                </div>

                <!-- Visual certificate preview -->
                <div class="certificate-preview" id="cert-preview">
                    <h2>${I18n.t('cert_title')}</h2>
                    <div class="cert-subtitle">${I18n.t('cert_subtitle')}</div>
                    <p class="cert-details">${I18n.t('cert_awarded_to')}</p>
                    <div class="cert-name" id="cert-preview-name">${storedName || '_______________'}</div>
                    <p class="cert-details">${I18n.t('cert_completed')}</p>
                    <p class="cert-details fw-bold">${I18n.t('cert_course_name')}</p>
                    <hr style="border-color: #c9a84c; opacity: 0.4; margin: 1.5rem 3rem;">
                    <p class="cert-details">
                        ${I18n.t('cert_score_label')}: <strong>${examScore}%</strong><br>
                        ${I18n.t('cert_date_label')}: <strong>${today}</strong>
                    </p>
                </div>

                <!-- Download button -->
                <button class="btn-download-cert mt-4" onclick="Certificate.downloadPDF()">
                    <i class="bi bi-download me-2"></i>${I18n.t('cert_download')}
                </button>
            </div>
        `;
    }

    /* ----------------------------------------------------------
       updatePreview()
       ---------------------------------------------------------
       Updates the certificate preview when the user types their name.
       Also saves the name to localStorage for persistence.
    ---------------------------------------------------------- */
    function updatePreview() {
        const nameInput = document.getElementById('cert-name-input');
        const nameDisplay = document.getElementById('cert-preview-name');
        if (nameInput && nameDisplay) {
            const name = nameInput.value.trim();
            nameDisplay.textContent = name || '_______________';
            /* Persist the name */
            localStorage.setItem('bpm_user_name', name);
        }
    }

    /* ----------------------------------------------------------
       downloadPDF()
       ---------------------------------------------------------
       Generates and downloads a PDF certificate using jsPDF.
       Creates a formatted document with decorative elements,
       the course title, user name, score, and date.
    ---------------------------------------------------------- */
    function downloadPDF() {
        const lang = I18n.getLang();
        const nameInput = document.getElementById('cert-name-input');
        const userName = nameInput ? nameInput.value.trim() : '';

        if (!userName) {
            alert(I18n.t('cert_enter_name'));
            return;
        }

        /* Save the name */
        localStorage.setItem('bpm_user_name', userName);

        /* Get exam data */
        const progress = JSON.parse(localStorage.getItem('bpm_progress') || '{}');
        const examScore = progress.examScore || 0;
        const today = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        /* ---- Create PDF using jsPDF ---- */
        /* jsPDF is loaded as a UMD module, accessible via window.jspdf */
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();   /* 297mm */
        const pageHeight = doc.internal.pageSize.getHeight();  /* 210mm */

        /* --- Background color --- */
        doc.setFillColor(255, 253, 245); /* Light cream */
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        /* --- Outer decorative border --- */
        doc.setDrawColor(201, 168, 76); /* Gold color */
        doc.setLineWidth(2);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

        /* --- Inner decorative border --- */
        doc.setLineWidth(0.5);
        doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

        /* --- Corner decorations (small squares) --- */
        const corners = [
            [12, 12], [pageWidth - 18, 12],
            [12, pageHeight - 18], [pageWidth - 18, pageHeight - 18]
        ];
        corners.forEach(function (c) {
            doc.setFillColor(201, 168, 76);
            doc.rect(c[0], c[1], 6, 6, 'F');
        });

        /* --- Certificate Title --- */
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(26, 82, 118); /* Primary blue */
        const title = I18n.t('cert_title');
        doc.text(title, pageWidth / 2, 50, { align: 'center' });

        /* --- Subtitle --- */
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(201, 168, 76); /* Gold */
        const subtitle = I18n.t('cert_subtitle');
        doc.text(subtitle.toUpperCase(), pageWidth / 2, 62, { align: 'center' });

        /* --- Decorative line --- */
        doc.setDrawColor(201, 168, 76);
        doc.setLineWidth(0.8);
        doc.line(pageWidth / 2 - 60, 68, pageWidth / 2 + 60, 68);

        /* --- "This is to certify that" --- */
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(13);
        doc.setTextColor(100, 100, 100);
        doc.text(I18n.t('cert_awarded_to'), pageWidth / 2, 82, { align: 'center' });

        /* --- User Name --- */
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(26, 82, 118);
        doc.text(userName, pageWidth / 2, 98, { align: 'center' });

        /* --- Line under name --- */
        doc.setDrawColor(201, 168, 76);
        doc.setLineWidth(0.5);
        const nameWidth = doc.getTextWidth(userName);
        const lineHalfWidth = Math.max(nameWidth / 2 + 10, 40);
        doc.line(pageWidth / 2 - lineHalfWidth, 102, pageWidth / 2 + lineHalfWidth, 102);

        /* --- "has successfully completed" --- */
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(13);
        doc.setTextColor(100, 100, 100);
        doc.text(I18n.t('cert_completed'), pageWidth / 2, 115, { align: 'center' });

        /* --- Course name --- */
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(26, 82, 118);
        doc.text(I18n.t('cert_course_name'), pageWidth / 2, 128, { align: 'center' });

        /* --- Score and Date --- */
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(
            `${I18n.t('cert_score_label')}: ${examScore}%    |    ${I18n.t('cert_date_label')}: ${today}`,
            pageWidth / 2, 145,
            { align: 'center' }
        );

        /* --- Bottom decorative line --- */
        doc.setDrawColor(201, 168, 76);
        doc.setLineWidth(0.8);
        doc.line(pageWidth / 2 - 60, 155, pageWidth / 2 + 60, 155);

        /* --- Footer text --- */
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text('BPM Academy — ' + I18n.t('footer_text'), pageWidth / 2, 170, { align: 'center' });

        /* --- Download the PDF --- */
        const fileName = lang === 'de'
            ? 'BPM_Zertifikat_' + userName.replace(/\s+/g, '_') + '.pdf'
            : 'BPM_Certificate_' + userName.replace(/\s+/g, '_') + '.pdf';

        doc.save(fileName);
    }

    /* Public API */
    return {
        renderCertificatePage: renderCertificatePage,
        updatePreview: updatePreview,
        downloadPDF: downloadPDF
    };

})();
