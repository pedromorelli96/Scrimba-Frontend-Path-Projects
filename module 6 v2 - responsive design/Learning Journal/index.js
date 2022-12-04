const hiddenArticles = document.querySelectorAll(".hidden");
const mobileHiddenArticles = document.querySelectorAll(".mobile-hidden");
const viewMore = document.getElementById("view-more-text");

function showArticles() {
    hiddenArticles.forEach((article) => {
        article.classList.remove("hidden");
    });
    mobileHiddenArticles.forEach((article) => {
        article.classList.remove("mobile-hidden");
    });
}

viewMore.addEventListener("click", () => {
    showArticles();
    viewMore.style.display = "none";
});
