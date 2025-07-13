const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/upload'); // Import multer middleware

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public (for landing page)
router.get('/', projectController.getProjects);

// @route   POST /api/projects
// @desc    Add a new project (Admin only)
// @access  Private (e.g., authentication middleware would be added here)
router.post('/', upload.single('projectImage'), projectController.addProject); // 'projectImage' is the field name for the file input

module.exports = router;