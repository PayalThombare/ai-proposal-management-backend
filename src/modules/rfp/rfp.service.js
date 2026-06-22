const RFP = require("./rfp.model");

const {
  analyzeRequirements,
} = require("../agents/requirementAgent");

const {
  analyzeBusiness,
} = require("../agents/businessAgent");

const {
  analyzeRisk,
} = require("../agents/riskAgent");

const {
  estimateCostAndTimeline,
} = require("../agents/costAgent");

const createRFP = async (rfpData) => {
  try {
    // Requirement Analysis
    const requirements =
      await analyzeRequirements(
        rfpData.rfpText
      );

    // Business Analysis
    const businessAnalysis =
      await analyzeBusiness(
        requirements
      );

    // Risk Analysis
    const riskAnalysis =
      await analyzeRisk(
        requirements,
        businessAnalysis
      );

    // Cost & Timeline Estimation
    const costEstimation =
      await estimateCostAndTimeline(
        requirements,
        businessAnalysis,
        riskAnalysis
      );

    // Save RFP with AI Analysis
    const rfp = await RFP.create({
      ...rfpData,

      requirements,

      businessAnalysis,

      riskAnalysis,

      costEstimation,

      status: "analyzed",
    });

    return rfp;
  } catch (error) {
    throw new Error(
      `RFP Processing Failed: ${error.message}`
    );
  }
};

const getAllRFPs = async () => {
  const rfps = await RFP.find()
    .populate(
      "uploadedBy",
      "name email role"
    )
    .populate(
      "approvedBy",
      "name email role"
    );

  return rfps;
};

const getRFPById = async (id) => {
  const rfp = await RFP.findById(id)
    .populate(
      "uploadedBy",
      "name email role"
    )
    .populate(
      "approvedBy",
      "name email role"
    );

  if (!rfp) {
    throw new Error("RFP not found");
  }

  return rfp;
};

module.exports = {
  createRFP,
  getAllRFPs,
  getRFPById,
};