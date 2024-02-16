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
			{countryFacts?.map((country) => {
				return (
					<div key={country.name.common} className='big-facts'>
						<h5 className='text-decoration-underline'>{country.name.common}</h5>
						<div className='d-flex justify-content-between'>
							<div>
								<h6>Capital</h6>
								<p>{country.capital}</p>
							</div>
							<div>
								<h6>Population</h6>
								<p>{country.population.toLocaleString()}</p>
							</div>
						</div>
						<div className='flags'>
							<div>
								<h6>Flag</h6>
								<img src={country.flags.png} alt={country.flags.alt}></img>
							</div>
							<div className='mt-3'>
								<h6>Coat of Arms</h6>
								<img src={country.coatOfArms.png} alt='Australia coat of arms' width='200rem'></img>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
