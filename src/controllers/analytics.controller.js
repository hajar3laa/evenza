import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

export const getAdminStats = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();
  const bookings = await Booking.countDocuments();

  const revenue = await Booking.aggregate([
    { $match: { status: "paid" } },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.json({
    users,
    events,
    bookings,
    revenue: revenue[0]?.total || 0,
  });
};