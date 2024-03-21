import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { newZealandPictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { UseMobileView } from '../../hooks/use-mobile-view';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const [imageDescription, setImageDescription] = useState('');
	const isMobile = UseMobileView();
	const videoWidth = useMemo(() => (isMobile ? 300 : 500), [isMobile]);
	const videoHeight = useMemo(() => (isMobile ? 175 : 250), [isMobile]);

	const date = useMemo(() => new Date(), []);
	const newZealandDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Pacific/Auckland', timeStyle: 'short', dateStyle: 'short' }),
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

	useEffect(() => {
		if (selectedImage !== null && newZealandPictures[selectedImage].description.includes(';')) {
			setImageDescription(newZealandPictures[selectedImage].description.split(';')[1]);
		} else {
			setImageDescription('');
		}
	}, [selectedImage]);

	return (
		<AppLayout title='New Zealand'>
			<div className='country-header'>
				<CountryBigFacts country='New Zealand' />
				<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
			</div>

			<h3 className='mt-2 ms-3'>Auckland</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (img.description.startsWith('Auckland')) {
						return (
							<span onClick={() => displayImage(newZealandPictures.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Auckland Img'
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
			<iframe
				src='https://www.youtube.com/embed/8Ymew8YpAGM'
				title='Skyjump Auckland'
				allowFullScreen
				width={videoWidth}
				height={videoHeight}
			/>

			<h3 className='mt-2 ms-3'>Hamilton Gardens</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (img.description === 'Hamilton Gardens') {
						return (
							<span onClick={() => displayImage(newZealandPictures.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Auckland Img'
									className='m-3 rounded image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}

			<h3 className='mt-2 ms-3'>Rotorua</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (img.description.startsWith('Rotorua')) {
						return (
							<span onClick={() => displayImage(newZealandPictures.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Rotorua Img'
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

			<iframe
				src='https://www.youtube.com/embed/2pHpjD82wUo'
				title='Skyline Rotorua'
				allowFullScreen
				width={videoWidth}
				height={videoHeight}
			/>
			<iframe
				src='https://www.youtube.com/embed/M51vGr-fg80'
				title='Luge Ride'
				allowFullScreen
				width={videoWidth}
				height={videoHeight}
			/>

			<h3 className='mt-2 ms-3'>Random</h3>
			{newZealandPictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (img.description.startsWith('Random')) {
						return (
							<span onClick={() => displayImage(newZealandPictures.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Rotorua Img'
									className='m-3 rounded image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal
				close={close}
				show={showImageModal}
				imgIndex={selectedImage}
				imageArray={newZealandPictures}
				description={imageDescription}
			/>
		</AppLayout>
	);
}
