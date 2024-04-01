import { Link } from 'react-router-dom';
import LogoPic from '../../assets/Merlinie Logo.jpg';
import { useState } from 'react';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { ThemePicker } from '../theme-picker/theme-picker';

export function Header({ title }: { title: string }) {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	const toggleHamburger = () => {
		setHamburgerOpen(!hamburgerOpen);
	};

	const mobileView = UseMobileView();

	return (
		<div>
			{mobileView ? (
				<div className='header text-center pt-2 d-print-none row'>
					<div className='col navigation'>
						<div className='d-flex justify-content-start'>
							<div className='col' onClick={toggleHamburger}>
								<Hamburger isOpen={hamburgerOpen} />
							</div>
							<span className='d-inline'>
								<ThemePicker />
							</span>
						</div>
						<ul style={{ display: hamburgerOpen ? 'block' : 'none' }} className='dropdown-menu'>
							<li>
								<Link to='/' className={title === 'Home' ? 'active-page nav-link' : 'nav-link'}>
									Home
								</Link>
							</li>
							<li>
								<Link to='/washington' className={title === 'Washington' ? 'active-page nav-link' : 'nav-link'}>
									Washington
								</Link>
							</li>
							<li>
								<Link to='/australia' className={title === 'Australia' ? 'active-page nav-link' : 'nav-link'}>
									Australia
								</Link>
							</li>
							<li>
								<Link to='/newzealand' className={title === 'New Zealand' ? 'active-page nav-link' : 'nav-link'}>
									New Zealand
								</Link>
							</li>
							<li>
								<Link to='/coolstuff' className={title === 'Cool Stuff' ? 'active-page nav-link' : 'nav-link'}>
									Cool Stuff
								</Link>
							</li>
						</ul>
					</div>
					<div className='col'>
						<h2 className='page-title'>KB the Cool Kid</h2>
					</div>
				</div>
			) : (
				<div className='header text-center pt-2 d-print-none'>
					<img src={LogoPic} height='80px' width='80px' className='rounded logo m-3 mt-2' alt='Merlinie Logo' />
					<div className='d-flex justify-content-between'>
						<div></div>
						<h2 className='page-title ms-5'>Katelyn Bowers the Cool Kid</h2>
						<span className='align-right me-3'>
							<ThemePicker />
						</span>
					</div>
					<div className='nav-bar d-flex justify-content-evenly'>
						<div>
							<Link to='/' className={title === 'Home' ? 'active-page nav-link' : 'nav-link'}>
								Home
							</Link>
						</div>
						<div>
							<Link to='/washington' className={title === 'Washington' ? 'active-page nav-link' : 'nav-link'}>
								Washington
							</Link>
						</div>
						<div>
							<Link to='/australia' className={title === 'Australia' ? 'active-page nav-link' : 'nav-link'}>
								Australia
							</Link>
						</div>
						<div>
							<Link to='/newzealand' className={title === 'New Zealand' ? 'active-page nav-link' : 'nav-link'}>
								New Zealand
							</Link>
						</div>
						<div>
							<Link to='/coolstuff' className={title === 'Cool Stuff' ? 'active-page nav-link' : 'nav-link'}>
								Cool Stuff
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function Hamburger({ isOpen }: { isOpen: boolean }) {
	return (
		<div className='hamburger ms-2'>
			<div className='burger burger1' style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }} />
			<div className='burger burger2' style={{ transform: isOpen ? 'translateX(100%)' : 'translateX(0)', opacity: isOpen ? 0 : 1 }} />
			<div className='burger burger3' style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }} />
		</div>
	);
}
