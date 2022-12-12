window.addEventListener('load', ()=>{
	const TIMER_VALUE = 3000;
	
	const header = document.querySelector('.header');
	const indicators = document.querySelectorAll('.slider__indicator');
	const slides = document.querySelectorAll('.slider__item');
	const titleSliderEl = document.querySelector('.slider__count', 'span');
	const sliderBarFirst = document.querySelector('.slider__bar-first');
	const sliderBarSecond = document.querySelector('.slider__bar-second');
	const cards = document.querySelector('.cards__items');
	const card = document.querySelectorAll('.cards__item');

	const countSlides = indicators.length;
	const countCard = card.length;
	
	const headerActiveClass = 'header--active';
	const indicatorActiveClass = 'slider__indicator--active';
	const sliderActiveClass = 'slider__item--active';
	const sliderBarFirstActive = 'slider__bar-first--active';
	const sliderBarSecondActive = 'slider__bar-second--active';
	const cardActiveClass = 'cards__item--active';

	let indexSlider = 1;
	let indexCard = 0;
	let timer = null;
	let timerCard = null;

	// const container = document.querySelector('.price__container');
	// const box = document.querySelector('.price__bg');
	// box.style.height = `${container.clientHeight}px`;


	indicators.forEach((el) => { //! при клике сбрасываем интервал и начинаем слайдер с места клика
		el.addEventListener('click', (e) => {
			indexSlider = +e.target.id;
			if(timer){
				clearTimeout(timer);
			}
			changeSlider();
		});
	});


	function changeSlider() {
		sliderBarFirst.classList.toggle(`${sliderBarFirstActive}`);
		sliderBarSecond.classList.toggle(`${sliderBarSecondActive}`);

		indicators.forEach((el) => { //! Меняем индикаторы слайдера
			if (el.getAttribute('id') == indexSlider) {
				el.classList.add(`${indicatorActiveClass}`);
			} else {
				el.classList.remove(`${indicatorActiveClass}`);
			}
		});
	
		slides.forEach((el) => { //! Меняем слайдеры
			if (el.getAttribute('id') == `slide-${indexSlider}`) {
				el.classList.add(`${sliderActiveClass}`);
			} else {
				el.classList.remove(`${sliderActiveClass}`);
			}
		});
		
		titleSliderEl.textContent = `${indexSlider}/${countSlides}`; //! Меняем счетчик
		indexSlider++;
		
		if (indexSlider > countSlides) {
			indexSlider = 1;
		}

		timer = setTimeout(changeSlider, TIMER_VALUE); //! Через интервал меняем слайдер
	}


	document.addEventListener('wheel', function(e) { //! скрываем/показываем header при скролле
		if(e.deltaY < 0 && window.pageYOffset > 730){
			header.classList.add(`${headerActiveClass}`);
		} else {
			header.classList.remove(`${headerActiveClass}`);
		}
	});

	changeSlider();
});
