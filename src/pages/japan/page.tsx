import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { ImageComponent } from '../../components/image-component';
import { Weather } from '../../components/weather';
import { UseMobileView } from '../../hooks/use-mobile-view';
import CountryBigFacts from '../../components/country-big-facts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const { mobileView } = UseMobileView();
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500', []);
	const date = useMemo(() => new Date(), []);
	const japanDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Asia/Tokyo', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	const [searchString, setSearchString] = useState<string>('');
	const [newImages, setNewImages] = useState(false);

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
		const storedImageIds: string = localStorage.getItem('japanImgs') || '';
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

		localStorage.setItem('japanImgs', storedImageIds.concat(addIds));
		if (emptyCache || notCachedCount === 0) {
			setNewImages(false);
		} else {
			setNewImages(true);
		}
	}, []);

	useEffect(() => {
		storeImageThumbnails();
		cacheImageThumbnails();
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='Japan'>
			<div className='d-print-none'>
				<div className={mobileView ? 'justify-content-center d-flex' : ''}>
					<div className='country-header'>
						<CountryBigFacts country='Japan' />
						<Weather lat={35.652832} long={139.839478} date={japanDate} />
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

				{newImages && <h4 className={mobileView ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>New Images!</h4>}

				<div className='print-only'>
					<h1>Why you trying to print this you weirdo?</h1>
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Tokyo</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Tokyo') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Kamakura</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Kamakura') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Random</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Random') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
		</AppLayout>
	);
}
