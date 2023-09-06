import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const galleryList = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");

 let gallery = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250
 });

let page = 1;
let query = "";
const per_page = 40;
const { searchQuery } = form.elements;

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39215228-7f7f32c48d65cadc310432918"

async function getImages(query, page) {
    const params = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: `${page}`,
    per_page: `${per_page}`
});
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", searchBtn);
loadBtn.addEventListener("click", loadMoreBtn);

async function searchBtn(evt) {
  evt.preventDefault();
  galleryList.innerHTML = "";
  query = searchQuery.value.trim();
  page = 1;
  if (query === "") {
    Notiflix.Notify.warning('Please fill out the search field');
    return;
  }

  try {
    const data = await getImages(query, page)
    console.log(data);
    if (data.hits.length === 0) {
      loadBtn.classList.replace("load-more-style", "hidden");
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        Notiflix.Notify.info.remove("We&#39;re sorry, but you&#39;ve reached the end of search results.")
    }
    else {
      createMarkup(data.hits)
      gallery.refresh();
Notiflix.Notify.info(`'Hooray! We found ${data.totalHits} images.'`);
    }

    if (page < data.totalHits/per_page) {
      loadBtn.classList.replace("hidden", "load-more-style");
    } else {
      loadBtn.classList.replace("load-more-style", "hidden");
       Notiflix.Notify.info("We&#39;re sorry, but you&#39;ve reached the end of search results.")
    }
  } catch (error) {
    console.error(error);
  }
}
  
async function loadMoreBtn() {
  page += 1; 
   try {
    const data = await getImages(query, page)
    console.log(data);
     createMarkup(data.hits)
   gallery.refresh();
      const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 1.5,
  behavior: "smooth",
});
     Notiflix.Notify.info(`'Hooray! We found ${data.totalHits} images.'`);
  
    if (page < data.totalHits/per_page) {
      loadBtn.classList.replace("hidden", "load-more-style");
    }
    else {
      loadBtn.classList.replace("load-more-style", "hidden");
     Notiflix.Notify.info("We&#39;re sorry, but you&#39;ve reached the end of search results.") 
    }
  } catch (error) {
    console.error(error);
  }  
}

function createMarkup(arr) {
 const image = arr.map(image => `
     <div class="photo-card">
  <a class="img-link" href="${image.largeImageURL}"><img class="image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300" /></a>
  <div class="info">
 <p class="info-item"><span class="text-span">Likes: </span><b>${image.likes}</b></p>
 <p class="info-item"><span class="text-span">Views: </span><b>${image.views}</b></p>
 <p class="info-item"><span class="text-span">Comments: </span><b>${image.comments}</b>
   </p>
 <p class="info-item"><span class="text-span">Downloads: </span><b>${image.downloads}</b></p>
 </div>
 </div>`).join("")
  galleryList.insertAdjacentHTML("beforeend", image)
};
