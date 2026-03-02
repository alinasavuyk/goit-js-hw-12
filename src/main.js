import {getImagesByQuery} from './js/pixabay-api.js'
import {createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form =document.querySelector('.form')
const input =document.querySelector('[name="search-text"]')
const fetchButton = document.querySelector(".loadMoreButton");
 
let page = 1;
let results;
let query='';
const per_page=15;

async function handleSubmit (event){
event.preventDefault();
query = input.value.trim();
if (query === "") {
  iziToast.warning({
            title: 'Caution',
            message: 'Please enter a search query!',
            position: 'topRight',
        });
return
}
clearGallery();
page=1;
hideLoadMoreButton(); 
showLoader();
try{
    results = await getImagesByQuery(query, page);
    hideLoader()
   if (!results.hits || results.hits.length === 0) {
                iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                });
                return;
            } 
                createGallery(results.hits);  
                form.reset();

        const totalPages = Math.ceil(results.totalHits / per_page);
        if (totalPages > 1) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });}
}
catch(error){
    hideLoader()
    iziToast.error({
                message: 'Something went wrong. Try again later.',
                position: 'topRight',
            });
            console.log("Fetch error:", error);
}
          }

async function handleClick() {
  page += 1;
  hideLoadMoreButton(); 
  showLoader();
  try {
     results = await getImagesByQuery(query, page);
     hideLoader();
    createGallery(results.hits);
    const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
      let rect = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        left: 0,
        behavior: 'smooth'
      });
    }

    const totalPages = Math.ceil(results.totalHits / per_page);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }else {
            showLoadMoreButton();
        }
  } catch (error) {
    hideLoader();
    iziToast.error({
            message: 'Error loading more images. Please try again.',
            position: 'topRight',
        });
    console.log("Помилка завантаження:", error);
  }
}
form.addEventListener('submit', handleSubmit);
fetchButton.addEventListener('click', handleClick)