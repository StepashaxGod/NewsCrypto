const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

const API_KEY = 'e7fcfa7dbeba45e05c48d9e21d36328c94b23f37';
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

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


app.post("/login", (req, res) => {
  const email = req.body["email-input"];
  const password = req.body["password-input"];
  console.log("received email and password", email, password);

  
  if (email === "user@example.com" && password === "123456") {
    res.redirect("/dashboard");
  } else {
    res.send('Incorrect email or password <a href="/login">Try again</a>');
  }
});

app.get("/dashboard", (req, res) => {
  res.send("Welcome to dashboard");
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));