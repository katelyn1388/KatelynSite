import { Img } from 'react-image';
import ImageUnloaded from './loaders/image-unloaded';
import DogLoadingAnimation from './loaders/dog-loader';
import { useEffect, useRef, useState } from 'react';

export function ImageComponent({ imgId, linkEnd }: { imgId: string; linkEnd: string }) {
	const retryCount = useRef<number>(0);
	const [retryKey, setRetryKey] = useState(0);

	useEffect(() => {
		if (retryCount.current === undefined) {
			retryCount.current = 0;
		}
	});

	const handleError = () => {
		console.log('Image failed to load, retrying...');
		if (retryCount.current < 3) {
			setTimeout(() => {
				retryCount.current += 1;
				setRetryKey((prev) => prev + 1);
			}, 1000);
		}
	};

	return (
		<Img
			src={`https://lh3.googleusercontent.com/d/${imgId}${linkEnd}`}
			loader={<DogLoadingAnimation />}
			alt='Sick Pic'
			className='align-self-center image-thumbnail'
			unloader={<ImageUnloaded />}
			key={`${imgId}retry-${retryKey}`}
			onError={handleError}
		/>
	);
}
