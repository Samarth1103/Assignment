import { useState } from 'react';

/**
 * ContactForm component allows users to submit their contact details.
 * It takes an 'onSubmit' prop, which is a function to handle form submission.
 */
const ContactForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the form data
    onSubmit({ fullName, email, mobileNumber, city });
    // Clear form fields after submission
    setFullName('');
    setEmail('');
    setMobileNumber('');
    setCity('');
  };

  return (
    <div className="contact-form-container">
      <h2 className="text-center">Get a Free Consultation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="contact-form-input"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="contact-form-input"
            required
          />
        </div>
        <div>
          <input
            type="tel" // Use tel for phone numbers
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="contact-form-input"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Area, City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="contact-form-input"
            required
          />
        </div>
        <button type="submit" className="contact-form-button">
          Get Quick Quote
        </button>
        
      </form>
    </div>
  );
};

export default ContactForm;
