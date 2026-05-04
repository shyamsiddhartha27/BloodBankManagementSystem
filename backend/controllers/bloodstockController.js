const db = require('../db');

// Get blood stock
exports.getBloodStock = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM bloodstock');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blood stock', details: err.message });
    }
};

// Update blood stock for a specific group
exports.updateBloodStock = async (req, res) => {
    const { group } = req.params;
    const { units } = req.body;
    
    // Decode the blood group, e.g., 'A%2B' becomes 'A+'
    const decodedGroup = decodeURIComponent(group);
    
    try {
        const [result] = await db.query(
            'UPDATE bloodstock SET units = ? WHERE blood_group = ?',
            [units, decodedGroup]
        );
        if (result.affectedRows === 0) {
            // Optional: insert if it doesn't exist
            await db.query(
                'INSERT INTO bloodstock (blood_group, units) VALUES (?, ?)',
                [decodedGroup, units]
            );
            return res.status(201).json({ message: 'Blood stock added successfully' });
        }
        res.json({ message: 'Blood stock updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update blood stock', details: err.message });
    }
};
