const Proposal = require("./proposal.model");
console.log("Proposal =", Proposal);
console.log("typeof =", typeof Proposal);
console.log("find =", Proposal.find);

const createProposal = async (proposalData) => {
  const proposal = await Proposal.create(proposalData);

  return proposal;
};

const getAllProposals = async () => {
  const proposals = await Proposal.find()
    .populate("rfpId")
    .populate("generatedBy", "name email role")
    .populate("approvedBy", "name email role");

  return proposals;
};

const getProposalById = async (id) => {
  const proposal = await Proposal.findById(id)
    .populate("rfpId")
    .populate("generatedBy", "name email role")
    .populate("approvedBy", "name email role");

  if (!proposal) {
    throw new Error("Proposal not found");
  }

  return proposal;
};

const approveProposal = async (proposalId, managerId) => {
  const proposal = await Proposal.findById(proposalId)
    .populate("rfpId");

  if (!proposal) {
    throw new Error("Proposal not found");
  }

  proposal.status = "approved";
  proposal.approvedBy = managerId;
  proposal.approvalDate = new Date();

  await proposal.save();

  return proposal;
};

const rejectProposal = async (
  proposalId,
  userId,
  rejectionReason
) => {
  const proposal = await Proposal.findById(
    proposalId
  );

  if (!proposal) {
    throw new Error("Proposal not found");
  }

  if (proposal.status === "approved") {
    throw new Error(
      "Approved proposal cannot be rejected"
    );
  }

  proposal.status = "rejected";
  proposal.rejectedBy = userId;
  proposal.rejectionDate = new Date();

  proposal.rejectionReason =
    typeof rejectionReason === "string"
      ? rejectionReason
      : rejectionReason?.reason ||
        "Proposal rejected";

  await proposal.save();

  return proposal;
};


const getProposalByRfpId = async (rfpId) => {
  const proposal = await Proposal.findOne({
    rfpId,
  });

  if (!proposal) {
    throw new Error("Proposal not found");
  }

  return proposal;
};


module.exports = {
  createProposal,
  getAllProposals,
  getProposalById,
  getProposalByRfpId,
  approveProposal,
  rejectProposal,
};