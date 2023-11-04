import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import modelOptions from "./mongoose.options";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a user name"],
      unique: true,
    },
    name: String,
    avatar: String,
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    salt: {
      type: String,
      // required: [true, "Please provide a salt"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "team-lead", "member"],
      default: "manager",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    currentPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Pricing" },
    forgotPasswordToken: String,
    forgetPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: String,
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    teams: [{ type: mongoose.Schema.ObjectId, ref: "Team" }],
    isActive: { type: Boolean, default: false },
    managerId: { type: mongoose.Schema.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    teamId: { type: mongoose.Schema.ObjectId, ref: "Team" },
  },
  modelOptions
);

userSchema.methods.setPassword = async function (password: string) {
  // hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  return (this.password = hashedPassword);
};

userSchema.methods.isValidPassword = async function (password: string) {
  const validPassword = await bcryptjs.compare(password, this.password);

  return validPassword;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
