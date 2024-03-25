import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ThemeElement({
	value,
	setValue,
	elementName,
	defaultValue,
}: {
	value: string;
	setValue: (e: string) => void;
	elementName: string;
	defaultValue: string;
}) {
	return (
		<div className='d-flex flex-column align-items-center'>
			<h6>{elementName}</h6>
			<div className='d-flex justify-content-center'>
				<button className='btn mb-1'>
					<FontAwesomeIcon icon={faTrashCan} onClick={() => setValue(defaultValue)} className='mb-2' />
				</button>
				<input type='color' onChange={(e) => setValue(e.target.value)} value={value} />
			</div>
		</div>
	);
}
