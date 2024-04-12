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
import { ImageComponent } from '../../components/image-component';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const isMobile = UseMobileView();
	const videoWidth = useMemo(() => (isMobile ? 300 : 500), [isMobile]);
	const videoHeight = useMemo(() => (isMobile ? 175 : 250), [isMobile]);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500', []);
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
		cacheImageThumbnails(newZealandPictures);
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='New Zealand'>
			<div className='d-print-none'>
				<div className={isMobile ? 'justify-content-center d-flex' : ''}>
					<div className='country-header'>
						<CountryBigFacts country='New Zealand' />
						<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
					</div>
				</div>

				<div className={isMobile ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>
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
				<h3 className={isMobile ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Auckland</h3>
				<div className={isMobile ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
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
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>
				<br />

				<div className='d-flex justify-content-center'>
					s
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
				</div>

				<h3 className={isMobile ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Hamilton Gardens</h3>
				<div className={isMobile ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
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
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={isMobile ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Rotorua</h3>
				<div className={isMobile ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
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
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>
				<br />
				<div className='d-flex justify-content-center'>
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
				</div>

				<h3 className={isMobile ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Random</h3>
				<div className={isMobile ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
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
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>
			</div>

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={newZealandPictures} />
		</AppLayout>
	);
}
