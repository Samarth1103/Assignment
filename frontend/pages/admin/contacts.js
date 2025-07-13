import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * ContactDetails component for the admin panel.
 * Displays a list of all contact form submissions.
 */
const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState(''); // For error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch all contact form submissions from the backend
  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contacts');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setMessage('Failed to fetch contact details.');
      setMessageType('error');
    }
  };

  return (
    <div className="admin-container">
      <Link href="/admin" className="back-link">← Back to Admin Dashboard</Link>
      <h1 className="admin-header">Contact Form Details</h1>

      {message && <div className={`admin-message ${messageType}`}>{message}</div>}

      <div className="admin-table-section">
        {contacts.length === 0 ? (
          <p className="text-center">No contact form submissions found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Mobile Number</th>
                  <th>City</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.mobileNumber}</td>
                    <td>{contact.city}</td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
