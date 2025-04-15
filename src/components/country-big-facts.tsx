import { useEffect, useState } from 'react';
import { CountryBigFactsType } from '../types/country-big-facts-type';

export default function CountryBigFacts({ country, setCountryError }: { country: string; setCountryError: (error: boolean) => void }) {
	const [countryFacts, setCountryFacts] = useState<CountryBigFactsType[] | undefined>();
	// const actually=

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`https://restcountries.com/v3.1/name/${country}`)
				.then((res) => res.json())
				.then((result) => {
					setCountryFacts(result);
				})
				.catch((error) => {
					setCountryError(error);
					setCountryFacts(undefined);
				});
		};
		fetchData();
	}, [country, setCountryError]);

	return (
		<span>
			{countryFacts !== undefined && (
				<div className='country-facts'>
					{countryFacts?.map((currentCountry) => {
						return (
							<div>
								{country === 'China' && currentCountry.name.common !== 'China' ? (
									<span />
								) : (
									<div key={currentCountry.name.common} className='big-facts'>
										<h5 className='text-decoration-underline'>{currentCountry.name.common}</h5>
										<div className='d-flex justify-content-between'>
											<div>
												<h6>Capital</h6>
												<p>{currentCountry.capital}</p>
											</div>
											<div>
												<h6>Population</h6>
												<p>{currentCountry.population.toLocaleString()}</p>
											</div>
										</div>
										<div className='flags'>
											<div>
												<h6>Flag</h6>
												<img src={currentCountry.flags.png} alt={currentCountry.flags.alt}></img>
											</div>
											<div className='mt-3'>
												<h6>Coat of Arms</h6>
												<img src={currentCountry.coatOfArms.png} alt='Coat of arms' width='200rem'></img>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</span>
	);
}
