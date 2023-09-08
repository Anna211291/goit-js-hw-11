import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "39215228-7f7f32c48d65cadc310432918";
let page = 1;
let query = "";
const per_page = 40;

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

export { getImages };