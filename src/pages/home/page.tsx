import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { ImageComponent } from '../../components/image-component';
import { Weather } from '../../components/weather';
import { UseMobileView } from '../../hooks/use-mobile-view';
import NewsModal from './news-modal';
import ReactGA from 'react-ga4';

export default function Page() {
	ReactGA.send({
		hitType: 'pageview',
		page: '/',
		title: 'Home',
	});

	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500?', []);
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const date = useMemo(() => new Date(), []);
	const [currentDate, setCurrentDate] = useState<string | null>(null);
	const { mobileView } = UseMobileView();
	const [newImages, setNewImages] = useState(false);
	const storedImageIds: string = useMemo(() => localStorage.getItem('japanImgs') || '', []);
	const [showNewsModal, setShowNewsModal] = useState(false);

	const success = useCallback((position: GeolocationPosition) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}, []);

	useEffect(() => {
		if (storedImageIds.length === 0) {
			setShowNewsModal(true);
		}
	}, [storedImageIds]);

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

	const cacheImageThumbnails = async () => {
		const promises = await pictures.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + thumbnail2;

				if (img.complete) {
					src.cached = true;
				} else {
					src.cached = false;
				}
			});
		});

		await Promise.all(promises);
	};

	const storeImageThumbnails = useCallback(async () => {
		const storedImageIds: string = localStorage.getItem('dogImgs') || '';
		const emptyCache = storedImageIds.length <= 0 ? true : false;
		let notCachedCount = 0;
		let addIds: string = '';

		pictures.map((img) => {
			if (storedImageIds?.includes(img.img_id)) {
				img.cached = true;
			} else {
				img.cached = false;
				addIds = addIds + `, ${img.img_id}`;
				notCachedCount += 1;
			}
		});

		localStorage.setItem('dogsImgs', storedImageIds.concat(addIds));
		if (emptyCache || notCachedCount === 0) {
			setNewImages(false);
		} else {
			setNewImages(true);
		}
	}, []);

	useEffect(() => {
		getLocation();
		storeImageThumbnails();
		cacheImageThumbnails();
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
						{mobileView ? (
							<div className='d-flex flex-column justify-content-center align-items-center'>
								<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />

								<div>
									<Weather lat={latitude} long={longitude} date={currentDate} name='Local' />
								</div>
							</div>
						) : (
							<div className='d-flex justify-content-around'>
								<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />

								<div>
									<Weather lat={latitude} long={longitude} date={currentDate} name='Local' />
								</div>
							</div>
						)}
					</div>
				) : (
					<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />
				)}

				<p className='ms-4 mt-5'>Also, here's some cute puppies</p>
			</div>

			{newImages && <h4 className={mobileView ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>New Images!</h4>}

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
				<h2>I know they're cute though so I'll allow it</h2>
			</div>

			<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
				{pictures.map((img) => {
					if (img.description.startsWith('Dogs')) {
						return (
							<div
								onClick={() => displayImage(pictures.indexOf(img))}
								key={img.img_id}
								className={`image-container ${img.cached && newImages ? 'old-img' : !img.cached && newImages ? 'new-img' : ''}`}>
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

			<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Merlinie</h3>
			<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
				{pictures.map((img) => {
					if (img.description.startsWith('Merlinie')) {
						return (
							<span
								onClick={() => displayImage(pictures.indexOf(img))}
								key={img.img_id}
								className={`image-container ${img.cached && newImages ? 'old-img' : !img.cached && newImages ? 'new-img' : ''}`}>
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
			<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Cujo</h3>
			<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
				{pictures.map((img) => {
					if (img.description.startsWith('Cujo')) {
						return (
							<span
								onClick={() => displayImage(pictures.indexOf(img))}
								key={img.img_id}
								className={`image-container ${img.cached && newImages ? 'old-img' : !img.cached && newImages ? 'new-img' : ''}`}>
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
			<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Mattie</h3>
			<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
				{pictures.map((img) => {
					if (img.description.startsWith('Mattie')) {
						return (
							<span
								onClick={() => displayImage(pictures.indexOf(img))}
								key={img.img_id}
								className={`image-container ${img.cached && newImages ? 'old-img' : !img.cached && newImages ? 'new-img' : ''}`}>
								<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			</div>

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
			{/* <NewsModal close={close} show={showNewsModal} newsString='We went to Japan for a week and here are pictures to prove it!' /> */}
		</AppLayout>
	);
}
