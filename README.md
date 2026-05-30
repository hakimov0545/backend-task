# ⚡ TaskFlow — MERN Stack Todo App

> Texnik Topshiriq bo'yicha yaratilgan to'liq MERN stack loyihasi

## 🗂️ Loyiha Tuzilmasi

```
taskflow/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB ulanish
│   ├── controllers/
│   │   ├── authController.js  # Register / Login / Me
│   │   ├── taskController.js  # CRUD + pagination
│   │   └── categoryController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT protect middleware
│   │   ├── logger.js          # Custom request logger
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── User.js            # bcrypt + matchPassword
│   │   ├── Task.js            # status, priority, dueDate
│   │   └── Category.js        # color, icon
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── categoryRoutes.js
│   ├── server.js              # Express app (helmet, rateLimit, cors)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js       # Axios instance + interceptors
    │   │   └── services.js    # authAPI, taskAPI, categoryAPI
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx  # JWT + user state
    │   │   └── ThemeContext.jsx # Dark mode
    │   ├── hooks/
    │   │   ├── useTasks.js
    │   │   └── useCategories.js
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── CategoriesPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Ishga Tushirish

### 1. Backend

```bash
cd backend
cp .env.example .env
# .env faylida MONGO_URI va JWT_SECRET ni o'zgartiring

npm install
npm run dev   # nodemon bilan
# yoki
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## 📡 API Endpointlar

| Method | Route                 | Auth | Tavsif                        |
| ------ | --------------------- | ---- | ----------------------------- |
| POST   | `/api/auth/register`  | ✅   | Ro'yxatdan o'tish             |
| POST   | `/api/auth/login`     | ✅   | Kirish                        |
| GET    | `/api/auth/me`        | ✅   | Joriy foydalanuvchi           |
| GET    | `/api/tasks`          | ✅   | Barcha vazifalar (pagination) |
| GET    | `/api/tasks/:id`      | ✅   | Bitta vazifa                  |
| POST   | `/api/tasks`          | ✅   | Yangi vazifa                  |
| PUT    | `/api/tasks/:id`      | ✅   | Vazifani yangilash            |
| DELETE | `/api/tasks/:id`      | ✅   | Vazifani o'chirish            |
| GET    | `/api/categories`     | ✅   | Barcha kategoriyalar          |
| GET    | `/api/categories/:id` | ✅   | Bitta kategoriya              |
| POST   | `/api/categories`     | ✅   | Yangi kategoriya              |
| PUT    | `/api/categories/:id` | ✅   | Kategoriyani yangilash        |
| DELETE | `/api/categories/:id` | ✅   | Kategoriyani o'chirish        |

## ✅ TZ Talablar Bajarilganmi?

### Backend

- ✅ Express.js server (port, CORS, JSON parser)
- ✅ MongoDB Mongoose orqali ulangan
- ✅ 3 ta model: User, Task, Category
- ✅ CRUD to'liq amalga oshirilgan
- ✅ JWT login/register
- ✅ Middleware: auth, logger
- ✅ bcrypt password hashing
- ✅ Rate limiting + helmet.js (bonus)

### Frontend

- ✅ Axios + interceptors
- ✅ Token localStorage da saqlash + header
- ✅ Protected routes
- ✅ Login + Register (form validatsiya)
- ✅ Loading va Error holatlari
- ✅ Dark mode
- ✅ React Context (AuthContext + ThemeContext)

## 🛠️ Texnologiyalar

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, helmet, express-rate-limit, morgan  
**Frontend:** React 18, Vite, Tailwind CSS, Axios, React Router v6
