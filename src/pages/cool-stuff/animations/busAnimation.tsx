import { useEffect } from 'react';
import { ReactComponent as LearningHubBusSvg } from '../../../assets/bus.svg';
import { Play } from './busPlayer';

export default function BusAnimation() {
	useEffect(() => {
		Play();
	}, []);
	return <LearningHubBusSvg />;
}
