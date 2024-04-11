import { Img } from 'react-image';
import { ImageLoader } from './loaders/image-loader';

export function ImageComponent({ imgId, linkEnd }: { imgId: string; linkEnd: string }) {
	return (
		<Img
			src={`https://lh3.googleusercontent.com/d/${imgId}${linkEnd}`}
			loader={<ImageLoader />}
			alt='Sydney Img'
			className='align-self-center image-thumbnail'
			unloader={<div>Error Alert!</div>}
			key={imgId}
		/>
	);
}
