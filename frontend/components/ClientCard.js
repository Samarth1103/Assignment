import Image from 'next/image';

/**
 * ClientCard component displays a single client's information.
 * It takes a 'client' object as a prop, which should contain:
 * - _id: Unique identifier (for key prop)
 * - name: Client's name
 * - description: Client's testimonial or brief
 * - designation: Client's job title/designation
 * - imageUrl: URL to the stored image
 */
const ClientCard = ({ client }) => {
  return (
    <div className="client-card">
      {/* Image component for optimized image loading */}
      <div className="client-card-image-container">
        <Image
          src={`http://localhost:5000${client.imageUrl}`} // Ensure this matches your backend's image serving path
          alt={client.name}
          width={100}
          height={100}
          objectFit="cover" // Ensures the image covers the circular area
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if fallback also fails
            e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=No+Image`; // Fallback placeholder
          }}
        />
      </div>
      <p className="client-card-description">"{client.description}"</p>
      <h3 className="client-card-name">{client.name}</h3>
      <p className="client-card-designation">{client.designation}</p>
    </div>
  );
};

export default ClientCard;
