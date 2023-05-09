import { fetchImages } from './js/fetchImages';
import { MasssageIfNotFoundImages } from './js/massages';
import { clearMarkup, generateMarkup } from './js/marcupActions';

const form = document.querySelector('.search-form');
export const targetMarkupContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const fetchedImages = new fetchImages();

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  clearMarkup();
  const inputedString = evt.target.elements.searchQuery.value.trim('');
  if (!inputedString) return;

  fetchedImages.page = 1;
  fatchDataAndCreateMarkup(inputedString);
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick() {
  fetchedImages.page += 1;
  fatchDataAndCreateMarkup();
}

function fatchDataAndCreateMarkup(inputedValue) {
  fetchedImages.getImages(inputedValue).then(response => {
    if (response.hits.length === 0) {
      loadMoreBtn.classList.add('is-hiden');
      MasssageIfNotFoundImages();
      return;
    }
    targetMarkupContainer.insertAdjacentHTML(
      'beforeend',
      generateMarkup(response.hits)
    );
    fetchedImages.totalPages = Math.ceil(response.totalHits / 40);
    ActivateOrDisableLoadMoreBtn();
  });
}

function ActivateOrDisableLoadMoreBtn() {
  if (fetchedImages.totalPages !== fetchedImages.page) {
    loadMoreBtn.classList.remove('is-hiden');
  }

  if (fetchedImages.totalPages === fetchedImages.page) {
    loadMoreBtn.classList.add('is-hiden');
  }
}
