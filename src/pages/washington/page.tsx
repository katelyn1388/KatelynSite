import { useCallback, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import ImageModal from '../../components/image-modal';
import { washingtonImages } from './images-array';
import { Weather } from '../../components/weather';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const date = useMemo(() => new Date(), []);
	const seattleDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'America/Los_Angeles', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);

	const thumbnailLink = useMemo(() => 'https://drive.google.com/thumbnail?id=', []);

	const displayImage = useCallback((img: number) => {
		setShowImageModal(true);
		setSelectedImage(img);
	}, []);

	const close = useCallback(() => {
		setShowImageModal(false);
		setSelectedImage(null);
	}, []);

	return (
		<AppLayout title='Washington'>
			<div className='d-print-none'>
				<Weather lat={47.6061} long={-122.3328} date={seattleDate} />
				<h3 className='mt-2 ms-3'>Seattle</h3>
				{washingtonImages.map((img) => {
					if (img.description === 'Seattle') {
						return (
							<span onClick={() => displayImage(washingtonImages.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Seattle Img'
									className='m-3 rounded image-thumbnail'
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
				{washingtonImages.map((img) => {
					if (img.description === 'Port Angeles') {
						return (
							<span onClick={() => displayImage(washingtonImages.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Port Angeles Img'
									className='m-3 rounded image-thumbnail'
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
				{washingtonImages.map((img) => {
					if (img.description === 'Cape Flattery') {
						return (
							<span onClick={() => displayImage(washingtonImages.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Cape Flattery Img'
									className='m-3 rounded image-thumbnail'
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
				{washingtonImages.map((img) => {
					if (img.description === 'Random') {
						return (
							<span onClick={() => displayImage(washingtonImages.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Random Img'
									className='m-3 rounded image-thumbnail'
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
