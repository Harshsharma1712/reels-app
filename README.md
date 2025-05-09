# 🎬 Reels App

A full-stack **Reels App** built with **Next.js** to demonstrate seamless handling and streaming of video data using **ImageKit**, along with **MongoDB** for database storage and **NextAuth.js** for secure authentication.

## 🔥 Features

- 📹 Upload and play short-form video reels
- ☁️ Efficient video storage & delivery via **ImageKit**
- 🔐 Authentication with **NextAuth.js**
- 📦 Backend powered by **MongoDB** and Mongoose
- 🧑‍💼 User profiles and protected routes
- ⚡ Optimized performance with server-side rendering (SSR)

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: API Routes with Next.js
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **Video Storage**: ImageKit
- **Styling**: Tailwind CSS (or your choice)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/reels-app.git
cd reels-app
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables
```bash
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_next_auth_secret
NEXT_PUBLIC_URL_ENDPOINT=your_next_public_url_endpoint
NEXT_PUBLIC_PUBLIC_KEY=your_next_public_key
IMAGEKIT_PRIVATE_KEY=your_image_kit_private_key
```

### 4. Run the app
```bash
npm run dev
```

## 🧠 Learnings
- Handling large video files with CDNs like ImageKit

- Integrating social login using NextAuth.js

- Managing user sessions securely in SSR apps

- Structuring a full-stack video-sharing platform