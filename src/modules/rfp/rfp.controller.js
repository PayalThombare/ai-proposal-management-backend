const {
  createRFP,
  getAllRFPs,
  getRFPById,
} = require("./rfp.service");

const {
  uploadFile,
} = require("../../../shared/services/cloudinaryService");

const {
  extractPdfText,
} = require("../mpc/pdfMcp");

const createRFPController = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    // Upload PDF to Cloudinary
    const uploadedFile = await uploadFile(
      req.file.path,
      "rfp-documents"
    );

    // Extract PDF Text
    let pdfData;
    try {
    pdfData = await extractPdfText(
      req.file.path
    );
  }
  catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error(`PDF Extraction Failed: ${error.message}`);
  }

    // Save RFP
    const rfp = await createRFP({
      projectName: req.body.projectName,
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientCompany: req.body.clientCompany,

      pdfUrl: uploadedFile.secure_url,
      rfpText: pdfData.text,

      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "RFP uploaded successfully",
      data: rfp,
    });
  //  catch (error) {
  //   console.error("Error in createRFPController:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};

const getAllRFPsController = async (req, res) => {
  try {
    const rfps = await getAllRFPs();

    res.status(200).json({
      success: true,
      data: rfps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRFPByIdController = async (req, res) => {
  try {
    const rfp = await getRFPById(req.params.id);

    res.status(200).json({
      success: true,
      data: rfp,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRFPController,
  getAllRFPsController,
  getRFPByIdController,
};