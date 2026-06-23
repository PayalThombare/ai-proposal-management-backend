

const express = require("express");

const {
  createProposalController,
  getAllProposalsController,
  getProposalByIdController,
  approveProposalController,
  rejectProposalController,
} = require("./proposal.controller");

const authMiddleware = require("../../../shared/middleware/authMiddleware");
const roleMiddleware = require("../../../shared/middleware/roleMiddleware");

const router = express.Router();

/*
 * Admin + Business Analyst
 * Generate Proposal
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "business_analyst"),
  createProposalController
);

/*
 * Admin + Business Analyst + Manager
 * View All Proposals
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "business_analyst", "manager"),
  getAllProposalsController
);

/*
 * Admin + Business Analyst + Manager
 * View Single Proposal
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "business_analyst", "manager"),
  getProposalByIdController
);

/*
 * Manager Only
 * Approve Proposal
 */
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("manager"),
  approveProposalController
);

/*
 * Manager Only
 * Reject Proposal
 */
router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("manager"),
  rejectProposalController
);

module.exports = router;