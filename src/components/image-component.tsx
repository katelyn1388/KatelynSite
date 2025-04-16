import { Img } from 'react-image';
import ImageUnloaded from './loaders/image-unloaded';
import DogLoadingAnimation from './loaders/dog-loader';
import { useEffect, useRef } from 'react';

export function ImageComponent({ imgId, linkEnd }: { imgId: string; linkEnd: string }) {
	const retryCount = useRef<number>();

	useEffect(() => {
		if (retryCount.current === undefined) {
			retryCount.current = 0;
		}
	});

	const handleError = () => {
		console.log('Image failed to load, retrying...');
		if (retryCount.current !== undefined && retryCount.current < 3) {
			retryCount.current += 1;
			window.location.reload();
		}
	};

	return (
		<Img
			src={`https://lh3.googleusercontent.com/d/${imgId}${linkEnd}`}
			loader={<DogLoadingAnimation />}
			alt='Sick Pic'
			className='align-self-center image-thumbnail'
			unloader={<ImageUnloaded />}
			key={imgId}
			onError={handleError}
		/>
	);
}
