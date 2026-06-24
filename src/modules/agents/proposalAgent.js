const { generateContent } =require("../../../shared/services/geminiService");
console.log(
  require("../../../shared/services/geminiService")
);

const { getProposalKnowledge } =
 require("../mpc/knowledgeMcp");

const generateProposal = async (
  requirements,
  businessAnalysis,
  riskAnalysis,
  costEstimation
) => {
  try {
const prompt = `
You are a Senior IT Consultant and Proposal Writer.

Your task is to generate a highly project-specific business proposal.

CRITICAL INSTRUCTIONS:

1. Analyze the Requirements, Business Analysis, Risk Analysis, and Cost Estimation carefully.
2. Every proposal must be unique to the project domain.
3. Write from the perspective of a software company proposing a solution.
4. Mention actual modules and features identified in the Business Analysis.
5. Do NOT use generic wording such as:

   * "modern solution"
   * "scalable platform"
   * "industry standard system"
     unless directly supported by the inputs.
6. Do NOT invent:

   * Features
   * Integrations
   * Timelines
   * Costs
   * Team sizes
   * Technologies
7. The proposal must clearly reflect the client's business problem.
8. Explain how the proposed modules solve the client's requirements.
9. Use information from Business Analysis and Cost Estimation wherever relevant.
10. Keep the proposal professional, practical, and client-focused.

WRITING STYLE:

* Professional business language
* Project-specific content
* Avoid repetitive sentences
* Avoid generic IT buzzwords
* Focus on business value
* Maximum 2 paragraphs per section

Requirements:
${JSON.stringify(requirements)}

Business Analysis:
${JSON.stringify(businessAnalysis)}

Risk Analysis:
${JSON.stringify(riskAnalysis)}

Cost Estimation:
${JSON.stringify(costEstimation)}

Generate the proposal using this structure:

EXECUTIVE SUMMARY
(Explain the client's requirement and business objective.)

PROJECT SCOPE
(Describe the actual modules and workflows identified.)

PROPOSED SOLUTION
(Explain how the proposed system addresses the requirements.)

KEY DELIVERABLES
(List deliverables based on business analysis.)

PROJECT TIMELINE
(Use only provided estimation data.)

COST ESTIMATION
(Summarize estimation data only and show the cost only in INR to not convert dollars to or other currency to INR.)

RISK ASSESSMENT
(Summarize identified risks and mitigation.)

CONCLUSION
(Professional closing statement tailored to the project.)

Return ONLY proposal text.
`;



    const response = await generateContent(prompt);
    

return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateProposal,
};