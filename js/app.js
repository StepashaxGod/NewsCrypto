
async function fetchNews() {
  try {
    const cacheValidity = 500000;
    const cachedNews = localStorage.getItem("cachedNews");
    const newsTimeStamp = localStorage.getItem("newsTimeStamp");
    if (
      cachedNews &&
      newsTimeStamp &&
      Date.now() - newsTimeStamp < cacheValidity
    ) {
      const newsData = JSON.parse(cachedNews);
      displayNews(newsData.results);
    } else {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      let existingNews = [];
      if (cachedNews) {
        existingNews = JSON.parse(cachedNews).results;
      }
      console.log(existingNews);
      console.log(data.results);
      let mergedNews = mergeNews(existingNews, data.results);
      mergedNews = mergedNews.reverse();
      localStorage.setItem("cachedNews", JSON.stringify({ results: mergedNews }));
      localStorage.setItem("newsTimeStamp", Date.now());
      displayNews(mergedNews);
    }
  } catch (error) {
    console.error(error);
  }
}

function mergeNews(oldNews, newNews) {
  const newsMap = {}
  oldNews.forEach((news) => newsMap[news.id] = news);
  newNews.forEach((news) => newsMap[news.id] = news);
  return Object.values(newsMap);
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
