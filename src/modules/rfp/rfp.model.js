const mongoose = require("mongoose");

const rfpSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    clientCompany: {
      type: String,
      required: true,
      trim: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    rfpText: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "analyzed",
        "proposal_generated",
        "approved",
      ],
      default: "uploaded",
    },

    requirements: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    businessAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    riskAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    costEstimation: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RFP", rfpSchema);