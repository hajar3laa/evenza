import Booking from "../models/Booking.js";
import { generateQRCode } from "../utils/qrGenerator.js";

export const payBooking = async (req, res) => {
  const { bookingId } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "paid";

  const qr = await generateQRCode(booking._id.toString());

  booking.qrCode = qr;

  await booking.save();

  res.json({
    message: "Payment successful",
    booking,
  });
};