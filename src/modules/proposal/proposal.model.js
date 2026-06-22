const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RFP",
      required: true,
    },

    proposalContent: {
      type: String,
      required: true,
    },

    pdfUrl: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "generated", "approved"],
      default: "generated",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvalDate: {
      type: Date,
      default: null,
    },

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Proposal",
  proposalSchema
);