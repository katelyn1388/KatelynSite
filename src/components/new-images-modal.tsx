import Modal from 'react-bootstrap/Modal';

export default function NewImagesModal({ show, close }: { show: boolean; close: () => void }) {
	return (
		<div>
			<Modal show={show} onHide={close} centered>
				<Modal.Header closeButton>
					<h2>New Images Just Dropped!</h2>
				</Modal.Header>
				<Modal.Body className='modal-body'>
					<div className='row text-center'>
						<h6 className='column'>New images have been added, they're highlighted for you to check out</h6>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
