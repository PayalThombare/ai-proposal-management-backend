const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// ---- Style constants (kept identical to the original visual output) ----
const PAGE_OPTIONS = { margin: 50, size: "A4" };
const FONTS = {
  bold: "Helvetica-Bold",
  regular: "Helvetica",
};
const COLORS = {
  text: "black",
  muted: "gray",
  accent: "#2c3e50", // small professional touch: deep slate for headings/rules
};

// ---- Multi-line section headers (same labels as the original chain) ----
const SECTION_HEADERS = [
  { pattern: /functionalRequirements:/g, label: "FUNCTIONAL REQUIREMENTS" },
  { pattern: /nonFunctionalRequirements:/g, label: "NON FUNCTIONAL REQUIREMENTS" },
  { pattern: /deliverables:/g, label: "DELIVERABLES" },
  { pattern: /technologies:/g, label: "TECHNOLOGIES" },
  { pattern: /scope:/g, label: "PROJECT SCOPE" },
  { pattern: /Business Analysis:/g, label: "BUSINESS ANALYSIS" },
  { pattern: /majorModules:/g, label: "MAJOR MODULES" },
  { pattern: /keyFeatures:/g, label: "KEY FEATURES" },
  { pattern: /dependencies:/g, label: "DEPENDENCIES" },
  { pattern: /assumptions:/g, label: "ASSUMPTIONS" },
  { pattern: /Risk Analysis:/g, label: "RISK ANALYSIS" },
  { pattern: /technicalRisks:/g, label: "TECHNICAL RISKS" },
  { pattern: /resourceRisks:/g, label: "RESOURCE RISKS" },
  { pattern: /timelineRisks:/g, label: "TIMELINE RISKS" },
  { pattern: /securityRisks:/g, label: "SECURITY RISKS" },
  { pattern: /mitigationStrategies:/g, label: "MITIGATION STRATEGIES" },
  { pattern: /Cost Estimation:/g, label: "COST ESTIMATION" },
  { pattern: /recommendations:/g, label: "RECOMMENDATIONS" },
];

// ---- Inline (same-line) field labels (same labels as the original chain) ----
const INLINE_LABELS = [
  { pattern: /projectType:/g, label: "\nProject Type: " },
  { pattern: /complexity:/g, label: "\nComplexity: " },
  { pattern: /estimatedTeamSize:/g, label: "\nTeam Size: " },
  { pattern: /estimatedDuration:/g, label: "\nDuration: " },
  { pattern: /estimatedCost:/g, label: "\nEstimated Cost: " },
  { pattern: /developmentEffort:/g, label: "\nDevelopment Effort: " },
];

/**
 * Reduces a user-supplied file name down to a safe basename, stripping
 * any path segments (e.g. "../../etc/passwd") and disallowed characters
 * so it can never write outside the uploads directory.
 */
const sanitizeFileName = (fileName) => {
  const base = path.basename(String(fileName || "proposal"));
  const safe = base.replace(/[^a-zA-Z0-9-_]/g, "_");
  return safe || "proposal";
};

/**
 * Pulls a labelled value (e.g. "Project: Foo") out of the raw content.
 */
const extractField = (content, label) => {
  const match = content.match(new RegExp(`${label}:\\s*(.*)`, "i"));
  return match?.[1]?.trim() || "N/A";
};

/**
 * Converts the raw (JSON-ish) proposal content into readable plain text
 * by stripping JSON punctuation and turning labelled keys into the same
 * human-readable headers/labels as the original implementation.
 */
