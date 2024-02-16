import { useEffect, useMemo, useState } from 'react';
import fetchWashingtonImageIds from '../../api/washington-google-photos';
import { AppLayout } from '../layout';
import { ImageId } from '../../types/image-response-type';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';

export default function Page() {
	const [washingtonIds, setWashingtonIds] = useState<string[]>([]);
	const date = useMemo(() => new Date(), []);
	const newZealandDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Pacific/Auckland', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);

	useEffect(() => {
		async function fetchIds() {
			try {
				const ids = await getIds();
				setWashingtonIds(ids || []);
			} catch (error) {
				console.error('Error fetching Washington Ids: ', error);
			}
		}

		fetchIds();
	}, []);

	return (
		<AppLayout title='New Zealand'>
			<div className='country-header'>
				<CountryBigFacts country='New Zealand' />
				<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
			</div>

			<p>Coming soon...</p>
		</AppLayout>
	);
}

async function getIds() {
	const results = (await fetchWashingtonImageIds().then((result) => result)) || [];
	if (results) return results;
	return null;
}
