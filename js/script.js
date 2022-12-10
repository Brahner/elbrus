window.addEventListener('load', ()=>{
	const TIMER_VALUE = 3000;
	
	const indicators = document.querySelectorAll('.slider__indicator');
	const slides = document.querySelectorAll('.slider__item');
	const titleSliderEl = document.querySelector('.slider__count', 'span');
	const sliderBar = document.querySelector('.slider__bar-first');
	const sliderBarSecond = document.querySelector('.slider__bar-second');
	const cards = document.querySelector('.cards__items');
	const card = document.querySelectorAll('.cards__item');

	const countSlides = indicators.length;
	const countCard = card.length;
	
	const indicatorActiveClass = 'slider__indicator--active';
	const sliderActiveClass = 'slider__item--active';
	const cardActiveClass = 'cards__item--active';
	
	let indexSlider = 1;
	let indexCard = 0;
	let timer = null;
	let timerCard = null;


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
		sliderBar.classList.toggle('slider__bar-first--active');
		sliderBarSecond.classList.toggle('slider__bar-second--active');

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

	changeSlider();
});