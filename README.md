# School Management API

A robust Node.js and Express.js backend system designed to manage school data with integrated geographical proximity sorting. This project allows users to add new schools and retrieve a list of schools ordered by their distance from a specific location using the Haversine formula.

## 🚀 Live Demo
**API Base URL:** `https://school-management-api-production-b761.up.railway.app`
**Test Proximity Endpoint:** [Click here to test ](https://school-management-api-production-b761.up.railway.app/listSchools?latitude=8.81&longitude=78.14)

---

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MySQL 8.0 (Hosted via Railway)
* **Deployment:** Railway.app
* **Documentation:** Postman

---

## 📝 Database Schema
The following SQL script was used to create the required table structure:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## 🔌 API Endpoints

### 1. Add School
Add a new school to the database.
* **Endpoint:** `/addSchool`
* **Method:** `POST`
* **Payload:**
```json
{
  "name": "St. Mary's School",
  "address": "Tuticorin Main Road",
  "latitude": 8.7942,
  "longitude": 78.1348
}
```

### 2. List Schools (Proximity Sorted)
Retrieve all schools sorted by their distance from a user-specified coordinate.
* **Endpoint:** `/listSchools`
* **Method:** `GET`
* **Parameters:** `latitude` (Float), `longitude` (Float)

---

## 🧪 Testing with Postman
A complete Postman collection is included in this repository to facilitate testing.
1. Download `New Collection.postman_collection.json`.
2. Import it into your Postman Workspace.
3. Update the `baseUrl` variable or replace the URL with the live link provided above.

---

## ⚙️ Local Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```env
   DB_HOST=metro.proxy.rlwy.net
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=railway
   DB_PORT=57649
   PORT=8080
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

### Author
**Rohith**
*Computer Science Engineering Graduate (2025)*
