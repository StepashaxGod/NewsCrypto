const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'key-code',
  resave: false,
  saveUninitialized: false,
}));

const users = [];

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.post("/login", (req, res) => {
  const { 'email-input': email, 'password-input': password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send(`Invalid username or password. <script>
    setTimeout(function() {window.location.href = "/login";}, 2000)</script>`);
  }
  req.session.user = user;
  console.log('Session data after login:', req.session);
  res.send(`Login successful.
    <script>
    setTimeout(function() {window.location.href = "index.html";}, 2000)</script>`);
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

app.post("/register", (req, res) => {
  const { 'email-input': email, 'password-input': password, username} = req.body;
  if (!email || !password) {
    return res.status(400).send("email and password are required.");
  }
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).send("User already exists.");
  }
  users.push({ email, password, username }); 
  console.log(users);
  res.send(`registration successful <script>
    setTimeout(function() {window.location.href = "/login";}, 2000)</script>
    `);
});

app.get("/user", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, nickname: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

const API_KEY = 'e7fcfa7dbeba45e05c48d9e21d36328c94b23f37'; // my personal apiKey 
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