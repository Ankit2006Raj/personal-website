/* ========================================
   MODAL FUNCTIONS
   ======================================== */

// Project Case Study Database
const projectDatabase = {
    'resume-insight': {
        title: "ResumeInsight: AI Resume Analysis Platform",
        categoryText: "AI & Machine Learning",
        keyMetric: "95.8% ATS Scoring Accuracy",
        image: "./assets/images/projects/resume_insight.png",
        challenge: "In today's highly competitive job market, candidates often face immediate rejection by Applicant Tracking Systems (ATS) due to poor keyword optimization, while recruiters waste countless hours manually parsing unqualified resumes.",
        solution: "Architected an elite, end-to-end Python/Flask AI platform integrated seamlessly with Google Gemini. Engineered advanced NLP pipelines to dynamically extract critical resume features, compute semantic matching scores against job descriptions, and deliver highly targeted, actionable optimization strategies.",
        accomplishments: [
            "Achieved an unparalleled 95.8% ATS compatibility analysis accuracy, massively boosting interview shortlists.",
            "Designed and deployed 30+ highly robust, secure REST APIs utilizing Flask-SQLAlchemy and JWT authentication.",
            "Fully containerized the microservices architecture via Docker, ensuring streamlined deployments and 99.9% uptime."
        ],
        tags: ["Flask", "Gemini AI", "SQLAlchemy", "Docker", "Python", "NLP"],
        codeSnippet: `import google.generativeai as genai\n\ndef analyze_resume(resume_text, job_desc):\n    # Initialize Google Gemini model API\n    model = genai.GenerativeModel("gemini-1.5-flash")\n    prompt = f"""\n    Analyze the following resume against the job description.\n    Resume: {resume_text}\n    Job Desc: {job_desc}\n    Provide matching score, keywords missing, and bullet modifications.\n    """\n    response = model.generate_content(prompt)\n    return response.text`,
        liveLink: "https://resume-insight-xi.vercel.app/",
        githubLink: "https://github.com/Ankit2006Raj/RESUME-INSIGHT"
    },
    'whatsapp-analyser': {
        title: "WhatsApp Chat Analyser",
        categoryText: "NLP & Data Analytics",
        keyMetric: "Full Sentiment Breakdown",
        image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop",
        challenge: "Analyzing conversational dynamics, message frequencies, emoji usage patterns, and emotional sentiment swings over thousands of messages is computationally tedious and lacks clean, recruiter-friendly representations.",
        solution: "Developed an interactive Streamlit dashboard parsing raw text chat exports. Deployed NLP pipelines for emoji extraction, chat activity heatmap plotting, and VADER sentiment analytics.",
        accomplishments: [
            "Processes exports of 50,000+ messages in under 2 seconds.",
            "Plots hourly, daily, and monthly user activity profiles using Seaborn.",
            "Classifies messages into positive, negative, and neutral sentiment levels dynamically."
        ],
        tags: ["Python", "Streamlit", "NLP", "Pandas", "Matplotlib", "Seaborn"],
        codeSnippet: `import re\nimport pandas as pd\n\ndef parse_chat(file_content):\n    # Regular expression parsing for date, time, user, and text\n    pattern = r'\\[(\\d{2}/\\d{2}/\\d{2}),\\s(\\d{2}:\\d{2}:\\d{2})\\]\\s([^:]+):\\s(.*)'\n    matches = re.findall(pattern, file_content)\n    df = pd.DataFrame(matches, columns=['Date', 'Time', 'User', 'Message'])\n    return df`,
        liveLink: "https://whatshapp-chat-analyser.vercel.app/",
        githubLink: "https://github.com/Ankit2006Raj/WHATSHAPP_CHAT_ANALYSER"
    },
    'jarvis-ai': {
        title: "Jarvis Voice Assistant",
        categoryText: "AI & Automation",
        keyMetric: "Offline Voice Commands",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
        challenge: "Building a fluid voice interface locally that handles speech processing and web command execution without excessive API costs or latency delays.",
        solution: "Implemented a lightweight speech parsing loop using SpeechRecognition and Pyttsx3 libraries. Orchestrated OS process automation, browser integration, and semantic query parsing.",
        accomplishments: [
            "Under-second local speech-to-text conversion delay.",
            "Supports offline basic system operations and web automation command bindings.",
            "Robust error fallback handling for accents and noisy environment inputs."
        ],
        tags: ["Python", "Speech Recognition", "NLP", "Pyttsx3", "OS Automation"],
        codeSnippet: `import speech_recognition as sr\nimport pyttsx3\n\ndef listen_command():\n    r = sr.Recognizer()\n    with sr.Microphone() as source:\n        print("Listening...")\n        audio = r.listen(source)\n    try:\n        query = r.recognize_google(audio, language='en-in')\n        return query.lower()\n    except Exception:\n        return "none"`,
        liveLink: "https://www.linkedin.com/posts/ankit2006raj_ai-machinelearning-python-activity-7442059478058909696-N9cs?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAE6kJL4BYOs9H6rWFUKlvkTjP9Xt0M1KCbM&utm_campaign=copy_link",
        githubLink: "https://github.com/Ankit2006Raj/JARVIS-AI"
    },
    'datavista': {
        title: "DataVista Automation Platform",
        categoryText: "Data Science",
        keyMetric: "Instant Exploratory EDA",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        challenge: "Data scientists spend up to 60% of their time on initial data cleaning and exploratory visualization instead of modeling.",
        solution: "Built a Python web application that ingests CSVs and dynamically renders Plotly charts, correlation matrices, and missing-value counts automatically using Scikit-Learn.",
        accomplishments: [
            "Reduces EDA setup times from hours to seconds.",
            "Interactive correlation matrices with dynamic filters.",
            "Automatic suggestions for handling missing values based on distributions."
        ],
        tags: ["Python", "Plotly", "Scikit-Learn", "Dash", "Pandas", "D3.js"],
        codeSnippet: `import pandas as pd\nimport plotly.express as px\n\ndef generate_corr_matrix(df):\n    numeric_df = df.select_dtypes(include=['number'])\n    corr = numeric_df.corr()\n    fig = px.imshow(corr, text_auto=True, title="Correlation Matrix")\n    return fig`,
        liveLink: "https://data-vista-1sag.vercel.app/",
        githubLink: "https://github.com/Ankit2006Raj/DataVista"
    },
    'ai-health': {
        title: "AI Symptom Analyser",
        categoryText: "Healthcare AI",
        keyMetric: "Primary Diagnosis Pipeline",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
        challenge: "Patients experience long wait times for primary medical advice, while doctors are bottlenecked by triage queues.",
        solution: "Built a Flask system mapping symptom descriptions to classification targets, utilizing trained ensemble models to predict potential conditions.",
        accomplishments: [
            "Predicts primary condition classes across 40+ disease profiles.",
            "Clean responsive interface styled with Bootstrap.",
            "Provides recommended specialist routing automatically."
        ],
        tags: ["Flask", "Machine Learning", "Bootstrap", "Python", "Scikit-Learn"],
        codeSnippet: `from flask import Flask, request, jsonify\nimport pickle\n\napp = Flask(__name__)\nmodel = pickle.load(open('medical_model.pkl', 'rb'))\n\n@app.route('/predict', methods=['POST'])\ndef predict():\n    symptoms = request.json['symptoms']\n    prediction = model.predict([symptoms])\n    return jsonify({'condition': prediction[0]})`,
        liveLink: "https://sympto-scan-ai-19pp.vercel.app/",
        githubLink: "https://github.com/Ankit2006Raj/SymptoScan-AI"
    },
    'house-price': {
        title: "Smart Property",
        categoryText: "Machine Learning",
        keyMetric: "95.8% R² Score",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
        challenge: "Real estate price modeling requires handling highly collinear factors, spatial correlations, and outliers.",
        solution: "Engineered a robust supervised learning pipeline with XGBoost. Implemented advanced feature transformations, target box-cox scaling, and L2 regularization.",
        accomplishments: [
            "Achieved a 95.8% accuracy (R² score) on validation splits.",
            "Optimized feature engineering pipeline using Scikit-Learn pipelines.",
            "Integrated model into a fast Flask endpoint for immediate inference."
        ],
        tags: ["Python", "XGBoost", "Scikit-Learn", "Flask", "Pandas"],
        codeSnippet: `from xgboost import XGBRegressor\nfrom sklearn.pipeline import Pipeline\n\ndef train_model(X, y):\n    pipeline = Pipeline([\n        ('scaler', StandardScaler()),\n        ('model', XGBRegressor(n_estimators=100, max_depth=6, learning_rate=0.1))\n    ])\n    pipeline.fit(X, y)\n    return pipeline`,
        liveLink: "https://smart-property-seven.vercel.app/",
        githubLink: "https://github.com/Ankit2006Raj/Smart_Property"
    }
};

