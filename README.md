# Shamim Plastic House & Fancy Corner 🏺

A professional MERN-stack e-commerce platform designed for **Shamim Plastic House & Fancy Corner**. This application allows customers to browse high-quality plasticware and home decor items while providing a secure admin panel for inventory management.

## 🌐 Live Website
**View the store here:** [https://fancy-corner-sq97.vercel.app/](https://fancy-corner-sq97.vercel.app/)

---

## ✨ Features
* **Dynamic Product Grid:** Automatically displays categories and products from the database.
* **Modern Design:** Fully responsive UI built with React, Tailwind CSS, and TypeScript.
* **Secure Admin Panel:** Protected route for adding, editing, and deleting products.
* **Image Optimization:** Fast-loading product images powered by Cloudinary.
* **Production Ready:** Optimized for Vercel with serverless functions and dynamic build handling.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js (TypeScript)
* **Database:** MongoDB Atlas
* **Deployment:** Vercel

## ⚙️ Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/MuhammadAhmedKhan2006/FancyCorner.git](https://github.com/MuhammadAhmedKhan2006/FancyCorner.git)
    cd FancyCorner
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root and add your credentials:
    ```env
    MONGODB_URI=your_mongodb_atlas_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    ADMIN_PASSWORD=shamim2026
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```

---

## 🛠️ Deployment Configuration
The project includes a custom `vercel.json` and a dynamic server configuration to bypass Rollup/Vite module errors on Vercel's Linux environment. This ensures the backend stays stable 24/7 without crashing.

## 📄 License
This project is private and intended for the use of Shamim Plastic House.

---
*Developed by [Muhammad Ahmed Khan](https://github.com/MuhammadAhmedKhan2006)*