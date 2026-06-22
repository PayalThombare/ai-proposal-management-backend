const Proposal = require("../proposal/proposal.model");

const getProposalKnowledge = async () => {
  try {
    const proposals = await Proposal.find()
      .select("proposalContent")
      .sort({ createdAt: -1 })
      .limit(5);

    const knowledge = proposals
      .map((proposal) => proposal.proposalContent)
      .join("\n\n");

    return knowledge;
  } catch (error) {
    throw new Error(`Knowledge Retrieval Failed: ${error.message}`);
  }
};

module.exports = {
  getProposalKnowledge,
};