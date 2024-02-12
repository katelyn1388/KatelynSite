import { PropsWithChildren } from 'react';
import { Header } from '../components/header/header';

export function AppLayout({ children, title }: PropsWithChildren<{ title: string }>) {
	return (
		<div className='page-root'>
			<div className='d-flex'>
				<div className={`flex-fill w-100 main-content`}>
					<Header title={title} />
					<div className='content'>{children}</div>
				</div>
			</div>
		</div>
	);
}
