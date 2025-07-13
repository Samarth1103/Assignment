import { useState } from 'react';

/**
 * NewsletterForm component allows users to subscribe with their email address.
 * It takes an 'onSubmit' prop, which is a function to handle email submission.
 */
const NewsletterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email); // Pass the email to the onSubmit prop
    setEmail(''); // Clear the input field
  };

  return (
    <div className="newsletter-form-container">
      <h2 className="text-center">Subscribe Us</h2>
      <p>
        Enter your email address to get the latest updates.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="newsletter-form-input"
          required
        />
        <button type="submit" className="newsletter-form-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
