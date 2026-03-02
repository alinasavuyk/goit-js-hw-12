import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery=document.querySelector('.gallery')
const loader = document.querySelector('.loader');
const fetchButton = document.querySelector(".loadMoreButton");
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images){

const galleryItem = images.map(({webformatURL,largeImageURL, tags, likes,views, comments, downloads})=>{
return `<li class = "gallery-item">
        <a href = "${largeImageURL}" class="gallery-link">
        <img src = "${webformatURL}" alt = "${tags}" class="gallery-images"/>
        </a>
       <ul class="data-list">
  <li class="image-data"><p class="image-data-label">Views</p><p class="image-data-text">${views}</p></li>
  <li class="image-data"><p class="image-data-label">Likes</p><p class="image-data-text">${likes}</p></li>
  <li class="image-data"><p class="image-data-label">Comments</p><p class="image-data-text">${comments}</p></li>
  <li class="image-data"><p class="image-data-label">Downloads</p><p class="image-data-text">${downloads}</p></li>
  </ul>
        </li>
        `
}).join('');
gallery.insertAdjacentHTML(`beforeend`, galleryItem)
lightbox.refresh(); 
}
export function clearGallery() {
    gallery.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
export function showLoadMoreButton(){
fetchButton.classList.remove('is-hidden');
}
export function hideLoadMoreButton(){
fetchButton.classList.add('is-hidden');
}




