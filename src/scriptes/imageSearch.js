import imgCardTpl from '../templates/images.hbs';
import getRefs from '../scriptes/refs.js';
import ImageApiService from '../scriptes/apiService';
import * as basicLightbox from 'basiclightbox';
import"@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';

const imageApiService = new ImageApiService();

getRefs.searchForm.addEventListener('submit', onSearch);
getRefs.galleryImage.addEventListener('click', openLightBox);

function onSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.query;

    clearImageList();

    imageApiService.resetPage();
    imageApiService.searchQuery = input.value;

    fetchImage();
    input.value = '';
}

function fetchImage() {
    imageApiService.fetchImage().then(data => {
        const murkup = buildImageListTpl(data);
        appendImageMarkup(murkup);
    });
}

function appendImageMarkup(images) {
    getRefs.galleryImage.insertAdjacentHTML('beforeend', images);
}

function buildImageListTpl(images) {
    return imgCardTpl(images);
}

function clearImageList() {
    getRefs.galleryImage.innerHTML = '';
}

function openLightBox(event) {
    const viewing = { src: event.target.dataset.src, alt: event.target.alt };
    openImg(viewing);
}

function openImg({ src, alt }) {
    const instance = basicLightbox.create(`
        <img class="photo-card__image"
        src="${src}" 
        alt="${alt}" />
    `);
        instance.show();
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imageApiService.searchQuery !== '') {
            fetchImage();
        }
    });
}

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '150px',
});

observer.observe(getRefs.intersect);