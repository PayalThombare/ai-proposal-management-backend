const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeRisk = async (requirements, businessAnalysis) => {
  try {
const prompt = `
You are a Senior Software Risk Analyst.

Your task is to identify project-specific risks based ONLY on the provided Requirements and Business Analysis.

CRITICAL INSTRUCTIONS:

1. Read the complete project carefully before identifying risks.
2. Risks must be directly derived from:

   * Functional Requirements
   * Non-Functional Requirements
   * Modules
   * Workflows
   * User Roles
   * Integrations
   * Deployment Requirements
3. Every project must generate unique risks.
4. Do NOT use predefined risk templates.
5. Do NOT generate generic risks unless clearly supported by the project.
6. Do NOT assume any feature that is not mentioned.
7. If no risk exists for a category, return an empty array.
8. Mitigation strategies must directly correspond to identified risks.
9. Base risks on actual project functionality, not project type names.

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Return ONLY valid JSON:

{
"technicalRisks": [],
"resourceRisks": [],
"timelineRisks": [],
"securityRisks": [],
"mitigationStrategies": []
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
    throw new Error(error.message);
  }
};

module.exports = {
  analyzeRisk,
};