import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function MasssageIfNotFoundImages() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 1000,
      showOnlyTheLastOne: true,
    }
  );
}

export function masssageImagesFinished() {
  Notify.info(`We're sorry, but you've reached the end of search results.`, {
    timeout: 1000,
    showOnlyTheLastOne: true,
  });
}

export function masssageTotalHits(numberOgImages) {
  Notify.success(`Hooray! We found ${numberOgImages} images.`, {
    timeout: 1000,
    showOnlyTheLastOne: true,
  });
}
