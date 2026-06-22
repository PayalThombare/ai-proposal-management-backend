const fs = require("fs");
const pdfParse = require("pdf-parse");
console.log(pdfParse);

const extractPdfText = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    console.log(buffer.slice(0, 20).toString());
      console.log("PDF Path:", filePath);
console.log("PDF Size:", buffer.length);

    const data = await pdfParse(buffer);
  

    return {
      text: data.text,
      pages: data.numpages,
      info: data.info,
    };
  } catch (error) {
    throw new Error(`PDF Extraction Failed: ${error.message}`);
  }
};

module.exports = {
  extractPdfText,
};