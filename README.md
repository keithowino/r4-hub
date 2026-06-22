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

<!-- ### Planned Features

- ✏️ Edit resources
- 📦 Import/Export resources (JSON/Bookmarks)
- ⌨️ Quick launcher (Ctrl/Cmd + K)
- 📊 Resource analytics and insights
- 📁 Collections/Folders
- 💾 Prompt vault for AI prompts
- 🖼️ Screenshots/thumbnails for resources
- ☁️ Cloud sync across devices
- 🔔 Resource monitoring (dead link detection)
    - Description: Periodic (or on-demand) checks for broken links, with status badges, auto-archiving, and notifications.
    - Problem Solved: Saved resources rot over time; manual verification is tedious (a common pain in Raindrop/Pocket alternatives).
    - How it Works: Cron job or user-triggered scan using node-fetch or a queue (BullMQ). Flag resources as "Broken," "Slow," or "Archived." Dashboard widget shows health stats.
    - Implementation Considerations: Add status field to Resource model. Use Cloudinary or server-side for snapshots. Rate-limit checks. Notify via toast/email (expand auth for this).
- 📱 Progressive Web App (PWA)
- Correctly handle signin/ signup operations
    - Forgot password(enable this)
    - Some error or successful operations are not handled well at the moment
- Migrate the app not just to handle software development resources but any kind of resource out there.
- Resource Sharing & Collaboration
- AI-Powered Smart Recommendations & "For You" Feed
    - Description: An AI-driven section suggesting resources based on usage patterns, tags, categories, recent visits, and external signals (e.g., trending dev tools).
    - Problem Solved: Developers save hundreds of links but forget or can't surface relevant ones during workflows (e.g., "what was that caching lib I bookmarked?").
    - How it Works: On the dashboard, home page, etc, show a "Recommended for You" carousel/grid. Use visit history + tags for simple ML (or integrate an LLM via API for semantic matching). Include "Similar to this resource" on detail views.
    - Implementation Considerations: Store embeddings or use vector search in MongoDB (or add Pinecone/Qdrant). Leverage TanStack Query for caching. Start rule-based (e.g., co-occurring tags), then add OpenAI/Anthropic for summaries. Privacy-focused (on-device or user-controlled data).
- Browser Extension
    - Description: A browser extension to quickly save resources from the web with auto-title, favicon, suggested tags/categories, and optional screenshot/note.
    - Problem Solved: Friction in saving during browsing kills adoption; competitors like Raindrop excel here.
    - How it Works: Extension sends to backend API. Context menu + popup for quick edits. Syncs with web app in real-time.
    - Implementation Considerations: Manifest V3. Use existing resourceService. Store extension-specific data (e.g., page selection). Publish to stores; start with Chrome. Secure with JWT.
- Custom Dashboard Widgets(Configurable dashboard with user-selectable widgets)
- Mobile App
- Resource Scheduling & Reminders
- AI-Powered Features
- Offline Support & PWA Enhancements with Local Sync
    - Description: Full PWA with IndexedDB caching for offline CRUD, auto-sync on reconnect.
    - Problem Solved: Developers work in varied environments (flights, restricted networks); current responsive UI lacks true offline.
    - Implementation Considerations: Service Workers + TanStack Query offline mode + Dexie.js or localforage. Conflict resolution on sync. Already planned—accelerate it.
- Innovative/Unique Differentiators
    - Developer Workflow Embedding: GitHub integration (auto-import starred repos, release watching via webhooks), API endpoint testing (Postman-like inline tester), and environment variable/secret snippet storage (encrypted).
    - Usage-Driven Insights Dashboard: Heatmaps of resource visits by time/project, "forgotten gems" recovery (AI surfaces low-visit high-potential items), and exportable reports.
    - Hybrid Personal + Public Knowledge Graph: User resources + optional public/community graph (opt-in sharing) with semantic connections (e.g., "resources used together").
    - Command Palette + CLI Companion: Beyond Ctrl+K, a local CLI (r4hub save <url>) and Raycast/Spotlight integration for power users.
    - These go beyond Raindrop.io (visual + tags) or Notion (flexible but general-purpose) by deeply embedding developer primitives like code, APIs, and Git.
- Developer-Specific Features
    - API Collection Tester: Save API endpoints with auth, params, and run tests inline.
    - Stack/Context Tagging: Auto-detect or manual "Next.js + Tailwind" stacks for filtering.
    - VS Code / JetBrains Extension: Pull/push resources from IDE.
    - Changelog & Documentation Linker: Auto-link resources to GitHub issues/PRs.
- Monetization Features (Freemium/Premium)
    - Free Tier: Unlimited personal resources, basic search, PWA.
    - Premium ($5-10/mo or one-time): AI recommendations, advanced analytics, unlimited collections/sharing, cloud backups, priority support, team workspaces, custom domains/go-links, ad-free, export to Notion/Obsidian.
    - Enterprise: SSO, self-hosting option, audit logs, admin controls, dedicated support.
    - One-time Lifetime License or "Sponsor a Feature" for open-source goodwill.
