function countryListFun({ flags, name }) {
  return `
		<li>
			<img src="${flags.svg}" alt="${name.official}" width="50"/>
			<h2>${name.official}</h2>
		</li>
	`;
}

function countryInfoFun({ name, flags, capital, population, languages }) {
  return `
		<div>
			<div>
				<img src="${flags.svg}" alt="${name.official}" width="50"/>
				<h2>${name.official}</h2>
			</div>
			<p><span>Capital: </span>${capital}</p>
			<p><span>Population: </span>${population}</p>
			<p><span>Languages: </span>${Object.values(languages)}</p>
		</div>
	`;
}

export { countryListFun };
export { countryInfoFun };
