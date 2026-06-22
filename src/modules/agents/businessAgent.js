const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeBusiness = async (requirements) => {
  try {
const prompt = `
You are a Software Business Analyst.

Analyze the given project requirements.

IMPORTANT RULES:
- Use ONLY information explicitly available in the requirements.
- Do NOT assume enterprise-scale architecture.
- Do NOT invent features, integrations, costs, timelines, or technologies.
- Keep the analysis concise and practical.
- Maximum 5 major modules.
- Maximum 6 key features.
- Maximum 3 dependencies.
- Maximum 3 assumptions.
- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap response in \`\`\`json.

Requirements:
${JSON.stringify(requirements)}

Return JSON in this exact format:

{
  "projectType": "",
  "complexity": "",
  "majorModules": [],
  "keyFeatures": [],
  "dependencies": [],
  "assumptions": []
}
`;

    const response = await generateContent(prompt);

   return JSON.parse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  analyzeBusiness,
};