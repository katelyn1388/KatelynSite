import Modal from 'react-bootstrap/Modal';
import { washingtonImages } from '../pages/washington/images-array';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseMobileView } from '../hooks/use-mobile-view';

export default function ImageModal({ imgIndex, show, close }: { imgIndex: number | null; show: boolean; close: () => void }) {
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const modalLinkSecond = useMemo(() => '=s4000?authuser=0', []);
	const [index, setIndex] = useState(imgIndex);
	const [orientation, setOrientation] = useState('portrait');
	const [imgWidth, setImgWidth] = useState('100%');

	const mobileView = UseMobileView();

	useEffect(() => {
		setIndex(imgIndex);
	}, [imgIndex]);

	useEffect(() => {
		if (mobileView) {
			if (orientation === 'portrait') {
				setImgWidth('60%');
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
	}, [orientation, mobileView]);

	useEffect(() => {
		console.log(orientation);
	}, [orientation]);

	const changePhoto = useCallback(
		(next: boolean) => {
			if (index) {
				if (next && washingtonImages[index + 1]) {
					setIndex(index + 1);
				} else if (!next && washingtonImages[index - 1]) {
					setIndex(index - 1);
				} else {
					setIndex(1);
				}
			}
		},
		[index]
	);

	return (
		<div>
			<Modal show={show} onHide={close} centered size={mobileView ? 'sm' : undefined}>
				<Modal.Header closeButton></Modal.Header>

				<Modal.Body className='modal-body'>
					{index !== null && index !== undefined && (
						<img
							onLoad={(e) => {
								const image = e.target as HTMLImageElement;
								const aspectRatio = image.naturalWidth / image.naturalHeight;

								if (aspectRatio > 1) {
									setOrientation('landscape');
								} else if (aspectRatio < 1) {
									setOrientation('portrait');
								} else {
									setOrientation('square');
								}
							}}
							src={`${modalLinkFirst}${washingtonImages[index].img_id}${modalLinkSecond}`}
							alt='Modal Pic'
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
