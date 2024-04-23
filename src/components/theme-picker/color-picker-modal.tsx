import Modal from 'react-bootstrap/Modal';
import { CustomTheme } from '../../types/custom-theme';
import { ThemeElement } from './theme-element';
import { useCallback, useState } from 'react';
import { themeDefaults } from './theme-defaults';
import { ThemePreview } from './theme-preview';
import { UseMobileView } from '../../hooks/use-mobile-view';

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
	const { mobileView } = UseMobileView();

	const discardChanges = useCallback(() => {
		setPrimary(colorChoice.primary);
		setBackground(colorChoice.background);
		setText(colorChoice.text);
		close();
	}, [close, colorChoice.background, colorChoice.primary, colorChoice.text]);

	const save = useCallback(() => {
		setColorChoice({ primary: primary, background: background, text: text });
		close();
	}, [background, close, primary, setColorChoice, text]);

	return (
		<Modal show={showColorPicker} onHide={close} centered size='lg'>
			<Modal.Header closeButton>Choose Your Theme</Modal.Header>
			<Modal.Body className='modal-body'>
				<div className='d-flex flex-column'>
					<div className='d-flex justify-content-around'>
						<ThemeElement value={primary} setValue={setPrimary} elementName='Primary' defaultValue={themeDefaults.primary} />
						<ThemeElement
							value={background}
							setValue={setBackground}
							elementName='Background'
							defaultValue={themeDefaults.background}
						/>
						<ThemeElement value={text} setValue={setText} elementName='Text' defaultValue={themeDefaults.text} />
					</div>
					{!mobileView && (
						<div className='d-flex justify-content-center mt-3'>
							<ThemePreview primary={primary} background={background} text={text} />
						</div>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className='d-flex justify-content-between'>
					<button className='btn btn-light' onClick={discardChanges}>
						Discard Changes
					</button>
					<button className='btn btn-dark' onClick={save}>
						Save
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
