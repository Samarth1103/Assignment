const Contact = require('../models/Contact');

// Get all contact form submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Submit a new contact form
exports.submitContactForm = async (req, res) => {
  const { fullName, email, mobileNumber, city } = req.body;

  try {
    const newContact = new Contact({
      fullName,
      email,
      mobileNumber,
      city,
    });

    await newContact.save();
    res.status(201).json({ msg: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

