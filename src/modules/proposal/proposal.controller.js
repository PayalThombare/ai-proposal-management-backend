const {
    generateProposalPDF,
} = require("../../../shared/services/pdfService");  // path adjust kar
console.log("pdfMcp =>",   generateProposalPDF);

const {
  uploadFile,
} = require("../../../shared/services/cloudinaryService");
const {
  createProposal,
  getAllProposals,
  getProposalById,
  approveProposal,
  rejectProposal,
} = require("./proposal.service");



const createProposalController = async (req, res) => {
  try {
    const proposal = await createProposal({
      ...req.body,
      generatedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Proposal created successfully",
      data: proposal,
    });
  } catch (error) {
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
        `proposal-${proposal._id}`
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


module.exports = {
  createProposalController,
  getAllProposalsController,
  getProposalByIdController,
  approveProposalController,
  rejectProposalController,
};