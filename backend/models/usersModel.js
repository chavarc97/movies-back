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
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    isAdmin: {
      type: Boolean,
      required: [true, "Please provide if the user is an admin"],
    },
    active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
