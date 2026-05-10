const express = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  signup,
  login,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;