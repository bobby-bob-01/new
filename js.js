const searchForm = document.querySelector(".srch-form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".srch-container");
let searchQuery = "";
const APP_ID = "35a4e64f";
const APP_KEY = "525c6d591d19eadef72344d48afe8f2f";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=any&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&length=50`;
  const response = await fetch(baseURL);
  const data = await response.json();
  if (data.count > 0) {
    generateHTML(data.hits);
  } else {
    warning();
  }
  console.log(data);
}

function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="srch-item">
            <img class="srch-img"src="${result.recipe.image}" alt="reciepe" />
            <div class="srch-flex-container">
              <h1 class="srch-title">${result.recipe.label}</h1>
              <a class="srch-view-button" href="${
                result.recipe.url
              }" target="_blank">view reciepe</a>
            </div>
            <p class="srch-item-data">calories: ${result.recipe.calories.toFixed(
              2
            )}</p>
           <p class="health-fact">health facts: ${
             result.recipe.healthLabels
           }</p>
          </div>
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

function warning() {
  let generatedHTML = "";
  generatedHTML += `
        <div class="srch-item">
           <p class="warning">!!!....Recipe not found....!!!</p>
          </div>
        `;
  searchResultDiv.innerHTML = generatedHTML;
}
