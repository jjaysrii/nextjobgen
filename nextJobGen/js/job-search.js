import config from '../config.js';

class JobSearch {
    constructor() {
        this.baseUrl = 'https://api.linkedin.com/v2';
        this.accessToken = localStorage.getItem('linkedin_token');
        // Initialize with LinkedIn API credentials
        // Note: In a production environment, these would be stored securely
        this.apiKey = null; // LinkedIn API key would go here
    }

    async searchJobs(skills, location, experience) {
        if (!this.accessToken) {
            this.initiateLinkedInAuth();
            return [];
        }

        try {
            // Convert skills array to keywords string
            const keywords = Array.isArray(skills) ? skills.join(' OR ') : skills;

            // Build the LinkedIn Jobs Search API URL
            const searchParams = new URLSearchParams({
                keywords: keywords,
                location: location,
                count: 20 // Number of results to return
            });

            const response = await fetch(`${this.baseUrl}/jobs/search?${searchParams}`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('LinkedIn API request failed');
            }

            const data = await response.json();
            return this.formatJobResults(data);
        } catch (error) {
            console.error('Error searching LinkedIn jobs:', error);
            // Fall back to mock data if API fails
            return this.getMockJobs(skills, location);
        }
        // This is a mock implementation. In a real application, 
        // you would use the LinkedIn API or another job search API
        try {
            // Simulated API call to LinkedIn
            const mockJobs = [
                {
                    title: 'Frontend Developer',
                    company: 'Tech Corp',
                    location: location || 'Remote',
                    description: 'Looking for a frontend developer with experience in React and modern JavaScript.',
                    skills: ['JavaScript', 'React', 'HTML', 'CSS'],
                    applyUrl: 'https://linkedin.com/jobs/view/frontend-dev'
                },
                {
                    title: 'Full Stack Developer',
                    company: 'Innovation Labs',
                    location: location || 'Remote',
                    description: 'Full stack developer position with focus on Node.js and React.',
                    skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
                    applyUrl: 'https://linkedin.com/jobs/view/fullstack-dev'
                },
                {
                    title: 'Backend Developer',
                    company: 'Data Systems Inc',
                    location: location || 'Remote',
                    description: 'Backend developer with strong Python and database skills needed.',
                    skills: ['Python', 'SQL', 'Django', 'AWS'],
                    applyUrl: 'https://linkedin.com/jobs/view/backend-dev'
                },
                {
                    title: 'Software Engineer',
                    company: 'Tech Corp',
                    location: location,
                    description: 'Looking for a software engineer with experience in...',
                    skills: ['JavaScript', 'React', 'Node.js'],
                    applyUrl: 'https://linkedin.com/jobs/...'
                },
                // Add more mock jobs here
            ];

            return this.filterJobsBySkills(mockJobs, skills);
        } catch (error) {
            console.error('Error searching jobs:', error);
            throw error;
        }
    }

    initiateLinkedInAuth() {
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
            `response_type=code&` +
            `client_id=${config.linkedIn.clientId}&` +
            `redirect_uri=${encodeURIComponent(config.linkedIn.redirectUri)}&` +
            `scope=${encodeURIComponent(config.linkedIn.scope.join(' '))}`;

        window.location.href = authUrl;
    }

    formatJobResults(apiData) {
        return apiData.elements.map(job => ({
            id: job.id,
            title: job.title.text,
            company: job.companyDetails.company.name,
            location: job.formattedLocation,
            description: job.description.text,
            applyUrl: job.applyMethod.companyApplyUrl,
            skills: this.extractSkillsFromDescription(job.description.text)
        }));
    }

    extractSkillsFromDescription(description) {
        const commonSkills = [
            'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue', 'node.js',
            'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'machine learning', 'ai',
            'html', 'css', 'git', 'agile', 'scrum'
        ];

        return commonSkills.filter(skill => 
            description.toLowerCase().includes(skill)
        );
    }

    getMockJobs(skills, location) {
        // Fallback mock data when API is not available
        const mockJobs = [
            {
                id: '1',
                title: 'Senior Frontend Developer',
                company: 'Tech Corp',
                location: location || 'Remote',
                description: 'Senior frontend developer position with React expertise.',
                skills: ['JavaScript', 'React', 'TypeScript'],
                applyUrl: 'https://linkedin.com/jobs/view/senior-frontend'
            },
            {
                id: '2',
                title: 'Full Stack Engineer',
                company: 'Innovation Labs',
                location: location || 'Remote',
                description: 'Full stack position with Node.js and React.',
                skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
                applyUrl: 'https://linkedin.com/jobs/view/fullstack'
            }
        ];

        return this.filterJobsBySkills(mockJobs, skills);
    }

    filterJobsBySkills(jobs, requiredSkills) {
        const skillsArray = requiredSkills.split(',').map(skill => skill.trim().toLowerCase());
        return jobs.filter(job => {
            const jobSkills = job.skills.map(skill => skill.toLowerCase());
            return skillsArray.some(skill => jobSkills.includes(skill));
        });
    }

    async applyToJob(jobId, resumeData) {
        // In a real application, this would integrate with LinkedIn's API
        // to submit job applications
        try {
            console.log('Applying to job:', jobId);
            console.log('Resume data:', resumeData);
            return {
                success: true,
                message: 'Application submitted successfully'
            };
        } catch (error) {
            console.error('Error applying to job:', error);
            throw error;
        }
    }
}

// Extend ResumeParser to include job matching
ResumeParser.prototype.findMatchingJobs = async function(parsedData) {
    const jobSearch = new JobSearch();
    const skills = parsedData.skills.join(', ');
    const location = parsedData.location || 'Remote';
    const experience = parsedData.experience || 0;

    try {
        const jobs = await jobSearch.searchJobs(skills, location, experience);
        return jobs;
    } catch (error) {
        console.error('Error finding matching jobs:', error);
        throw error;
    }
};
