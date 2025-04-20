// Main application logic

// Sample data - In a real application, this would come from an API
const mockData = {
    industries: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing'],
    skills: ['Machine Learning', 'Data Analysis', 'Cloud Computing', 'Digital Marketing', 'Project Management'],
    locations: ['New York', 'San Francisco', 'London', 'Singapore', 'Toronto']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initializeDashboard();
    setupEventListeners();
    populateFilters();
});

function initializeDashboard() {
    // Initialize charts when the dashboard is loaded
    const industryTrendsChart = createIndustryTrendsChart();
    const skillsChart = createSkillsChart();
    const locationChart = createLocationChart();
}

function setupEventListeners() {
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateRecommendations();
    });

    // Resume upload
    const resumeUpload = document.getElementById('resumeUpload');
    resumeUpload.addEventListener('change', handleResumeUpload);

    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function populateFilters() {
    const industryFilter = document.getElementById('industryFilter');
    mockData.industries.forEach(industry => {
        const option = document.createElement('option');
        option.value = industry.toLowerCase();
        option.textContent = industry;
        industryFilter.appendChild(option);
    });
}

function updateRecommendations() {
    // Initialize with some default jobs
    const jobSearch = new JobSearch();
    jobSearch.searchJobs('javascript', 'Remote')
        .then(jobs => displayJobResults(jobs))
        .catch(error => console.error('Error loading initial jobs:', error));

    const searchJobsBtn = document.getElementById('searchJobs');
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const location = document.getElementById('location').value;

    // Mock API call - In a real application, this would call a backend service
    const recommendations = generateRecommendations(skills, experience, location);
    displayRecommendations(recommendations);
}

function generateRecommendations(skills, experience, location) {
    // Mock recommendation algorithm
    return [
        {
            title: 'Senior Data Scientist',
            company: 'Tech Corp',
            location: 'San Francisco',
            match: '95%',
            skills: ['Machine Learning', 'Python', 'Data Analysis']
        },
        {
            title: 'AI Engineer',
            company: 'Innovation Labs',
            location: 'New York',
            match: '88%',
            skills: ['Deep Learning', 'Python', 'TensorFlow']
        }
    ];
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('jobMatches');
    container.innerHTML = '';

    recommendations.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-card';
        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <p class="match-score">Match: ${job.match}</p>
            <p>Required Skills: ${job.skills.join(', ')}</p>
        `;
        container.appendChild(jobElement);
    });
}

async function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const resultsContainer = document.getElementById('analysisResults');
    resultsContainer.innerHTML = '<p>Analyzing resume...</p>';

    try {
        // In a real application, this would use proper resume parsing
        // For now, we'll just read the file and show a mock analysis
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mock resume analysis results
            const analysis = {
                skills: ['JavaScript', 'Python', 'Data Analysis'],
                experience: '5 years',
                education: 'Master\'s in Computer Science',
                suggestedRoles: ['Data Scientist', 'Machine Learning Engineer']
            };
            displayResumeAnalysis(analysis);
        };
        reader.readAsText(file);
    } catch (error) {
        resultsContainer.innerHTML = '<p class="error">Error analyzing resume. Please try again.</p>';
    }
}

function displayResumeAnalysis(analysis) {
    const container = document.getElementById('analysisResults');
    container.innerHTML = `
        <div class="analysis-card">
            <h3>Resume Analysis Results</h3>
            <p><strong>Detected Skills:</strong> ${analysis.skills.join(', ')}</p>
            <p><strong>Experience Level:</strong> ${analysis.experience}</p>
            <p><strong>Education:</strong> ${analysis.education}</p>
            <p><strong>Suggested Roles:</strong> ${analysis.suggestedRoles.join(', ')}</p>
        </div>
    `;
}