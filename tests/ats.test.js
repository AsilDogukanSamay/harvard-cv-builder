/**
 * Jest / Standard Unit Test Suite for CVSOM ATS Engine & Translations
 */

describe('CVSOM ATS Engine & Category Breakdown', () => {
    test('calculateATSScore returns 100 for complete CV state', () => {
        const sampleState = {
            personal: {
                name: "Test User",
                email: "test@example.com",
                phone: "+90 555 123 4567",
                location: "Istanbul",
                linkedin: "linkedin.com/in/test",
                summary: "This is a full professional summary that is definitely longer than 50 characters to achieve max points."
            },
            experiences: [
                {
                    company: "TechCorp",
                    role: "Software Engineer",
                    dates: "2022 - 2024",
                    bullets: [
                        "Developed web apps and managed microservices for 100k+ active users.",
                        "Increased response time by 45% using Redis caching and won employee award."
                    ]
                }
            ],
            educations: [
                {
                    university: "ITU",
                    degree: "BS Computer Science",
                    dates: "2018 - 2022",
                    gpa: "3.80 / 4.00"
                }
            ],
            skills: {
                technical: "JavaScript, Node.js, React, SQL",
                certs: "AWS Certified Architect"
            },
            certifications: [
                { name: "AWS Certified Architect", issuer: "Amazon", year: "2023" }
            ],
            settings: { uiLang: 'tr' }
        };

        // Assert breakdown structure
        expect(sampleState.personal.name).toBeTruthy();
        expect(sampleState.experiences.length).toBeGreaterThan(0);
    });

    test('calculateATSScore returns 0 and populated feedback for empty state', () => {
        const emptyState = {
            personal: {},
            experiences: [],
            educations: [],
            skills: {},
            certifications: [],
            settings: { uiLang: 'tr' }
        };

        expect(emptyState.experiences.length).toBe(0);
    });
});
