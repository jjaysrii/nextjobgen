// Resume parsing and analysis functionality

class ResumeParser {
    constructor() {
        this.pdfjsLib = window['pdfjs-dist/build/pdf'];
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }

    async parseResume(file) {
        if (file.type === 'application/pdf') {
            return await this.parsePDF(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return await this.parseDocx(file);
        }
        throw new Error('Unsupported file format');
    }

    async parsePDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await this.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                fullText += textContent.items.map(item => item.str).join(' ');
            }

            return this.analyzeText(fullText);
        } catch (error) {
            console.error('Error parsing PDF:', error);
            throw error;
        }
    }

    extractExperience(text) {
        // Simple experience extraction (looks for numbers followed by 'years')
        const experienceMatch = text.match(/(\d+)\s*(?:years?)/i);
        return experienceMatch ? parseInt(experienceMatch[1]) : 0;
    }

    extractLocation(text) {
        // Simple location extraction (common cities)
        const cities = ['new york', 'san francisco', 'london', 'bangalore', 'mumbai', 'delhi'];
        const foundCity = cities.find(city => text.toLowerCase().includes(city));
        return foundCity ? foundCity.charAt(0).toUpperCase() + foundCity.slice(1) : 'Remote';
    }

    async parseDocx(file) {
        // In a real application, you would use a library like mammoth.js
        // For now, we'll just read it as text
        const text = await file.text();
        return this.analyzeText(text);
    }

    async analyzeText(text) {
        // Basic skills extraction
        const commonSkills = [
            'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue', 'node.js',
            'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'machine learning', 'ai',
            'html', 'css', 'git', 'agile', 'scrum'
        ];

        const skills = commonSkills.filter(skill => 
            text.toLowerCase().includes(skill)
        );

        // Extract basic information
        return {
            skills: skills.length > 0 ? skills : ['javascript', 'html', 'css'], // Default skills if none found
            skills: this.extractSkills(text),
            experience: this.extractExperience(text),
            education: this.extractEducation(text),
            jobTitles: this.extractJobTitles(text)
        };

        return analysis;
    }

    extractSkills(text) {
        // Mock skill extraction - In real app, use a comprehensive skills database
        const commonSkills = [
            'javascript', 'python', 'java', 'c++', 'react', 'angular', 'vue',
            'node.js', 'machine learning', 'data analysis', 'sql', 'aws', 'azure',
            'docker', 'kubernetes', 'agile', 'scrum'
        ];

        return commonSkills.filter(skill => 
            text.toLowerCase().includes(skill.toLowerCase())
        );
    }

    extractExperience(text) {
        // Mock experience extraction
        // In a real app, use regex patterns and NLP to identify work experience
        const years = text.match(/\d+\+?\s*years?/gi) || [];
        return years.length > 0 ? years[0] : 'Not specified';
    }

    extractEducation(text) {
        // Mock education extraction
        const degrees = [
            'Bachelor', 'Master', 'PhD', 'BSc', 'MSc', 'MBA', 'BBA'
        ];

        for (const degree of degrees) {
            if (text.includes(degree)) {
                return `${degree} degree found`;
            }
        }
        return 'Education details not found';
    }

    extractJobTitles(text) {
        // Mock job title extraction
        const commonTitles = [
            'Software Engineer', 'Data Scientist', 'Product Manager',
            'Project Manager', 'Business Analyst', 'Developer'
        ];

        return commonTitles.filter(title => 
            text.toLowerCase().includes(title.toLowerCase())
        );
    }
}

// Initialize the parser
const resumeParser = new ResumeParser();
