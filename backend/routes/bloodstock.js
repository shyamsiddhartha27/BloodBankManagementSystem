const express = require('express');
const router = express.Router();
const bloodstockController = require('../controllers/bloodstockController');

router.get('/', bloodstockController.getBloodStock);
// Use encodeURIComponent when calling this from frontend, e.g., /api/bloodstock/A%2B
router.put('/:group', bloodstockController.updateBloodStock);

module.exports = router;
