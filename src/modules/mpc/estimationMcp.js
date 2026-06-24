const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const getEstimationBaseline = async (
  requirements,
  businessAnalysis
) => {
  try {
const prompt = `You are a Senior Software Project Estimation Expert with 10+ years of experience estimating software projects for startups, SMEs, local businesses, and mid-sized organizations.

Your task is to carefully analyze the project before generating any estimation.

IMPORTANT RULES:

* Use ONLY information available in Requirements and Business Analysis.
* Do NOT assume additional features, integrations, APIs, mobile apps, AI modules, cloud infrastructure, or enterprise requirements unless explicitly mentioned.
* Do NOT invent scope.
* Assume this is a small-to-medium business project unless clearly stated otherwise.
* Team size should normally be between 1 and 5 members.
* Keep estimations practical, conservative, and realistic.
* Prefer realistic Indian software development pricing.
* Return ONLY valid JSON.
* Do NOT return markdown.
* Do NOT wrap response inside code blocks.

MANDATORY ANALYSIS PROCESS:

Before generating any estimation, carefully analyze the entire project.

You MUST:

1. Read all requirements completely.
2. Understand the actual business objective.
3. Identify all functional requirements.
4. Identify all major modules.
5. Identify all user roles.
6. Identify all workflows and business processes.
7. Identify integrations ONLY if explicitly mentioned.
8. Determine the actual development effort required.
9. Determine project size based on implementation effort, not keywords.
10. Only after completing the above analysis, determine:

* Project Size
* Complexity
* Team Size
* Duration
* Cost
* Timeline

IMPORTANT:

Never estimate complexity based solely on words such as:

* AI
* Smart
* Intelligent
* Dashboard
* Analytics
* Reports
* Reporting
* Portal
* Management System
* Automation

A small project containing AI features is NOT automatically a Complex project.

Complexity must be determined using:

* Number of modules
* Number of user roles
* Number of workflows
* Number of integrations
* Number of deliverables
* Actual implementation effort

PROJECT SIZE RULES:

Very Small:

* 1 to 3 modules
* Single user role
* Basic CRUD operations
* No integrations

Small:

* Up to 5 modules
* Up to 2 user roles
* Standard business workflows
* No major integrations

Medium:

* 6 to 10 modules
* Up to 4 user roles
* Multiple workflows
* Limited integrations

Large:

* More than 10 modules
* Multiple user roles
* Multiple integrations
* Complex workflows

COMPLEXITY RULES:

Simple:

* Very Small or Small projects
* Standard websites
* Portfolio websites
* Business websites
* Hotel websites
* School websites
* Billing systems
* Inventory systems
* Basic dashboards

Medium:

* Medium-sized business systems
* CRM systems
* Booking platforms
* ERP modules
* Learning management systems
* Multi-role management systems

Complex:

* Large business systems
* SaaS products
* Workflow automation platforms
* Multi-module applications with integrations

Very Complex:

* Only if explicitly mentioned in requirements
* Enterprise-scale platform
* Multi-tenant ecosystem
* Nationwide deployment
* Large-scale infrastructure

ESTIMATION GUIDELINES:

Simple:

* Team Size: 1-2 Members
* Duration: 2-4 Weeks
* Cost: ₹15,000 - ₹80,000

Medium:

* Team Size: 2-5 Members
* Duration: 1-3 Months
* Cost: ₹80,000 - ₹1,50,000

Complex:

* Team Size: 3-7 Members
* Duration: 3-6 Months
* Cost: ₹2,00,000 - ₹5,00,000

Very Complex:

* Team Size: 7-10 Members
* Duration: 6+ Months
* Cost: ₹8,00,000 - ₹15,00,000

COST VALIDATION RULES:

* Cost must align with actual project scope.
* Standard websites should generally remain below ₹80,000.
* Small business applications should generally remain below ₹1,50,000.
* Business management systems should generally remain below ₹3,00,000.
* Do not generate enterprise-level budgets.
* Never estimate above ₹15,00,000 unless explicitly justified by requirements.
* Prefer realistic Indian SME software pricing.

TIMELINE GENERATION RULES:

Generate a detailed week-wise project timeline.

Rules:

1. Timeline must be based on actual project modules, workflows, and requirements.
2. Requirement Gathering and Project Planning must always be the first phase.
3. UI/UX Design and Database Design should occur before development.
4. Development activities must explicitly mention actual modules identified in the project.
5. Testing and Bug Fixing must always occur before deployment.
6. Deployment and User Training must always be the final phase.
7. Timeline must align with the estimated duration.
8. Activities should be grouped logically into weeks.
9. Do NOT generate generic phases unrelated to the project.
10. Do NOT return only "2 Months", "3 Months", or similar durations.

Timeline Output Format:

"timeline": [
{
"week": "Week 1",
"activities": [
"Requirement Gathering",
"Project Planning"
]
},
{
"week": "Week 2",
"activities": [
"UI/UX Design",
"Database Design"
]
},
{
"week": "Week 3-4",
"activities": [
"Module Development"
]
},
{
"week": "Week 5",
"activities": [
"Feature Development"
]
},
{
"week": "Week 6",
"activities": [
"Integration & Refinement"
]
},
{
"week": "Week 7",
"activities": [
"System Testing",
"Bug Fixing"
]
},
{
"week": "Week 8",
"activities": [
"Deployment",
"User Training"
]
}
]

FINAL VALIDATION:

Before returning the estimation, ask yourself:

1. Did I carefully analyze the complete project?
2. Am I estimating based on actual requirements instead of keywords?
3. Is the complexity justified by the project scope?
4. Is the cost realistic for an Indian SME software project?
5. Would an experienced software company provide a similar estimate?
6. Does the timeline match the estimated duration?

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Return ONLY valid JSON:

{
"projectSize": "",
"complexity": "",
"recommendedTeamSize": "",
"estimatedDuration": "",
"estimatedCost": "",
"timeline": [],
"reasoning": "",
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