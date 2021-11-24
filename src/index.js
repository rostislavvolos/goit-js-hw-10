import './css/styles.css'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountry } from './country-api'
import countryItems from './country-list'
import countryOne from './country'


let markup = null;

const DEBOUNCE_DELAY = 300;

const refs =  {
    input: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
};


const inputFn = event => {
    
   let countryValue = event.target.value.trim();

   refs.countryInfo.innerHTML = '';
   refs.countryList.innerHTML = '';

   if (countryValue !== '') {
   fetchCountry(countryValue)
   .then(response =>  {
    console.log(response)   
    countryResult(response)})
   .catch(err => {countryError(err)});
   }
};


refs.input.addEventListener('input', debounce(inputFn, DEBOUNCE_DELAY));


// function findByInput(event) {
//     refs.countryInfo.innerHTML = '';
//     refs.countryList.innerHTML = '';
//     const nameOfCountry = inputEl.value.trim();
//     fetchCountry(nameOfCountry)
// };

const countryResult = (result) => {
    
if(result.length > 10) {
Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')
}
else if (result.length >= 2 && result.length <= 10) {
markup = countryItems(result);
refs.countryList.innerHTML = markup;
}
else if (result.length === 1) {
   markup = countryOne(result);
   refs.countryInfo.innerHTML = markup
}
};


function showError() {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
};