- Resource-to-Project Linking
    - Description: Allow resources to be attached directly to projects.
    - Problem Solved: Developers save resources but later forget why they saved them or which project they belong to.
    - How It Works: A user creates: Portfolio Website, SaaS Dashboard, Learning React, AI Chatbot
    - Resources can be attached to one or more projects.
- Resource Dependency Graph
    - Description: Visual graph showing relationships between resources.
    - Problem Solved: Developers often discover tools through chains of related technologies.
    - How It Works
      React
      ├─ Vite
      ├─ React Router
      └─ TanStack Query
      Node.js
      ├─ Express
      └─ MongoDB
    - Users can manually create relationships or AI can infer them.
    - Implementation Considerations: React Flow, Graph visualization, AI-generated relationships, MongoDB references
- Learning Path Builder
    - Description: Create structured learning roadmaps from saved resources.
    - Problem Solved: Bookmarks become overwhelming and lack sequence.
    - How It Works
      Learn Docker

        Step 1 → Docker Basics
        Step 2 → Docker Compose
        Step 3 → Container Networking
        Step 4 → Kubernetes

    - Track completion percentages.
    - Could later integrate AI-generated learning paths.

- Resource Version Tracking
    - Description: Monitor documentation and tool updates.
    - Problem Solved: Saved resources become outdated.
    - How It Works: User saves:
      React Docs
      Node.js Docs
      MongoDB Docs

        R4 Hub detects:

        React 21 Released
        Changes:
        ✓ Server Components Improved
        ✓ New Compiler Updates

    - Implementation Considerations: RSS feeds, GitHub releases, Scheduled background jobs

- Workspace Context Packs
    - Description: One-click launch of an entire working environment.
    - Problem Solved: Developers repeatedly open the same resources every day.
    - How It Work: Frontend Workspace
      Opens:
      ✓ GitHub Repo
      ✓ Figma
      ✓ Vercel
      ✓ React Docs
      ✓ Jira Board
    - Single click opens everything.
    - Implementation Considerations: Store grouped URLs and launch actions.
- AI Knowledge Extraction
    - Description: AI generates summaries and searchable insights from resources.
    - Problem Solved: Developers rarely revisit long articles.
    - How It Works: Save article: "Building Microservices with Node.js"

        AI extracts:

        Summary
        Key concepts
        Technologies
        Difficulty
        Estimated reading time
        Implementation Considerations
        OpenAI embeddings
        Semantic search
        Background processing queue

- Personal Developer Wiki
    - Description: Transform resources into a searchable knowledge base.
    - Problem Solved: Bookmarks store links, not knowledge.
    - How It Works: Each resource gains:
      Notes
      Highlights
      AI summaries
      Code snippets
    - Over time R4 Hub becomes a personal engineering wiki.
    - Implementation Considerations: Markdown support.
- Forgotten Gems Engine: AI surfaces valuable resources you haven't visited recently.
- Developer Power Pack: Browser extension, CLI companion, VS Code extension, Raycast integration
- Enterprise: SSO, Audit logs, Private deployments, API access, Knowledge graph analytics -->

## 📋 Planned Features

| Priority | Feature                             | Description                                                                                      | Problem Solved                                                                                       | Implementation Notes                                                                               |
| -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **P0**   | ✏️ Edit Resources                   | Allow users to modify existing resource details (title, URL, category, tags, notes, icon)        | Currently users cannot update resources after creation; leads to duplicates and outdated information | Extend existing modal; add PUT endpoint; optimistic updates with TanStack Query                    |
| **P0**   | 🛠️ Auth Enhancements                | Complete authentication flow: Forgot password, better error/success handling, email verification | Sign-in/sign-up UX is incomplete; users get stuck without password reset                             | Add nodemailer; reset tokens; improve toast notifications; handle all edge cases                   |
| **P0**   | 📦 Import/Export Resources          | Import/export resources in JSON, HTML bookmarks, CSV formats                                     | Users need to backup data, migrate between accounts, or bulk-add resources                           | JSON export; Chrome/Firefox bookmark import; CSV support for spreadsheet imports                   |
| **P1**   | ⌨️ Quick Launcher (Ctrl/Cmd + K)    | Global command palette for instant access to resources, pages, and actions                       | Reduces navigation friction; power user productivity boost                                           | Fuse.js for fuzzy search; keyboard shortcuts; modal overlay; action registry                       |
| **P1**   | 🔔 Resource Monitoring              | Periodic dead link detection with status badges, auto-archiving, and notifications               | Saved resources rot over time; manual verification is tedious                                        | Cron job with node-fetch; status field on Resource model; toast/email notifications; rate-limiting |
| **P1**   | 📱 Progressive Web App (PWA)        | Offline-first app with service worker, manifest, and installable experience                      | Works in constrained environments; native-like experience                                            | Service Worker; Workbox; manifest.json; IndexedDB caching                                          |
| **P2**   | 📊 Resource Analytics & Insights    | Usage dashboard with visit heatmaps, category distribution, and activity trends                  | Users lack visibility into their resource usage patterns                                             | Chart.js; aggregate queries; last-visited tracking; popular resources                              |
| **P2**   | 📁 Collections/Folders              | Organize resources into nested folders/collections                                               | Current flat structure becomes overwhelming with many resources                                      | MongoDB nested structure; drag-and-drop; breadcrumb navigation                                     |
| **P2**   | 💾 Prompt Vault                     | Dedicated storage for AI prompts with variables, tagging, and one-click copy                     | Developers save prompts across tools; inefficient to recreate                                        | Markdown support; variable placeholders; prompt templates; favorite prompts                        |
| **P2**   | 🖼️ Screenshots/Thumbnails           | Auto-capture website previews for visual resource identification                                 | Enhanced visual recognition and engagement                                                           | ScreenshotAPI/Urlbox; background capture; fallback to favicon + color                              |
| **P3**   | ☁️ Cloud Sync                       | Real-time synchronization across devices                                                         | Access resources from any device; automatic backup                                                   | WebSocket/SSE; conflict resolution; offline queue; push notifications                              |
| **P3**   | 🤝 Resource Sharing & Collaboration | Share resources and collections with others                                                      | Team knowledge sharing; collaborative curation                                                       | Shareable links; public/private collections; team workspaces; commenting                           |
| **P3**   | 🎨 Custom Dashboard Widgets         | User-selectable dashboard widgets with drag-and-drop layout                                      | Personalized workspace; focus on what matters                                                        | Widget registry; drag-and-drop; local storage for layout; presets                                  |
| **P4**   | 🧠 AI-Powered Recommendations       | Smart "For You" feed based on usage patterns and tag co-occurrence                               | Discover relevant saved resources; reduce forgetfulness                                              | Rule-based (co-occurring tags); vector search; embeddings; semantic matching                       |
| **P4**   | 🔗 Resource-to-Project Linking      | Attach resources to projects or workspaces                                                       | Context preservation; project-specific resource organization                                         | Many-to-many relationship; project model; filter by project                                        |
| **P4**   | 📚 Learning Path Builder            | Create structured learning roadmaps from saved resources                                         | Bookmarks lack sequence; no progress tracking                                                        | Step-based structure; completion tracking; AI-generated paths; prerequisites                       |
| **P5**   | 🌐 Browser Extension                | One-click resource saving with auto-metadata from the web                                        | Friction in saving during browsing kills adoption                                                    | Manifest V3; context menu; popup; JWT auth; real-time sync                                         |
| **P5**   | 📱 Mobile App                       | Native iOS/Android applications                                                                  | Full mobile experience; offline access; share extension                                              | React Native/Flutter; offline-first; push notifications; widget support                            |
| **P5**   | 🔗 Resource Dependency Graph        | Visual graph showing relationships between resources                                             | Discover related tools; understand tech stacks                                                       | React Flow; graph visualization; AI-generated relationships                                        |
| **P5**   | 🧩 Developer Power Pack             | IDE extensions (VS Code/JetBrains), CLI companion, Raycast integration                           | Deep developer workflow integration                                                                  | Extension APIs; CLI with `r4hub save <url>`; Raycast script commands                               |

---

## 📊 Feature Priority Rationale

| Priority | Meaning       | Criteria                                                                        |
| -------- | ------------- | ------------------------------------------------------------------------------- |
| **P0**   | Critical      | Core functionality gaps; must have for user experience; blocking other features |
| **P1**   | High Impact   | Significant user value; moderate effort; strong differentiation                 |
| **P2**   | Medium Impact | Good user value; manageable effort; expected in similar tools                   |
| **P3**   | Nice to Have  | Valuable but not essential; can wait for later iterations                       |
| **P4**   | Innovative    | Unique differentiators; higher effort; AI/ML dependencies                       |
| **P5**   | Power User    | Advanced features; ecosystem integration; platform-specific                     |

---

> **Note:** Priority levels (P0-P5) indicate implementation order. P0 features are critical for a complete user experience, while P5 features represent advanced ecosystem integrations.

---

## 🎯 Phase-Based Roadmap

### Phase 1: Core Polish (Weeks 1-2)

- ✏️ Edit Resources
- 🛠️ Auth Enhancements (Forgot password, error handling)
- 📦 Import/Export Resources

### Phase 2: User Experience (Weeks 3-4)

- ⌨️ Quick Launcher
- 📊 Resource Analytics & Insights
- 📁 Collections/Folders

### Phase 3: Reliability (Weeks 5-6)

- 🔔 Resource Monitoring
- 📱 Progressive Web App (PWA)
- ☁️ Cloud Sync

### Phase 4: Advanced Features (Weeks 7-8)

- 💾 Prompt Vault
- 🖼️ Screenshots/Thumbnails
- 🤝 Resource Sharing & Collaboration

### Phase 5: AI & Innovation (Weeks 9-10)

- 🧠 AI-Powered Recommendations
- 🔗 Resource-to-Project Linking
- 📚 Learning Path Builder

### Phase 6: Ecosystem (Weeks 11-12)

- 🌐 Browser Extension
- 📱 Mobile App
- 🧩 Developer Power Pack

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
CLIENT_URL=http://localhost:3000
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
