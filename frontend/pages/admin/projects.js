import { useState, useEffect } from 'react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('http://localhost:5000/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('projectImage', image); // 'projectImage' must match the field name in multer middleware [cite: 78, 81, 82, 83]

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        body: formData, // No Content-Type header when sending FormData
      });
      if (res.ok) {
        setName('');
        setDescription('');
        setImage(null);
        fetchProjects(); // Refresh the list
        alert('Project added successfully!');
      } else {
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div>
      <h1>Project Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Project</button>
      </form>

      <h2>Existing Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.name} - {project.description}
            {project.imageUrl && <img src={`http://localhost:5000${project.imageUrl}`} alt={project.name} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;