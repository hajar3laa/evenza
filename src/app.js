import dotenv from "dotenv";
dotenv.config();

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import passport from "./config/passport.js";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

import {
  notFound,
  errorHandler,
} from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Booking API",
      version: "1.0.0",
      description: "DEPI Project API",
    },
    servers: [
  {
    url: process.env.SERVER_URL || "http://localhost:5000",
  },
],
  },
  apis: ["./src/routes/*.js"],
};

app.get("/", (req, res) => {
  res.send("API Running...");
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/events", eventRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;