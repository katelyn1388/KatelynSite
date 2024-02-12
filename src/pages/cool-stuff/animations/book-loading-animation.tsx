import { useEffect } from 'react';
import { ReactComponent as BookLoadingAnimationSvg } from '../../../assets/book-loading-animation.svg';
import { Play } from './bookPlayer';

export default function BookLoadingAnimation() {
	useEffect(() => {
		Play();
	}, []);
	return <BookLoadingAnimationSvg />;
}
