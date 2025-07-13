const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// @route   GET /api/contacts
// @desc    Get all contact form submissions (Admin only)
// @access  Private (e.g., authentication middleware would be added here)
router.get('/', contactController.getContacts);

// @route   POST /api/contacts
// @desc    Submit a new contact form
// @access  Public
router.post('/', contactController.submitContactForm);

module.exports = router;