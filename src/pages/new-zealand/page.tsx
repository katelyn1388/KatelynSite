import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { newZealandPictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { ImageType } from '../../types/image-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const isMobile = UseMobileView();
	const videoWidth = useMemo(() => (isMobile ? 300 : 500), [isMobile]);
	const videoHeight = useMemo(() => (isMobile ? 175 : 250), [isMobile]);
	const thumbnailLink = useMemo(() => 'https://drive.google.com/thumbnail?id=', []);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const date = useMemo(() => new Date(), []);
	const newZealandDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Pacific/Auckland', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	const [searchString, setSearchString] = useState<string>('');

	const displayImage = useCallback((img: number) => {
		setShowImageModal(true);
		setSelectedImage(img);
	}, []);

	const close = useCallback(() => {
		setShowImageModal(false);
		setSelectedImage(null);
	}, []);

	// const cacheImageThumbnails = async (imagesArray: ImageType[]) => {
	// 	const promises = await imagesArray.map((src) => {
	// 		return new Promise(function (resolve, reject) {
	// 			const img = new Image();

	// 			img.src = thumbnailLink + src.img_id;
	// 			// img.onload = resolve();
	// 			// img.onerror = reject();
	// 		});
	// 	});

	// 	await Promise.all(promises);
	// };

	const cacheImageModals = async (imagesArray: ImageType[]) => {
		const promises = await imagesArray.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + modalLinkSecond;
				// img.onload = resolve();
				// img.onerror = reject();
			});
		});

		await Promise.all(promises);
	};

	useEffect(() => {
		//sscacheImageThumbnails(newZealandPictures);
		cacheImageModals(newZealandPictures);
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='New Zealand'>
			<div className='country-header'>
				<CountryBigFacts country='New Zealand' />
				<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
			</div>
			<div className='ms-2 mt-3'>
				<label>Search by Description</label>
				<div className='d-flex'>
					<input
						className={`${isMobile ? 'w-75' : 'w-25'} form-control search-bar`}
						onChange={(e) => searchValueChange(e.target.value)}
						value={searchString}
					/>
					{searchString.length > 0 ? (
						<button onClick={() => setSearchString('')} className='search-bar-btn'>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					) : (
						<button className='search-bar-btn'>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					)}
				</div>
			</div>

			<h3 className='mt-3 ms-3'>Auckland</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (
						img.description.startsWith('Auckland') &&
						(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
					) {
						return (
							<span
								onClick={() => displayImage(newZealandPictures.indexOf(img))}
								key={img.img_id}
								className='image-container'>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Auckland Img'
									className='image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			<br />
			{searchString.length === 0 || 'skyline auckland video skyjump'.includes(searchString.toLowerCase()) ? (
				<iframe
					src='https://www.youtube.com/embed/8Ymew8YpAGM'
					title='Skyjump Auckland'
					allowFullScreen
					width={videoWidth}
					height={videoHeight}
				/>
			) : (
				<span></span>
			)}

			<h3 className='mt-3 ms-3'>Hamilton Gardens</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (
						img.description === 'Hamilton Gardens' &&
						(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
					) {
						return (
							<span
								onClick={() => displayImage(newZealandPictures.indexOf(img))}
								key={img.img_id}
								className='image-container'>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Auckland Img'
									className='image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}

			<h3 className='mt-3 ms-3'>Rotorua</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (
						img.description.startsWith('Rotorua') &&
						(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
					) {
						return (
							<span
								onClick={() => displayImage(newZealandPictures.indexOf(img))}
								key={img.img_id}
								className='image-container'>
								<img src={`${thumbnailLink}${img.img_id}`} alt='Rotorua Img' className='image-thumbnail' key={img.img_id} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			<br />
			{searchString.length === 0 || 'Skyline Rotorua video sky swing luge zipline'.includes(searchString) ? (
				<iframe
					src='https://www.youtube.com/embed/2pHpjD82wUo'
					title='Skyline Rotorua'
					allowFullScreen
					width={videoWidth}
					height={videoHeight}
				/>
			) : (
				<span></span>
			)}

			{searchString.length === 0 || 'Skyline Rotorua video luge ride '.includes(searchString) ? (
				<iframe
					src='https://www.youtube.com/embed/M51vGr-fg80'
					title='Luge Ride'
					allowFullScreen
					width={videoWidth}
					height={videoHeight}
				/>
			) : (
				<span></span>
			)}

			<h3 className='mt-3 ms-3'>Random</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (
						img.description.startsWith('Random') &&
						(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
					) {
						return (
							<span
								onClick={() => displayImage(newZealandPictures.indexOf(img))}
								key={img.img_id}
								className='image-container'>
								<img src={`${thumbnailLink}${img.img_id}`} alt='Random Img' className='image-thumbnail' key={img.img_id} />
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}
			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={newZealandPictures} />
		</AppLayout>
	);
}
