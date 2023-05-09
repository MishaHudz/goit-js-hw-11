import axios from 'axios';
export class fetchImages {
  #BASE_URS;
  #PARAMS;
  searhTerm;
  totalPages;
  page;
  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.searhTerm = '';
    this.#BASE_URS = 'https://pixabay.com/api/';
    this.#PARAMS = new URLSearchParams({
      key: '36182174-58580c701ddc81aa57ee59977',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });
  }
  async getImages(inputedImagesRequest) {
    if (inputedImagesRequest) this.searhTerm = inputedImagesRequest;

    try {
      const responce = await axios.get(
        `${this.#BASE_URS}?q=${this.searhTerm}&page=${this.page}&${
          this.#PARAMS
        }`
      );
      return responce.data;
    } catch {
      return { hits: [] };
    }
  }
}
