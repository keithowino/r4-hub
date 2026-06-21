# R4 Hub 🚀

**All your developer resources. Organized. Accessible. Powered by AI.**

R4 Hub is a full-stack developer resource management platform designed to help developers organize, save, search, and quickly access technical tools, websites, and learning resources in one centralized hub.

## 📖 Overview

As developers continuously discover new AI tools, platforms, documentation, deployment services, databases, and experiments, browser tabs and pinned pages quickly become chaotic and difficult to manage or remember.

R4 Hub solves this by providing a personal, persistent dashboard where you can:

- Store and organize resources with categories and tags
- Search across your entire library instantly
- Mark favorites for quick access
- Track resource usage with visit counts
- Auto-fetch page titles from URLs
- Access everything from a beautiful, dark-themed interface

**Live Demo:** [https://r4-hub.vercel.app](https://r4-hub.vercel.app)  
**GitHub:** [https://github.com/keithowino/r4-hub](https://github.com/keithowino/r4-hub)  
**Portfolio:** [https://pickaxe-and-shovel.vercel.app](https://pickaxe-and-shovel.vercel.app)

---

## 🎯 Features

### Current Features

| Feature                  | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **User Authentication**  | Secure JWT-based registration and login               |
| **Resource Management**  | Create, read, update, and delete resources            |
| **Categorization**       | Organize resources by custom categories               |
| **Tagging**              | Add multiple tags to each resource                    |
| **Favorites**            | Star resources for quick access                       |
| **Search**               | Full-text search across titles, URLs, tags, and notes |
| **Visit Tracking**       | Automatic visit count and last-visited tracking       |
| **URL Auto-fetch**       | Auto-populate titles from URLs when adding resources  |
| **Quick Access**         | Favorite resources appear in the quick access bar     |
| **Smart Filtering**      | Filter by category, favorites, or search terms        |
| **Responsive Design**    | Works seamlessly on desktop and mobile                |
| **Dark Theme**           | Modern dark UI optimized for developers               |
| **Activity Feed**        | Recent actions and system status in the right panel   |
| **Statistics Dashboard** | View total resources, favorites, categories, and tags |
| **Resource Icons**       | Emoji icons with favicon fallback                     |

### Planned Features

- ✏️ Edit resources
- 📦 Import/Export resources (JSON/Bookmarks)
- ⌨️ Quick launcher (Ctrl/Cmd + K)
- 📊 Resource analytics and insights
- 📁 Collections/Folders
- 💾 Prompt vault for AI prompts
- 🖼️ Screenshots/thumbnails for resources
- ☁️ Cloud sync across devices
- 🔔 Resource monitoring (dead link detection)
- 📱 Progressive Web App (PWA)

---

## 🛠️ Tech Stack

### Frontend

| Technology             | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| **React 19**           | UI framework with hooks and functional components |
| **Vite**               | Fast build tool and development server            |
| **React Router v7**    | Client-side routing and navigation                |
| **Tailwind CSS**       | Utility-first styling framework                   |
| **Framer Motion**      | Smooth animations and transitions                 |
| **TanStack Query**     | Server state management and caching               |
| **Axios**              | HTTP client with interceptors                     |
| **Lucide React**       | Modern icon library                               |
| **React Toastify**     | Toast notifications                               |
| **React Helmet Async** | Document head management                          |

### Backend

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| **Node.js**    | JavaScript runtime                     |
| **Express 5**  | Web framework and API server           |
| **MongoDB**    | NoSQL database                         |
| **Mongoose**   | ODM for MongoDB schemas and validation |
| **JWT**        | Authentication and authorization       |
| **bcryptjs**   | Password hashing                       |
| **Cloudinary** | Asset storage (planned)                |
| **Multer**     | File upload handling (planned)         |

### Development & Deployment

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| **Vercel**         | Frontend deployment and hosting   |
| **Railway/Render** | Backend deployment                |
| **Concurrently**   | Run client and server in parallel |
| **Nodemon**        | Development server auto-restart   |
| **ESLint**         | Code quality and linting          |

---

## 📁 Project Structure

```
r4-hub/
├── client/                          # React frontend
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── RightPanel.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   └── Logo.jsx
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   │   ├── ResourceCard.jsx
│   │   │   │   ├── ResourceGrid.jsx
│   │   │   │   ├── ResourceFilters.jsx
│   │   │   │   ├── QuickAccess.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── home/                # Landing page components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── modals/              # Modal components
│   │   │       └── AddResourceModal.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useResources.js
│   │   ├── lib/                     # Core libraries
│   │   │   ├── axios.js             # HTTP client with interceptors
│   │   │   ├── context/
│   │   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   │   └── CommonContext.jsx # Shared app state
│   │   │   ├── services/
│   │   │   │   ├── authService.js   # Authentication API calls
│   │   │   │   └── resourceService.js # Resource API calls
│   │   │   └── data.js              # Static data
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Favorites.jsx        # Favorites view
│   │   │   ├── Categories.jsx       # Categories view
│   │   │   └── auth/
│   │   │       ├── Login.jsx        # Login page
│   │   │       └── Register.jsx     # Registration page
│   │   ├── utils/                   # Utility functions
│   │   │   └── constants.js         # App constants
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.js
│   │   │   └── resourceController.js
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js              # JWT authentication
│   │   │   └── error.js             # Error handling
│   │   ├── models/                  # Mongoose models
│   │   │   ├── User.js
│   │   │   └── Resource.js
│   │   ├── routes/                  # API routes
│   │   │   ├── authRoutes.js
│   │   │   └── resourceRoutes.js
│   │   ├── services/                # Business logic
│   │   └── server.js                # Server entry point
│   ├── package.json
│   └── .env.example
│
├── package.json                     # Root workspace scripts
├── .env.development                 # Development environment variables
├── .env.production                  # Production environment variables
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Fork the Repository

Visit: [https://github.com/keithowino/r4-hub](https://github.com/keithowino/r4-hub)

Click the **Fork** button to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/r4-hub.git
cd r4-hub
```

### 3. Install Dependencies

Install all dependencies (client, server, and root):

```bash
npm run install:all
```

Or individually:

```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install:server

# Install client dependencies
npm run install:client
```

### 4. Environment Setup

#### Backend Environment Variables

Create `server/.env.development`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend Environment Variables

Create `client/.env.development`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

**Option A: Run both client and server concurrently (recommended):**

```bash
npm run dev
```

**Option B: Run separately:**

```bash
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

**Access the app:**

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:5000/api](http://localhost:5000/api)
- Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📜 Available Scripts

### From Root Directory

| Command                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `npm run dev`             | Start both client and server in development mode  |
| `npm run server`          | Start only the backend server                     |
| `npm run client`          | Start only the frontend development server        |
| `npm run dev:server-only` | Start server only                                 |
| `npm run dev:client-only` | Start client only                                 |
| `npm run install:all`     | Install dependencies for client, server, and root |
| `npm run install:server`  | Install server dependencies                       |
| `npm run install:client`  | Install client dependencies                       |
| `npm run clean`           | Remove all node_modules folders                   |
| `npm run clean:install`   | Clean and reinstall all dependencies              |
| `npm run status`          | Show running services and ports                   |
| `npm run build`           | Build both client and server for production       |

### From Client Directory

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

### From Server Directory

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start server with nodemon (auto-reload) |
| `npm run start`         | Start server in production              |
| `npm run traceWarnings` | Start with Node.js trace warnings       |

---

## 🗺️ API Endpoints

### Authentication

| Method | Endpoint             | Description         | Auth    |
| ------ | -------------------- | ------------------- | ------- |
| POST   | `/api/auth/register` | Register new user   | Public  |
| POST   | `/api/auth/login`    | Login user          | Public  |
| GET    | `/api/auth/me`       | Get current user    | Private |
| PUT    | `/api/auth/me`       | Update user profile | Private |
| PUT    | `/api/auth/password` | Change password     | Private |

### Resources

| Method | Endpoint                      | Description           | Auth    |
| ------ | ----------------------------- | --------------------- | ------- |
| GET    | `/api/resources`              | Get all resources     | Private |
| GET    | `/api/resources/:id`          | Get single resource   | Private |
| POST   | `/api/resources`              | Create resource       | Private |
| PUT    | `/api/resources/:id`          | Update resource       | Private |
| DELETE | `/api/resources/:id`          | Delete resource       | Private |
| PATCH  | `/api/resources/:id/favorite` | Toggle favorite       | Private |
| PATCH  | `/api/resources/:id/visit`    | Increment visit count | Private |
| PATCH  | `/api/resources/:id/archive`  | Archive resource      | Private |

**Query Parameters for GET `/api/resources`:**

| Parameter  | Description        | Example                |
| ---------- | ------------------ | ---------------------- |
| `category` | Filter by category | `?category=AI%20Tools` |
| `favorite` | Filter favorites   | `?favorite=true`       |
| `status`   | Filter by status   | `?status=active`       |
| `search`   | Full-text search   | `?search=chatgpt`      |
| `tag`      | Filter by tag      | `?tag=AI`              |

---

## 🎨 Design System

### Color Palette

| Color           | Value     | Usage                          |
| --------------- | --------- | ------------------------------ |
| Background      | `#0d0f14` | Primary background             |
| Card Background | `#161920` | Secondary background           |
| Border          | `#2a3044` | Subtle borders                 |
| Primary         | `#6c63ff` | Primary actions and highlights |
| Text Primary    | `#e8eaf0` | Main text                      |
| Text Secondary  | `#8b9ab8` | Secondary text                 |
| Text Muted      | `#3a4260` | Muted text                     |

### Typography

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Animations

- **Hover:** TranslateY, scale, and glow effects
- **Transitions:** 0.15-0.2s ease
- **Modals:** Spring animations with Framer Motion
- **Loading:** Spinner with rotation animation

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push your repository to GitHub
2. Visit [Vercel](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables:
    - `VITE_API_URL` - Your deployed backend URL
6. Deploy

### Backend (Railway/Render/Heroku)

1. Choose a hosting provider (Railway, Render, or Heroku)
2. Connect your GitHub repository
3. Add environment variables:
    - `PORT=5000`
    - `NODE_ENV=production`
    - `MONGODB_URI` - Production MongoDB connection
    - `JWT_SECRET` - Secure JWT secret
    - `JWT_EXPIRES_IN=7d`
    - `CLIENT_URL` - Your deployed frontend URL
    - Cloudinary credentials (if using)
4. Deploy

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork the repository**
2. **Create a feature branch:**

```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes:**

```bash
git commit -m 'Add amazing feature'
```

4. **Push to the branch:**

```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation when needed

---

## 📄 License

This project is proprietary software. All rights reserved.

© 2024 Keith Owino. All rights reserved.

---

## 📬 Contact

**Keith Owino**

- 📧 Email: [designsolutions1629@gmail.com](mailto:designsolutions1629@gmail.com)
- 🔗 Portfolio: [https://pickaxe-and-shovel.vercel.app](https://pickaxe-and-shovel.vercel.app)
- 🐙 GitHub: [https://github.com/keithowino](https://github.com/keithowino)
- 🐦 Twitter: [@keithowino](https://twitter.com/keithowino)

---

## 🙏 Acknowledgments

- Built with ❤️ by Keith Owino
- Special thanks to the open-source community for the amazing tools and libraries

---

**Star the repository if you find it useful! ⭐**
