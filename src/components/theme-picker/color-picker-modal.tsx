import Modal from 'react-bootstrap/Modal';
import { CustomTheme } from '../../types/custom-theme';
import { ThemeElement } from './theme-element';
import { useState } from 'react';
import { themeDefaults } from './theme-defaults';

export function ColorPickerModal({
	showColorPicker,
	close,
	colorChoice,
	setColorChoice,
}: {
	showColorPicker: boolean;
	close: () => void;
	colorChoice: CustomTheme;
	setColorChoice: (choice: CustomTheme) => void;
}) {
	const [primary, setPrimary] = useState(colorChoice.primary);
	const [background, setBackground] = useState(colorChoice.background);
	const [text, setText] = useState(colorChoice.text);

	return (
		<Modal>
			<Modal.Header closeButton>Choose Your Theme</Modal.Header>
			<Modal.Body className='modal-body'>
				<ThemeElement value={primary} setValue={setPrimary} elementName='Primary' defaultValue={themeDefaults.primary} />
				<ThemeElement
					value={background}
					setValue={setBackground}
					elementName='Background'
					defaultValue={themeDefaults.background}
				/>
				<ThemeElement value={text} setValue={setText} elementName='Text' defaultValue={themeDefaults.text} />
			</Modal.Body>
		</Modal>
	);
}