// Project Modal Functions
function openProjectModal(projectId) {
    console.log('Opening project case study modal for:', projectId);
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');

    if (!modal || !modalBody) {
        console.error('Project modal elements not found in DOM');
        return;
    }

    const data = projectDatabase[projectId];
    if (!data) {
        console.error('No case study data found for ID:', projectId);
        return;
    }

    modalBody.innerHTML = `
        <div class="project-details-container">
            <div class="project-details-header">
                <span class="project-details-category">${data.categoryText}</span>
                <h2>${data.title}</h2>
                <div class="project-details-meta">
                    <span class="project-meta-badge"><i class="fas fa-chart-line"></i> ${data.keyMetric}</span>
                </div>
            </div>
            
            <div class="project-details-img">
                <img src="${data.image}" alt="${data.title}">
            </div>
            
            <div class="project-details-content">
                <div class="details-section">
                    <h4><i class="fas fa-bullseye"></i> The Challenge</h4>
                    <p>${data.challenge}</p>
                </div>
                
                <div class="details-section">
                    <h4><i class="fas fa-cogs"></i> Solution & Architecture</h4>
                    <p>${data.solution}</p>
                </div>
                
                <div class="details-section">
                    <h4><i class="fas fa-trophy"></i> Key Accomplishments</h4>
                    <ul class="accomplishments-list">
                        ${data.accomplishments.map(acc => `
                            <li>
                                <i class="fas fa-check-circle"></i>
                                <span>${acc}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="details-section">
                    <h4><i class="fas fa-code"></i> Tech Stack</h4>
                    <div class="tech-tags-wrapper">
                        ${data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>

                ${data.codeSnippet ? `
                <div class="details-section">
                    <h4><i class="fas fa-file-code"></i> Implementation Snippet</h4>
                    <pre class="snippet-pre"><code class="language-python">${escapeHtml(data.codeSnippet)}</code></pre>
                </div>
                ` : ''}
            </div>
            
            <div class="project-details-actions">
                <a href="${data.githubLink}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> View Repository
                </a>
                <a href="${data.liveLink}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    console.log('Closing project modal');
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Certificate Modal Functions
function openCertModal(certPath) {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    const downloadBtn = document.getElementById('certDownloadBtn');

    if (modal && modalImage && downloadBtn) {
        const normalizedPath = certPath.startsWith('./') ? certPath : './' + certPath;
        modalImage.src = normalizedPath;
        downloadBtn.href = normalizedPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Helper: Escape HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Close modals on outside click
window.onclick = function (event) {
    const certModal = document.getElementById('certModal');
    const projectModal = document.getElementById('projectModal');

    if (event.target === certModal) {
        closeCertModal();
    }
    if (event.target === projectModal) {
        closeProjectModal();
    }
}

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
        closeProjectModal();
    }
});

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
console.log('Modals Script Loaded Successfully ✨');
