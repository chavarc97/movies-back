const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide your first name"],
      maxlength: [50, "Your first name cannot exceed 50 characters"],
      minlength: [3, "Your first name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, 'This email is already registered'],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
