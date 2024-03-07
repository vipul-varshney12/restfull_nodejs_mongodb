const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Routes
app.get('/', (req, res) => {
  res.send('working fine');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
});

app.get('/user/new', (req, res) => {
  res.render('new');
});

app.post('/users', async (req, res) => {
  const { username, password, city, image } = req.body;
  try {
    await User.create({ username, password, city, image });
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('show', { user });
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});

app.get('/user/:id/edit', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render('edit', { user });
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, city, image } = req.body;
  try {
    await User.findByIdAndUpdate(id, { username, password, city, image });
    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

// Start server
app.listen(4040, () => {
  console.log('Server up at port 4040');
});
