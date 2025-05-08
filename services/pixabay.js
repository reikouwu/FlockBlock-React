import Constants from 'expo-constants';

// define the Pixabay API key and base URL
// these are used to construct the API request for fetching animal photos
const API_KEY = '49702898-066671a9ca5b40bf038bb00a3';  
const BASE      = 'https://pixabay.com/api/';

/**
 * Fetches a random Pixabay photo URL for the given animal name (id).
 * Constructs the API request URL with query parameters for filtering results.
 * Returns null if the request fails or no hits are found.
 */
export async function getAnimalPhoto(animalId) {
  try {
    const url =
      `${BASE}?key=${API_KEY}` +
      `&q=${encodeURIComponent(animalId)}` +
      '&image_type=photo&orientation=horizontal&category=animals' +
      '&per_page=30&safesearch=true';

    // send the API request and parse the JSON response
    const res  = await fetch(url);
    const json = await res.json();

    // if there are hits, return a random photo URL from the results
    if (json.hits?.length) {
      const hit = json.hits[Math.floor(Math.random() * json.hits.length)];
      return hit.webformatURL || hit.largeImageURL;
    }
  } catch (e) {
    // log a warning if the API request fails
    console.warn('Pixabay fetch error:', e);
  }

  // return null if no photo is found or an error occurs
  return null;
}