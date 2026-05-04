const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
    try {
        // Connect to MySQL server without selecting a database first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('Connected to MySQL server.');

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'bloodbank'}\``);
        console.log(`Database '${process.env.DB_NAME || 'bloodbank'}' created or already exists.`);

        // Switch to the database
        await connection.query(`USE \`${process.env.DB_NAME || 'bloodbank'}\``);

        // Create Tables
        const createDonorTable = `
            CREATE TABLE IF NOT EXISTS donor (
                donor_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                blood_group VARCHAR(10) NOT NULL,
                phone VARCHAR(20) NOT NULL
            )
        `;

        const createPatientTable = `
            CREATE TABLE IF NOT EXISTS patient (
                patient_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                blood_group VARCHAR(10) NOT NULL,
                units_required INT NOT NULL
            )
        `;

        const createBloodStockTable = `
            CREATE TABLE IF NOT EXISTS bloodstock (
                blood_group VARCHAR(10) PRIMARY KEY,
                units INT NOT NULL DEFAULT 0
            )
        `;

        const createRequestTable = `
            CREATE TABLE IF NOT EXISTS request (
                request_id INT AUTO_INCREMENT PRIMARY KEY,
                patient_id INT NOT NULL,
                blood_group VARCHAR(10) NOT NULL,
                units_required INT NOT NULL,
                status VARCHAR(50) DEFAULT 'Pending',
                FOREIGN KEY (patient_id) REFERENCES patient(patient_id) ON DELETE CASCADE
            )
        `;

        console.log('Creating tables...');
        await connection.query(createDonorTable);
        await connection.query(createPatientTable);
        await connection.query(createBloodStockTable);
        await connection.query(createRequestTable);
        
        console.log('All tables created successfully!');
        
        // Initialize blood stock with 0 units for common blood groups if empty
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM bloodstock');
        if (rows[0].count === 0) {
            const defaultGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
            for (const group of defaultGroups) {
                await connection.query('INSERT INTO bloodstock (blood_group, units) VALUES (?, 0)', [group]);
            }
            console.log('Initialized bloodstock with default blood groups.');
        }

        await connection.end();
        console.log('Database initialization complete.');

    } catch (error) {
        console.error('Error initializing database:', error.message);
        console.log('\nPlease make sure your MySQL server is running and your .env credentials are correct.');
    }
}

initializeDatabase();
