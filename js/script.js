window.addEventListener('load', ()=>{
	
	const header = document.querySelector('.header');
	const burger = document.querySelector('.burger');
	const overlay = document.querySelector('.overlay');
	const navigate = document.querySelector('.navigate');
	const close = document.querySelector('.close');
	const indicators = document.querySelectorAll('.slider__indicator');
	const slides = document.querySelectorAll('.slider__item');
	const titleSliderEl = document.querySelector('.slider__count', 'span');
	const sliderBarFirst = document.querySelector('.slider__bar-first');
	const sliderBarSecond = document.querySelector('.slider__bar-second');

	const countSlides = indicators.length;
	
	const headerActiveClass = 'header--active';
	const indicatorActiveClass = 'slider__indicator--active';
	const sliderActiveClass = 'slider__item--active';
	const sliderBarFirstActive = 'slider__bar-first--active';
	const sliderBarSecondActive = 'slider__bar-second--active';

	let none = 'd-none';
	let activeId = 'active';
	let indexSlider = 1;
	let timer = null;
	let lastScrollPage;


	//! при клике сбрасываем интервал и начинаем слайдер с места клика
	indicators.forEach((el) => {
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
		//! Меняем индикаторы слайдера
		indicators.forEach((el) => {
			if (el.getAttribute('id') == indexSlider) {
				el.classList.add(`${indicatorActiveClass}`);
			} else {
				el.classList.remove(`${indicatorActiveClass}`);
			}
		});
		//! Меняем слайдеры
		slides.forEach((el) => {
			if (el.getAttribute('id') == `slide-${indexSlider}`) {
				el.classList.add(`${sliderActiveClass}`);
			} else {
				el.classList.remove(`${sliderActiveClass}`);
			}
		});
		//! Меняем счетчик
		titleSliderEl.textContent = `${indexSlider}/${countSlides}`;
		indexSlider++;
		
		if (indexSlider > countSlides) {
			indexSlider = 1;
		}
		//! Через интервал меняем слайдер
		timer = setTimeout(changeSlider, TIMER_VALUE);
	}
	
	
	//! скрываем/показываем header при скролле
	document.addEventListener('scroll', () => {
		if(lastScrollPage > window.pageYOffset && window.pageYOffset > 759){
			header.classList.add(`${headerActiveClass}`);
		} else {
			header.classList.remove(`${headerActiveClass}`);
		}
		lastScrollPage = window.pageYOffset;
	});


	//! мобильное меню
	header.addEventListener('click', function(e) {
		if(e.target == burger){
			overlay.classList.toggle(`${none}`);
			navigate.classList.toggle(`${none}`);
			navigate.setAttribute('id', activeId);
		}

		if(e.target != burger && e.target != navigate && navigate.id === activeId){
			navigate.removeAttribute('id');
			overlay.classList.toggle(`${none}`);
			navigate.classList.toggle(`${none}`);
		}

		close.addEventListener('click', () => {
			navigate.removeAttribute('id');
			overlay.classList.toggle(`${none}`);
			navigate.classList.toggle(`${none}`);
		});
	});

	changeSlider();
});

const TIMER_VALUE = 3000;

function startProgressCards() {
	$(".cards__loader_bar").css({
		width: "100%",
		transition: "width 2.2s linear"
	});
}

function resetProgressCards() {
	$(".cards__loader_bar").css({
		width: 0,
		transition: "width 0s"
	});
}

$(document).ready(function(){
	const cards = $('.cards');
	$(cards).find('#card').owlCarousel({
		loop: true,
		autoplayTimeout: TIMER_VALUE,
		autoplaySpeed: 700,
		autoplay: true,
		// items: 2,
		margin: 20,
		autoWidth: true,
		dots: false,
		nav:true,
		onInitialized: startProgressCards,
		onTranslate: resetProgressCards,
		onTranslated: counter
	});

	function counter(e) {
		let index = e.item.index - 1;
		let total = e.item.count;
		if(index > total) {
			index = index - total;
		}
		$(cards).find('.cards__count').html(index + '/' + total);
		startProgressCards();
	}
});
