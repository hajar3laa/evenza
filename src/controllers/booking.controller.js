import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import Coupon from "../models/Coupon.js";
import QRCode from "qrcode";
import { sendEmail } from "../utils/sendEmail.js";
export const createBooking = async (req, res, next) => {
  try {
    const {
      eventId,
      quantity,
      couponCode,
      paymentMethod,
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.availableSeats < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough available seats",
      });
    }

    let totalPrice = event.price * quantity;

    let appliedCoupon = null;

if (couponCode) {
  appliedCoupon = await Coupon.findOne({
    code: couponCode.toUpperCase(),
    isActive: true,
    expiresAt: { $gt: new Date() },
  });

  if (!appliedCoupon) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired coupon",
    });
  }

  totalPrice =
    totalPrice -
    (totalPrice * appliedCoupon.discount) / 100;
}

    const ticketNumber = `TKT-${Date.now()}`;

    const qrCode = await QRCode.toDataURL(
      ticketNumber
    );

   const booking = await Booking.create({
  userId: req.user.id,
  eventId,
  quantity,
  totalPrice,

  couponCode: appliedCoupon
    ? appliedCoupon.code
    : null,

  paymentMethod: "card",

  paymentStatus: "pending",

  ticketNumber,
  qrCode,
});
    event.availableSeats -= quantity;
    await event.save();

    if (req.user.email) {
      await sendEmail(
        req.user.email,
        "Booking Confirmation",
        `Your booking has been confirmed.
Ticket Number: ${ticketNumber}`
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).populate("eventId");

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const event = await Event.findById(booking.eventId);

    if (event) {
      event.availableSeats += booking.quantity;
      await event.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};