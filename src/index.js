import './styles.css';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');

loaderText.hidden = true;
errorText.hidden = true;

fetchBreeds()
  .then(breeds => {
    breedSelect.insertAdjacentHTML('beforeend', createMarkupSelect(breeds));
  })
  .catch(error => {
    loaderText.hidden = true;
    Notiflix.Report.failure(
      'Oops! Something went wrong!',
      'Try reloading the page!'
    );
  });

function createMarkupSelect(arr) {
  return arr
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
}

breedSelect.addEventListener('change', onGetCat);

function onGetCat(event) {
  fetchCatByBreed(event.target.value)
    .then(renderCats)
    .catch(error => {
      loaderText.hidden = true;
      Notiflix.Report.failure(
        'Oops! Something went wrong!',
        'Try reloading the page!'
      );
    });
  loaderText.hidden = false;
  catInfo.hidden = true;
}

function renderCats(cats) {
  loaderText.hidden = true;
  catInfo.hidden = false;
  catInfo.innerHTML = cats
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];
      return `<img class="cat-img" src="${url}" alt="${name}" width = '370'>
      <div class="cat-descr">
      <h2>${name}</h2>
    <p>${description}</p>
    <h3>Temperament: ${temperament}</h3>
    </div>`;
    })
    .join('');
}
