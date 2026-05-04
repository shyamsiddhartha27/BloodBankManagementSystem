const db = require('../db');

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM request');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch requests', details: err.message });
    }
};

// Create a request using a transaction
exports.createRequest = async (req, res) => {
    const { patient_id, blood_group, units_required } = req.body;
    
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Validate patient existence
        const [patient] = await connection.query('SELECT * FROM patient WHERE patient_id = ?', [patient_id]);
        if (patient.length === 0) {
            throw new Error('Patient not found');
        }

        // Lock the row for the blood stock to prevent concurrent modifications
        const [stock] = await connection.query(
            'SELECT * FROM bloodstock WHERE blood_group = ? FOR UPDATE',
            [blood_group]
        );

        if (stock.length === 0 || stock[0].units < units_required) {
            throw new Error('Insufficient blood stock available');
        }

        // Deduct the requested units
        await connection.query(
            'UPDATE bloodstock SET units = units - ? WHERE blood_group = ?',
            [units_required, blood_group]
        );

        // Record the request
        const [result] = await connection.query(
            "INSERT INTO request (patient_id, blood_group, units_required, status) VALUES (?, ?, ?, 'Pending')",
            [patient_id, blood_group, units_required]
        );

        await connection.commit();
        res.status(201).json({ message: 'Request created successfully', request_id: result.insertId });
    } catch (err) {
        await connection.rollback();
        res.status(400).json({ error: 'Failed to process request', details: err.message });
    } finally {
        connection.release();
    }
};

// Update request status
exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Status: 'Approved', 'Rejected', etc.
    
    try {
        const [result] = await db.query(
            'UPDATE request SET status = ? WHERE request_id = ?',
            [status, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Request not found' });
        res.json({ message: 'Request status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update request status', details: err.message });
    }
};
