const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const fs = require("fs").promises;  

const app = express();
const PORT = 3000;

app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

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


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));