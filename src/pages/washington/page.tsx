import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import ImageModal from '../../components/image-modal';
import { washingtonImages } from './images-array';
import { Weather } from '../../components/weather';
import { ImageType } from '../../types/image-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UseMobileView } from '../../hooks/use-mobile-view';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const date = useMemo(() => new Date(), []);
	const isMobile = UseMobileView();
	const thumbnailLink = useMemo(() => 'https://drive.google.com/thumbnail?id=', []);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const seattleDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'America/Los_Angeles', timeStyle: 'short', dateStyle: 'short' }),
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

	const cacheImageThumbnails = async (imagesArray: ImageType[]) => {
		const promises = await imagesArray.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = thumbnailLink + src.img_id;
				// img.onload = resolve();
				// img.onerror = reject();
			});
		});

		await Promise.all(promises);
	};

	const cacheImageModals = async (imagesArray: ImageType[]) => {
		const promises = await imagesArray.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + modalLinkSecond;
				// img.onload = resolve();
				//img.onerror = reject();
			});
		});

		await Promise.all(promises);
		console.log('Finished caching images!');
	};

	useEffect(() => {
		cacheImageThumbnails(washingtonImages);
		cacheImageModals(washingtonImages);
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='Washington'>
			<div className='d-print-none'>
				<Weather lat={47.6061} long={-122.3328} date={seattleDate} />

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

				<h3 className='mt-2 ms-3'>Seattle</h3>
				{washingtonImages
					.sort((a, b) => a.description.localeCompare(b.description))
					.map((img) => {
						if (
							img.description.startsWith('Seattle') &&
							(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
						) {
							return (
								<span
									onClick={() => displayImage(washingtonImages.indexOf(img))}
									key={img.img_id}
									className='image-container'>
									<img
										src={`${thumbnailLink}${img.img_id}`}
										alt='Seattle Img'
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

				<h3 className='mt-2 ms-3'>Port Angeles</h3>
				{washingtonImages
					.sort((a, b) => a.description.localeCompare(b.description))
					.map((img) => {
						if (
							img.description.startsWith('Port Angeles') &&
							(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
						) {
							return (
								<span
									onClick={() => displayImage(washingtonImages.indexOf(img))}
									key={img.img_id}
									className='image-container'>
									<img
										src={`${thumbnailLink}${img.img_id}`}
										alt='Port Angeles Img'
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

				<h3 className='mt-2 ms-3'>Cape Flattery</h3>
				{washingtonImages
					.sort((a, b) => a.description.localeCompare(b.description))
					.map((img) => {
						if (
							img.description.startsWith('Cape Flattery') &&
							(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
						) {
							return (
								<span
									onClick={() => displayImage(washingtonImages.indexOf(img))}
									key={img.img_id}
									className='image-container'>
									<img
										src={`${thumbnailLink}${img.img_id}`}
										alt='Cape Flattery Img'
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
				<h3 className='mt-2 ms-3'>Random</h3>
				{washingtonImages
					.sort((a, b) => a.description.localeCompare(b.description))
					.map((img) => {
						if (
							img.description.startsWith('Random') &&
							(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
						) {
							return (
								<span
									onClick={() => displayImage(washingtonImages.indexOf(img))}
									key={img.img_id}
									className='image-container'>
									<img
										src={`${thumbnailLink}${img.img_id}`}
										alt='Random Img'
										className='image-thumbnail'
										key={img.img_id}
									/>
								</span>
							);
						} else {
							return <span key={img.img_id}></span>;
						}
					})}
			</div>
			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={washingtonImages} />
		</AppLayout>
	);
}
