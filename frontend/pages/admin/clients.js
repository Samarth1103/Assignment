import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * ClientManagement component for the admin panel.
 * Allows adding new clients and viewing a list of existing clients.
 */
const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(''); // For success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    fetchClients();
  }, []);

  // Function to fetch all clients from the backend
  const fetchClients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/clients');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setMessage('Failed to fetch clients.');
      setMessageType('error');
    }
  };

  // Function to handle adding a new client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('designation', designation);
    if (image) {
      formData.append('clientImage', image); // 'clientImage' must match the field name in multer middleware
    } else {
      setMessage('Please upload a client image.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        body: formData, // No Content-Type header when sending FormData; browser sets it automatically
      });

      if (res.ok) {
        setMessage('Client added successfully!');
        setMessageType('success');
        setName('');
        setDescription('');
        setDesignation('');
        setImage(null);
        // Clear file input visually
        document.getElementById('clientImageInput').value = '';
        fetchClients(); // Refresh the list of clients
      } else {
        const errorData = await res.json();
        setMessage(`Failed to add client: ${errorData.msg || res.statusText}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      setMessage('An error occurred while adding the client.');
      setMessageType('error');
    }
  };

  return (
    <div className="admin-container">
      <Link href="/admin" className="back-link">← Back to Admin Dashboard</Link>
      <h1 className="admin-header">Client Management</h1>

      {message && (
        <div className={`admin-message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="admin-form-section">
        <h2>Add New Client</h2>
        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div>
            <label htmlFor="clientName">Client Name:</label>
            <input
              type="text"
              id="clientName"
              placeholder="Client Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="clientDesignation">Designation:</label>
            <input
              type="text"
              id="clientDesignation"
              placeholder="Client Designation (e.g., CEO, Designer)"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}> {/* Description spans full width */}
            <label htmlFor="clientDescription">Description:</label>
            <textarea
              id="clientDescription"
              placeholder="Client Testimonial or Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}> {/* Image input spans full width */}
            <label htmlFor="clientImageInput">Client Image:</label>
            <input
              type="file"
              id="clientImageInput"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="admin-form-input"
              required
            />
          </div>
          <button type="submit" className="admin-form-button">Add Client</button>
        </form>
      </div>

      <div className="admin-table-section">
        <h2>Existing Clients</h2>
        {clients.length === 0 ? (
          <p className="text-center">No clients found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>
                      {client.imageUrl && (
                        <Image
                          src={`http://localhost:5000${client.imageUrl}`}
                          alt={client.name}
                          width={50}
                          height={50}
                          objectFit="cover"
                          className="admin-table-img" // Add a class for images within tables
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/50x50/CCCCCC/000000?text=N/A`;
                          }}
                        />
                      )}
                    </td>
                    <td>{client.name}</td>
                    <td>{client.designation}</td>
                    <td>{client.description}</td>
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

export default ClientManagement;
