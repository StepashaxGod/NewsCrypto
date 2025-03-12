const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

const users = [
  { id: 1, email: "user@example.com", password: "123456" }
];

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

app.get("/index.html", (req, res) => {
  if (req.session.userId) {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="description" content="CryptoQuick - fresh crypto news and analytics.">
   <title>CryptoQuick</title>

   <link rel="stylesheet" href="css/reset.css">
   <link rel="stylesheet" href="css/generic-styles.css">
   <link rel="stylesheet" href="css/header.css">
   <link rel="stylesheet" href="css/main.css">
   <style>
      .login-link {
         display: none;
      }
   </style>
</head>
<body>

<!-- Header -->
   <header>
      <div class="container-header">
         <div class="container-left">
            <img src="/assets/images/solana-sol-logo.png" alt="Solana logo">
            <h1 class="header-title">QuickCrypto</h1>
            <nav>
               <a href="#">new</a>  | 
               <a href="past.html">past</a>  | 
            </nav>
            <time class="date-time"></time>
         </div>
         <div class="container-right">
            <a class="login-link" href="/login.html">login</a>
         </div>
      </div>
   </header>
   
   <!-- Adaptive news section -->
   <section class="news-container">
     <!-- Новости будут подгружаться здесь -->
   </section>
   
   <script type="module" src="/js/app.js"></script>
</body>
</html>`);
  } else {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

app.get("/login", (req, res) => {
  if (req.session.userId) {
    res.send(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Логин</title>
         <link rel="stylesheet" href="/css/login.css">
         <style>
           .form-container { display: none; }
         </style>
      </head>
      <body>
         <section class="form-container">
            <form action="/login" method="post">
               <div class="form-group">
                  <label for="email-input">Email:</label>
                  <input id="email-input" type="email" name="email-input" required>
               </div>
               <div class="form-group">
                  <label for="password-input">Пароль:</label>
                  <input id="password-input" type="password" name="password-input" required>
               </div>
               <button class="btn-submit" type="submit">Войти</button>
            </form>
         </section>
         <p>Вы уже вошли в систему. <a href="/dashboard">Перейти на Dashboard</a></p>
      </body>
      </html>
    `);
  } else {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  }
});

app.post("/login", (req, res) => {
  const email = req.body["email-input"];
  const password = req.body["password-input"];
  console.log("Получены email и пароль:", email, password);

  const user = users.find(u => u.email === email);

  if (user && user.password === password) {
    req.session.userId = user.id;
    res.redirect("/index.html");
  } else {
    res.send(`
      <p>Неверный email или пароль.</p>
      <script>
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      </script>
    `);
  }
});

app.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.send(`Добро пожаловать в Dashboard, ваш ID: ${req.session.userId}`);
  } else {
    res.redirect("/login");
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));