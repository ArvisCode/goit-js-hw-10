import '../css/styles.css';
import { fetchCountries } from '../js/fetchCountries.js';
import { countryListFun } from '../js/markups';
import { countryInfoFun } from '../js/markups';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};
refs.searchBox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
  const countryName = refs.searchBox.value;
  if (countryName === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
      }

      if (countries.length <= 10) {
        const markupList = countries.map(country => countryListFun(country));
        refs.countryList.innerHTML = markupList.join('');
        refs.countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markupInfo = countries.map(country => countryInfoFun(country));
        refs.countryInfo.innerHTML = markupInfo.join('');
        refs.countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
      return error;
    });
}
