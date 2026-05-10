const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createProject
);
router.get(
  "/",
  authMiddleware,
  getProjects
);

module.exports = router;