import Modal from 'react-bootstrap/Modal';
import { washingtonImages } from '../pages/washington/images-array';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function ImageModal({ imgIndex, show, close }: { imgIndex: number | null; show: boolean; close: () => void }) {
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	// const modalLinkSecond = useMemo(() => '?authuser=0', []);
	const modalLinkSecond = useMemo(() => '=s600?authuser=0', []);

	const [index, setIndex] = useState(imgIndex);

	useEffect(() => {
		setIndex(imgIndex);
	}, [imgIndex]);

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
			{/* Makes horizontal ones work but others break */}
			{/* <Modal show={show} onHide={close} centered size='lg'> */}
			<Modal show={show} onHide={close} centered>
				<Modal.Header closeButton></Modal.Header>

				<Modal.Body>
					{imgIndex && index && (
						<img
							src={`${modalLinkFirst}${washingtonImages[index].img_id}${modalLinkSecond}`}
							alt='Modal Pic'
							className='m-1'
							height='100%'
							width='100%'
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

//receive index of image array
