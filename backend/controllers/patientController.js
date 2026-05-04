const db = require('../db');

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM patient');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch patients', details: err.message });
    }
};

// Create a new patient
exports.createPatient = async (req, res) => {
    const { name, blood_group, units_required } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO patient (name, blood_group, units_required) VALUES (?, ?, ?)',
            [name, blood_group, units_required]
        );
        res.status(201).json({ message: 'Patient created successfully', patient_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create patient', details: err.message });
    }
};

// Update a patient
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, blood_group, units_required } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE patient SET name = ?, blood_group = ?, units_required = ? WHERE patient_id = ?',
            [name, blood_group, units_required, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Patient not found' });
        res.json({ message: 'Patient updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update patient', details: err.message });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM patient WHERE patient_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Patient not found' });
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete patient', details: err.message });
    }
};
