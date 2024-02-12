import { AppLayout } from '../layout';

export default function Page() {
	//Current location
	// useEffect(() => {
	// 	navigator.geolocation.getCurrentPosition((position) => {
	// 		setLat(position.coords.latitude);
	// 		setLong(position.coords.longitude);
	// 	});
	// }, []);
	return (
		<AppLayout title='Home'>
			<div>Hey there</div>
			<img src='https://drive.google.com/thumbnail?id=1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr' alt='Test 2' className='m-3' />
		</AppLayout>
	);
}
