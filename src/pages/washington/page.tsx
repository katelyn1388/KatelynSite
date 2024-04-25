import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import ImageModal from '../../components/image-modal';
import { pictures } from './images-array';
import { Weather } from '../../components/weather';
import { ImageType } from '../../types/image-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { ImageComponent } from '../../components/image-component';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const date = useMemo(() => new Date(), []);
	const { mobileView } = UseMobileView();
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500', []);
	const seattleDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'America/Los_Angeles', timeStyle: 'short', dateStyle: 'short' }),
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
		const storedImageIds: string = localStorage.getItem('washingtonImgs') || '';
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

		localStorage.setItem('washingtonImgs', storedImageIds.concat(addIds));
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
		<AppLayout title='Washington'>
			<div className='d-print-none'>
				<div className='d-flex justify-content-center align-items-center'>
					<Weather lat={47.6061} long={-122.3328} date={seattleDate} />
				</div>

				<div className={mobileView ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>
					<label>Search by Description</label>
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Seattle</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Seattle') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Port Angeles</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Port Angeles') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Cape Flattery</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Cape Flattery') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
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
			</div>

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
		</AppLayout>
	);
}
