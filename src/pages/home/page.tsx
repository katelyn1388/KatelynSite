import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { ImageType } from '../../types/image-type';
import { ImageComponent } from '../../components/image-component';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const thumbnail2 = useMemo(() => '=s500?', []);

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

	const cacheImageModals = async (imagesArray: ImageType[]) => {
		const promises = await imagesArray.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + modalLinkSecond;
			});
		});

		await Promise.all(promises);
	};

	useEffect(() => {
		cacheImageThumbnails(pictures);
		cacheImageModals(pictures);
	}, []);

	return (
		<AppLayout title='Home'>
			<h3>Kbow Travels</h3>
			<p>
				Pages for my travels in Washington, New Zealand, Australia, etc and Cool Stuff to show some animations I made and some games
			</p>
			<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' />

			<p>Also, here's some cute puppies</p>

			{pictures.map((img) => {
				if (img.description.startsWith('Dogs')) {
					return (
						<div onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
							<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
						</div>
					);
				} else {
					return <span key={img.img_id}></span>;
				}
			})}

			<br />
			<br />

			<h3 className='mt-2 ms-3'>Merlinie</h3>
			{pictures.map((img) => {
				if (img.description.startsWith('Merlinie')) {
					return (
						<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
							<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
						</span>
					);
				} else {
					return <span key={img.img_id}></span>;
				}
			})}

			<br />
			<br />
			<h3 className='mt-2 ms-3'>Cujo</h3>
			{pictures.map((img) => {
				if (img.description.startsWith('Cujo')) {
					return (
						<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
							<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
						</span>
					);
				} else {
					return <span key={img.img_id}></span>;
				}
			})}

			<br />
			<br />
			<h3 className='mt-2 ms-3'>Mattie</h3>
			{pictures.map((img) => {
				if (img.description.startsWith('Mattie')) {
					return (
						<span onClick={() => displayImage(pictures.indexOf(img))} key={img.img_id} className='image-container'>
							<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
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
