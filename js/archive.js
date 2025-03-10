function displayPastDate() {
  const dataElement = document.querySelector(".date-time");
  const dataDateOutput = document.querySelector(".date-output");
  const pastNews = document.querySelector(".past-news-date");

  if (!dataDateOutput || !pastNews) {
    console.error("elements not found");
  }

  let data = new Date();
  let today = data.toLocaleDateString();

  if (today) {
    dataElement.textContent = today;
  }

  let month = data.getMonth() + 1;
  let date = data.getDate();
  let year = data.getFullYear();

  let output = `${month}/${date}/${year}`;
  dataDateOutput.textContent = output;

  pastNews.addEventListener("click", () => {
    let currentDate = new Date(year, month - 1, date);

    currentDate.setDate(currentDate.getDate() - 1);

    date = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();

    dataDateOutput.textContent = `${month}/${date}/${year}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayPastDate();
});
