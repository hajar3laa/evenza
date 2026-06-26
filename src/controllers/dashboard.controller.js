import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Favorite from "../models/Favorite.js";

// ================= USER DASHBOARD =================
export const userDashboard = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).populate("eventId");

    const favorites = await Favorite.find({
      userId: req.user.id,
    });

    const upcomingEvents = bookings.filter(
      (booking) =>
        booking.eventId &&
        new Date(booking.eventId.date) > new Date()
    );

    res.json({
      success: true,
      totalBookings: bookings.length,
      upcomingEvents: upcomingEvents.length,
      favorites: favorites.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ================= ORGANIZER DASHBOARD =================
export const organizerDashboard = async (req, res, next) => {
  try {
    const events = await Event.find({
      organizerId: req.user.id,
    });

    const eventIds = events.map((event) => event._id);

    const bookings = await Booking.find({
      eventId: { $in: eventIds },
      status: "confirmed",
    });

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      totalEvents: events.length,
      totalBookings: bookings.length,
      totalRevenue,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// ================= ADMIN DASHBOARD =================
export const adminDashboard = async (req, res, next) => {
  try {
    const users = await User.countDocuments({
      role: "user",
    });

    const organizers = await User.countDocuments({
      role: "organizer",
    });

    const admins = await User.countDocuments({
      role: "admin",
    });

    const totalEvents = await Event.countDocuments();

    const bookings = await Booking.find({
      status: "confirmed",
    });

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      users,
      organizers,
      admins,
      totalEvents,
      totalBookings: bookings.length,
      totalRevenue,
    });
  } catch (error) {
    next(error);
  }
};