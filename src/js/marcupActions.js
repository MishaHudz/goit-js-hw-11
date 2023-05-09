import { targetMarkupContainer } from '../index';

export function generateMarkup(InputedArrayOfPictures) {
  return InputedArrayOfPictures.map(picture => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = picture;
    return `<div class="photo-card">
  <img class="photo-card-image" src="${webformatURL}" width="300px" height="200px" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
  }).join('');
}

export function clearMarkup() {
  targetMarkupContainer.innerHTML = '';
}
