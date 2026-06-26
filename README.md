# Evenza Backend

Backend API for Event Booking System built with Node.js, Express.js, MongoDB, and JWT Authentication.

## Features

- Authentication & Authorization
- JWT Authentication
- Google OAuth Login
- Email Verification
- Forgot Password & Reset Password
- Event Management
- Booking System
- Favorites
- Reviews
- Coupons
- QR Code Tickets
- Dashboard APIs
- File Uploads
- Admin Panel

---

## Run Project

```bash
npm install
npm run dev
```

---

## Authentication

### Register
POST /api/auth/register

### Login
POST /api/auth/login

### Verify Email
GET /api/auth/verify/:token

### Forgot Password
POST /api/auth/forgot-password

### Reset Password
POST /api/auth/reset-password/:token

### Google Login
GET /api/auth/google

---

## User

### Update Profile
PUT /api/users/profile

---

## Upload

### Upload Image
POST /api/upload

---

## Events

### Create Event
POST /api/events

### Get All Events
GET /api/events

### Get Featured Events
GET /api/events/featured

### Get Event By Id
GET /api/events/:id

### Update Event
PUT /api/events/:id

### Delete Event
DELETE /api/events/:id

### Toggle Featured Event
PUT /api/events/:id/featured

---

## Bookings

### Create Booking
POST /api/bookings

### Get My Bookings
GET /api/bookings/my

### Cancel Booking
DELETE /api/bookings/:id

---

## Reviews

### Create Review
POST /api/reviews

### Get Event Reviews
GET /api/reviews/event/:eventId

### Update Review
PUT /api/reviews/:id

### Delete Review
DELETE /api/reviews/:id

---

## Favorites

### Add Favorite
POST /api/favorites/:eventId

### Get Favorites
GET /api/favorites

### Remove Favorite
DELETE /api/favorites/:eventId

---

## Dashboard

### User Dashboard
GET /api/dashboards/user

### Organizer Dashboard
GET /api/dashboards/organizer

### Admin Dashboard
GET /api/dashboards/admin

---

## Coupons

### Create Coupon
POST /api/coupons

### Get Coupons
GET /api/coupons

### Delete Coupon
DELETE /api/coupons/:id

---

## Admin

### Get All Users
GET /api/admin/users

### Update User Role
PUT /api/admin/users/:id/role

### Delete User
DELETE /api/admin/users/:id

### Approve Event
PUT /api/admin/events/:id/approve

### Reject Event
PUT /api/admin/events/:id/reject