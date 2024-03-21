import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudMoon, faPalette } from '@fortawesome/free-solid-svg-icons';
import { ThemeButton } from './theme-button';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { themeDefaults } from './theme-defaults';
import { CustomTheme } from '../../types/custom-theme';
import { updateBodyElements } from './update-body-elements';

export type ValidTheme = 'light' | 'dark' | 'choice';

export function ThemePicker() {
	const [themeCookies, setThemeCookie] = useCookies(['theme', 'light']);
	const [colorChoiceCookie, setColorChoiceCookie] = useCookies(['colorChoice']);
	const [theme, setTheme] = useState(themeCookies.theme || 'light');
	const [colorChoices, setColorChoices] = useState(colorChoiceCookie || themeDefaults);
	const [showColorPicker, setShowColorPicker] = useState(false);

	// useEffect(() => {
	// 	document.body.className = theme;
	// 	if (theme === 'choice') {
	// 		updateBodyElements({
	// 			primary: colorChoices.primary,
	// 			background: colorChoices.background,
	// 			text: colorChoices.text,
	// 		});
	// 	}
	// }, []);

	return (
		<div>
			<div className='btn-group' role='group'>
				<ThemeButton current={theme} icon={faSun} setTheme={setTheme} theme='light' />
				<ThemeButton current={theme} icon={faPalette} setTheme={setTheme} theme='choice' onClick={() => setShowColorPicker(true)} />
				<ThemeButton current={theme} icon={faCloudMoon} setTheme={setTheme} theme='dark' />
			</div>
		</div>
	);
}
