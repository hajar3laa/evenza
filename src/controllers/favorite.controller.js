import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.create({
      userId: req.user.id,
      eventId: req.params.eventId,
    });

    res.status(201).json({
      success: true,
      message: "Added to favorites",
      data: favorite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Event already in favorites",
      });
    }

    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user.id,
    }).populate("eventId");

    res.json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user.id,
      eventId: req.params.eventId,
    });

    res.json({
      success: true,
      message: "Removed from favorites",
    });
  } catch (error) {
    next(error);
  }
};