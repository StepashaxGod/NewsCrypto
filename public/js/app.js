async function fetchNews() {
  // had to comment it out to make everything clear
  try {
    const cacheValidity = 50000; // the time before user sends a new request to an api server (consider updating this value if needed)
    const cachedNews = localStorage.getItem("cachedNews");
    const newsTimeStamp = localStorage.getItem("newsTimeStamp"); // retrieving news with dates from local storage
    if (
      cachedNews &&
      newsTimeStamp &&
      Date.now() - newsTimeStamp < cacheValidity
    ) {
      const newsData = JSON.parse(cachedNews);
      window.mergedNews = newsData.results; // store globally so it can be used when the date changes
      displayNews(newsData.results); /* .results is because we have them as:
      {results: [{kind: "news", domain: "tokenist.com",…}, {kind: "news", domain: "coinpaprika.com",…},…]}, we pass an array to the display function and iterate over it */
      // Optionally update past news if needed
      displayPastNews(newsData.results);
    } else {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json(); // receiving the news
      let existingNews = []; // these are the news that were in the localstorage (currently empty)
      if (cachedNews) {
        // if we have some in localStorage
        existingNews = JSON.parse(cachedNews).results; // putting what we have in the localStorage in the existingNews
      }
      let mergedNews = mergeNews(existingNews, data.results); // array of all news, old(from localStorage) and new(from new fetch (data.results))
      mergedNews.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );
      window.mergedNews = mergedNews; // store globally so that displayPastNews can access it when the date changes
      localStorage.setItem(
        "cachedNews",
        JSON.stringify({ results: mergedNews })
      ); // always storing all the news in the localStorage
      localStorage.setItem("newsTimeStamp", Date.now());
      displayNews(mergedNews);
      displayPastNews(mergedNews);
    }
  } catch (error) {
    console.error(error);
  }
}

function mergeNews(oldNews, newNews) {
  const newsMap = {}; // creating a newsMap for all the news to put them in via the id
  oldNews.forEach((news) => (newsMap[news.id] = news)); // checking the localStorage news and going through each one and extracting them to the newsMap
  newNews.forEach((news) => (newsMap[news.id] = news)); //  every 8.3 mins putting new news in the newsMap via id
  return Object.values(newsMap); // making it an array
}

function displayNews(newsData) {
  const container = document.querySelector(".news-container");

  if (container) {
    container.innerHTML = "";
  }

  newsData.forEach((news) => {
    const article = document.createElement("article");

    article.classList.add("news-item");

    article.innerHTML = `
      <h2><a class="anchor-title" href="${news.url}" target="_blank">${
      news.title
    }</a></h2>
      <a>Source: ${news.source.title}</a> 
      <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
     `;

    if (container) {
      container.appendChild(article);
    }
  });
}

function displayDate() {
  const dataElement = document.querySelector(".date-time");

  if (!dataElement) {
    console.error("elements not found");
  }

  let data = new Date();
  let today = data.toLocaleDateString();

  if (today) {
    dataElement.textContent = today;
  }
}

async function checkUserLogin() {
  try {
    const response = await fetch("/user");
    const data = await response.json();
    if (data.loggedIn) {
      const loginLink = document.querySelector(".login-link");
      if (loginLink) {
        loginLink.remove();
      }
      
      let userDisplay = document.getElementById("user-display");
      if (!userDisplay) {
        userDisplay = document.createElement("span");
        userDisplay.id = "user-display";

        const header = document.querySelector(".container-right");
        if (header) {
          header.appendChild(userDisplay);
        } else {
          document.body.appendChild(userDisplay);
        }
      }
      userDisplay.textContent = data.nickname;
    }
  } catch (err) {
    console.error("Error fetching user info:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayDate();
  fetchNews();
  checkUserLogin();
});
