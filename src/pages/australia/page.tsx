import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { ImageType } from '../../types/image-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const isMobile = UseMobileView();
	const date = useMemo(() => new Date(), []);
	const sydneyDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Australia/Sydney', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	// const thumbnailLink = useMemo(() => 'https://drive.google.com/thumbnail?id=', []);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const thumbnail2 = useMemo(() => '=s500', []);
	// const thumbnail2 = useMemo(() => '=s500?authuser=0', []);
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

	// 			img.src = modalLinkFirst + src.img_id + thumbnail2;
	// 		});
	// 	});

	// 	await Promise.all(promises);
	// };

	// const cacheImageModals = async (imagesArray: ImageType[]) => {
	// 	const promises = await imagesArray.map((src) => {
	// 		return new Promise(function (resolve, reject) {
	// 			const img = new Image();

	// 			img.src = modalLinkFirst + src.img_id + modalLinkSecond;
	// 		});
	// 	});

	// 	await Promise.all(promises);
	// };

	// useEffect(() => {
	// 	cacheImageThumbnails(pictures);
	// 	cacheImageModals(pictures);
	// }, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='Australia'>
			<div className='country-header'>
				<CountryBigFacts country='Australia' />
				<Weather lat={-33.865143} long={151.2099} date={sydneyDate} />
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

			<h3 className='mt-2 ms-3'>Sydney</h3>
			{pictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (
						img.description.startsWith('Sydney') &&
						(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
					) {
						return (
							<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
								<img
									src={`${modalLinkFirst}${img.img_id}${thumbnail2}`}
									alt='Sydney Img'
									className='image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
		</AppLayout>
	);
}
