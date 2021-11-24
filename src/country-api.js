'use strict';

export const fetchCountry = countryName => {
return fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(response => {
    if (!response.ok) {
        throw new Error (response.status)
    }

    return response.json();
})    
}


