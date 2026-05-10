const express = require("express");

const {
  createTask,
  getMyTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createTask
);
router.get(
  "/my-tasks",
  authMiddleware,
  getMyTasks
);
router.put(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;