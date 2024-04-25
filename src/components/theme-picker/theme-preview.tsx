import { CustomTheme } from '../../types/custom-theme';
import ImageUnloaded from '../loaders/image-unloaded';

export function ThemePreview({ primary, background, text }: CustomTheme) {
	return (
		<div className='border border-dark rounded w-75' style={{ backgroundColor: background, overflow: 'hidden' }}>
			<div className='row w-100 ps-4' style={{ backgroundColor: primary, top: '0', marginLeft: '.01rem', color: text }}>
				<h5 className='text-center'>Katelyn Bowers the Cool Kid</h5>
				<div className='d-flex justify-content-around'>
					<h6 style={{ opacity: '70%' }}>Home</h6>
					<h6>Washington</h6>
					<h6>Australia</h6>
					<h6>New Zealand</h6>
					<h6>Japan</h6>
					<h6>Cool Stuff</h6>
				</div>
			</div>
			<div className='ms-4' style={{ backgroundColor: background, height: '20rem' }}>
				<h4>Kbow Travels</h4>
				<img src='https://lh3.googleusercontent.com/d/1S1ClaQgrYTBS7gbR8hRjJTCbW4Ov9ffr=s400' alt='Sick Pic' width={'80rem'} />
				<h5 className='mt-3'>Pictures</h5>
				<div className='d-flex justify-content-around'>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
				</div>
				<div className='d-flex justify-content-around mt-2'>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
					<div style={{ width: '5rem' }}>
						<ImageUnloaded />
					</div>
				</div>
			</div>
		</div>
	);
}
