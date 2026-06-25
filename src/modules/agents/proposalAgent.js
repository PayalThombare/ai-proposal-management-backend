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

      console.log("===== BUSINESS ANALYSIS =====");
    console.log(JSON.stringify(businessAnalysis, null, 2));

    console.log("===== COST ESTIMATION =====");
    console.log(JSON.stringify(costEstimation, null, 2));
  try {
const prompt = `
You are a Senior IT Consultant and Proposal Writer.

Your task is to generate a professional, project-specific software proposal using ONLY the information provided below.

========================
STRICT RULES (MANDATORY)
========================

1. Use ONLY the supplied Requirements, Business Analysis, Risk Analysis, and Cost Estimation.
2. NEVER invent or assume information.
3. NEVER add new modules.
4. NEVER remove existing modules.
5. Mention ONLY the modules listed in Business Analysis.
6. NEVER invent workflows, integrations, dashboards, reports, mobile apps, APIs, technologies, or deliverables unless explicitly mentioned.
7. NEVER modify the Estimated Cost.
8. NEVER calculate a new price.
9. NEVER provide a price range.
10. NEVER convert currencies.
11. Use the EXACT Estimated Cost value from Cost Estimation.
12. NEVER modify the Duration.
13. NEVER modify the Team Size.
14. NEVER change the Complexity.
15. NEVER create your own project timeline.
16. Every section must remain fully consistent with the supplied analysis.
17. If any information is unavailable, write "Not Specified" instead of making assumptions.
18. Do not use generic business buzzwords such as:
   - Modern Solution
   - Scalable Platform
   - Enterprise Grade
   - Industry Standard
   - Cutting Edge
   - Future Ready
   unless directly supported by the inputs.
19. Write from the perspective of a software development company responding to an RFP.
20. Keep the proposal practical, professional, and client-focused.

========================
INPUT DATA
========================

Requirements:
${JSON.stringify(requirements, null, 2)}

Business Analysis:
${JSON.stringify(businessAnalysis, null, 2)}

Risk Analysis:
${JSON.stringify(riskAnalysis, null, 2)}

Cost Estimation:
${JSON.stringify(costEstimation, null, 2)}

========================
OUTPUT FORMAT
========================

Generate ONLY the proposal using the following sections.

# EXECUTIVE SUMMARY

Explain:

- Client's business problem
- Business objective
- Why the proposed system is required

Do not mention anything not present in the inputs.

------------------------------------------------

# PROJECT SCOPE

Describe ONLY the modules present in Business Analysis.

Do NOT introduce any additional modules.

Explain how each module contributes to the project.

------------------------------------------------

# PROPOSED SOLUTION

Explain how the proposed modules solve the client's business requirements.

Base this section ONLY on the supplied Requirements and Business Analysis.

------------------------------------------------

# KEY DELIVERABLES

List ONLY deliverables that can be directly inferred from the supplied data.

Do not invent deployment, documentation, APIs, mobile applications, dashboards, integrations, or reports unless explicitly mentioned.

------------------------------------------------

# PROJECT TIMELINE

Use ONLY the Duration provided in the Cost Estimation input.

Create a realistic week-wise project execution plan that fits entirely within the provided duration.

The timeline should be based only on standard software development activities such as:
- Requirement Validation
- System Design
- Module Development
- Integration
- Testing
- Bug Fixing
- User Acceptance Testing (UAT)
- Deployment
- Project Handover

Rules:
- The total duration MUST exactly match the provided Duration.
- Do NOT exceed the provided number of weeks.
- Do NOT invent additional project phases outside a normal software development lifecycle.
- Do NOT change the Duration.
- If Duration is 14 Weeks, distribute the activities across exactly 14 weeks.
- Mention what will be completed during each week or group of weeks in a clear and professional format.

------------------------------------------------

# COST ESTIMATION

Use ONLY the information provided in the Cost Estimation input.

Display:
- Estimated Cost
- Project Complexity
- Team Size
- Development Effort

Briefly explain that the estimated cost is based on the analyzed project scope, complexity, estimated development effort, and required resources.

Rules:
- Use ONLY the values provided in the Cost Estimation input.
- Do NOT calculate a new cost.
- Do NOT estimate a different amount.
- Do NOT provide a price range.
- Do NOT modify the Estimated Cost.
- Do NOT modify the Team Size.
- Do NOT modify the Complexity.
- Do NOT modify the Development Effort.

------------------------------------------------

# RISK ASSESSMENT

Summarize the supplied risks and mitigation strategies.

Do not invent new risks.

------------------------------------------------

# CONCLUSION

Write a professional closing statement tailored to the client's project.

========================
FINAL RULE
========================

Return ONLY the proposal text.

Before returning the proposal, verify that:

- Modules exactly match Business Analysis.
- Estimated Cost exactly matches Cost Estimation.
- Duration exactly matches Cost Estimation.
- Team Size is not modified.
- Complexity is not modified.
- No new features, modules, timelines, or costs have been invented.

If any section violates these rules, regenerate it before returning the final proposal.
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