import React, {useRef} from 'react';
import './Promo.css';

function Promo() {
	const containerRef = useRef(null);

	const handleScrollToContainer = () => {
		if (containerRef.current) {
			const containerOffset = containerRef.current.offsetTop;
			window.scrollTo({
				top: containerOffset + 300,
				behavior: 'smooth',
			});
		}
	};

	return (
		<section className='promo'>
			<div className='promo__container'>
				<div className='promo__texts'>
					<h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
					<p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
					<button className='promo__link'
					        onClick={handleScrollToContainer}>
						Узнать больше
					</button>
				</div>
				<div className='promo__image' ref={containerRef}></div>
			</div>
		</section>
	);
}

export default Promo;
