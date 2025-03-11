const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());


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


app.listen(PORT, () => console.log("server port: http://localhost:3000"));
