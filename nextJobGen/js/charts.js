// Data visualization using Chart.js

function createIndustryTrendsChart() {
    const ctx = document.getElementById('industryTrendsChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Technology',
                data: [65, 70, 75, 78, 82, 85],
                borderColor: '#2563eb',
                tension: 0.3
            }, {
                label: 'Healthcare',
                data: [55, 58, 62, 65, 68, 70],
                borderColor: '#16a34a',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Job Growth by Industry'
                }
            }
        }
    });
}

function createSkillsChart() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['AI/ML', 'Cloud', 'Data Analysis', 'Cybersecurity', 'DevOps'],
            datasets: [{
                label: 'Current Demand',
                data: [85, 90, 75, 80, 85],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: '#2563eb',
                pointBackgroundColor: '#2563eb'
            }, {
                label: '6-Month Forecast',
                data: [90, 95, 80, 85, 90],
                backgroundColor: 'rgba(22, 163, 74, 0.2)',
                borderColor: '#16a34a',
                pointBackgroundColor: '#16a34a'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Skills Demand Analysis'
                }
            }
        }
    });
}

function createLocationChart() {
    const ctx = document.getElementById('locationChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['New York', 'San Francisco', 'London', 'Singapore', 'Toronto'],
            datasets: [{
                label: 'Job Opportunities',
                data: [1200, 1500, 900, 800, 700],
                backgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Job Opportunities by Location'
                }
            }
        }
    });
}

function createForecastChart() {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Now', '+2 Months', '+4 Months', '+6 Months'],
            datasets: [{
                label: 'Predicted Growth',
                data: [100, 110, 125, 140],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Job Market Growth Forecast'
                }
            }
        }
    });
}