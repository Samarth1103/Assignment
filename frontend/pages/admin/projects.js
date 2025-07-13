import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Make sure Image is imported here

/**
 * ProjectManagement component for the admin panel.
 * Allows adding new projects and viewing a list of existing projects.
 */
const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(''); // For success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Basic inline styling for demonstration (already in global.css, but kept for context)
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1em',
  };

  const buttonStyle = {
    gridColumn: '1 / -1', // Span across both columns
    padding: '12px 20px',
    backgroundColor: '#4CAF50', // Green for Add
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'x-auth-token': localStorage.getItem('adminToken'), // Send token for protected route
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMessage('Failed to fetch projects.');
      setMessageType('error');
    }
  };

  // Function to handle adding a new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('projectImage', image); // 'projectImage' must match the field name in multer middleware
    } else {
      setMessage('Please upload a project image.');
      setMessageType('error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('adminToken'), // Send token for protected route
        },
        body: formData, // No Content-Type header when sending FormData; browser sets it automatically
      });

      if (res.ok) {
        setMessage('Project added successfully!');
        setMessageType('success');
        setName('');
        setDescription('');
        setImage(null);
        // Clear file input visually
        document.getElementById('projectImageInput').value = '';
        fetchProjects(); // Refresh the list of projects
      } else {
        const errorData = await res.json();
        setMessage(`Failed to add project: ${errorData.msg || res.statusText}`);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      setMessage('An error occurred while adding the project.');
      setMessageType('error');
    }
  };

  return (
    <div className="admin-container">
      <Link href="/admin" className="back-link">← Back to Admin Dashboard</Link>
      <h1 className="admin-header">Project Management</h1>

      {message && (
        <div className={`admin-message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="admin-form-section">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}> {/* Description spans full width */}
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              id="projectDescription"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}> {/* Image input spans full width */}
            <label htmlFor="projectImageInput">Project Image:</label>
            <input
              type="file"
              id="projectImageInput"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="admin-form-input"
              required
            />
          </div>
          <button type="submit" className="admin-form-button">Add Project</button>
        </form>
      </div>

      <div className="admin-table-section">
        <h2>Existing Projects</h2>
        {projects.length === 0 ? (
          <p className="text-center">No projects found.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      {project.imageUrl && (
                        <Image // Changed from <img> to <Image />
                          src={`http://localhost:5000${project.imageUrl}`}
                          alt={project.name}
                          width={50} // Required width
                          height={50} // Required height
                          objectFit="cover" // How the image should fit
                          className="admin-table-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/50x50/CCCCCC/000000?text=N/A`;
                          }}
                        />
                      )}
                    </td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
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

export default ProjectManagement;
