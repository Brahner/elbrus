window.addEventListener('load', ()=>{
	
	const header = document.querySelector('.header');
	const burger = document.querySelector('.burger');
	const overlay = document.querySelector('.overlay');
	const navigate = document.querySelector('.navigate');
	const close = document.querySelector('.close');

	const headerActiveClass = 'header--active';

	let none = 'd-none';
	let activeId = 'active';
	let lastScrollPage;

	
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
});


const TIMER = 4000;
const ELEMENT_TIME = 700;
const PROGRESS_TIME = (TIMER - ELEMENT_TIME - 100) / 1000;


$(document).ready(function(){
	const slider = $('#slider');
	const card = $('#card');
	const progressCard = $(".cards__loader_bar");
	const progressSlider = $(".slider__loader_bar");

	slider.owlCarousel({
		loop: true,
		autoplayTimeout: TIMER,
		autoplaySpeed: ELEMENT_TIME,
		smartSpeed: ELEMENT_TIME,
		autoplay: true,
		items: 1,
		onInitialized: startProgressSlider,
		onTranslate: resetProgressSlider,
		onTranslated: startProgressSlider
	});

	function startProgressSlider() {
		progressSlider.css({
			width: "100%",
			transition: `width ${PROGRESS_TIME}s linear`
		});
		counterSlider();
	}
	
	function resetProgressSlider() {
		progressSlider.css({
			width: 0,
			transition: "width 0s"
		});
	}

	function counterSlider() {
		const indexTotal = $('#slider>.owl-dots>.owl-dot').length;
		let index = $('#slider>.owl-dots>.active').index();
		$('.slider__count').html(`${index + 1}/${indexTotal}`);
	}

	slider.on('changed.owl.carousel', function() {
		slider.trigger('stop.owl.autoplay');
		slider.trigger('play.owl.autoplay');
	});

	card.owlCarousel({
		loop: true,
		autoplayTimeout: TIMER,
		autoplaySpeed: ELEMENT_TIME,
		smartSpeed: ELEMENT_TIME,
		autoplay: true,
		margin: 20,
		autoWidth: true,
		nav:true,
		onInitialized: startProgressCards,
		onTranslate: resetProgressCards,
		onTranslated: startProgressCards
	});
	
	function startProgressCards() {
		progressCard.css({
			width: "100%",
			transition: `width ${PROGRESS_TIME}s linear`
		});
		counterCard();
	}
	
	function resetProgressCards() {
		progressCard.css({
			width: 0,
			transition: "width 0s"
		});
	}

	function counterCard() {
		const indexTotal = $('#card>.owl-dots>.owl-dot').length;
		let index = $('#card>.owl-dots>.active').index();
		$('.cards__count').html(`${index + 1}/${indexTotal}`);
	}
	
	card.on('changed.owl.carousel', function() {
		card.trigger('stop.owl.autoplay');
		card.trigger('play.owl.autoplay');
	});
});
