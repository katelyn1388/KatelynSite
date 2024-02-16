import { useMemo } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';

export default function Page() {
	const date = useMemo(() => new Date(), []);
	const sydneyDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Australia/Sydney', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);

	return (
		<AppLayout title='Australia'>
			<div className='country-header'>
				<CountryBigFacts country='Australia' />
				<Weather lat={-33.865143} long={151.2099} date={sydneyDate} />
			</div>

			<div>Coming Soon...</div>
		</AppLayout>
	);
}
