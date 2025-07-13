const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing
require('dotenv').config(); // Load environment variables for JWT_SECRET

// Hardcoded admin user for demonstration purposes.
// In a real application, fetch this from a database.
const ADMIN_USERNAME = 'admin';
// Hash the password 'adminpass' for comparison
// You can generate this hash once using a script:
// bcrypt.hash('adminpass', 10).then(hash => console.log(hash));
const ADMIN_PASSWORD_HASH = '$2a$10$wT2.k.y.e.x.z.A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.0123456789'; // Replace with a real hash for 'adminpass' or your chosen password

// Ensure you have a strong secret in your .env file
// JWT_SECRET=your_super_secret_jwt_key_here
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // Fallback for local dev if .env not loaded


exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  // 1. Check if username exists
  if (username !== ADMIN_USERNAME) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }

  try {
    // 2. Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. If credentials match, create a JWT token
    const payload = {
      user: {
        id: 'admin-user-id', // A dummy ID for the admin user
        role: 'admin'
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
