import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
		<div className='d-flex'>
			<h6>{elementName}</h6>
			<div className='d-flex flex-start'>
				<button className='btn btn-link'>
					<FontAwesomeIcon icon={faTrash} onClick={() => setValue(defaultValue)} />
				</button>
				<input type='color' onChange={(e) => setValue(e.target.value)} value={value} />
			</div>
		</div>
	);
}
