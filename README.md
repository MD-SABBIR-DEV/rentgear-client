# RentGear — Equipment Rental Platform

## Purpose
RentGear is a full-stack equipment rental marketplace connecting verified equipment owners with customers for construction, photography, agriculture, vehicles, electronics, and event gear rentals.

## Live URL
- **Live Site:** [Add Your Vercel Live URL Here]

## Key Features
- **Authentication & RBAC:** BetterAuth (Email/Password + Google OAuth) with JWT verification and role-based middleware (`Customer`, `Owner`, `Admin`).
- **Server-Side Search, Filter & Sort:** Filter equipment by category, location, rental type, price range, and availability.
- **Stripe Payment Integration:** Secure Stripe Checkout with automated booking confirmation and transaction recording.
- **Role-Based Dashboards:** Dedicated dashboards for Customers (My Rentals, Favorites, Profile), Owners (Add/Manage Equipment, Rental Requests, Earnings Analytics), and Admins (User Role Management, Equipment Approval, Platform Analytics).
- **Interactive UI & Animations:** Responsive dark-mode design with Framer Motion animations and Recharts analytics.

## Tech Stack & NPM Packages
- **Frontend:** Next.js (App Router), Tailwind CSS, DaisyUI, Framer Motion, Lucide React, Recharts, Axios, React Hot Toast, BetterAuth
- **Backend:** Express.js, MongoDB, JSON Web Token (JWT), Stripe, CORS, Dotenv