const cleanProposalContent = (proposalContent) => {
  let cleaned = proposalContent.replace(/[{}[\]"]/g, "").replace(/,/g, "");

  for (const { pattern, label } of SECTION_HEADERS) {
    cleaned = cleaned.replace(pattern, `\n\n${label}\n`);
  }

  for (const { pattern, label } of INLINE_LABELS) {
    cleaned = cleaned.replace(pattern, label);
  }

  return cleaned;
};

/**
 * Draws a single centered line on the cover page. Replaces the repeated
 * fontSize/font/fillColor/text/align boilerplate from the original code.
 */
const drawCenteredLine = (doc, text, { size, font = FONTS.regular, color = COLORS.text } = {}) => {
  doc.fontSize(size).font(font).fillColor(color).text(text, { align: "center" });
};

/**
 * Draws a thin horizontal rule spanning the page's content width — a
 * small, professional accent under headings.
 */
const drawDivider = (doc, color = COLORS.accent) => {
  const { left, right } = doc.page.margins;
  const width = doc.page.width - left - right;
  const y = doc.y;
  doc.save().strokeColor(color).lineWidth(1).moveTo(left, y).lineTo(left + width, y).stroke().restore();
};
console.log("BEFORE PDF GENERATION");
const generateProposalPDF = (proposalContent, fileName,  projectName,
  clientName) => {
  return new Promise((resolve, reject) => {
    if (!proposalContent || typeof proposalContent !== "string") {
      return reject(new Error("proposalContent must be a non-empty string"));
    }
    console.log(clientName, projectName," proposalContent = ", proposalContent);

    const safeFileName = sanitizeFileName(fileName);
    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, `${safeFileName}.pdf`);

    // Defensive check: filePath must stay inside uploadsDir.
    if (!filePath.startsWith(uploadsDir + path.sep)) {
      return reject(new Error("Invalid file name"));
    }

    let stream;

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const doc = new PDFDocument(PAGE_OPTIONS);
      stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ========================= COVER PAGE =========================
      const { left: pageLeft, right: pageRight } = doc.page.margins;
      const contentWidth = doc.page.width - pageLeft - pageRight;

      // -- Section 1: top rule + title --
      doc.moveDown(1.5);
      drawDivider(doc);

      doc.moveDown(1.5);
      drawCenteredLine(doc, "PROJECT PROPOSAL", { size: 28, font: FONTS.bold, color: COLORS.accent });

      doc.moveDown(0.5);
      drawDivider(doc);

      // -- Section 2: bordered, properly aligned project info block --
      doc.moveDown(2.5);

      const infoRows = [
        ["Project Name", projectName],
        ["Client Name", clientName],
        ["Generated On", new Date().toLocaleDateString()],
      ];
      const boxPadding = 20;
      const rowHeight = 28;
      const boxTop = doc.y;
      const boxHeight = infoRows.length * rowHeight + boxPadding * 2;
      const labelWidth = 150;

      doc
        .save()
        .strokeColor(COLORS.accent)
        .lineWidth(1)
        .rect(pageLeft, boxTop, contentWidth, boxHeight)
        .stroke()
        .restore();

      let rowY = boxTop + boxPadding;
      infoRows.forEach(([label, value]) => {
        doc
          .fontSize(12)
          .font(FONTS.bold)
          .fillColor(COLORS.text)
          .text(`${label}:`, pageLeft + boxPadding, rowY, { width: labelWidth, align: "left" });
        doc
          .fontSize(12)
          .font(FONTS.regular)
          .fillColor(COLORS.text)
          .text(value, pageLeft + boxPadding + labelWidth, rowY, {
            width: contentWidth - boxPadding * 2 - labelWidth,
            align: "left",
          });
        rowY += rowHeight;
      });

      doc.y = boxTop + boxHeight;

      // -- Section 3: bottom rule + footer --
      doc.moveDown(3);
      drawDivider(doc);

      doc.moveDown(1);
      drawCenteredLine(doc, "Generated by AI Proposal Management Platform", {
        size: 11,
        color: COLORS.muted,
      });

      // ========================= DETAILS PAGE =========================
      doc.addPage();

      doc.fontSize(22).fillColor(COLORS.accent).font(FONTS.bold).text("Proposal Details");
      doc.moveDown(0.3);
      drawDivider(doc);

      doc.moveDown();

      const cleanContent = cleanProposalContent(proposalContent);

      doc
        .fontSize(11)
        .font(FONTS.regular)
        .fillColor(COLORS.text)
        .text(cleanContent, { align: "left", lineGap: 4 });

      doc.moveDown(2);
      drawCenteredLine(doc, "End of Proposal", { size: 10, color: COLORS.muted });

      doc.end();

      stream.on("finish", () => {
        try {
          const stats = fs.statSync(filePath);
          console.log("PDF Generated Successfully");
          console.log("PDF Path:", filePath);
          console.log("PDF Size:", stats.size);
          resolve(filePath);
        } catch (statErr) {
          reject(statErr);
        }
      });

      stream.on("error", (err) => {
        fs.unlink(filePath, () => {}); // best-effort cleanup of partial file
        reject(err);
      });
    } catch (error) {
      if (stream) {
        stream.destroy();
        fs.unlink(filePath, () => {});
      }
      reject(error);
    }
  });
};

module.exports = {
  generateProposalPDF,
};