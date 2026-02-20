<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Savara – Teacher Insights Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      padding: 24px;
      max-width: 900px;
      margin: auto;
      background: #ffffff;
    }
    h1, h2, h3 {
      color: #111827;
    }
    h1 {
      margin-bottom: 0.5rem;
    }
    h2 {
      margin-top: 2rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 4px;
    }
    ul {
      padding-left: 20px;
    }
    code, pre {
      background: #f3f4f6;
      padding: 8px;
      border-radius: 6px;
      display: block;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
    }
    table th, table td {
      border: 1px solid #e5e7eb;
      padding: 8px;
      text-align: left;
    }
    table th {
      background: #f9fafb;
    }
    .section {
      margin-bottom: 24px;
    }
    .screenshots img {
      width: 100%;
      max-width: 800px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 16px;
    }
  </style>
</head>

<body>

  <h1>📊 Savara – Teacher Insights Dashboard</h1>
  <p>
    A full-stack analytics dashboard for visualizing teacher activities across
    classes and subjects with dynamic time-based insights.
  </p>

  <div class="section">
    <h2>🚀 Project Overview</h2>
    <p>
      <strong>Savara Teacher Insights Dashboard</strong> is a data-driven analytics
      platform designed to help school administrators monitor teacher activity trends.
    </p>
    <p>
      The dashboard provides real-time insights using filters such as
      <strong>class</strong>, <strong>subject</strong>, and
      <strong>time range (week / month / year)</strong>.
    </p>
    <p>
      The system is built with a modern frontend stack and a scalable backend powered by PostgreSQL.
    </p>
  </div>

  <div class="section">
    <h2>🧠 Key Features</h2>

    <h3>🎯 Analytics & Insights</h3>
    <ul>
      <li>Dynamic stat cards (Lessons, Quizzes, Assessments, Active Teachers)</li>
      <li>Weekly activity trends using interactive charts</li>
      <li>Per-teacher analytics (deep dive support)</li>
      <li>AI Pulse section for insight summaries (UI-ready)</li>
    </ul>

    <h3>🔎 Filters</h3>
    <ul>
      <li>Class (Grade 6–10)</li>
      <li>Subject (based on class)</li>
      <li>Time range:
        <ul>
          <li>This Week</li>
          <li>This Month</li>
          <li>This Year</li>
        </ul>
      </li>
    </ul>

    <h3>🎨 UI / UX</h3>
    <ul>
      <li>Sidebar navigation with icons</li>
      <li>Topbar with filters & theme toggle</li>
      <li>Fully responsive layout</li>
      <li>Dark / Light mode using <code>next-themes</code></li>
    </ul>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>

    <h3>Frontend</h3>
    <ul>
      <li>Next.js (App Router)</li>
      <li>TypeScript</li>
      <li>Tailwind CSS</li>
      <li>Recharts (data visualization)</li>
      <li>lucide-react (icons)</li>
      <li>next-themes (dark / light mode)</li>
    </ul>

    <h3>Backend</h3>
    <ul>
      <li>Node.js (ES Modules)</li>
      <li>Express.js</li>
      <li>PostgreSQL (Supabase)</li>
      <li>pg (Postgres client)</li>
    </ul>
  </div>

  <div class="section">
    <h2>🗄️ Database Schema</h2>
    <pre>
CREATE TABLE teacher_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  activity_type TEXT CHECK (activity_type IN ('lesson', 'quiz', 'assessment')) NOT NULL,
  subject TEXT NOT NULL,
  class TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,

  CONSTRAINT unique_teacher_activity UNIQUE (
    teacher_id,
    activity_type,
    subject,
    class,
    created_at
  )
);
    </pre>
  </div>

  <div class="section">
    <h2>🔌 API Endpoints</h2>

    <h3>Analytics</h3>
    <table>
      <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>GET</td>
        <td>/api/analytics/overview</td>
        <td>Summary cards & teacher table</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/api/analytics/weekly</td>
        <td>Weekly trends for charts</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/api/analytics/teacher/:id</td>
        <td>Per-teacher analytics</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>⚙️ Environment Variables</h2>

    <h3>Frontend (.env.local)</h3>
    <pre>
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
    </pre>

    <h3>Backend (.env)</h3>
    <pre>
DATABASE_URL=postgresql://&lt;user&gt;:&lt;password&gt;@&lt;host&gt;:5432/&lt;db&gt;
PORT=4000
    </pre>
  </div>

  <div class="section">
    <h2>▶️ Running the Project</h2>

    <h3>1️⃣ Backend</h3>
    <pre>
cd server
npm install
npm run dev
    </pre>
    <p>Backend runs on: <strong>http://localhost:4000</strong></p>

    <h3>2️⃣ Frontend</h3>
    <pre>
cd client
npm install
npm run dev
    </pre>
    <p>Frontend runs on: <strong>http://localhost:3000</strong></p>
  </div>

  <div class="section screenshots">
    <h2>📸 Screenshots</h2>
    <p>Add screenshots of the dashboard here:</p>

    <!-- Replace src with your actual screenshot paths -->
    <img src="https://ik.imagekit.io/ay6bdp4tm/Light.png" alt="Dashboard Light Mode" />
    <img src="https://ik.imagekit.io/ay6bdp4tm/Dark.png" alt="Dashboard Dark Mode" />
    <img src="https://ik.imagekit.io/ay6bdp4tm/Light.png" alt="Weekly Activity Chart" />
  </div>

</body>
</html>
