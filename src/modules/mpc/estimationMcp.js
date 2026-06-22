const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const getEstimationBaseline = async (
  requirements,
  businessAnalysis
) => {
  try {
const prompt = `
You are a Senior Software Project Estimation Expert.

Analyze the project requirements and generate a realistic baseline estimation suitable for startups, SMEs, local businesses, and mid-sized organizations.

IMPORTANT RULES:

* Use ONLY information available in Requirements and Business Analysis.
* Do NOT assume additional features, integrations, APIs, mobile apps, AI modules, cloud infrastructure, or enterprise requirements unless explicitly mentioned.
* Do NOT invent scope.
* Assume this is a small-to-medium business project unless clearly stated otherwise.
* Team size should normally be between 1 and 5 members.
* Keep estimations practical and conservative.
* Return ONLY valid JSON.
* Do NOT return markdown.
* Do NOT wrap response inside code blocks.

ESTIMATION GUIDELINES:

Simple Projects:
Examples:

* Business Website
* Portfolio Website
* Hotel Website
* School Website
* Billing Software
* Inventory System
* Basic Admin Dashboard

Estimated Team Size:
1-2 members

Estimated Duration:
2-4 weeks

Estimated Cost:
₹15,000 - ₹80,000

Medium Projects:
Examples:

* CRM
* ERP Module
* E-Commerce Website
* Multi-Role Management System
* Booking Platform
* Learning Management System

Estimated Team Size:
2-4 members

Estimated Duration:
1-3 months

Estimated Cost:
₹80,000 - ₹3,00,000

Complex Projects:
Examples:

* SaaS Platforms
* AI Enabled Applications
* Multi-Module Business Systems
* Advanced Analytics Platforms
* Workflow Automation Systems

Estimated Team Size:
3-5 members

Estimated Duration:
3-6 months

Estimated Cost:
₹3,00,000 - ₹8,00,000

Very Complex Projects:
Examples:

* Enterprise Platforms
* Large Scale AI Systems
* Multi-Tenant SaaS Ecosystems

Estimated Team Size:
4-5 members

Estimated Duration:
6+ months

Estimated Cost:
₹8,00,000 - ₹15,00,000

COST RULES:

* Cost must align with duration and team size.
* Standard websites should generally remain below ₹80,000.
* Business management systems should generally remain below ₹3,00,000.
* Do not generate enterprise-level budgets.
* Never estimate above ₹15,00,000 unless explicitly justified by requirements.
* Prefer realistic Indian software development pricing.
* Maximum 3 assumptions.

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Return JSON:

{
"complexity": "",
"recommendedTeamSize": "",
"estimatedDuration": "",
"estimatedCost": "",
"assumptions": []
}
`;


    const response = await generateContent(prompt);

    return JSON.parse(response);
  } catch (error) {
    throw new Error(
      `Estimation MCP Failed: ${error.message}`
    );
  }
};

module.exports = {
  getEstimationBaseline,
};