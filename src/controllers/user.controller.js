import User from "../models/User.js";

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};