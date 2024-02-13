import { AppLayout } from '../layout';
import MultipleUsersAndGroupsAnimation from './animations/multiple-users-and-groups-animation';
import BusAnimation from './animations/busAnimation';
import BookAnimation from './animations/book-loading-animation';
import AlienAnimation from './animations/alien-loading-animation';
import Board from './games/tic-tac-toe-game';
import { UseMobileView } from '../../hooks/use-mobile-view';

export default function Page() {
	const mobileView = UseMobileView();

	return (
		<AppLayout title='Cool Stuff'>
			<div>
				<h3 className='mt-2 ms-3'>Animations</h3>
				{/* <MultipleUsersAndGroupsAnimation /> */}
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
			</div>
			<br />
			<br />
			<br />
			<div className='m-3 mt-5'>
				<h3 className='mt-5 ms-3'>Games</h3>
				<div>
					<h4 className='mt-4 ms-3'>Tic-Tac-Toe</h4>
					<Board />
				</div>
			</div>
		</AppLayout>
	);
}
