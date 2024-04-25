import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IndexPage from '../pages/home';
import WashingtonPage from '../pages/washington';
import AustraliaPage from '../pages/australia';
import NewZealandPage from '../pages/new-zealand';
import CoolStuffPage from '../pages/cool-stuff';
import JapanPage from '../pages/japan';

export const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<IndexPage />} path='/'></Route>
				<Route element={<WashingtonPage />} path='/washington'></Route>
				<Route element={<AustraliaPage />} path='/australia'></Route>
				<Route element={<NewZealandPage />} path='/newzealand'></Route>
				<Route element={<JapanPage />} path='/japan'></Route>
				<Route element={<CoolStuffPage />} path='/coolstuff'></Route>
			</Routes>
		</BrowserRouter>
	);
};
