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
