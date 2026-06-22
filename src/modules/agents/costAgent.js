const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);
const {
  getEstimationBaseline,
} = require("../mpc/estimationMcp");

const estimateCostAndTimeline = async (
  requirements,
  businessAnalysis,
  riskAnalysis
) => {
  try {
    const baseline = await getEstimationBaseline(
      requirements,
      businessAnalysis
    );

const prompt = `
You are an experienced Software Project Estimator working for a small-to-medium software development company.

Analyze the project requirements and provide a realistic software project estimation.

IMPORTANT RULES:

* Use ONLY information explicitly provided in the project requirements.
* Do NOT assume additional features, integrations, users, modules, or enterprise requirements.
* Do NOT assume Fortune 500, enterprise-scale, government-scale, or nationwide deployments unless explicitly stated.
* Respect any timeline, budget, or constraints already mentioned in the RFP.
* Assume this is a small-to-medium business project unless clearly specified otherwise.
* Maximum team size: 5 members.
* Keep estimations practical, conservative, and realistic.
* Return ONLY valid JSON.
* Do NOT return markdown.
* Do NOT wrap the response in code blocks.

COST ESTIMATION GUIDELINES:

Simple Project:

* Examples: Portfolio website, business website, landing page, basic dashboard, billing software, inventory management, appointment booking system.
* Team Size: 1-2 members
* Duration: 1-4 weeks
* Cost Range: ₹15,000 - ₹80,000

Medium Project:

* Examples: CRM, ERP module, e-commerce website, admin panel, multi-role web application, management portal.
* Team Size: 2-4 members
* Duration: 1-3 months
* Cost Range: ₹80,000 - ₹3,00,000

Complex Project:

* Examples: Large web platforms, SaaS products, AI-powered applications, multi-module business systems, advanced automation.
* Team Size: 3-5 members
* Duration: 3-6 months
* Cost Range: ₹3,00,000 - ₹8,00,000

Very Complex Project:

* Examples: Enterprise platforms, large-scale AI systems, multi-platform ecosystems.
* Team Size: 4-5 members
* Duration: 6+ months
* Cost Range: ₹8,00,000 - ₹15,00,000

ESTIMATION LOGIC:

* Determine complexity based only on the actual requirements.
* Cost must be proportional to complexity, duration, and team size.
* If requirements describe a standard business website or management system, classify as Simple or Medium.
* Only classify as Complex when multiple integrations, automation workflows, AI capabilities, analytics, advanced reporting, or multiple user roles are clearly required.
* Never estimate above ₹15,00,000 unless the RFP explicitly describes a large enterprise project.
* Prefer realistic SME pricing over enterprise consulting rates.
* Avoid inflated budgets.
* Recommendations must be short, actionable, and business-focused.

Project Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Risk Analysis:
${JSON.stringify(riskAnalysis)}

Baseline Estimation:
${JSON.stringify(baseline)}

Return JSON in exactly this format:

{
"complexity": "",
"estimatedTeamSize": "",
"estimatedDuration": "",
"estimatedCost": "",
"developmentEffort": "",
"recommendations": []
}
`;


    const response = await generateContent(prompt);

    return JSON.parse(response);
  } catch (error) {
    throw new Error(`Cost Agent Failed: ${error.message}`);
  }
};

module.exports = {
  estimateCostAndTimeline,
};