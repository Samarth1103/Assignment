const Project = require('../models/Project');
const sharp = require('sharp'); // For image cropping

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  const { name, description } = req.body;
  // req.file will contain the uploaded image info from multer
  if (!req.file) {
    return res.status(400).json({ msg: 'No image uploaded' });
  }

  const imagePath = req.file.path; // Path to the original uploaded image
  const croppedImagePath = `uploads/cropped-${req.file.filename}`;

  try {
    // Image Cropping (Bonus Feature)
    await sharp(imagePath)
      .resize(450, 350, { fit: 'cover' }) // Crop to 450x350
      .toFile(croppedImagePath);

    const newProject = new Project({
      name,
      description,
      imageUrl: `/api/uploads/${path.basename(croppedImagePath)}`, // Relative URL for frontend access
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};