const Client = require('../models/Client');
const sharp = require('sharp'); // For image cropping
const path = require('path'); // To handle file paths

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new client
exports.addClient = async (req, res) => {
  const { name, description, designation } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: 'No image uploaded' });
  }

  const imagePath = req.file.path; // Path to the original uploaded image
  const croppedImagePath = `uploads/cropped-${req.file.filename}`;

  try {
    // Image Cropping (Bonus Feature) - Assuming 450x350 for consistency
    await sharp(imagePath)
      .resize(450, 350, { fit: 'cover' })
      .toFile(croppedImagePath);

    const newClient = new Client({
      name,
      description,
      designation,
      imageUrl: `/api/uploads/${path.basename(croppedImagePath)}`, // Relative URL for frontend access
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};