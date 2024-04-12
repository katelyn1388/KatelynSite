import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { ImageType } from '../../types/image-type';
import { ImageComponent } from '../../components/image-component';
import { Weather } from '../../components/weather';
import { UseMobileView } from '../../hooks/use-mobile-view';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500?', []);
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const date = useMemo(() => new Date(), []);
	const [currentDate, setCurrentDate] = useState<string | null>(null);
	const isMobile = UseMobileView();

	const success = useCallback((position: GeolocationPosition) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`)
				.then((res) => res.json())
				.then((result) => {
					setCurrentDate(
						date.toLocaleString(undefined, { timeZone: result.timezone_id, timeStyle: 'short', dateStyle: 'short' })
					);
				});
		};
		fetchData();
	}, [latitude, longitude, date]);

	const getLocation = useCallback(() => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: 'geolocation' }).then((result) => {});
			navigator.geolocation.getCurrentPosition(success);
		}
	}, [success]);

	const displayImage = useCallback((img: number) => {
		setShowImageModal(true);
		setSelectedImage(img);
	}, []);

	const close = useCallback(() => {
		setShowImageModal(false);
		setSelectedImage(null);
	}, []);

	const cacheImageThumbnails = async (imagesArray: ImageType[]) => {
		const promises = await imagesArray.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + thumbnail2;
			});
		});

		await Promise.all(promises);
	};

	useEffect(() => {
		getLocation();
		cacheImageThumbnails(pictures);
	}, []);

	return (
		<AppLayout title='Home'>
			<div className='d-print-none'>
				<div className='ms-4'>
					<h3>Kbow Travels</h3>
					<p>
						Pages for my travels in Washington, New Zealand, Australia, etc and Cool Stuff to show some animations I made and
						some games
					</p>
				</div>

				{latitude && longitude && currentDate ? (
					<div>
						{isMobile ? (
							<div className='d-flex flex-column justify-content-center align-items-center'>
								<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />

								<div>
									<Weather lat={latitude} long={longitude} date={currentDate} />
								</div>
							</div>
						) : (
							<div className='d-flex justify-content-around'>
								<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />

								<div>
									<Weather lat={latitude} long={longitude} date={currentDate} />
								</div>
							</div>
						)}
					</div>
				) : (
					<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />
				)}

				<p className='ms-4 mt-5'>Also, here's some cute puppies</p>
			</div>

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
				<h2>I know they're cute though so I'll allow it</h2>
			</div>

			<div className='ps-4 pe-4'>
				{pictures.map((img) => {
					if (img.description.startsWith('Dogs')) {
						return (
							<div onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
								<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
							</div>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			</div>

			<br />
			<br />

			<h3 className='mt-2 ms-4'>Merlinie</h3>
			<div className='ps-4 pe-4'>
				{pictures.map((img) => {
					if (img.description.startsWith('Merlinie')) {
						return (
							<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
								<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			</div>

			<br />
			<br />
			<h3 className='mt-2 ms-4'>Cujo</h3>
			<div className='ps-4 pe-4'>
				{pictures.map((img) => {
					if (img.description.startsWith('Cujo')) {
						return (
							<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
								<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			</div>

			<br />
			<br />
			<h3 className='mt-2 ms-4'>Mattie</h3>
			<div className='ps-4 pe-4'>
				{pictures.map((img) => {
					if (img.description.startsWith('Mattie')) {
						return (
							<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
								<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			</div>

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
		</AppLayout>
	);
}
