const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeRequirements = async (rfpText) => {
  try {
const prompt = `
You are a Senior Software Business Analyst.

Carefully analyze the entire RFP and extract ALL project information that can help estimate effort, cost, timeline, and scope.

IMPORTANT RULES:

* Use ONLY information explicitly present in the RFP.
* Do NOT invent features.
* Do NOT invent technologies.
* Do NOT invent integrations.
* Do NOT invent costs.
* Do NOT invent timelines.
* If information is missing, return an empty array or empty string.
* Return ONLY valid JSON.

RFP:
${rfpText}

Return JSON in this format:

{
"projectType": "",
"businessDomain": "",

"functionalRequirements": [],
"nonFunctionalRequirements": [],

"userRoles": [],
"modules": [],
"workflows": [],
"deliverables": [],

"integrations": [],
"technologies": [],

"pagesScreens": [],
"reports": [],

"dataEntities": [],

"deploymentRequirements": [],
"securityRequirements": [],

"scope": "",

"projectIndicators": {
"estimatedModulesCount": 0,
"estimatedRolesCount": 0,
"estimatedWorkflowCount": 0,
"estimatedScreensCount": 0
}
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
  analyzeRequirements,
};