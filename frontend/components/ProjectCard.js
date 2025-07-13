import Image from 'next/image';

/**
 * ProjectCard component displays a single project's information.
 * It takes a 'project' object as a prop, which should contain:
 * - _id: Unique identifier (for key prop)
 * - name: Project's name
 * - description: Project's description
 * - imageUrl: URL to the stored image
 */
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {/* Use Image component for optimization */}
      <Image
        src={`http://localhost:5000${project.imageUrl}`} // Ensure this matches your backend's image serving path
        alt={project.name}
        width={450} // Width after cropping (as per requirement example)
        height={350} // Height after cropping (as per requirement example)
        className="project-card-image" // Apply image class
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if fallback also fails
          e.target.src = `https://placehold.co/450x350/CCCCCC/000000?text=No+Image`; // Fallback placeholder
        }}
      />
      <div className="project-card-content">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <button className="project-card-button" disabled>Read More</button> {/* Dummy button */}
      </div>
    </div>
  );
};

export default ProjectCard;
