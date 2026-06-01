# 🛒 ShopFlow — Full-Stack E-Commerce Platform

![ShopFlow Banner](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop)

A fully functional full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) with Stripe payment integration.

🌐 **Live Demo:** [e-commerce-platform-kishanprojects.vercel.app](https://e-commerce-platform-kishanprojects.vercel.app)

---

## ✨ Features

- 🔐 User authentication (Register / Login) with JWT
- 🛍️ Product listing with search and category filter
- 📦 Product detail page with stock and ratings
- 🛒 Shopping cart with quantity management
- 💳 Stripe payment integration (test mode)
- ✅ Order creation and order success page
- 👤 User profile with auth context
- 📱 Responsive design for mobile and desktop
- 🔒 Protected routes for authenticated users
- 🛡️ Admin-ready backend (admin middleware included)

---

## 🖥️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Context API | Global state (cart, auth) |
| Axios | HTTP requests |
| Stripe.js | Payment UI |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js v4 | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Stripe | Payment processing |
| CORS | Cross-origin requests |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
ecommerce-app/
├── client/                     # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── Navbar.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── CartContext.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── ProductPage.jsx
│       │   ├── CartPage.jsx
│       │   ├── CheckoutPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── OrderSuccessPage.jsx
│       ├── services/
│       │   └── api.js
│       └── App.js
│
└── server/                     # Node.js backend
    ├── config/
    │   └── db.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   └── Order.js
    ├── routes/
    │   ├── auth.js
    │   ├── products.js
    │   ├── orders.js
    │   └── payments.js
    ├── seed.js
    └── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Kishan269565/E-Commerce-Platform.git
cd E-Commerce-Platform
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
PORT=5000
```

### 3. Seed the database
```bash
node seed.js
```

### 4. Start the backend
```bash
node index.js
```

### 5. Setup Frontend
```bash
cd ../client
npm install
```

Create `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PK=pk_test_xxxxxxxxxxxxxxxxxxxx
```

### 6. Start the frontend
```bash
npm start
```

Visit `http://localhost:3000` 🎉

---

## 💳 Test Payment

Use Stripe test card details:

| Field | Value |
|---|---|
| Card Number | `4242 4242 4242 4242` |
| Expiry | `12/26` |
| CVC | `123` |
| ZIP | `00000` |

---

## 🌍 Deployment

### Frontend → Vercel
```bash
cd client
vercel deploy
```

### Backend → Render
1. Push code to GitHub
2. Connect repo on [render.com](https://render.com)
3. Set Root Directory to `server`
4. Add environment variables
5. Deploy

### Database → MongoDB Atlas
1. Create free M0 cluster
2. Add database user
3. Whitelist `0.0.0.0/0`
4. Copy connection string to `MONGO_URI`

---

## 📸 Screenshots

| Page | Description |
|---|---|
| 🏠 Homepage | Product grid with search |
| 📦 Product Page | Detail view with add to cart |
| 🛒 Cart Page | Item management with totals |
| 💳 Checkout | Stripe payment form |
| ✅ Order Success | Confirmation page |

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/myorders` | Get user orders |
| GET | `/api/orders/:id` | Get single order |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payments/create-intent` | Create Stripe payment intent |

---

## 👨‍💻 Author

**Kishan** — Junior Full-Stack Developer

- GitHub: [@Kishan269565](https://github.com/Kishan269565)
- Live Project: [ShopFlow](https://e-commerce-platform-kishanprojects.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **If you found this project helpful, please give it a star!**
