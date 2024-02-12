import { useEffect, useState } from 'react';
import { CountryBigFactsType } from '../types/country-big-facts-type';

export default function CountryBigFacts({ country }: { country: string }) {
	const [countryFacts, setCountryFacts] = useState<CountryBigFactsType[] | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`https://restcountries.com/v3.1/name/${country}`)
				.then((res) => res.json())
				.then((result) => {
					console.log(result);
					setCountryFacts(result);
				});
		};
		fetchData();
	}, [country]);

	return (
		<div className='country-facts'>
			<div>
				{countryFacts?.map((country) => {
					return (
						<div key={country.name.common}>
							<p>{country.name.common}</p>
							<p>{country.name.official}</p>
							<p>{country.name.common + ' capital: ' + country.capital}</p>
							<img src={country.flags.png} alt={country.flags.alt}></img>
							<img src={country.coatOfArms.png} alt='Australia coat of arms' width='200rem'></img>
						</div>
					);
				})}
			</div>
		</div>
	);
}
