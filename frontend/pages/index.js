import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Assuming you'll use Link for navigation
import Image from 'next/image'; // For optimized images

// Import your components
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import NewsletterForm from '../components/NewsletterForm';

export default function Home({ initialProjects, initialClients }) {
  // Add console logs to see what initialProjects and initialClients are receiving
  console.log('Home component rendering. initialProjects:', initialProjects);
  console.log('Home component rendering. initialClients:', initialClients);

  // Initialize state with a fallback to an empty array to prevent 'undefined' issues
  const [projects, setProjects] = useState(initialProjects || []);
  const [clients, setClients] = useState(initialClients || []);

  // In a real app, you'd handle form submissions here and re-fetch data or update state
  const handleContactSubmit = async (formData) => {
    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        // Use a custom message box instead of alert()
        console.log('Contact form submitted successfully!');
        // You might want to show a success message on the UI
      } else {
        const errorData = await res.json();
        console.error('Failed to submit contact form:', errorData.msg || res.statusText);
        // Show error message on the UI
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Show error message on the UI
    }
  };

  const handleNewsletterSubmit = async (email) => {
    try {
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        console.log('Newsletter subscribed successfully!');
        // Show success message on the UI
      } else {
        const errorData = await res.json();
        console.error('Failed to subscribe to newsletter:', errorData.msg || res.statusText);
        // Show error message on the UI
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      // Show error message on the UI
    }
  };

  return (
    <div className="main-layout"> {/* Added a wrapper class for global styling */}
      <Head>
        <title>Fullstack Task</title>
        <link rel="icon" href="/4th year full stack Assets/Lead Generation Landing page (Images)/logo.png" />
      </Head>

      {/* --- Header (Example - integrate your actual header structure) --- */}
      <header className="header">
        <nav className="navbar container">
 <Link href="/" className="navbar-logo">
            <Image
              src="/frontend/assets/logo.png" // Path to your logo in the public directory
              alt="Your Company Logo"
              width={150} // Adjust width as needed
              height={40} // Adjust height as needed
              priority // Prioritize loading for LCP (Largest Contentful Paint)
            />
          </Link>
          {/* You might want to implement a mobile menu toggle here */}
          <ul className="navbar-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="#projects">Our Projects</Link></li>
            <li><Link href="#clients">Happy Clients</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            <li><Link href="#newsletter">Subscribe</Link></li>
          </ul>
          <button className="navbar-button">Get Quote</button>
        </nav>
      </header>

      {/* --- Hero Section (Content from PDF reference image) --- */}
      <section className="hero-section">
        <h1 className="hero-title">Consultation, Design & Marketing</h1>
        <p className="hero-subtitle">Not Your Average Realtor</p>
        <button className="hero-button">Learn More</button>
      </section>

      {/* --- Why Choose Us? Section (Placeholder content based on PDF) --- */}
      <section className="why-choose-us-section section-padding">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="reason-grid container">
          <div className="reason-item">
            <div className="icon">💡</div> {/* Placeholder for icon */}
            <h3>Innovative Solutions</h3>
            <p>We provide cutting-edge solutions tailored to your unique needs and goals.</p>
          </div>
          <div className="reason-item">
            <div className="icon">🤝</div> {/* Placeholder for icon */}
            <h3>Client-Centric Approach</h3>
            <p>Your success is our priority. We work closely with you every step of the way.</p>
          </div>
          <div className="reason-item">
            <div className="icon">🚀</div> {/* Placeholder for icon */}
            <h3>Proven Track Record</h3>
            <p>Years of experience and a portfolio of successful projects speak for themselves.</p>
          </div>
        </div>
      </section>

      <main>
        <section id="projects" className="projects-section section-padding">
          <h2 className="text-center">Our Projects</h2>
          <div className="projects-grid container">
            {/* Ensure 'projects' is an array before mapping */}
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <p>No projects found. Please add some from the admin panel.</p>
            )}
          </div>
        </section>

        <section id="clients" className="clients-section section-padding">
          <h2 className="text-center">Happy Clients</h2>
          <div className="clients-grid container">
            {/* Ensure 'clients' is an array before mapping */}
            {clients.length > 0 ? (
              clients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))
            ) : (
              <p>No clients found. Please add some from the admin panel.</p>
            )}
          </div>
        </section>

        <section id="contact" className="contact-section section-padding">
          <h2 className="text-center">Get a Free Consultation</h2>
          <ContactForm onSubmit={handleContactSubmit} />
        </section>

        <section id="newsletter" className="newsletter-section section-padding">
          <h2 className="text-center">Subscribe Us</h2>
          <NewsletterForm onSubmit={handleNewsletterSubmit} />
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="footer-content container">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
          <div className="footer-social-icons">
            {/* Placeholder for social media icons */}
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// getServerSideProps runs on the server side during each request
export async function getServerSideProps() {
  let projects = [];
  let clients = [];

  try {
    // Fetch Projects
    const projectRes = await fetch('http://localhost:5000/api/projects');
    if (!projectRes.ok) {
      console.error(`getServerSideProps: Failed to fetch projects with status ${projectRes.status}`);
      // If the response is not OK, it means there was a server error or no data
      // We can still proceed with an empty array for projects
    } else {
      projects = await projectRes.json();
    }
    console.log('Fetched Projects in getServerSideProps:', projects);

    // Fetch Clients
    const clientRes = await fetch('http://localhost:5000/api/clients');
    if (!clientRes.ok) {
      console.error(`getServerSideProps: Failed to fetch clients with status ${clientRes.status}`);
    } else {
      clients = await clientRes.json();
    }
    console.log('Fetched Clients in getServerSideProps:', clients);

  } catch (error) {
    console.error('Error in getServerSideProps during data fetching:', error);
    // If there's a network error or JSON parsing error, projects and clients will remain empty arrays
  }

  return {
    props: {
      initialProjects: projects,
      initialClients: clients,
    },
  };
}
