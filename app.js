const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Working hours middleware
const workingHours = require('./middleware/workingHours');
app.use(workingHours({ startHour: 9, endHour: 17 }));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// 404
app.use((req, res) => {
  res.status(404).render('closed', { title: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
