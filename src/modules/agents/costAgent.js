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
You are a Senior Software Cost Estimation Consultant with experience delivering projects for Indian startups, SMEs, local businesses, and mid-sized organizations.

Your responsibility is to generate a realistic commercial estimation based on the actual project scope.

IMPORTANT RULES:

* Carefully analyze all provided inputs before estimating.
* Use ONLY information available in:

  * Project Requirements
  * Business Analysis
  * Risk Analysis
  * Baseline Estimation
* Do NOT invent scope.
* Do NOT invent modules.
* Do NOT invent integrations.
* Do NOT invent enterprise requirements.
* Respect any timeline or constraints already mentioned.
* Assume SME-scale implementation unless explicitly stated otherwise.
* Maximum team size: 5 members.
* Return ONLY valid JSON.
* Do NOT return markdown.

MANDATORY ANALYSIS PROCESS:

Before estimating:

1. Review the project requirements.
2. Review identified modules.
3. Review workflows.
4. Review user roles.
5. Review integrations.
6. Review project risks.
7. Review baseline estimation.
8. Determine actual implementation effort.
9. Validate whether baseline estimation is reasonable.
10. Then estimate cost.

IMPORTANT:

Never estimate complexity based only on words such as:

* AI
* Dashboard
* Analytics
* Portal
* Reports
* Reporting
* Smart
* Intelligent
* Automation

Estimate based on actual development effort.

COMPLEXITY VALIDATION RULES:

Simple:

* Up to 5 modules
* Up to 2 roles
* Basic workflows
* No major integrations

Medium:

* 6-10 modules
* Multiple workflows
* Limited integrations
* Up to 4 roles

Complex:

* More than 10 modules
* Multiple integrations
* Advanced workflows
* Large business process coverage

Very Complex:

* Only if explicitly mentioned
* Enterprise-scale deployment
* Multi-tenant architecture
* Nationwide implementation

COST VALIDATION RULES:

* Standard websites should normally remain below ₹80,000.
* Small business applications should normally remain below ₹1,50,000.
* Booking systems, billing systems, inventory systems, and management systems should generally remain below ₹3,00,000 unless requirements clearly justify more.
* Never estimate above ₹15,00,000 unless explicitly supported by the requirements.
* Prefer realistic Indian software company pricing.
* Avoid inflated consulting estimates.

EFFORT ESTIMATION:

Estimate effort using:

* Requirement Analysis
* UI/UX Development
* Frontend Development
* Backend Development
* Database Design
* Testing
* Deployment
* Documentation

Generate total effort as:

* Low
* Medium
* High



RECOMMENDATIONS RULES:

* Maximum 5 recommendations.
* Recommendations must be project-specific.
* Recommendations must be practical and business-focused.
* Do not provide generic recommendations.

Project Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Risk Analysis:
${JSON.stringify(riskAnalysis)}

Baseline Estimation:
${JSON.stringify(baseline)}

Return ONLY valid JSON:

{
"complexity": "",
"estimatedTeamSize": "",
"estimatedDuration": "",
"estimatedCost": "",
"developmentEffort": "",
"reasoning": "",
"recommendations": []
}
`;



 const response = await generateContent(prompt);

const cleaned = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

if (!jsonMatch) {
  throw new Error(
    `No JSON found in AI response: ${response}`
  );
}

return JSON.parse(jsonMatch[0]);

  
  } catch (error) {
    throw new Error(`Cost Agent Failed: ${error.message}`);
  }
};

module.exports = {
  estimateCostAndTimeline,
};