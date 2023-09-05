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

async function getImages() {
    const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: `${page}`,
    per_page: 40
});
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
      // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
console.log(getImages());
form.addEventListener("submit", searchSubmit);

async function searchSubmit(evt) {
    evt.preventDefault();
  query = searchQuery.value.trim();

  // try {
  //   const data = await getImages(query) 
  //   galleryList.insertAdjacentHTML("afterbegin", createMarkup(data));
  // } catch (error) {
  //   console.error(error);
  // }
    getImages().then(data => {
    galleryList.insertAdjacentHTML("afterbegin", createMarkup(data.hits));
     
    })
    .catch(err => { console.log(err); }) 
}

function createMarkup(arr) {
    // console.log(arr);
  return arr.map(({ webformatURL,
largeImageURL,
tags,
likes,
views,
comments,
downloads
  }) => `
    <div class="photo-card">
//   <a href="${largeImageURL}"><img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" /></a>
//   <div class="info">
//     <p class="info-item">Likes: 
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">Views: 
//       <b>${views}</b>
//     </p>
//     <p class="info-item">Comments: 
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">Downloads:
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`).join("")

};
