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
    console.log("========== RFP PROCESS START ==========");

    console.log("STEP 1: Requirements Analysis");
    const requirements = await analyzeRequirements(
      rfpData.rfpText
    );
    console.log("✅ Requirements Success");

    console.log("STEP 2: Business Analysis");
    const businessAnalysis = await analyzeBusiness(
      requirements
    );
    console.log("✅ Business Analysis Success");

    console.log("STEP 3: Risk Analysis");
    const riskAnalysis = await analyzeRisk(
      requirements,
      businessAnalysis
    );
    console.log("✅ Risk Analysis Success");

    console.log("STEP 4: Cost Estimation");
    const costEstimation =
      await estimateCostAndTimeline(
        requirements,
        businessAnalysis,
        riskAnalysis
      );
    console.log("✅ Cost Estimation Success");

    console.log("STEP 5: Saving RFP");

    const rfp = await RFP.create({
      ...rfpData,
      requirements,
      businessAnalysis,
      riskAnalysis,
      costEstimation,
      status: "analyzed",
    });

    console.log("✅ RFP Saved Successfully");
    console.log("========== RFP PROCESS END ==========");

    return rfp;
  } catch (error) {
    console.error("❌ CREATE RFP ERROR:");
    console.error(error);

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