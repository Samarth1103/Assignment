const Newsletter = require('../models/Newsletter');

// Get all subscribed email addresses
exports.getSubscribedEmails = async (req, res) => {
  try {
    const emails = await Newsletter.find().sort({ subscribedAt: -1 }); // Sort by newest first
    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Subscribe a new email to the newsletter
exports.subscribeEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    let existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already subscribed' });
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();
    res.status(201).json({ msg: 'Email subscribed successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};