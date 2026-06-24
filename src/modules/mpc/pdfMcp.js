const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractPdfText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);

    console.log("PDF Path:", filePath);
    console.log("PDF Size:", buffer.length);

    try {
      const data = await pdfParse(buffer);

      return {
        text: data.text,
        pages: data.numpages,
        info: data.info,
      };

    } catch (parseError) {

      console.log(
        "pdf-parse failed:",
        parseError.message
      );

      throw parseError;
    }

  } catch (error) {
    throw new Error(
      `PDF Extraction Failed: ${error.message}`
    );
  }
};

module.exports = {
  extractPdfText,
};