import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Event from "./src/models/Event.js";
import Booking from "./src/models/Booking.js";
import Coupon from "./src/models/Coupon.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const admin = await User.create({
      name: "Evenza",
      email: "evenza20@gmail.com",
      password: "123456",
      role: "organizer", 
      isVerified: true,
      profileImage:
        "https://randomuser.me/api/portraits/men/1.jpg",
    });

    const organizer = await User.create({
      name: "Gori Alaa",
      email: "goriiigoriii56@gmail.com",
      password: "123456",
      role: "organizer",
      isVerified: true,
      profileImage:
        "https://randomuser.me/api/portraits/men/2.jpg",
    });

    const user1 = await User.create({
      name: "Hayam Mostafa",
      email: "hayammostafa712@gmail.com",
      password: "123456",
      role: "user",
      isVerified: true,
      profileImage:
        "https://randomuser.me/api/portraits/women/3.jpg",
    });

    const user2 = await User.create({
      name: "Rania Mostafa",
      email: "gpt958319@gmail.com",
      password: "123456",
      role: "user",
      isVerified: true,
      profileImage:
        "https://randomuser.me/api/portraits/women/4.jpg",
    });

    // Events
    const event1 = await Event.create({
  title: "Tech Conference 2026",
  description: "Latest Backend Technologies",
  category: "Technology",
  location: "Cairo",
  date: new Date("2026-08-15"),
  price: 500,

  capacity: 100,
  availableSeats: 100,

  organizerId: organizer._id,
  status: "approved",

  images: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  ],

  tags: ["backend", "nodejs", "mongodb"],
  featured: true,
});

const event2 = await Event.create({
  title: "Startup Summit",
  description: "Entrepreneurship Event",
  category: "Business",
  location: "Alexandria",
  date: new Date("2026-09-10"),
  price: 300,

  capacity: 50,
  availableSeats: 50,

  organizerId: organizer._id,
  status: "approved",

  images: [
    "https://images.unsplash.com/photo-1511578314322-379afb476865"
  ],

  tags: ["startup", "business"],
  featured: false,
});

const event3 = await Event.create({
  title: "AI Workshop",
  description: "Artificial Intelligence Workshop",
  category: "Technology",
  location: "Mansoura",
  date: new Date("2026-10-01"),
  price: 200,

  capacity: 40,
  availableSeats: 40,

  organizerId: organizer._id,
  status: "pending",

  images: [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  ],

  tags: ["ai", "machine-learning"],
  featured: true,
});

    // Coupons
    const coupon1 = await Coupon.create({
      code: "DEPI20",
      discount: 20,
      isActive: true,
      expiresAt: new Date("2027-01-01"),
    });

    await Coupon.create({
      code: "WELCOME10",
      discount: 10,
      isActive: true,
      expiresAt: new Date("2027-01-01"),
    });

    await Booking.create({
      userId: user1._id,
      eventId: event1._id,
      quantity: 2,
      totalPrice: 800,
      couponCode: coupon1.code,
      paymentMethod: "card",
      paymentStatus: "paid",
      status: "confirmed",
      ticketNumber: "TKT-1001",
    });

    await Booking.create({
      userId: user2._id,
      eventId: event2._id,
      quantity: 1,
      totalPrice: 300,
      paymentMethod: "card",
      paymentStatus: "pending",
      status: "confirmed",
      ticketNumber: "TKT-1002",
    });

    console.log("Seed data inserted successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedData();