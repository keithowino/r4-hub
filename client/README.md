# R4 Hub 🚀

R4 Hub is a personal developer resource management platform designed to help developers organize, save, search, and quickly access technical tools, websites, and learning resources in one place.

As developers continue discovering new AI tools, platforms, documentation websites, deployment services, databases, and experiments, browser tabs and pinned pages quickly become difficult to manage.

R4 Hub solves that problem by creating a centralized personal hub for storing and organizing developer resources.

Live Demo: https://r4-hub.vercel.app/

GitHub Repository: https://github.com/keithowino/r4-hub

Portfolio: https://pickaxe-and-shovel.vercel.app

---

## Preview

Add a screenshot or thumbnail here later:

![R4 Hub Preview](https://raw.githubusercontent.com/keithowino/r4-hub/refs/heads/main/client/public/Screenshot%202026-05-14%20104807.png)

---

## Features

Current features:

- Add resources
- Categorize resources
- Add tags
- Search resources
- Add notes
- Delete resources
- Copy resource URLs
- Automatic persistence with Local Storage
- Responsive interface
- Resource grouping by categories

Planned features:

- Edit resources
- Firebase synchronization
- Import/export resources
- Quick launcher (Ctrl + K)
- Resource analytics
- Collections
- Prompt vault
- Screenshots/thumbnails
- Cloud backup

---

## Tech Stack

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- React Toastify
- Lucide React

Storage:

- Local Storage
- Firebase (planned)

Deployment:

- Vercel

---

## Project Structure

```bash
src/

├── components/
│ ├── home/
│ └── modals/
│
├── pages/
│
├── lib/
│ ├── context/
│ ├── services/
│ └── firebase/
│
├── App.jsx
└── main.jsx
```

---

## Getting Started

### 1. Fork the repository

Forking creates your own copy of the project under your GitHub account.

Steps:

1. Visit:

https://github.com/keithowino/r4-hub

2. Click the Fork button at the top-right corner.

3. Select your GitHub account.

4. GitHub creates:

https://github.com/YOUR_USERNAME/r4-hub

You now own your own copy.

---

### 2. Clone the repository

Open VS Code terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/r4-hub.git
```
