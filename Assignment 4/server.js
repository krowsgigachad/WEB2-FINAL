require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./User'); // Adjust paths as necessary
const Item = require('./Item'); // Ensure this path matches your item model location
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

// Multer configuration for file upload with original extensions
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Use the original file name and append the extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Apply the multer storage configuration to the middleware
const upload = multer({ storage: storage });
const app = express();
const PORT = 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send emails
function sendEmail(to, subject, text) {
  const mailOptions = {
      from: 'yourgmail@gmail.com',
      to: to,
      subject: subject,
      text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost/KROWS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/uploads', express.static('uploads')); // Make uploaded files accessible


// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName, age, country, gender, adminCode } = req.body;
    let role = 'regular user'; // Default role
    if (adminCode === 'secretAdminCode') {
      role = 'admin';
    }

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      country,
      gender,
      role // Set role based on adminCode
    });

    await user.save();

    sendEmail(username, 'Welcome to Our Platform', 'Hello and welcome to our platform! We are excited to have you.');

    res.redirect('/login.html'); // Redirect users to login page after registration
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('Cannot find user');
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    if (user.role === 'admin') {
      res.redirect('/admin'); // Redirect to admin dashboard
    } else {
      res.redirect('/dashboard'); // Redirect regular users to the dashboard
    }
  } else {
    res.send('Login failed');
  }
});

// Static Pages Routes
app.get('/weather', (req, res) => {
  res.sendFile(__dirname + '/public/weather.html');
});

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/financial', (req, res) => {
  res.sendFile(__dirname + '/public/financial.html');
});

app.get('/environmental', (req, res) => {
  res.sendFile(__dirname + '/public/environmental.html');
});

// Admin and Dashboard Routes
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html'); // Path to your admin dashboard HTML
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html'); // Path to your user dashboard HTML
});

// API Endpoints for Item Management

app.get('/api/item', async (req, res) => {
  try {
      const items = await Item.find(); // Find all items in the database
      res.json(items); // Send the list of items as a JSON response
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get items' });
  }
});

app.get('/api/item/:id', async (req, res) => {
  try {
      const item = await Item.findById(req.params.id);
      if (!item) {
          return res.status(404).send('Item not found');
      }
      res.json(item);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});


// POST endpoint to add a new item
app.post('/api/item', upload.array('pictures', 3), async (req, res) => {
  try {
      const names = JSON.parse(req.body.names);
      const descriptions = JSON.parse(req.body.descriptions);
      const pictures = req.files.map(file => file.path); // This will contain the paths of uploaded files

      const newItem = new Item({
          pictures,
          names,
          descriptions
      });

      await newItem.save();
      sendEmail('akhmetov.2018@mail.ru', 'New Item Added', 'A new item has been added to the website.');
      res.status(201).send(newItem);
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding the item.');
  }
});

// PUT endpoint to update an item
app.put('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Make sure that names and descriptions are parsed if they are sent as strings
    const updates = {
      ...req.body,
      names: req.body.names ? JSON.parse(req.body.names) : undefined,
      descriptions: req.body.descriptions ? JSON.parse(req.body.descriptions) : undefined
    };

    const updatedItem = await Item.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }

    res.send(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the item.');
  }
});

// DELETE endpoint to delete an item
app.delete('/api/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }

    res.send(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the item.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});