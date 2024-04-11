import PolaroidLoading from '../../components/loaders/polaroid-animation';

export function ImageLoader() {
	return (
		<div className='d-flex justify-content-center'>
			<div className='w-50'>
				<PolaroidLoading />
				<h3 className='text-center'>Image Loading...</h3>
			</div>
		</div>
	);
}
