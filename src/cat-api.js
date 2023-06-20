export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(arr => {
      return arr.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
  const PARAMS = new URLSearchParams({
    breed_ids: breedId,
    api_key:
      'live_yHctTdURHK6FT8DlmP5Ni402DCjjKlgicKMPLwiuQi2DEMii9FOpT4w7Vgl69Nrt',
  });
  const url = `${BASE_URL}?${PARAMS}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
