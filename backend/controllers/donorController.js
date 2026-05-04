const db = require('../db');

// Get all donors
exports.getAllDonors = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM donor');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch donors', details: err.message });
    }
};

// Create a new donor
exports.createDonor = async (req, res) => {
    const { name, age, blood_group, phone } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO donor (name, age, blood_group, phone) VALUES (?, ?, ?, ?)',
            [name, age, blood_group, phone]
        );
        res.status(201).json({ message: 'Donor created successfully', donor_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create donor', details: err.message });
    }
};

// Update a donor
exports.updateDonor = async (req, res) => {
    const { id } = req.params;
    const { name, age, blood_group, phone } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE donor SET name = ?, age = ?, blood_group = ?, phone = ? WHERE donor_id = ?',
            [name, age, blood_group, phone, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Donor not found' });
        res.json({ message: 'Donor updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update donor', details: err.message });
    }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM donor WHERE donor_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Donor not found' });
        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete donor', details: err.message });
    }
};
