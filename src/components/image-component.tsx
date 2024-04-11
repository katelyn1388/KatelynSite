import { Img } from 'react-image';
import ImageUnloaded from './loaders/image-unloaded';
import DogLoadingAnimation from './loaders/dog-loader';

export function ImageComponent({ imgId, linkEnd }: { imgId: string; linkEnd: string }) {
	return (
		<Img
			src={`https://lh3.googleusercontent.com/d/${imgId}${linkEnd}`}
			loader={<DogLoadingAnimation />}
			alt='Sick Pic'
			className='align-self-center image-thumbnail'
			unloader={<ImageUnloaded />}
			key={imgId}
		/>
	);
}
