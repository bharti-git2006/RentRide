# 🚗 Car Rental Platform (Backend)

A backend built using the MERN stack for a Car Rental Platform.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

## Project Structure

```
Backend
│
├── controllers
│   ├── authController.js
│   └── profileController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── uploadMiddleware.js
│
├── models
│   └── User.js
│
├── repositories
│   └── userRepository.js
│
├── routes
│   ├── authRoutes.js
│   └── profileRoutes.js
│
├── services
│   ├── authService.js
│   └── profileService.js
│
├── utils
│   ├── cloudinary.js
│   └── generateToken.js
│
├── seed
│   └── seedAdmin.js
│
├── .env
├── server.js
└── package.json
```

- **Routes** → Define API endpoints.
- **Controllers** → Receive request and send response.
- **Services** → Contain business logic.
- **Repositories** → Perform database operations.
- **Models** → Define MongoDB schemas.

---

## Authentication Flow

### Signup

```
Client
   ↓
POST /api/auth/signup
   ↓
Password hashed using bcrypt
   ↓
User saved in MongoDB
```

Every user who signs up is assigned:

```
role = "user"
```

---

### Login

```
Email + Password
        ↓
Verify Password
        ↓
Generate JWT
        ↓
Return Token
```

The token is required for all protected routes.

---

## Middleware

### authMiddleware

- Checks if JWT token exists.
- Verifies the token.
- Adds user information to `req.user`.

---

### adminMiddleware

- Runs after authMiddleware.
- Checks if:

```
req.user.role === "admin"
```

- Allows only admins to access admin routes.

---

## Profile Module

- Get Profile
- Update Profile
- Change Password
- Change Profile Photo

---

## Image Upload

Images are uploaded using:

```
Frontend/Postman
      ↓
Multer
      ↓
Cloudinary
      ↓
Image URL
      ↓
MongoDB
```

Only the Cloudinary image URL is stored in the database.

---

## Admin

- Public signup creates only **users**.
- Admins use the same login API.
- The first admin is created using:

```
npm run seed-admin
```

- Existing admins can create more admins using the protected admin API.

---

## APIs

### Auth

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/create-admin
```

### Profile

```
GET    /api/profile
PUT    /api/profile
PUT    /api/profile/change-password
PUT    /api/profile/change-photo
```

---

## Run Project

Install dependencies

```
npm install
```

Start server

```
npm run dev
```

Create first admin

```
npm run seed-admin
```

---

## Environment Variables

```
PORT=

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Current Features

- User Signup
- User/Admin Login
- JWT Authentication
- Role-based Authorization
- Profile Management
- Password Change
- Profile Photo Upload (Cloudinary)
- Admin Creation

🚗 Car Module

The Car module is responsible for managing all cars available on the rental platform. Customers can browse and view cars, while only admins have permission to add, edit or remove cars.

Workflow
Admin
   │
   ▼
Car Routes
   │
   ▼
Car Controller
   │
   ▼
Car Service
   │
   ▼
Car Repository
   │
   ▼
MongoDB
Customer Features

Customers do not modify any car information.

They can:
View all available cars
View details of a specific car
Search cars
Filter cars by:
Brand
Model
Category
Fuel Type
Transmission
Location
Admin Features

Only users whose role is admin can perform these actions:
Add a new car
Upload one or multiple car images
Update car details
Replace car images
Change car availability
Soft delete a car

All admin routes are protected using:
authMiddleware
and
adminMiddleware

Images
Car images are uploaded using: Multe Cloudinary

Images are sent through form-data in Postman or from the frontend.

Example:

images -> car1.jpg
images -> car2.jpg
images -> car3.jpg

Cloudinary returns image URLs which are stored inside MongoDB.

Example:

images: [
   "https://res.cloudinary.com/.....",
   "https://res.cloudinary.com/....."
]
Car Structure

Each car stores information such as:

Brand
Model
Year
Registration Number
Category
Fuel Type
Transmission
Seating Capacity
Mileage
Price Per Day
Description
Location
Images
Availability
Active Status
Soft Delete

Cars are never permanently deleted.Instead, isActive = false;
This keeps old booking records valid and allows the admin to restore cars later if required.

APIs
Customer APIs:

Method	Endpoint	Description
GET	/api/cars	Get all available cars
GET	/api/cars/:id	Get a single car

Admin APIs:

Method	Endpoint	Description
POST	/api/cars	Add a new car
PUT	/api/cars/:id	Update car details (including images)
PATCH	/api/cars/:id/availability	Change availability
DELETE	/api/cars/:id	Soft delete a car


Request Flow
Admin
   │
   ▼
POST /api/cars
   │
   ▼
carRoutes
   │
   ▼
authMiddleware
   │
   ▼
adminMiddleware
   │
   ▼
carController
   │
   ▼
carService
   │
   ▼
carRepository
   │
   ▼
MongoDB

Customers only read car data.
Admins are responsible for managing the entire fleet.
Images are stored on Cloudinary, while only their URLs are stored in MongoDB.
Deleted cars are hidden from customers using soft delete instead of being permanently removed.



models/
    user.js
    car.js
    booking.js

repositories/
    userRepository.js
    carRepository.js
    bookingRepository.js

services/
    authService.js
    carService.js
    bookingService.js

middleware/
    authMiddleware.js
    adminMiddleware.js
    ownerMiddleware.js
    uploadMiddleware.js

controllers/
    authController.js
    carController.js
    bookingController.js

routes/
    authRoutes.js
    carRoutes.js
    bookingRoutes.js

utils/
    generateToken.js
    cloudinary.js
    calculatePrice.js

seed/
    seedAdmin.js

server.js