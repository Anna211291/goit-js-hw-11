import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const galleryList = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");

let page = "1";
let query = "";
const { searchQuery } = form.elements;

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39215228-7f7f32c48d65cadc310432918"

const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: `${page}`,
    per_page: 40
});
  async function getImages() {
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    //   console.log(response);
      return response.data;
  } catch (error) {
    console.error(error);
  }
}
console.log(getImages());
form.addEventListener("submit", searchSubmit);

function searchSubmit(evt) {
    evt.preventDefault();
    query = searchQuery.value.trim();

    getImages().then(data => {
    galleryList.insertAdjacentHTML("afterbegin", createMarkup(data));
    })
    .catch(err => { console.log(err); }) 
}

function createMarkup(arr) {
    // console.log(arr);
    const { hits: [{ webformatURL,
largeImageURL,
tags,
likes,
views,
comments,
downloads
 }] } = arr;
    return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
}
