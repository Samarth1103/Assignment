import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Panel</h1>
      <nav>
        <ul className="admin-nav-list">
          <li><Link href="/admin/projects">Manage Projects</Link></li>
          <li><Link href="/admin/clients">Manage Clients</Link></li>
          <li><Link href="/admin/contacts">View Contact Form Details</Link></li>
          <li><Link href="/admin/subscriptions">View Subscribed Emails</Link></li>
        </ul>
      </nav>
      <div className="text-center">
        <Link href="/" className="back-link">← Back to Landing Page</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
