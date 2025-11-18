const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  signup,
  login,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Routes
router.get("/users", authenticate, getAllUsers);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

module.exports = router;
