## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud

### 1. Backend Setup

1. Install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. (Optional) Set MongoDB URI in environment:

   ```sh
   export MONGO_URI="your_mongodb_connection_string"
   ```

   By default, connects to `mongodb://127.0.0.1:27017/dogProfiles`.

3. Start the backend server:

   ```sh
   npm start
   ```

   The backend runs on [http://localhost:5000](http://localhost:5000).

---

### 2. Frontend Setup

1. Install dependencies:

   ```sh
   cd frontend/dog-profile
   npm install
   ```

2. Configure backend URL in `.env` (default is `http://localhost:5000`):

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

3. Start the frontend dev server:

   ```sh
   npm run dev
   ```

   The frontend runs at [http://localhost:5173](http://localhost:5173) by default.

---

Now you can open the frontend in your browser, fill out the form to create a user profile, and see the list of users below the form, each with a random dog image.