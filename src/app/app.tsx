import { Routing } from '../routing/routing';
import ReactGA from 'react-ga4';
import { clarity } from 'react-microsoft-clarity';

export function App() {
	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '');
	clarity.init(process.env.REACT_APP_MICROSOFT_CLARITY_ID || '');
	return <Routing />;
}
