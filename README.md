# 🌟 Welcome to the Arvyax Wellness Platform

Welcome to Arvyax Wellness Platform, a mobile-responsive web application designed to help users create, manage, and explore wellness sessions. Whether you're a wellness coach, enthusiast, or learner, this platform allows you to engage with self-development sessions in a modern and intuitive way.

## 💡 How This Website is Useful

### 🧑‍💼 User Registration & Login
- Secure login and registration system for users.
- New users can sign up with their details.
- Existing users can log in to access session management features.

### 👀 Explore Published Sessions
- All users (even without logging in) can view publicly published sessions created by other users.
- These sessions include details like:
    - Title
    - Tags
    - Session Content URL (JSON)

### ✍️ Create & Manage Your Own Sessions
- After logging in, users can:
  - **➕ Create a Session**
    
    - Users can create their own session by filling in:
      - Title  
      - Tags  
      - JSON File URL (a link to the session content)  
    - Sessions are saved and managed by each individual user.
  - **✏️ Edit Existing Sessions**
    
    - Users can modify:
      - Title  
      - Tags  
      - JSON URL  
    - They can update and re-publish sessions anytime.
  
### 📝Save as Draft or Publish
- Sessions can be saved as drafts (unpublished and only visible to the session creator).
- Users can publish the session whenever they are ready.
- Publishing makes it visible to all other users in the community.

### 💾 Auto-Save as Draft
- If a user is inactive or navigating away during session creation or editing, the platform automatically saves the session as a draft to prevent data loss.

### 📱 Fully Mobile Responsive
- The entire platform is designed to work seamlessly on all devices—mobile, tablet, and desktop.
- Ensures users can create or browse sessions anytime, anywhere.

## 📁 Repo Structure

This project repository is organized as follows:
```
repo-root/
│
├── frontend/                # Frontend React application
│   ├── node_modules/        # Frontend dependencies
│   ├── public/              # Public assets
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components (e.g., Navbar, Footer, etc.)
│   │   ├── pages/           # Page-level components (e.g., Login, Home, etc.)
│   │   └── assets/          # Static assets (images, fonts, etc.)
│   └── package.json         # Frontend dependencies and scripts
│
├── backend/                 # Backend Node.js + Express server
│   ├── node_modules/        # Backend dependencies
│   ├── server.js            # Main server entry point
│   ├── .env                 # backend environment variables
│   ├── routes/              # Route definitions
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose models
│   ├── middleware/          # Middlewares for auth and sessions
│   └── config/              # Configuration files (e.g., DB connection)
│   └── package.json         # backend dependencies and scripts
│
├── .env.example             # Example environment variables file
└── README.md                # Project documentation
```
## Folders setup

### 🚀 Frontend Setup

Follow the steps below to set up the React frontend using **Vite**:

---

#### 🛠 1. Create a new React project with Vite (latest)

```bash
npm create vite@latest frontend -- --template react
```

Then move into the project directory:

```bash
cd frontend
```

---

#### 📦 2. Install required dependencies

```bash
npm install
```

Install tailwindcss and @tailwindcss/vite via npm.

```bash
npm install tailwindcss @tailwindcss/vite
```

Additionally, install the following commonly used libraries:

```bash
npm install axios react-router-dom react-icons
```

---

#### 🧩 3. Configure the Vite plugin

Add the @tailwindcss/vite plugin to your Vite configuration.

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

---




#### ⚙️ 4. Import Tailwind CSS

Add an @import to your CSS file that imports Tailwind CSS.

```js
@import "tailwindcss";
```

---

✅ 5 **Frontend setup is complete!** You can now start the frontend server using:

```bash
npm run dev
```
### 🧩 Backend Setup (Node.js + Express + MongoDB)

---

#### 1️⃣ Initialize Node.js project and install dependencies

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv bcrypt jsonwebtoken cors
npm install --save-dev nodemon
```

---

#### 2️⃣ Modify package.json scripts

Open package.json and update the scripts:

'''
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
'''

---

#### 3️⃣ Create file structure

```
mkdir config controllers models routes
touch server.js .env
touch config/db.js
```
---

#### 4️⃣ Setup .env file

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret_key
```
---

