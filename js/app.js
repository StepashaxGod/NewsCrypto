
async function fetchNews() { // had to comment it out to make everything clear
  try {
    const cacheValidity = 500000;  // the time before user sends a new request to an api server
    const cachedNews = localStorage.getItem("cachedNews");        
    const newsTimeStamp = localStorage.getItem("newsTimeStamp");  // retrieving news with dates from local storage
    if (  // if news found with a valid timeStamp(not less than 8.3 mins which is 500000 milliseconds)
      cachedNews &&
      newsTimeStamp &&
      Date.now() - newsTimeStamp < cacheValidity
    ) {
      const newsData = JSON.parse(cachedNews); // we get the news from localstorage and make them an object
      displayNews(newsData.results); /* .results is because we have them as:
      {results: [{kind: "news", domain: "tokenist.com",…}, {kind: "news", domain: "coinpaprika.com",…},…]}, we pass an array to the display function and iterate over it */
    } else {
      const response = await fetch("http://localhost:3000/api/posts"); 
      const data = await response.json(); // receiving the news // data.results are the news that appeared on the api server while the cacheValidity still runs 8.3mins otherwise saying(data are the new news)
      let existingNews = [];    // these are the news that were in the localstorage (currently empty)
      if (cachedNews) { // if we have some in localStorage 
      existingNews = JSON.parse(cachedNews).results; // putting what we have in the localStorage in the existingNews
      }
      let mergedNews = mergeNews(existingNews, data.results);   // array of all news, old(from localStorage) and new(from new fetch (data.results))
      mergedNews.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      localStorage.setItem("cachedNews", JSON.stringify({ results: mergedNews }));  // on the first request or when the timeStamp is out of date we save them in a localStorage // always storing all the news in the localStorage
      localStorage.setItem("newsTimeStamp", Date.now());                             // on the first request or when cacheVAlidity is out we save timeStamp in a localStorage
      displayNews(mergedNews);
    }
  } catch (error) {
    console.error(error);
  }
}

function mergeNews(oldNews, newNews) {
  const newsMap = {} // creating a newsMap for all the news to put them in via the id
  oldNews.forEach((news) => newsMap[news.id] = news); // checking the localStorage news and going through each one and extracting them to the newsMap
  newNews.forEach((news) => newsMap[news.id] = news); //  every 8.3 mins putting new news in the newsMap via id
  return Object.values(newsMap); // making it an array 
}

function displayNews(newsData) {
  const container = document.querySelector(".news-container");
  const archiveContainer = document.querySelector(".archive-news-container");

  if (archiveContainer) {
    archiveContainer.innerHTML = "";
  }

  if (container) {
    container.innerHTML = "";
  }

  newsData.forEach((news) => {
    const article = document.createElement("article");
    const archiveArticle = document.createElement("article");

    article.classList.add("news-item");
    archiveArticle.classList.add("archive-news-item");

    article.innerHTML = `
      <h2><a class="anchor-title" href="${news.url}" target="_blank">${
      news.title
    }</a></h2>
      <a>Source: ${news.source.title}</a> 
      <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
     `;

    archiveArticle.innerHTML = `
      <h2><a class="archive-anchor-title" href="${news.url}" target="_blank">${
      news.title
    }</a></h2>
      <a>Source: ${news.source.title}</a> 
      <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
    `;

    if (container) {
      container.appendChild(article);
    }
    if (archiveContainer) {
      archiveContainer.appendChild(archiveArticle);
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

document.addEventListener("DOMContentLoaded", () => {
  displayDate();
  fetchNews();
});
