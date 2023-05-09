import { fetchImages } from './js/fetchImages';
import {
  MasssageIfNotFoundImages,
  masssageImagesFinished,
  masssageTotalHits,
} from './js/massages';
import { clearMarkup, generateMarkup } from './js/marcupActions';

const form = document.querySelector('.search-form');
export const targetMarkupContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchedImages = new fetchImages();

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

async function fatchDataAndCreateMarkup(inputedValue) {
  const responseObj = await fetchedImages.getImages(inputedValue);

  if (responseObj.hits.length === 0) {
    loadMoreBtn.classList.add('is-hiden');
    MasssageIfNotFoundImages();
    return;
  }
  targetMarkupContainer.insertAdjacentHTML(
    'beforeend',
    generateMarkup(responseObj.hits)
  );
  fetchedImages.totalPages = Math.ceil(responseObj.totalHits / 40);
  if (fetchedImages.page === 1) masssageTotalHits(responseObj.totalHits);
  ActivateOrDisableLoadMoreBtn();
}

function ActivateOrDisableLoadMoreBtn() {
  if (fetchedImages.totalPages !== fetchedImages.page) {
    loadMoreBtn.classList.remove('is-hiden');
  }

  if (fetchedImages.totalPages === fetchedImages.page) {
    loadMoreBtn.classList.add('is-hiden');
    masssageImagesFinished();
  }
}
