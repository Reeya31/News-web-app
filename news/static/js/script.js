document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetch-news");
    const categorySelect = document.getElementById("category");
    const locationInput = document.getElementById("location");
    const newsContainer = document.getElementById("news-container");

    fetchButton.addEventListener("click", () => {
        const category = categorySelect.value;
        const location = locationInput.value || "us";

        fetch(`/search/?category=${category}&location=${location}`)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = "";
                if (data.articles) {
                    data.articles.forEach(article => {
                        const newsItem = document.createElement("div");
                        newsItem.classList.add("news-item");

                        newsItem.innerHTML = `
                            <h2>${article.title}</h2>
                            <p>${article.description || "No description available."}</p>
                            <a href="${article.url}" target="_blank">Read More</a>
                        `;
                        newsContainer.appendChild(newsItem);
                    });
                } else {
                    newsContainer.innerHTML = "<p>No news found for the given category and location.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsContainer.innerHTML = "<p>Failed to fetch news. Please try again later.</p>";
            });
    });
});
