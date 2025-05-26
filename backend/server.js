const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const { renderWithLayout } = require('./views/render');

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Changed from 3002 to 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // In production, use a proper secret from environment variables
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/layouts')
]);

// Custom render function
app.use((req, res, next) => {
  res.renderWithLayout = (template, data = {}) => {
    return renderWithLayout(res, template, data);
  };
  next();
});

// Routes
app.get('/', (req, res) => {
  res.renderWithLayout('index', { 
    title: 'Melbourne Wine School'
  });
});

// Login page
app.get('/login', (req, res) => {
  // If already logged in, redirect to dashboard
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.renderWithLayout('login', { 
    title: 'Login - Melbourne Wine School',
    error: req.query.error
  });
});

// Login form submission
app.post('/login', (req, res) => {
  // In a real app, you would validate credentials against a database
  const { email, password } = req.body;
  
  // Simple validation (replace with real authentication)
  if (email && password) {
    // Set user session (in a real app, you'd verify credentials first)
    req.session.user = {
      id: 1,
      name: 'Wine Enthusiast',
      email: email,
      memberSince: new Date().getFullYear() - 1
    };
    return res.redirect('/dashboard');
  }
  
  // If validation fails, redirect back to login with error
  res.redirect('/login?error=Invalid credentials');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Dashboard route (protected)
app.get('/dashboard', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login?error=Please log in to view the dashboard');
  }
  
  res.renderWithLayout('dashboard', {
    title: 'My Dashboard - Melbourne Wine School',
    user: req.session.user
  });
});

app.get('/signup', (req, res) => {
  res.renderWithLayout('signup', { 
    title: 'Sign Up - Melbourne Wine School'
  });
});

app.get('/courses', (req, res) => {
  res.renderWithLayout('courses', {
    title: 'Wine Courses - Melbourne Wine School',
    courses: [
      {
        id: 1,
        title: 'Wine Fundamentals',
        description: 'Learn the basics of wine tasting, grape varieties, and food pairing in this introductory course.',
        duration: '4 weeks',
        price: 299,
        image: '/images/courses/fundamentals.jpg'
      },
      {
        id: 2,
        title: 'Wine & Food Pairing',
        description: 'Master the art of pairing wine with food to enhance your dining experience.',
        duration: '6 weeks',
        price: 399,
        image: '/images/courses/pairing.jpg'
      },
      {
        id: 3,
        title: 'Advanced Wine Studies',
        description: 'Dive deep into the world of fine wines with our advanced certification program.',
        duration: '12 weeks',
        price: 899,
        image: '/images/courses/advanced.jpg'
      }
    ]
  });
});

// API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Melbourne and Wine School API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
