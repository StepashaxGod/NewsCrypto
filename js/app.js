async function fetchNews() {
  try {
    const cashValidity = 500000;
    const cachedNews = localStorage.getItem("cashedNews");
    const newsTimeStamp = localStorage.getItem("newsTimeStamp");
    if (cachedNews && newsTimeStamp && (Date.now() - newsTimeStamp < cashValidity)) {
      const newsData = JSON.parse(cachedNews);
      displayNews(newsData.results);
    } else {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      localStorage.setItem("cashedNews", JSON.stringify(data));
      localStorage.setItem("newsTimeStamp", Date.now());
      displayNews(data.results);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", fetchNews);

function displayNews(newsData) {
  const container = document.querySelector(".news-container");
  container.innerHTML = "";

  newsData.forEach((news) => {
    const article = document.createElement("article");
    article.classList.add("news-item");

    article.innerHTML = `
       <h2><a class="anchor-title" href="${news.url}" target="_blank">${news.title}</a></h2>
       <a>Source: ${news.source.title}</a> 
       <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
     `;
    container.appendChild(article);
  });
}

function displayDate() {
  const dataElement = document.querySelector(".date-time");
  let date = new Date()
  let today = date.toLocaleDateString();
  if (today) {
    dataElement.textContent = today;
  }
}

document.addEventListener("DOMContentLoaded", displayDate);