import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * SubscribedEmails component for the admin panel.
 * Displays a list of all email addresses subscribed to the newsletter.
 */
const SubscribedEmails = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState(''); // For error messages

  // Basic inline styling for demonstration
  const containerStyle = {
    padding: '20px',
    maxWidth: '700px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const headerStyle = {
    backgroundColor: '#eee',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#f8d7da',
    color: '#721c24',
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Function to fetch all subscribed emails from the backend
  const fetchSubscriptions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/newsletter');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setMessage('Failed to fetch subscribed emails.');
    }
  };

  return (
    <div style={containerStyle}>
      <Link href="/admin">← Back to Admin Dashboard</Link>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Subscribed Email Addresses</h1>

      {message && <div style={messageStyle}>{message}</div>}

      {subscriptions.length === 0 ? (
        <p>No email subscriptions found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}> {/* Makes table scrollable on small screens */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thTdStyle, ...headerStyle }}>Email Address</th>
                <th style={{ ...thTdStyle, ...headerStyle }}>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub._id}>
                  <td style={thTdStyle}>{sub.email}</td>
                  <td style={thTdStyle}>{new Date(sub.subscribedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscribedEmails;
