import { FetchImages } from './js/fetchImages';
import {
  MasssageIfNotFoundImages,
  masssageImagesFinished,
  masssageTotalHits,
} from './js/massages';
import { clearMarkup, generateMarkup, gallery } from './js/marcupActions';

const form = document.querySelector('.search-form');
export const targetMarkupContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchedImages = new FetchImages();

form.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSubmitForm(evt) {
  evt.preventDefault();
  clearMarkup();
  const inputedString = evt.target.elements.searchQuery.value.trim('');
  if (!inputedString) return;

  fetchedImages.page = 1;
  fatchDataAndCreateMarkup(inputedString);
}

function onLoadMoreBtnClick() {
  fetchedImages.page += 1;
  fatchDataAndCreateMarkup();
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting) {
      if (fetchedImages.totalPages === fetchedImages.page) {
        masssageImagesFinished();
        observer.unobserve(entries[0].target);
        return;
      }
      fetchedImages.page += 1;
      fatchDataAndCreateMarkup();
      observer.unobserve(entries[0].target);
    }
  },
  { threshold: 0.5 }
);

async function fatchDataAndCreateMarkup(inputedValue) {
  const responseObj = await fetchedImages.getImages(inputedValue);

  if (responseObj.hits.length === 0) {
    MasssageIfNotFoundImages();
    return;
  }
  targetMarkupContainer.insertAdjacentHTML(
    'beforeend',
    generateMarkup(responseObj.hits)
  );

  const lastPerPageCard = document.querySelector('.photo-card:last-child');
  observer.observe(lastPerPageCard);
  gallery.refresh();

  fetchedImages.totalPages = Math.ceil(responseObj.totalHits / 40);
  if (fetchedImages.page === 1) masssageTotalHits(responseObj.totalHits);
}
