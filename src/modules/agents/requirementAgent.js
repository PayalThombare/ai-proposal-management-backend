const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeRequirements = async (rfpText) => {
  try {
const prompt = `
You are a Software Business Analyst.

Analyze the provided RFP and extract only the information explicitly mentioned.

IMPORTANT RULES:

- Use ONLY information present in the RFP.
- Do NOT invent features.
- Do NOT invent technologies.
- Do NOT invent integrations.
- Do NOT add assumptions.
- Keep requirements concise.
- Extract maximum 10 functional requirements.
- Extract maximum 5 non-functional requirements.
- Extract maximum 5 deliverables.
- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap response inside \`\`\`json.

RFP:
${rfpText}

Return JSON in this exact format:

{
  "functionalRequirements": [],
  "nonFunctionalRequirements": [],
  "deliverables": [],
  "technologies": [],
  "scope": ""
}
`;

    const response = await generateContent(prompt);

  return JSON.parse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  analyzeRequirements,
};