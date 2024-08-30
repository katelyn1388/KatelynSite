import { Routing } from '../routing/routing';
import ReactGA from 'react-ga4';

export function App() {
	ReactGA.initialize('G-68HN5ZBH8T');
	return <Routing />;
}
