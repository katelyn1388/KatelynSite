import Modal from 'react-bootstrap/Modal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseMobileView } from '../hooks/use-mobile-view';
import { ImageType } from '../types/image-type';

type ModalSize = 'sm' | 'lg' | 'xl' | undefined;

export default function ImageModal({
	imgIndex,
	show,
	close,
	imageArray,
	description,
}: {
	imgIndex: number | null;
	show: boolean;
	close: () => void;
	imageArray: ImageType[];
	description?: string;
}) {
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const [index, setIndex] = useState(imgIndex);
	const [orientation, setOrientation] = useState('portrait');
	const [imgWidth, setImgWidth] = useState('100%');
	const [ratio, setRatio] = useState(0);
	const [modalSize, setModalSize] = useState<ModalSize>(undefined);

	const mobileView = UseMobileView();

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
		console.log(orientation);
	}, [orientation]);

	useEffect(() => {
		if (mobileView) {
			setModalSize('sm');
		} else if (orientation === 'portrait') {
			setModalSize(undefined);
		} else {
			setModalSize('xl');
		}
	}, [orientation, mobileView]);

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

	return (
		<div>
			<Modal show={show} onHide={close} centered size={modalSize}>
				{/* <Modal show={show} onHide={close} centered size={mobileView ? 'sm' : 'xl'}> */}
				<Modal.Header closeButton>{description}</Modal.Header>

				<Modal.Body className='modal-body'>
					{index !== null && index !== undefined && (
						<img
							onLoad={(e) => {
								const image = e.target as HTMLImageElement;
								const aspectRatio = image.naturalWidth / image.naturalHeight;
								setRatio(aspectRatio);
								console.log(aspectRatio);

								if (aspectRatio > 1) {
									setOrientation('landscape');
								} else if (aspectRatio < 1) {
									setOrientation('portrait');
								} else {
									setOrientation('square');
								}
							}}
							src={`${modalLinkFirst}${imageArray[index].img_id}${modalLinkSecond}`}
							alt={`Modal Pic: ${ratio}`}
							width={imgWidth}
							className='align-self-center'
						/>
					)}
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
