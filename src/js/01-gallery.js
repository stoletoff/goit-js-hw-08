// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

function makeGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
  </div>`;
    })
    .join(' ');
}

const galleryContainer = document.querySelector('.gallery');
// console.log(galleryContainer);
const galleryMarkup = makeGalleryMarkup(galleryItems);
// console.log(galleryMarkup);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {});
