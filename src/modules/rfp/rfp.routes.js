const express = require("express");

const {
  createRFPController,
  getAllRFPsController,
  getRFPByIdController,
} = require("./rfp.controller");

const authMiddleware = require("../../../shared/middleware/authMiddleware");
const roleMiddleware = require("../../../shared/middleware/roleMiddleware");
const upload = require("../../../shared/middleware/uploadMiddleware");

const router = express.Router();

/*
 * Admin Only
 * Client PDF Upload
 */
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("file"),
  createRFPController
);

/*
 * Admin + Analyst + Manager
 * View All RFPs
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "business_analyst", "manager"),
  getAllRFPsController
);

/*
 * Admin + Analyst + Manager
 * View Single RFP
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "business_analyst", "manager"),
  getRFPByIdController
);

module.exports = router;