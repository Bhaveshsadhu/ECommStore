# 🛒 ECommStore

### Full-Stack MERN E-Commerce Application

**ECommStore** is a production-style, full-stack **E-Commerce web application** built with the **MERN stack**.
It features secure authentication, product & cart management, coupon handling, and **Stripe Checkout integration using the latest server-side flow**.

This project is designed to demonstrate **real-world architecture, security practices, and scalable backend/frontend patterns** commonly used in modern web applications.

---

## 🚀 Key Features

* 🔐 **Authentication & Authorization**

  * JWT access & refresh tokens
  * Secure password hashing with bcrypt
* 🛍 **Product & Cart Management**

  * Add/remove products
  * Quantity management
* 💳 **Payments**

  * Stripe Checkout (latest server-side redirect flow)
  * Secure payment handling (no client-side secrets)
* 🎟 **Coupons & Discounts**

  * User-specific coupons
  * Automatic deactivation after use
* 📦 **Orders**

  * Order creation after successful payment
  * User-specific order history
* 📊 **Admin-Ready Backend**

  * Protected admin routes
  * Analytics support
* 🎨 **Responsive UI**

  * Built with Tailwind CSS
  * Mobile-friendly layout

---

## 🛠 Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT (Access & Refresh Tokens)
* bcrypt for password hashing

### Payments & Services

* Stripe Checkout (2025+ secure flow)
* Cloudinary (image storage)
* Upstash Redis (caching / session support)

---

## 📁 Project Structure

```text
ECommStore-main/
│
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose schemas
│   ├── routers/        # API routes
│   ├── middlewares/    # Auth & error handling
│   ├── utils/          # Helpers & services
│   └── server.js
│
├── frontend/
│   ├── src/            # React source code
│   ├── public/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside **backend/**:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
```


---

## ▶️ Getting Started (Local Development)

### 1️⃣ Install dependencies

```bash
npm install                 # backend dependencies (from repo root)
cd frontend && npm install  # frontend dependencies
```

---

### 2️⃣ Configure environment

Create `backend/.env` using the variables listed above.

> Frontend does not require environment variables for local development and communicates with
> `http://localhost:5000/api` by default.

---

### 3️⃣ (Optional) Seed sample data

```bash
npm run seed
```

Seeds products, users, coupons, and orders.

**Sample accounts:**

* Admin: `admin@example.com` / `AdminPass123!`
* User: `alice@example.com` / `Password123!`
* User: `cart@example.com` / `CartPass123!`

---

### 4️⃣ Run the application

```bash
# Terminal 1 – Backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 – Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 🔗 Key API Routes

* Base API: `/api`
* Authenticated requests use cookies (`withCredentials: true`)
* **Admin-only**

  * `/api/products/*`
  * `/api/analytics`
* **Payments**

  * `/api/payments/create-checkout-session`
  * `/api/payments/checkout-success`

---

## 📝 Notes

* Analytics charts display orders from the **last 7 days**
  (seed data includes recent orders for testing).
* If analytics appear empty, ensure:

  * You are logged in as **admin**
  * Orders have **paid** status
* Product images are uploaded as Base64 and stored using **Cloudinary**.

---

## 📜 Available Scripts

### Backend

* `npm run dev` – Start backend with nodemon
* `npm start` – Start backend in production mode
* `npm run seed` – Seed database

### Frontend

* `npm run dev` – Start frontend (Vite)
* `npm run build` – Build frontend for production

---

## 💳 Stripe Test Card (Development Only)

Use Stripe’s official test card:

```text
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3 digits
```

---

## 🔐 Security & Best Practices

* Passwords are hashed using bcrypt
* JWT-based authentication with refresh tokens
* Stripe Checkout sessions are created **server-side**
* Sensitive payment logic never runs on the client
* Environment secrets are kept outside source control

---

## 📌 Future Enhancements

* Stripe webhook-based order confirmation
* Full admin dashboard UI
* Product reviews & ratings
* Search, filtering & pagination
* Deployment (AWS / Vercel / Render)

---

## 👤 Author

**Bhavesh Sadhu**
Full-Stack Developer (MERN)

* 💼 LinkedIn: https://www.linkedin.com/in/bhaveshsadhu/
* 💻 GitHub: https://github.com/Bhaveshsadhu/ECommStore.git


