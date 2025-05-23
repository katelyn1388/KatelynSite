import Modal from 'react-bootstrap/Modal';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseMobileView } from '../hooks/use-mobile-view';
import { ImageType } from '../types/image-type';
import { Img } from 'react-image';
import PolaroidLoading from './loaders/polaroid-animation';
import ImageUnloaded from './loaders/image-unloaded';

type ModalSize = 'sm' | 'lg' | 'xl' | undefined;

export default function ImageModal({
	imgIndex,
	show,
	close,
	imageArray,
}: {
	imgIndex: number | null;
	show: boolean;
	close: () => void;
	imageArray: ImageType[];
}) {
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const [index, setIndex] = useState(imgIndex);
	const [orientation, setOrientation] = useState('portrait');
	const [imgWidth, setImgWidth] = useState('100%');
	const [ratio, setRatio] = useState(0);
	const [modalSize, setModalSize] = useState<ModalSize>(undefined);
	const retryCount = useRef<number>(0);
	const [retryKey, setRetryKey] = useState(0);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') {
				changePhoto(true);
			} else if (event.key === 'ArrowLeft') {
				changePhoto(false);
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	});

	useEffect(() => {
		if (index === null) return;

		const preloadImage = (src: string) => {
			const img = new Image();
			img.src = src;
		};

		const modalLinkFirst = 'https://lh3.googleusercontent.com/d/';
		const modalLinkSecond = '=s4000?authuser=0';

		if (index > 0) {
			preloadImage(modalLinkFirst + imageArray[index - 1].img_id + modalLinkSecond);
		}
		if (index < imageArray.length - 1) {
			preloadImage(modalLinkFirst + imageArray[index + 1].img_id + modalLinkSecond);
		}
	}, [index, imageArray]);

	const { mobileView } = UseMobileView();
	const { tabletView } = UseMobileView();

	useEffect(() => {
		setIndex(imgIndex);
	}, [imgIndex]);

	useEffect(() => {
		if (mobileView) {
			if (orientation === 'portrait') {
				if (ratio < 0.82 && ratio > 0.7) {
					setImgWidth('100%');
				} else {
					setImgWidth('70%');
				}
			} else {
				setImgWidth('100%');
			}
		} else {
			if (orientation === 'portrait') {
				setImgWidth('80%');
			} else {
				setImgWidth('100%');
			}
		}
	}, [orientation, mobileView, ratio]);

	useEffect(() => {
		if (mobileView) {
			setModalSize('sm');
		} else if (tabletView) {
			if (orientation === 'portrait') {
				setModalSize('sm');
			} else {
				setModalSize(undefined);
			}
		} else if (orientation === 'portrait') {
			setModalSize(undefined);
		} else {
			setModalSize('xl');
		}
	}, [orientation, mobileView, tabletView]);

	const changePhoto = useCallback(
		(next: boolean) => {
			if (index) {
				if (next && imageArray[index + 1]) {
					setIndex(index + 1);
				} else if (!next && imageArray[index - 1]) {
					setIndex(index - 1);
				} else {
					setIndex(1);
				}
			}
		},
		[imageArray, index]
	);

	const handleError = () => {
		console.log('Image failed to load, retrying...');
		if (retryCount.current < 5) {
			setTimeout(() => {
				retryCount.current += 1;
				setRetryKey((prev) => prev + 1);
			}, 1000);
		}
	};

	return (
		<div>
			<Modal show={show} onHide={close} centered size={modalSize}>
				<Modal.Header closeButton>{index !== null && imageArray[index].description.split(';')[1]}</Modal.Header>

				<Modal.Body className='modal-body'>
					<div className='justify-content-center d-flex align-items-center'>
						{index !== null && index !== undefined && (
							<Img
								key={`img-${retryKey}`}
								src={`${modalLinkFirst}${imageArray[index].img_id}${modalLinkSecond}`}
								onLoad={(e) => {
									const image = e.target as HTMLImageElement;
									const aspectRatio = image.naturalWidth / image.naturalHeight;
									setRatio(aspectRatio);

									if (aspectRatio > 1) {
										setOrientation('landscape');
									} else if (aspectRatio < 1) {
										setOrientation('portrait');
									} else {
										setOrientation('square');
									}
								}}
								loader={
									<div className='d-flex justify-content-center'>
										<div className='w-50'>
											<PolaroidLoading />
											<h3 className='text-center'>Image Loading...</h3>
										</div>
									</div>
								}
								alt={`Modal Pic: ${ratio}`}
								width={imgWidth}
								className='align-self-center'
								unloader={
									<div className='w-50 text-center'>
										<ImageUnloaded />
										<p>Image Failed</p>
									</div>
								}
								onError={handleError}
								style={imageArray[index].flipped ? { transform: 'rotate(180deg)' } : {}}
							/>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className='d-flex justify-content-between'>
						<button className='btn' onClick={() => changePhoto(false)}>
							Previous
						</button>
						<button className='btn' onClick={() => changePhoto(true)}>
							Next
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
