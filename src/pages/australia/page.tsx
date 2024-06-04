import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../layout';
import { Weather } from '../../components/weather';
import CountryBigFacts from '../../components/country-big-facts';
import { UseMobileView } from '../../hooks/use-mobile-view';
import { pictures } from './pictures';
import ImageModal from '../../components/image-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ImageComponent } from '../../components/image-component';
import NewImagesModal from '../../components/new-images-modal';
import { faEye } from '@fortawesome/free-regular-svg-icons';

export default function Page() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const { mobileView } = UseMobileView();
	const date = useMemo(() => new Date(), []);
	const sydneyDate = useMemo(
		() => date.toLocaleString(undefined, { timeZone: 'Australia/Sydney', timeStyle: 'short', dateStyle: 'short' }),
		[date]
	);
	const modalLinkFirst = useMemo(() => 'https://lh3.googleusercontent.com/d/', []);
	const thumbnail2 = useMemo(() => '=s500', []);
	const [searchString, setSearchString] = useState<string>('');
	const [newImages, setNewImages] = useState(false);
	const [cachedIds, setCachedIds] = useState('');
	const [showNewImageModal, setShowNewImageModal] = useState(false);
	const [countryError, setCountryError] = useState(false);

	const displayImage = useCallback((img: number) => {
		setShowImageModal(true);
		setSelectedImage(img);
	}, []);

	const close = useCallback(() => {
		setShowImageModal(false);
		setShowNewImageModal(false);
		setSelectedImage(null);
	}, []);

	const cacheImageThumbnails = async () => {
		const promises = await pictures.map((src) => {
			return new Promise(function (resolve, reject) {
				const img = new Image();

				img.src = modalLinkFirst + src.img_id + thumbnail2;

				if (img.complete) {
					src.cached = true;
				} else {
					src.cached = false;
				}
			});
		});

		await Promise.all(promises);
	};

	useEffect(() => {
		const storedImageIds: string = localStorage.getItem('australiaImgs') || '';
		setCachedIds(storedImageIds);
		const tempEmptyCache = storedImageIds.length <= 0 ? true : false;
		let tempNotCachedCount = 0;
		let addIds: string = '';

		pictures.forEach((img) => {
			if (storedImageIds?.includes(img.img_id)) {
			} else {
				addIds = addIds + `, ${img.img_id}`;
				tempNotCachedCount += 1;
			}
		});

		localStorage.setItem('australiaImgs', storedImageIds.concat(addIds));
		if (tempEmptyCache === true || tempNotCachedCount === 0) {
			setNewImages(false);
		} else {
			setNewImages(true);
			setShowNewImageModal(true);
		}
	}, []);

	useEffect(() => {
		cacheImageThumbnails();
	}, []);

	const searchValueChange = useCallback(
		(value: string) => {
			setSearchString(value || '');
		},
		[setSearchString]
	);

	return (
		<AppLayout title='Australia'>
			<div className='d-print-none'>
				<div className={mobileView ? 'justify-content-center d-flex' : ''}>
					<div className='country-header'>
						{!countryError ? <CountryBigFacts country='Australia' setCountryError={setCountryError} /> : null}
						<Weather lat={-33.865143} long={151.2099} date={sydneyDate} />
					</div>
				</div>

				<div className={mobileView ? 'ms-2 mt-3 mb-4' : 'ms-5 mt-3 mb-4'}>
					<label>Search Images</label>
					<div className='d-flex'>
						<input
							className={`${mobileView ? 'w-75' : 'w-25'} form-control search-bar`}
							onChange={(e) => searchValueChange(e.target.value)}
							value={searchString}
						/>
						{searchString.length > 0 ? (
							<button onClick={() => setSearchString('')} className='search-bar-btn'>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						) : (
							<button className='search-bar-btn'>
								<FontAwesomeIcon icon={faSearch} />
							</button>
						)}
					</div>
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Sydney</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Sydney') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Random</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Random') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				<h3 className={mobileView ? 'mt-2 ms-2' : 'mt-2 ms-5'}>Taronga Sydney Zoo</h3>
				<div className={mobileView ? 'd-flex justify-content-center flex-wrap' : 'ps-5 pe-4'}>
					{pictures
						.sort((a, b) => a.description.localeCompare(b.description))
						.map((img) => {
							if (
								img.description.startsWith('Taronga Zoo') &&
								(searchString.length > 0 ? img.description.toLowerCase().includes(searchString.toLowerCase()) : true)
							) {
								return (
									<span
										onClick={() => displayImage(pictures.indexOf(img))}
										key={img.img_id}
										className={`image-container ${newImages ? (cachedIds.includes(img.img_id) ? 'old-img' : 'new-img') : ''}`}>
										<ImageComponent imgId={img.img_id} linkEnd={thumbnail2} />
									</span>
								);
							} else {
								return <span key={img.img_id}></span>;
							}
						})}
				</div>

				{searchString.length === 0 && (
					<div className='ms-4'>
						<h3 className='mt-5'>Sydney Food Recommendations</h3>
						<ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=yakiniku+yokocho&rlz=1C1CHBF_enUS1039US1039&oq=yakinuku+yokocho&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgKGK8BGMcBGIAEMgkIAhAAGAoYgAQyEggDEC4YChivARjHARiABBiOBTIJCAQQABgKGIAEMgkIBRAAGAoYgAQyCQgGEAAYChiABDIJCAcQABgKGIAEMgkICBAAGAoYgATSAQg4MDUwajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8&lqi=ChB5YWtpbmlrdSB5b2tvY2hvSJO4xMqarYCACFoiEAAQARgAGAEiEHlha2luaWt1IHlva29jaG8qBggCEAAQAZIBE3lha2luaWt1X3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUm9hMWx0UW1GQkVBRaoBOBABMh4QASIagWvMPwX8z5wxe8xKMc9K2Qll6PxC2o2CINIyFBACIhB5YWtpbmlrdSB5b2tvY2hv#rlimm=12347599813478353698'>
									Yakiniku Yokocho
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('japanese bbq')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Japanese BBQ
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=hansang&rlz=1C1CHBF_enUS1039US1039&oq=hansang&gs_lcrp=EgZjaHJvbWUqDQgAEAAYgwEYsQMYgAQyDQgAEAAYgwEYsQMYgAQyBwgBEAAYgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEAAYgAQyEAgIEC4YrwEYxwEYgAQYjgUyBwgJEAAYgATSAQgxNTg4ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&lqi=CgdoYW5zYW5nSOXa6vTfsYCACFoNEAAYACIHaGFuc2FuZ5IBEWtvcmVhbl9yZXN0YXVyYW50mgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5hYlhObWREbEJSUkFCqgEvEAEyHhABIhoCzC99OWIhUGFrchvtXjzeO4JtEcFd9cOLBTILEAIiB2hhbnNhbmc#rlimm=10713726232737200748'>
									Hansang
								</a>
							</li>
							<ul>
								<li>Korean</li>
								<li onClick={() => setSearchString('Seafood pancake')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Good seafood pancake
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=kwafood+fried+skewer+city&rlz=1C1CHBF_enUS1039US1039&oq=Kwafood+Fried+Skewer+City&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEAAYhgMYgAQYigUyDQgCEAAYhgMYgAQYigUyDQgDEAAYhgMYgAQYigUyDQgEEAAYhgMYgAQYigUyDQgFEAAYhgMYgAQYigWoAgiwAgE&sourceid=chrome&ie=UTF-8'>
									Kwafood Fried Skewer City
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('Meat Skewers')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Meat Skewers
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=Uncle+Tetsu%27s+Japanese+Cheesecake&rlz=1C1CHBF_enUS1039US1039&oq=Uncle+Tetsu%27s+Japanese+Cheesecake&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDINCAEQLhivARjHARiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDINCAUQLhivARjHARiABDIHCAYQABiABDINCAcQLhivARjHARiABDIHCAgQABiABNIBBzkzN2owajeoAgiwAgE&sourceid=chrome&ie=UTF-8'>
									Uncle Tetsu's Japanese Cheesecake
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('japanese cheesecake')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Japanese Cheesecake and other goodies
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?sca_esv=d88e1983e8fdb79e&sca_upv=1&rlz=1C1CHBF_enUS1039US1039&sxsrf=ACQVn0_GrHzk15D0VKGz6Uonvh8Wc2x8Sw:1712900739994&q=yomie%27s+rice+x+yogurt&spell=1&sa=X&ved=2ahUKEwjY8pHB_LuFAxU1qFYBHcAhC-cQBSgAegQICBAC&biw=1858&bih=993&dpr=1&lqi=ChV5b21pZSdzIHJpY2UgeCB5b2d1cnRI6bach6KtgIAIWicQABABEAIQAxgAGAEYAhgDIhV5b21pZSdzIHJpY2UgeCB5b2d1cnSSAQxkZXNzZXJ0X3Nob3CaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTXRhbGxIYUdwblJSQUKqAW4KCS9tLzAxNGw4bgoIL20vMDk3NTkQASoZIhV5b21pZSdzIHJpY2UgeCB5b2d1cnQoADIfEAEiG2klHhYKTRtSX2lo88OpOJJtocIkUPx0lDJAJTIZEAIiFXlvbWllJ3MgcmljZSB4IHlvZ3VydA#rlimm=5497006098132677001'>
									Yomie's Rice X Yogurt
								</a>
							</li>
							<ul>
								<li>Grain ad Yogurt Drinks</li>
								<li>Good strawberry yogurt drink</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=foreign+return&sca_esv=d88e1983e8fdb79e&sca_upv=1&rlz=1C1CHBF_enUS1039US1039&sxsrf=ACQVn09U0hN--Booa25Zd5wmHXC45-P6Iw%3A1712900934478&ei=RssYZszwHPOZjuMP-4WxgAM&ved=0ahUKEwjMq_Cd_buFAxXzjGMGHftCDDAQ4dUDCBA&uact=5&oq=foreign+return&gs_lp=Egxnd3Mtd2l6LXNlcnAiDmZvcmVpZ24gcmV0dXJuMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADMgoQABhHGNYEGLADSP8tUIQsWIQscAR4AZABAJgBAKABAKoBALgBA8gBAPgBAZgCBKACDpgDAIgGAZAGCJIHATSgBwA&sclient=gws-wiz-serp'>
									Foreign Return
								</a>
							</li>
							<ul>
								<li>Indian</li>
								<li onClick={() => setSearchString('garlic cheese naan')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> FIRE garlic cheese naan
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=%40bangkok+restaurant&rlz=1C1CHBF_enUS1039US1039&oq=%40bangkok&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyBggBEEUYOTIHCAIQABiABDINCAMQLhivARjHARiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDI1MDRqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8&lqi=ChNAYmFuZ2tvayByZXN0YXVyYW50SLuV9cDlgICACFodEAAQARgAGAEiE0BiYW5na29rIHJlc3RhdXJhbnSSAQ90aGFpX3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUjFjMkpRVFZWbkVBRaoBSxABKg4iCnJlc3RhdXJhbnQoADIeEAEiGsQMiYibiALJM3u1CYSu3KO715cxxFRLnCz1MhcQAiITQGJhbmdrb2sgcmVzdGF1cmFudA#rlimm=9226378961496921899'>
									@Bangkok
								</a>
							</li>
							<ul>
								<li>Thai</li>
								<li onClick={() => setSearchString('Pad See Ew')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Pad See Ew
								</li>
								<li>Garlic and Pepper Squid</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=Emperor%27s+Garden+Cakes+%26+Bakery&sca_esv=d88e1983e8fdb79e&sca_upv=1&rlz=1C1CHBF_enUS1039US1039&sxsrf=ACQVn0_xv1Kd5daWJiBhITmH2oFOGAL50g%3A1712901486490&ei=bs0YZpHNHcaUg8UPxvmOmAM&ved=0ahUKEwiRvIyl_7uFAxVGyqACHca8AzMQ4dUDCBA&uact=5&oq=Emperor%27s+Garden+Cakes+%26+Bakery&gs_lp=Egxnd3Mtd2l6LXNlcnAiH0VtcGVyb3IncyBHYXJkZW4gQ2FrZXMgJiBCYWtlcnkyCxAuGK8BGMcBGIAEMgUQABiABDIFEAAYgAQyBhAAGBYYHjICECYyGhAuGK8BGMcBGIAEGJcFGNwEGN4EGOAE2AECSLsNUL0IWL0IcAF4AZABAJgBxQGgAcUBqgEDMC4xuAEDyAEA-AEB-AECmAICoALVAagCFMICBxAjGOoCGCfCAhYQABgDGI8BGOUCGOoCGLQCGIwD2AEBwgIWEC4YAxiPARjlAhjqAhi0AhiMA9gBAZgDCLoGBggBEAEYC7oGBggCEAEYFJIHBTEuMC4xoAeVCA&sclient=gws-wiz-serp'>
									Emperor's Garden Cakes & Bakery
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString("emperor's puffs")} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Emperor's Puffs
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=spice+paradise&rlz=1C1CHBF_enUS1039US1039&oq=spice+paradise&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIMCAEQIxgnGIAEGIoFMg0IAhAuGK8BGMcBGIAEMgcIAxAAGIAEMg0IBBAuGK8BGMcBGIAEMgcIBRAAGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAEMgcICRAAGIAE0gEIMjcwN2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8'>
									Spice Paradise
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('Braised Beef Chunk with Chili and Potato')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Braised Beef Chunk with Chili and Potato
								</li>
								<li
									onClick={() => setSearchString('Stir Fried Chicken Chunk with Fresh Chili and Black Fungus')}
									className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Stir Fried Chicken Chunk with Fresh Chili and Black Fungus
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=edomae+sushi+yokocho&rlz=1C1CHBF_enUS1039US1039&oq=edomae+sushi+yoko&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBggCEEUYOTIICAMQABgWGB4yCAgEEAAYFhgeMg0IBRAAGIYDGIAEGIoFMg0IBhAAGIYDGIAEGIoFMg0IBxAAGIYDGIAEGIoFMgoICBAAGIAEGKIEMgoICRAAGIAEGKIEqAIAsAIA&sourceid=chrome&ie=UTF-8									'>
									Edomae Sushi Yokocho
								</a>
							</li>
							<ul>
								<li>Sushi Train</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=rei+izakaya&sca_esv=8cdee197d32e0965&sca_upv=1&rlz=1C1CHBF_enUS1039US1039&sxsrf=ADLYWIJZ5MghpnIbqYqoExVRgOPjgsdvXA%3A1715490383897&ei=T05AZoiyNo_e2roP-cUQ&ved=0ahUKEwjIlcrXq4eGAxUPr1YBHfkiBAAQ4dUDCBE&uact=5&oq=rei+izakaya&gs_lp=Egxnd3Mtd2l6LXNlcnAiC3JlaSBpemFrYXlhMhkQLhiABBixAxhDGIMBGMcBGIoFGI4FGK8BMgUQABiABDIFEAAYgAQyBRAAGIAEMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgIQJjILEAAYgAQYhgMYigUyKBAuGIAEGLEDGEMYgwEYxwEYigUYjgUYrwEYlwUY3AQY3gQY4ATYAQFI6mNQ1R9YnF1wBHgBkAEAmAHgAaAB4gqqAQUwLjQuM7gBA8gBAPgBAZgCCqAC_gnCAgoQABiwAxjWBBhHwgIQEC4YgAQYQxjHARiKBRivAcICDRAAGIAEGJIDGBQYhwLCAgsQABiABBiSAxiKBcICDRAAGIAEGEMYyQMYigXCAgoQABiABBhDGIoFwgIQEAAYgAQYsQMYQxiDARiKBcICCxAAGIAEGLEDGIMBwgILEC4YgAQYxwEYrwHCAh8QLhiABBhDGMcBGIoFGK8BGJcFGNwEGN4EGOAE2AEBwgIKEAAYgAQYFBiHAsICBhAAGAcYHsICDRAAGIAEGLEDGIMBGA3CAg0QLhiABBjHARgNGK8BwgIQEC4YgAQYxwEYDRiOBRivAcICBxAAGIAEGA2YAwCIBgGQBgi6BgYIARABGBSSBwU0LjIuNKAHm1o&sclient=gws-wiz-serp									'>
									Rei Izakaya
								</a>
							</li>
							<ul>
								<li>Japanese Yakitori</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=oh%21matcha&sca_esv=8cdee197d32e0965&sca_upv=1&rlz=1C1CHBF_enUS1039US1039&sxsrf=ADLYWIKpDoXuTKraVBG5Tc9-LY8P7QvpkQ%3A1715490664446&ei=aE9AZu_TGt-k2roP5p-E6Ac&ved=0ahUKEwjvp63drIeGAxVfklYBHeYPAX0Q4dUDCBE&uact=5&oq=oh%21matcha&gs_lp=Egxnd3Mtd2l6LXNlcnAiCW9oIW1hdGNoYTIOEC4YgAQYxwEYjgUYrwEyChAAGIAEGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyBhAAGAcYHjIFEAAYgAQyBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIdEC4YgAQYxwEYjgUYrwEYlwUY3AQY3gQY4ATYAQJIlwxQ1gVY7QhwAXgBkAEAmAGmAqABzQOqAQUwLjEuMbgBA8gBAPgBAZgCA6AC4QPCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICHBAuGIAEGLADGEMYxwEYyAMYigUYjgUYrwHYAQHCAhkQLhiABBiwAxhDGMcBGMgDGIoFGK8B2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICExAuGIAEGLADGEMYyAMYigXYAQHCAhAQLhiABBjHARgKGI4FGK8BwgIfEC4YgAQYxwEYChiOBRivARiXBRjcBBjeBBjgBNgBApgDAIgGAZAGFLoGBggBEAEYCLoGBggCEAEYFJIHBzEuMS4wLjGgB7UQ&sclient=gws-wiz-serp									'>
									Oh!Matcha
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('Matcha Ice Cream')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Matcha Ice Cream, Mochi, etc
								</li>
							</ul>
							<li style={{ listStyleType: 'square' }}>
								<a
									target='_blank'
									rel='noreferrer'
									className='custom-link'
									href='https://www.google.com/search?q=yk+mini+hot+pot+hapymarket&rlz=1C1CHBF_enUS1039US1039&oq=yk+mini+hot+pot+hapymarket&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChigAdIBCDcxODNqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8'>
									YX Mini Hot Pot Haymarket
								</a>
							</li>
							<ul>
								<li onClick={() => setSearchString('Hot Pot')} className='clickable-text'>
									<FontAwesomeIcon icon={faEye} /> Hot Pot
								</li>
								<li>Warning - Very expensive (but very good)</li>
							</ul>
						</ul>
					</div>
				)}
			</div>

			<div className='print-only'>
				<h1>Why you trying to print this you weirdo?</h1>
			</div>

			<ImageModal close={close} show={showImageModal} imgIndex={selectedImage} imageArray={pictures} />
			<NewImagesModal show={showNewImageModal} close={close} />
		</AppLayout>
	);
}
