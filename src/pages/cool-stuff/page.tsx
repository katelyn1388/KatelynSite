import { AppLayout } from '../layout';
import BusAnimation from './animations/busAnimation';
import BookAnimation from './animations/book-loading-animation';
import AlienAnimation from './animations/alien-loading-animation';
import Board from './games/tic-tac-toe-game';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { AgeGuesser } from './games/age-guessing';
import DogLoadingAnimation from '../../components/loaders/dog-loader';
import PolaroidLoading from '../../components/loaders/polaroid-animation';

export default function Page() {
	const mobileView = UseMobileView();

	return (
		<AppLayout title='Cool Stuff'>
			<div>
				<h3 className='mt-2 ms-3'>Animations</h3>
				<div className='w-75'>
					<BusAnimation />
				</div>
				{mobileView ? (
					<div>
						<div className='w-50'>
							<BookAnimation />
						</div>
						<div className='w-50'>
							<AlienAnimation />
						</div>
					</div>
				) : (
					<div className='d-flex justify-content-between'>
						<BookAnimation />
						<AlienAnimation />
					</div>
				)}
				{mobileView ? (
					<div>
						<div className='w-50'>
							<PolaroidLoading />
						</div>
						<div className='w-50'>
							<DogLoadingAnimation />
						</div>
					</div>
				) : (
					<div className='d-flex justify-content-around'>
						<div style={{ width: '35%' }}>
							<PolaroidLoading />
						</div>
						<div style={{ width: '35%' }}>
							<DogLoadingAnimation />
						</div>
					</div>
				)}
			</div>
			<br />
			<br />
			<br />
			<div className='m-3 mt-5'>
				<h3 className='mt-5 ms-3'>Games</h3>
				<div className='game-row'>
					<div>
						<h4 className='mt-4 ms-3 text-center me-3'>Tic-Tac-Toe</h4>
						<div className=' d-flex justify-content-center'>
							<Board />
						</div>
					</div>
					<div className='mt-5'>
						<h4 className='mt-5 ms-3 text-center me-3'>Age Guesser</h4>
						<AgeGuesser />
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