#### 5️⃣ Start the backend server

```
npm run dev
```

You're now ready to build your backend APIs! 🚀
---

## 🌐 API & Route Documentation

**Base URL:**  
`http://localhost:5000`

---
### 1. `POST /api/auth/register`

#### ✅ Description:
Registers a new user.

#### 📥 Request Body:
```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

#### ⚙️ Functionality:
- Checks if the email already exists in the database.
- Hashes the password using bcryptjs.
- Stores the user's name, email, and hashed password in MongoDB.

---

### 1. `POST /api/auth/login`

#### ✅ Description:
Logs in a registered user.

#### 📥 Request Body:
```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

#### ⚙️ Functionality:
- Verifies if the email exists.
- Compares the provided password with the hashed password using bcryptjs.
- If successful, generates a JWT token.
- Sends the token back to the frontend for authenticated sessions.

---

### 1. `GET  /api/login`

#### ✅ Description:
Fetches **all published (public)** sessions created by **all users**.

#### ⚙️ Functionality:
- Retrieves all session documents from the database that are marked as `published: true` (or `isPublic: true`, depending on your schema).
- These sessions are visible to everyone, regardless of user login status.

---

### 2. `GET /my-sessions`

#### ✅ Description:
Fetches **all sessions** (both **published** and **draft**) created by the **currently logged-in user**.

#### 🔒 Access:
- **Private** (Requires valid JWT token)

#### 🧪 Middleware:
- `verifyToken`: Ensures the user is authenticated by validating the JWT sent in the `Authorization` header.

#### ⚙️ Functionality:
- Decodes the JWT to identify the logged-in user.
- Queries the database for all sessions created by that user.
- Returns sessions regardless of whether they are published or not.

---

### 3. `GET /my-sessions/:id`

#### ✅ Description:
Fetch a **single session** (either published or draft) by its `id` — **only if it belongs to the currently logged-in user**.

#### 🔒 Access:
- **Private** (Requires valid JWT token)

#### 🧪 Middleware:
- `verifyToken`: Validates the JWT to identify the current user.

#### 🧩 Parameters:
- `:id` – ID of the session to retrieve.

#### ⚙️ Functionality:
- Checks the session in the database by ID.
- Verifies that the session belongs to the currently logged-in user.
- Returns the session data if found and owned by the user.

---


### 4. `POST /my-sessions/save-draft`

#### ✅ Description:
Allows the **logged-in user** to save a session as a **draft**.  
- If the session already exists, it **updates** the existing session.
- If the session does not exist, it **creates** a new draft session.

#### 🔒 Access:
- **Private** (Requires valid JWT token)

#### 🧪 Middleware:
- `verifyToken`: Ensures the user is authenticated.

#### ⚙️ Functionality:
- If sessionId is provided and valid:
  - Finds the session and updates the title, tags, and json_file_url.
  - Sets status to draft.
- If no sessionId is provided:
  - Creates a new session with the provided details.
  - Sets status to draft.
- Associates the session with the logged-in user via createdBy

---

### 5. `POST /my-sessions/publish`

#### ✅ Description:
Allows the **logged-in user** to **publish** a session.  
- If `sessionId` is provided and exists, the session is **updated** and marked as `published: true`.
- If `sessionId` is not provided, a **new published session** is created.

#### 🔒 Access:
- **Private** (Requires valid JWT token)

#### 🧪 Middleware:
- `verifyToken`: Verifies that the user is authenticated.

####  ⚙️ Functionality:
- If sessionId exists:
  - Finds the session belonging to the current user.
  - Updates title, tags, and json_file_url.
  - Sets status to published.
- If sessionId does not exist:
  - Creates a new session with the provided data.
  - Automatically sets status to published.
-  Associates the session with the logged-in user (createdBy).

---

## 🌐 Live Demo

You can explore the deployed version of this API and frontend by visiting the live demo below:

🔗 **Live App**: [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app)

