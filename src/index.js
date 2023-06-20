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
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    loaderText.hidden = true;
    Notiflix.Report.failure(
      'Oops! Something went wrong!',
      'Try reloading the page!'
    );
  });

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
