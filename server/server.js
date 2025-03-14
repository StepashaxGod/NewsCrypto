require('dotenv').config({ path: './keys/keys.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); // don't forget 
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());

app.options('*', cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  name: "cookie",
  secret: process.env.sessionKey || "secretCodeHere123",
  resave: false,
  saveUninitialized: false, // only when the req.session.user = user (log in )
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));

const users = [];


app.get("/index", (req, res) => { // made cause i can this function
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { 'email-input': email, 'password-input': password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).send(`
  <html>
    <head>
      <meta http-equiv="refresh" content="2; url=/login">
    </head>
    <body>
      Invalid username or password. Redirecting...
    </body>
  </html>
    `);
  };
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send(`
  <html>
    <head>
      <meta http-equiv="refresh" content="2; url=/login">
    </head>
    <body>
      Invalid username or password. Redirecting...
    </body>
  </html>
    `);
  }

  req.session.user = user;
  console.log('Session data after login:', req.session);
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="2; url=/index.html">
      </head>
      <body>
        Login successful. Redirecting...
      </body>
    </html>
    `);
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

app.post('/register', (req, res) => {
  const { 'email-input': email, 'password-input': password, username } = req.body;
  if (!email || !password) {
    return res.status(400).send('email and password are required.');
  }
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).send(`
<html>
  <head>
    <meta http-equiv="refresh" content="2; url=/register">
  </head>
  <body>
    User already exists...
  </body>
</html>`);
  }
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }
    users.push({ email, password: hash, username });
    console.log(users);
    res.send(`
<html>
  <head>
    <meta http-equiv="refresh" content="2; url=/login">
  </head>
  <body>
    Registration successful. Redirecting...
  </body>
</html>
    `);
  });
}); 

app.get("/user", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, nickname: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

const API_KEY = process.env.API_KEY; // my personal apiKey 
app.get("/api/posts", async (req, res) => {
  try {
    const apiUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));