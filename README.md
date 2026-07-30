# 🚗 RentRide

## 🌐 Live Demo

- **Frontend (Vercel):** https://rentride-nine.vercel.app/

**RentRide** is a full-stack MERN-based car rental platform designed to make travelling **comfortable, convenient, and memorable**. The platform allows customers to browse and book cars, enables approved owners to list their vehicles, and provides administrators with complete control over the system through role-based access management.

The project focuses on creating a scalable and user-friendly rental experience while implementing modern web development practices such as secure authentication, RESTful APIs, AI-assisted recommendations, and interactive maps.

---

## ✨ Key Features

* Browse and search cars with multiple filters.
* Secure user authentication using JWT.
* AI chatbot to recommend suitable cars based on the user's requirements.
* Interactive map displaying available car locations.
* Role-Based Access Control (Customer, Owner, Admin).
* Booking management and rental workflow.
* Responsive and modern user interface.

---

## 👥 Role-Based Access Control

### Customer

* Register and log in.
* Browse available cars.
* Search and filter vehicles.
* Book rental cars.
* View booking history.
* Apply to become a car owner.

### Owner

> Owners require **Admin approval** before accessing owner features.

Once approved, owners can:

* Add new cars.
* Manage their listed vehicles.
* Update car details.
* View bookings for their cars.

### Admin

* Manage users.
* Approve or reject owner requests.
* Manage all cars.
* Monitor bookings across the platform.
* Maintain overall platform operations.

---

## 🤖 AI Chatbot

RentRide includes an AI-powered chatbot that assists users in finding the most suitable vehicle based on their travel needs.

The chatbot can provide recommendations by considering factors such as:

* Trip purpose
* Number of passengers
* Budget
* Fuel preference
* Vehicle category

This creates a more personalised booking experience and simplifies the vehicle selection process.

---

## 🗺️ Maps with Leaflet & OpenStreetMap

The project integrates **Leaflet** with **OpenStreetMap** to display the location of available rental cars directly on the website.

During development, an attempt was also made to implement **live vehicle tracking** for each booking. Although the concept was explored and a significant understanding of route generation and map integration was achieved, the implementation was not completed due to challenges in maintaining independent real-time tracking sessions for individual bookings.

Working on this feature provided valuable hands-on experience with:

* Leaflet
* OpenStreetMap
* Route generation concepts
* Location-based services
* Interactive map rendering

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Zustand
* Leaflet
* OpenStreetMap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Multer
* Cloudinary

---

## ⚙️ Backend Functionalities

The backend follows a layered architecture consisting of **Controllers, Services, Repositories, Models, and Routes** to improve maintainability and scalability.

Core functionalities include:

* JWT-based authentication and authorization.
* Role-based access control.
* CRUD operations for cars.
* Booking management APIs.
* Owner approval workflow.
* Image upload using Multer and Cloudinary.
* AI chatbot integration.
* MongoDB data management using Mongoose.
* RESTful API architecture with proper validation and error handling.

---

## 🎨 Frontend Functionalities

The frontend is designed to provide an intuitive and responsive user experience.

Features include:

* Responsive interface for all devices.
* Car browsing with filtering options.
* Interactive booking flow.
* Authentication pages.
* AI chatbot interface.
* Dashboard views for different user roles.
* Leaflet-based map visualisation.
* API integration using Fetch.
* Global state management with Zustand.

---

## 📚 What I Learned

This project strengthened my understanding of:

* Full-stack MERN development
* REST API design
* Authentication & authorization
* Role-based access management
* Database modelling with MongoDB
* Cloud image storage
* AI integration into web applications
* Leaflet and OpenStreetMap
* Building scalable project architecture
* Version control using Git and GitHub

---

## 🚀 Future Enhancements

The project has been designed with scalability in mind. Planned improvements include:

* **Payment Integration** using services such as **Stripe** or **Razorpay**.
* **Live Vehicle Tracking** using Leaflet with real-time location updates for each booking.
* **OTP-Based Authentication** using services such as **Nodemailer** for email verification or password recovery.
* Notifications for bookings and rental updates.
* Advanced analytics and reporting dashboard.
* Review and rating system for cars and owners.

---

## 📌 Project Goal

RentRide aims to simplify the car rental experience by combining modern web technologies, AI-assisted recommendations, secure authentication, and interactive mapping into a single platform. Beyond providing a practical rental solution, the project also serves as a comprehensive learning experience in full-stack application development and scalable software design.
