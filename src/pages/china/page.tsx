import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ImageComponent } from '../../components/image-component';
import NewImagesModal from '../../components/new-images-modal';
import ReactGA from 'react-ga4';

export default function Page() {
	ReactGA.send({
		hitType: 'pageview',
		page: '/china',
		title: 'China',
	});

	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const { mobileView } = UseMobileView();
	const date = useMemo(() => new Date(), []);
	const ChinaDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Asia/Shanghai', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500', []);
	const [searchString, setSearchString] = useState<string>('');
	const [newImages, setNewImages] = useState(false);
	const [cachedIds, setCachedIds] = useState('');
	const [showNewImageModal, setShowNewImageModal] = useState(false);
	const [countryError, setCountryError] = useState(false);

	const displayImage = useCallback((img: number) => {
		setShowImageModal(true);
		setSelectedImage(img);
	}, []);

	const close = useCallback(() => {
		setShowImageModal(false);
		setShowNewImageModal(false);
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

	useEffect(() => {
		const storedImageIds: string = localStorage.getItem('ChinaImgs') || '';
		setCachedIds(storedImageIds);
		const tempEmptyCache = storedImageIds.length <= 0 ? true : false;
		let tempNotCachedCount = 0;
		let addIds: string = '';

		pictures.forEach((img) => {
			if (storedImageIds?.includes(img.img_id)) {
			} else {
				addIds = addIds + `, ${img.img_id}`;
				tempNotCachedCount += 1;
			}
		});

		localStorage.setItem('ChinaImgs', storedImageIds.concat(addIds));
		if (tempEmptyCache === true || tempNotCachedCount === 0) {
			setNewImages(false);
		} else {
			setNewImages(true);
			setShowNewImageModal(true);
		}
	}, []);

	useEffect(() => {
		cacheImageThumbnails();
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='China'>
			<div className='d-print-none'>
				<div className={mobileView ? 'justify-content-center d-flex' : ''}>
					<div className='country-header'>
						{!countryError ? <CountryBigFacts country='China' setCountryError={setCountryError} /> : null}
						<Weather lat={23.128994} long={113.25325} date={ChinaDate} />
					</div>
				</div>

				<div className={mobileView ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>
					<label>Search Images</label>
					<div className='d-flex'>
						<input
							className={`${mobileView ? 'w-75' : 'w-25'} form-control search-bar`}
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Guangzhou</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Guangzhou') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Hong Kong</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Hong Kong') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Dali</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Dali') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Lijiang</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Lijiang') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Chongqing</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Chongqing') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
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
			</div>

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
			<NewImagesModal show={showNewImageModal} close={close} />
		</AppLayout>
	);
}
