const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeRisk = async (requirements, businessAnalysis) => {
  try {
 const prompt = `
You are a Software Project Risk Analyst.

Analyze the project and identify only the most important risks.

IMPORTANT RULES:

- Use ONLY information available in the Requirements and Business Analysis.
- Do NOT assume enterprise-scale risks.
- Keep risks concise and practical.
- Maximum 3 technical risks.
- Maximum 2 resource risks.
- Maximum 2 timeline risks.
- Maximum 2 security risks.
- Maximum 5 mitigation strategies.
- Each risk should be one short sentence.
- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap response inside \`\`\`json.

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Return JSON in this exact format:

{
  "technicalRisks": [],
  "resourceRisks": [],
  "timelineRisks": [],
  "securityRisks": [],
  "mitigationStrategies": []
}
`;

    const response = await generateContent(prompt);

   return JSON.parse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  analyzeRisk,
};