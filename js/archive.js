function displayPastNews(newsData) {
  const filteredNews = sortNews(newsData);
  const archiveContainer = document.querySelector('.archive-news-container');
  if (archiveContainer) {
    archiveContainer.innerHTML = '';
  }

  filteredNews.forEach((news) => {
    const archiveArticle = document.createElement('article');

    archiveArticle.classList.add('archive-news-item');

    archiveArticle.innerHTML = `
      <h2><a class="archive-anchor-title" href="${news.url}" target="_blank">${news.title}</a></h2>
      <a>Source: ${news.source.title}</a> 
      <p>Published: ${new Date(news.published_at).toLocaleString()}</p>
    `;

    if (archiveContainer) {
      archiveContainer.appendChild(archiveArticle);
    }
  });
}

function sortNews(allNews) {

  const dateOutputEl = document.querySelector('.date-output');
  if (!dateOutputEl) {
    return allNews;
  }
  const filterDateStr = dateOutputEl.textContent.trim();
  const [month, day, year] = filterDateStr.split('/').map(Number);
  const filterDate = new Date(year, month - 1, day);

  return allNews.filter((news) => {
    const publishedDate = new Date(news.published_at);
    return publishedDate.getDate() === filterDate.getDate() &&
      publishedDate.getMonth() === filterDate.getMonth() &&
      publishedDate.getFullYear() === filterDate.getFullYear();
  });
}

function displayPastDate() {
  const dataElement = document.querySelector(".date-time");
  const dataDateOutput = document.querySelector(".date-output");
  const pastNews = document.querySelector(".past-news-date");

  if (!dataDateOutput || !pastNews) {
    console.error("elements not found");
    return;
  }

  let currentDate = new Date();
  const today = currentDate.toLocaleDateString();

  if (today) {
    dataElement.textContent = today;
  }

  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  dataDateOutput.textContent = `${month}/${date}/${year}`;

  pastNews.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    month = currentDate.getMonth() + 1;
    date = currentDate.getDate();
    year = currentDate.getFullYear();

    const updatedDate = `${month}/${date}/${year}`;
    dataDateOutput.textContent = updatedDate;
    dataElement.textContent = updatedDate;

    if (window.mergedNews) {
      displayPastNews(window.mergedNews);
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  displayPastDate();
});


