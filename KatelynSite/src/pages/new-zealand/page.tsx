import { useEffect, useMemo, useState } from 'react';
import fetchWashingtonImageIds from '../../api/washington-google-photos';
import { AppLayout } from '../layout';
import { ImageId } from '../../types/image-response-type';
import { Weather } from '../../components/weather';

export default function Page() {
	const [washingtonIds, setWashingtonIds] = useState<string[]>([]);
	const date = useMemo(() => new Date(), []);
	const newZealandDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Pacific/Auckland', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	//const [washingtonIds, setWashingtonIds] = useState<ImageId[]>([]);

	// const getWashingtonIds = useMemo(async () => {
	// 	setWashingtonIds((await getIds()) || []);
	// }, []);

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
			<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
			<div>New Zealand goodies</div>
			<p>Coming soon...</p>
			{washingtonIds.map((id) => {
				return (
					<div className='m-3'>
						<img src={`https://drive.google.com/thumbnail?id=${id}`} alt='washington' />
					</div>
				);
			})}
		</AppLayout>
	);
}

async function getIds() {
	const results = (await fetchWashingtonImageIds().then((result) => result)) || [];
	if (results) return results;
	return null;
}
