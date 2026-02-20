📊 Savara – Teacher Insights Dashboard
======================================

A full-stack analytics dashboard for visualizing teacher activities across classes and subjects with dynamic time-based insights.

🚀 Project Overview
-------------------

**Savara Teacher Insights Dashboard** is a data-driven analytics platform designed to help school administrators monitor teacher activity trends.

The dashboard provides real-time insights using filters such as **class**, **subject**, and **time range (week / month / year)**.

The system is built with a modern frontend stack and a scalable backend powered by PostgreSQL.

🧠 Key Features
---------------

### 🎯 Analytics & Insights

*   Dynamic stat cards (Lessons, Quizzes, Assessments, Active Teachers)
*   Weekly activity trends using interactive charts
*   Per-teacher analytics (deep dive support)
*   AI Pulse section for insight summaries (UI-ready)

### 🔎 Filters

*   Class (Grade 6–10)
*   Subject (based on class)
*   Time range:
    *   This Week
    *   This Month
    *   This Year

### 🎨 UI / UX

*   Sidebar navigation with icons
*   Topbar with filters & theme toggle
*   Fully responsive layout
*   Dark / Light mode using `next-themes`

🛠️ Tech Stack
--------------

### Frontend

*   Next.js (App Router)
*   TypeScript
*   Tailwind CSS
*   Recharts (data visualization)
*   lucide-react (icons)
*   next-themes (dark / light mode)

### Backend

*   Node.js (ES Modules)
*   Express.js
*   PostgreSQL (Supabase)
*   pg (Postgres client)

🗄️ Database Schema
-------------------

CREATE TABLE teacher\_activities (
  id UUID DEFAULT gen\_random\_uuid() PRIMARY KEY,
  teacher\_id TEXT NOT NULL,
  teacher\_name TEXT NOT NULL,
  activity\_type TEXT CHECK (activity\_type IN ('lesson', 'quiz', 'assessment')) NOT NULL,
  subject TEXT NOT NULL,
  class TEXT NOT NULL,
  created\_at TIMESTAMP NOT NULL,

  CONSTRAINT unique\_teacher\_activity UNIQUE (
    teacher\_id,
    activity\_type,
    subject,
    class,
    created\_at
  )
);
    

🔌 API Endpoints
----------------

### Analytics

Method

Endpoint

Description

GET

/api/analytics/overview

Summary cards & teacher table

GET

/api/analytics/weekly

Weekly trends for charts

GET

/api/analytics/teacher/:id

Per-teacher analytics

⚙️ Environment Variables
------------------------

### Frontend (.env.local)

NEXT\_PUBLIC\_API\_BASE\_URL=http://localhost:4000
    

### Backend (.env)

DATABASE\_URL=postgresql://<user>:<password>@<host>:5432/<db>
PORT=4000
    

▶️ Running the Project
----------------------

### 1️⃣ Backend

cd server
npm install
npm run dev
    

Backend runs on: **http://localhost:4000**

### 2️⃣ Frontend

cd client
npm install
npm run dev
    

Frontend runs on: **http://localhost:3000**

📸 Screenshots
--------------

Add screenshots of the dashboard here:

![Dashboard Light Mode](https://ik.imagekit.io/ay6bdp4tm/Light.png) ![Dashboard Dark Mode](https://ik.imagekit.io/ay6bdp4tm/Dark.png) ![Weekly Activity Chart](https://ik.imagekit.io/ay6bdp4tm/Light.png)

