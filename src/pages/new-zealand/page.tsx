import { useCallback, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { newZealandPictures } from './pictures';
import ImageModal from '../../components/image-modal';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
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

	return (
		<AppLayout title='New Zealand'>
			<div className='country-header'>
				<CountryBigFacts country='New Zealand' />
				<Weather lat={-36.850109} long={174.7677} date={newZealandDate} />
			</div>

			<h3 className='mt-2 ms-3'>Auckland</h3>
			{newZealandPictures.map((img) => {
				if (img.description === 'Auckland') {
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
			<iframe src='https://www.youtube.com/embed/8Ymew8YpAGM' title='Skyjump Auckland' allowFullScreen width={500} height={250} />

			<h3 className='mt-2 ms-3'>Hamilton Gardens</h3>
			{newZealandPictures.map((img) => {
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
			{newZealandPictures.map((img) => {
				if (img.description === 'Rotorua') {
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

			<iframe src='https://www.youtube.com/embed/2pHpjD82wUo' title='Skyline Rotorua' allowFullScreen width={500} height={250} />
			<iframe src='https://www.youtube.com/embed/M51vGr-fg80' title='Luge Ride' allowFullScreen width={500} height={250} />

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>
			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={newZealandPictures} />
		</AppLayout>
	);
}
