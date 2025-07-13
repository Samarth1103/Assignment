const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// @route   GET /api/newsletter
// @desc    Get all subscribed email addresses (Admin only)
// @access  Private (e.g., authentication middleware would be added here)
router.get('/', newsletterController.getSubscribedEmails);

// @route   POST /api/newsletter
// @desc    Subscribe a new email to the newsletter
// @access  Public
router.post('/', newsletterController.subscribeEmail);

module.exports = router;