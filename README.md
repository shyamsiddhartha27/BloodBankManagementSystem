# Blood Bank Management System (LifeFlow) 🩸

A modern, responsive, and professional healthcare dashboard for managing blood donations, patients, and inventory.

![Design Preview](https://img.shields.io/badge/UI-Modern-red)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-skyblue)

## 🚀 Features

- **📊 Dashboard**: Real-time overview of donors, patients, blood units, and pending requests.
- **👥 Donor Management**: Full CRUD operations for donors with blood group tracking.
- **🏥 Patient Management**: Manage patient requirements and records.
- **🩸 Blood Stock**: Visual representation of inventory with low-stock alerts.
- **📝 Request Tracking**: Process and complete blood requests with status badges.
- **🔍 Search & Filter**: Instant searching across all management tables.
- **✨ Premium UI**: Built with glassmorphism, smooth animations (Framer Motion), and responsive layouts.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM
- **API Client**: Axios (ready for integration)

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shyamsiddhartha27/BloodBankManagementSystem.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎨 Design System

- **Primary Color**: `#d32f2f` (Medical Red)
- **Background**: `#f8fafc` (Clean Slate)
- **Typography**: Outfit (Modern Sans-Serif)

---

## ⚙️ Backend (Node.js & MySQL)

The backend provides full REST API capabilities with transaction support for blood requests.

### Setup Instructions

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Database Configuration**:
   Create a MySQL database named `bloodbank` and run the necessary SQL to create `donor`, `patient`, `bloodstock`, and `request` tables. Update the `backend/.env` file with your credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bloodbank
   PORT=5000
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---
Created with ❤️ for LifeFlow Healthcare.
