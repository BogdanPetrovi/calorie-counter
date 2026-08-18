# 🍎 Calorie Counter

**Calorie Counter** is a full-stack web application for tracking daily meals and managing calorie intake with personalized, metric-based budgeting.

Rather than just logging food, the app calculates a tailored daily calorie budget based on the user's own metrics, then breaks down intake per meal so users can see exactly where their calories are going and plan future meals accordingly.

## 🚀 Key Features

- Meal Logging: Quickly log daily meals and track calorie intake
- Personalized Calorie Budgeting: Automatic daily calorie budget calculation based on user metrics
- Per-Meal Breakdown: Average calorie intake calculated per meal for better planning
- Entry History: Review past logged entries over time

## 🛠 Tech stack

### Frontend

- Framework: React
- Styling: Tailwind CSS
- State Management: Tanstack Query

### Backend

- Runtime: Node.js (Express.js)
- Database: PostgreSQL (Raw SQL)

## ⚙️ Setup & Installation

### 1. Database Initialization

Ensure PostgreSQL is running.

```
psql -U your_username -f server/src/db/databaseSchema.sql
```

### 2. Backend Setup

Navigate to the server folder and create a `.env` file with the following variables:

```
PORT=5000
ORIGIN=http://localhost:5173
PGUSER=your_user
PGHOST=localhost
PGPASSWORD=your_password
PGDATABASE=calorie_counter
PGPORT=5432
JWT_SECRET=your_secret
```

Run the server:

```
cd server
npm install
npm run dev
```

### 3. Frontend Setup

Navigate to the client folder and create a `.env` file:

```
VITE_DEMO=true/false
```

Run the frontend:

```
cd client
npm install
npm run dev
```

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
