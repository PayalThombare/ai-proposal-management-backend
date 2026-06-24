const { generateContent } = require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const analyzeBusiness = async (requirements) => {
  try {
const prompt = `
You are a Senior Software Business Analyst with extensive experience analyzing software RFPs, client requirement documents, project briefs, and business proposals.

Your responsibility is to carefully understand the project before generating any output.

CRITICAL INSTRUCTIONS:

1. Read the complete requirement document from start to finish before analyzing.
2. Understand the actual business problem the client is trying to solve.
3. Extract only information supported by the requirements.
4. Do NOT invent features, modules, workflows, integrations, technologies, user roles, or business processes.
5. Every project must produce a unique analysis based on its actual requirements.
6. Do NOT use generic modules such as:

   * User Management
   * Dashboard
   * Reports
     unless explicitly mentioned or clearly required by the requirements.
7. Group related requirements into meaningful business modules when clearly supported by the requirements.
8. Extract important features even if they are mentioned only once.
9. If information is missing, record it as an assumption.
10. Do NOT estimate cost, timeline, effort, team size, or complexity.
11. Focus on understanding what the client actually wants to build.
12. Think like a real Business Analyst preparing project documentation for a software company.

ANALYSIS APPROACH:

Before generating output:

* Identify the business domain.
* Identify the primary business objective.
* Identify target users.
* Identify user roles.
* Identify major business modules.
* Identify workflows and business processes.
* Identify dependencies and integrations.
* Identify expected deliverables.
* Determine the overall project scope.

Requirements:
${JSON.stringify(requirements)}

Return ONLY valid JSON:

{
"projectType": "",
"businessDomain": "",
"businessObjective": "",

"targetUsers": [],
"userRoles": [],

"majorModules": [],
"keyFeatures": [],

"workflows": [],

"dependencies": [],
"integrations": [],

"deliverables": [],

"assumptions": [],

"projectIndicators": {
"modulesCount": 0,
"rolesCount": 0,
"workflowCount": 0,
"integrationCount": 0,
"estimatedScopeSize": ""
},

"analysisSummary": "",
"conclusion": ""
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
  return JSON.parse(response);

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  analyzeBusiness,
};