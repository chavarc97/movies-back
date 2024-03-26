const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  userData,
  userData,
  updateUser,
  deleteUser,
} = require("../controllers/users/usersControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/data", protect, userData);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
