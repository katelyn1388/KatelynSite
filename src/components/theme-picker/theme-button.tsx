import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ValidTheme } from './theme-picker';

export const ThemeButton = memo(
	({
		setTheme,
		theme,
		current,
		icon,
	}: {
		current: ValidTheme;
		theme: ValidTheme;
		setTheme: (theme: ValidTheme) => void;
		icon: IconProp;
	}) => (
		<button
			className={`btn btn-light my-1 px-2 ${current === theme ? 'btn-dark' : 'btn-light'}`}
			onClick={() => {
				setTheme(theme);
			}}>
			<FontAwesomeIcon icon={icon} />
		</button>
	)
);
