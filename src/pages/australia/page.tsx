import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const [imageDescription, setImageDescription] = useState('');
	const isMobile = UseMobileView();
	const videoWidth = useMemo(() => (isMobile ? 300 : 500), [isMobile]);
	const videoHeight = useMemo(() => (isMobile ? 175 : 250), [isMobile]);
	const date = useMemo(() => new Date(), []);
	const sydneyDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Australia/Sydney', timeStyle: 'short', dateStyle: 'short' }),
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
		if (selectedImage !== null && pictures[selectedImage].description.includes(';')) {
			setImageDescription(pictures[selectedImage].description.split(';')[1]);
		} else {
			setImageDescription('');
		}
	}, [selectedImage]);

	return (
		<AppLayout title='Australia'>
			<div className='country-header'>
				<CountryBigFacts country='Australia' />
				<Weather lat={-33.865143} long={151.2099} date={sydneyDate} />
			</div>

			<h3 className='mt-2 ms-3'>Sydney</h3>
			{pictures
				.sort((a, b) => a.description.localeCompare(b.description))
				.map((img) => {
					if (img.description.startsWith('Sydney')) {
						return (
							<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id}>
								<img
									src={`${thumbnailLink}${img.img_id}`}
									alt='Sydney Img'
									className='m-3 rounded image-thumbnail'
									key={img.img_id}
								/>
							</span>
						);
					} else {
						return <span key={img.img_id}></span>;
					}
				})}

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} description={imageDescription} />
		</AppLayout>
	);
}
