const { generateContent } =require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const generateProposal = async (
  requirements,
  businessAnalysis,
  riskAnalysis,
  costEstimation
) => {
  try {
const prompt = `
You are a Professional Proposal Writer.

Generate a concise and professional business proposal.

IMPORTANT RULES:

- Use ONLY the information provided.
- Do NOT invent features, costs, timelines, technologies, or team sizes.
- Do NOT add enterprise-level assumptions.
- Keep the proposal practical and client-friendly.
- Maximum 2-3 paragraphs per section.
- Use simple business language.
- Return plain text only.
- Do NOT return JSON.
- Do NOT return markdown.
- Do NOT wrap response inside \`\`\`.

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Risk Analysis:
${JSON.stringify(riskAnalysis)}

Cost Estimation:
${JSON.stringify(costEstimation)}

Generate the proposal in the following format:

EXECUTIVE SUMMARY

PROJECT SCOPE

PROPOSED SOLUTION

KEY DELIVERABLES

PROJECT TIMELINE

COST ESTIMATION

RISK ASSESSMENT

CONCLUSION

Return ONLY proposal text.
`;

    const response = await generateContent(prompt);

  return JSON.parse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateProposal,
};