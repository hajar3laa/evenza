import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";


export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Gmail only
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Only Gmail accounts are allowed",
      });
    }

    // منع تسجيل Admin
    if (role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot register as admin",
      });
    }

    // التحقق من عدم تكرار الإيميل
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken =
      crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      isVerified: false,
      verificationToken,
    });

    const verifyUrl =
      `http://localhost:5000/api/auth/verify/${verificationToken}`;

    await sendEmail(
  user.email,
  "Verify your email",
  `Click here to verify your account:\n${verifyUrl}`
);


    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email",
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const user = await User.findOne({
    verificationToken: req.params.token,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }

  user.isVerified = true;
  user.verificationToken = null;

  await user.save();

  res.json({
    success: true,
    message: "Email verified successfully",
  });
};

export const googleCallback = async (req, res) => {
  const token = generateToken(req.user);

  res.json({
    success: true,
    user: req.user,
    token,
  });
};
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");
const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire =
      Date.now() + 10 * 60 * 1000; 

    await user.save();

    const resetUrl =
  `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

await sendEmail(
  user.email,
  "Reset Password",
  `Click here to reset your password: ${resetUrl}`
);

res.json({
  success: true,
  message: "Password reset email sent",
});
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (
  req,
  res,
  next
) => {
  try {
   const hashedToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

const user = await User.findOne({
  resetPasswordToken: hashedToken,
  resetPasswordExpire: {
    $gt: Date.now(),
  },
});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};