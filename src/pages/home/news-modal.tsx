import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export default function NewsModal({ newsString, show, close }: { newsString: string; show: boolean; close: () => void }) {
	return (
		<div>
			<Modal show={show} onHide={close} centered>
				<Modal.Header closeButton>
					<h2>New Page Alert!</h2>
				</Modal.Header>
				<Modal.Body className='modal-body'>
					<div className='row text-center'>
						<h5 className='column'>{newsString}</h5>
						<h6 className='column'>Check it out!</h6>
						<br />
						<br />
						<span className='column'>
							<Link to='/japan' className='nav-link text-decoration-underline'>
								<h5>Japan</h5>
							</Link>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
