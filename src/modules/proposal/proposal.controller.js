const {
    generateProposalPDF,
} = require("../../../shared/services/pdfService");  // path adjust kar
console.log("pdfMcp =>",   generateProposalPDF);
const RFP = require("../rfp/rfp.model"); 
const {
  generateProposal,
} = require("../agents/proposalAgent");

const {
  uploadFile,
} = require("../../../shared/services/cloudinaryService");
const {
  createProposal,
  getAllProposals,
  getProposalById,
  approveProposal,
  rejectProposal,
  getProposalByRfpId,
  downloadProposalPdf,
} = require("./proposal.service");



const createProposalController = async (req, res) => {
  try {
    const { rfpId } = req.body;

    const rfp = await RFP.findById(rfpId);

    if (!rfp) {
      return res.status(404).json({
        success: false,
        message: "RFP not found",
      });
    }

    const proposalContent =
      await generateProposal(
        rfp.requirements,
        rfp.businessAnalysis,
        rfp.riskAnalysis,
        rfp.costEstimation
      );

    const proposal = await createProposal({
      rfpId: rfp._id,
      proposalContent,
      generatedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Proposal generated successfully",
      data: proposal,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProposalsController = async (req, res) => {
  try {
    const proposals = await getAllProposals();

    res.status(200).json({
      success: true,
      data: proposals,
    });
  } catch (error) {
       console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getProposalByIdController = async (req, res) => {
  try {
    const proposal = await getProposalById(req.params.id);

    res.status(200).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getProposalByRfpIdController = async (
  req,
  res
) => {
  try {
    const proposal =
      await getProposalByRfpId(
        req.params.rfpId
      );

    res.status(200).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const approveProposalController = async (
  req,
  res
) => {
  try {
    const proposal = await approveProposal(
      req.params.id,
      req.user.id
    );

    // Generate PDF
    const pdfPath =
      await generateProposalPDF(
        proposal.proposalContent,
        `proposal-${proposal._id}`,
           proposal.rfpId.projectName,
  proposal.rfpId.clientCompany
      );

    // Upload PDF to Cloudinary
    const uploadedPdf =
      await uploadFile(
        pdfPath,
        "proposal-pdfs"
      );

    // Save PDF URL
    proposal.pdfUrl =
      uploadedPdf.secure_url;

    await proposal.save();

    res.status(200).json({
      success: true,
      message:
        "Proposal approved and PDF generated successfully",
      data: proposal,
    });
  } catch (error) {
  
     console.log("ERROR =>", error);
  console.log(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectProposalController = async (req, res) => {
try {
const proposal = await rejectProposal(
req.params.id,
req.user.id,
req.body.rejectionReason
);

res.status(200).json({
  success: true,
  message: "Proposal rejected successfully",
  data: proposal,
});

} catch (error) {
console.log("ERROR =>", error);
console.log(error.stack);

res.status(500).json({
  success: false,
  message: error.message,
});

}
};

const getProposalPdfController = async (
  req,
  res
) => {
  try {
    const proposal =
      await getProposalById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    console.log(
      "PROJECT =",
      proposal.rfpId?.projectName
    );

    console.log(
      "CLIENT =",
      proposal.rfpId?.clientCompany
    );

    if (proposal.pdfUrl) {
      return res.status(200).json({
        success: true,
        pdfUrl: proposal.pdfUrl,
      });
    }

    const pdfPath =
      await generateProposalPDF(
        proposal.proposalContent,
        `proposal-${proposal._id}`,
        proposal.rfpId?.projectName,
        proposal.rfpId?.clientCompany
      );

    const uploadedPdf =
      await uploadFile(
        pdfPath,
        "proposal-pdfs"
      );

    proposal.pdfUrl =
      uploadedPdf.secure_url;

    await proposal.save();

    res.status(200).json({
      success: true,
      pdfUrl: proposal.pdfUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProposalController,
  getAllProposalsController,
  getProposalByIdController,
  approveProposalController,
  rejectProposalController,
  getProposalByRfpIdController,
  getProposalPdfController,
};