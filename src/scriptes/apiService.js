export default class ImageApiService {
    constructor() {
        this.BASE_URL = 'https://pixabay.com/api/';
        this.API_KEY = '19136098-9af9f23d9dd8880169b991a94';
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchImage() {
        const url = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.API_KEY}`;
        const params = await fetch(this.BASE_URL + url);
        const parseParams = await params.json();
        this.incrementPage();
        return parseParams.hits;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}