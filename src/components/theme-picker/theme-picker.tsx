import { faSun, faCloudMoon, faPalette } from '@fortawesome/free-solid-svg-icons';
import { ThemeButton } from './theme-button';
import { useCookies } from 'react-cookie';
import { useCallback, useEffect, useState } from 'react';
import { themeDefaults } from './theme-defaults';
import { CustomTheme } from '../../types/custom-theme';
import { updateBodyElements } from './update-body-elements';
import { ColorPickerModal } from './color-picker-modal';

export type ValidTheme = 'light' | 'dark' | 'choice';

export function ThemePicker() {
	const [themeCookies, setThemeCookie] = useCookies<string>(['theme']);
	const [colorChoiceCookie, setColorChoiceCookie] = useCookies(['colorChoice']);
	const [theme, setTheme] = useState(themeCookies.theme || 'light');
	const [colorChoices, setColorChoices] = useState<CustomTheme>(colorChoiceCookie.colorChoice || themeDefaults);
	const [showColorPicker, setShowColorPicker] = useState(false);

	useEffect(() => {
		document.body.className = theme;
		if (theme === 'choice') {
			updateBodyElements({
				primary: colorChoices.primary,
				background: colorChoices.background,
				text: colorChoices.text,
			});
		} else {
			updateBodyElements({ primary: '', background: '', text: '' });
		}
	}, [colorChoices.background, colorChoices.primary, colorChoices.text, theme]);

	useEffect(() => {
		const current = new Date();
		const nextYear = new Date();
		nextYear.setFullYear(current.getFullYear() + 5);
		setThemeCookie('theme', theme, { expires: nextYear });
	}, [theme]);

	useEffect(() => {
		const current = new Date();
		const nextYear = new Date();
		nextYear.setFullYear(current.getFullYear() + 1);
		setColorChoiceCookie('colorChoice', colorChoices, { expires: nextYear });
	}, [colorChoices]);

	const close = useCallback(() => {
		setShowColorPicker(false);
	}, []);

	useEffect(() => {
		console.log(showColorPicker);
	}, [showColorPicker]);

	return (
		<span className='btn-group' role='group'>
			<ThemeButton current={theme} icon={faSun} setTheme={() => setTheme('light')} theme='light' />
			<span onClick={() => setShowColorPicker(true)}>
				<ThemeButton current={theme} icon={faPalette} setTheme={() => setTheme('choice')} theme='choice' />
			</span>
			<ThemeButton current={theme} icon={faCloudMoon} setTheme={() => setTheme('dark')} theme='dark' />
			<ColorPickerModal close={close} colorChoice={colorChoices} setColorChoice={setColorChoices} showColorPicker={showColorPicker} />
		</span>
	);
}
