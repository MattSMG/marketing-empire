const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors({
  origin: 'https://mattsmg.github.io',
  credentials: true
}));
app.use(express.json());

const JWT_SECRET = 'imperium-secret-key-2026'; // Zmień na coś bezpieczniejszego w produkcji
const PORT = process.env.PORT || 3000;

// In-memory users (póki nie ma bazy)
const users = [
  {
    id: 1,
    email: 'demo@imperium.pl',
    password: 'demo123', // W produkcji hashuj bcrypt
    name: 'Demo User'
  },
  {
    id: 2,
    email: 'test@imperium.pl',
    password: 'test123',
    name: 'Test User'
  }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ 
      error: 'Nieprawidłowy email lub hasło' 
    });
  }

  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { email, password, name } = req.body;

  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ 
      error: 'Ten email jest już zarejestrowany' 
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password, // W produkcji hashuj bcrypt
    name
  };

  users.push(newUser);

  const token = jwt.sign(
    { 
      id: newUser.id, 
      email: newUser.email,
      name: newUser.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  });
});

// Verify token endpoint
app.get('/api/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Użytkownik nie znaleziony' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
