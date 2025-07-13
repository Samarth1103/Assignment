const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('../middleware/upload'); // Import multer middleware

// @route   GET /api/clients
// @desc    Get all clients
// @access  Public (for landing page)
router.get('/', clientController.getClients);

// @route   POST /api/clients
// @desc    Add a new client (Admin only)
// @access  Private (e.g., authentication middleware would be added here)
// 'clientImage' is the field name for the file input in the frontend form
router.post('/', upload.single('clientImage'), clientController.addClient);

module.exports = router;