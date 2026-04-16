const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Database Connection [cite: 100]
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});
// Geographical Distance Calculation (Haversine Formula) [cite: 7, 13]
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// API: Add School [cite: 3, 4]
app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Strict Validation [cite: 5]
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: "All fields are required and must be of correct data types." });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.execute(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
    });
});

// API: List Schools sorted by Proximity [cite: 5, 6, 7]
app.get('/listSchools', (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    // Ensure parameters are provided [cite: 112]
    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: "User latitude and longitude are required as numeric parameters." });
    }

    db.query('SELECT * FROM schools', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Calculate distances and sort [cite: 7, 20]
        const sortedSchools = results.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // [cite: 59, 74]
