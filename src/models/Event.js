import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    location: String,
    price: Number,
     capacity: {
  type: Number,
  required: true,
},

availableSeats: {
  type: Number,
  required: true,
},
    images: [String],
    category: String,
    tags: [String],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "ongoing", "completed"],
      default: "pending",
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
 
);

export default mongoose.model("Event", eventSchema);