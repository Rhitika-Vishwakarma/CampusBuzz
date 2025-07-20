# CampusBuzz: College Club & Event Management System

A modern web application designed to streamline the organization, participation, and tracking of student-led club activities and events within a college campus.

## Project Overview

**CampusBuzz** is a centralized platform that brings together all student clubs, events, and achievements. It simplifies the process of:

- Viewing upcoming and past events
- Joining events with clash detection
- Tracking volunteer hours, points, badges
- Managing student club profiles
- Discovering clubs across technical, social, and professional domains

---

## 👨‍💻 Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Frontend     | React.js + Tailwind CSS           |
| Backend      | (Future Scope: Node.js + Express) |
| Build Tool   | Vite                              |
| State Mgmt   | React Hooks / Context API         |
| Styling      | Tailwind CSS                      |
| Package Mgmt | npm                               |

---

## 🧩 Key Features

- **Dashboard**: Quick stats of club categories, participation, and top events
- **Events Page**: Smart filters, clash detection, timeline view
- **Profile Page**: Tracks your club activity, badges, points, hours
- **Event Registration**: Join/leave events with real-time feedback
- **Dark Mode**: Smooth toggle for light/dark themes
- **Search & Filters**: Filter by club category, date, skills, tags
- **Fully Responsive**: Works perfectly on all screen sizes

---

## How to Run

````bash
# 1. Clone the repository
git clone
cd campusbuzz

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# Tailwind Setup
If you're setting up for the first time:

```bash
npx tailwindcss init -p

# Ensure your tailwind.config.js includes:
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

And import Tailwind styles in index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

Future Enhancements
Role-based login for Admin, Club Heads, and Students

Event attendance QR system

Admin dashboard for event approval

Analytics for clubs and events

Integration with college email and calendars

Team Name: ScriptKiddos

**Team Members**
Rhitika Vishwakarma
Palak Upadhyay


````
