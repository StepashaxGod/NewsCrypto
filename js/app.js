async function fetchNews() {
try {
    const cacheValidity = 500000;
    const cachedNews = localStorage.getItem("cashedNews");
    const newsTimeStamp = localStorage.getItem("newsTimeStamp");
    if (cachedNews && newsTimeStamp && (Date.now() - newsTimeStamp < cacheValidity)) {
      const newsData = JSON.parse(cachedNews);
      console.log(newsData);
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

function displayNews(newsData) {
  const container = document.querySelector(".news-container");
  const archiveContainer = document.querySelector(".archive-news-container");

  if (container) {
    container.innerHTML = "";
  }
  if (archiveContainer) {
    archiveContainer.innerHTML = "";
  }

  newsData.forEach((news) => {
    const article = document.createElement("article");
    const archiveArticle = document.createElement("article");

    article.classList.add("news-item");
    archiveArticle.classList.add("archive-news-item");

    article.innerHTML = `
      <h2><a class="anchor-title" href="${news.url}" target="_blank">${news.title}</a></h2>
      <a>Source: ${news.source.title}</a> 
      <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
     `;
    
    archiveArticle.innerHTML = `
      <h2><a class="archive-anchor-title" href="${news.url}" target="_blank">${news.title}</a></h2>
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
  const dataDateOutput = document.querySelector(".date-output");
  const pastNews = document.querySelector(".past-news-date");

  let data = new Date()
  let today = data.toLocaleDateString();

  let month = data.getMonth() + 1; 
    let date = data.getDate();
    let year = data.getFullYear();

    if (today) {
      dataElement.textContent = today;
    }
    
    let output = `${month}/${date}/${year}`
    dataDateOutput.textContent = output;

    pastNews.addEventListener("click", () => {
      let currentDate = new Date(year, month - 1, date);
  
      currentDate.setDate(currentDate.getDate() - 1);
    
      date = currentDate.getDate();
      month = currentDate.getMonth() + 1; 
      year = currentDate.getFullYear();
    
      dataDateOutput.textContent = `${month}/${date}/${year}`;
    })


}


document.addEventListener("DOMContentLoaded", () => {
  displayDate();
  fetchNews();
});
