import { CustomTheme } from '../../types/custom-theme';

export function updateBodyElements({ primary, background, text }: CustomTheme) {
	document.body.style.setProperty('--bs-primary', primary);
	document.body.style.setProperty('--bs-body-bg', background);
	document.body.style.setProperty('--bs-body-color', text);
	return;
}
