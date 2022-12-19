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
	const card = $('#cards');

	slider.owlCarousel({
		loop: true,
		autoplayTimeout: TIMER,
		autoplaySpeed: ELEMENT_TIME,
		smartSpeed: ELEMENT_TIME,
		autoplay: true,
		items: 1,
		onInitialized: startProgressBar,
		onTranslate: resetProgressBar,
		onTranslated: startProgressBar
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
		onInitialized: startProgressBar,
		onTranslate: resetProgressBar,
		onTranslated: startProgressBar
	});

	function startProgressBar(event) {
		let parent = $(event.target).parent();
		let progressBar = $(parent).siblings().find('[class$="_bar"]');
		$(progressBar).css({
			width: "100%",
			transition: `width ${PROGRESS_TIME}s linear`
		});
		counter(parent);
	}
	
	function resetProgressBar(event) {
		let parent = $(event.target).parent(); 
		let progressBar = $(parent).siblings().find('[class$="_bar"]');
		$(progressBar).css({
			width: 0,
			transition: "width 0s"
		});
	}

	function counter(parent) {
		let elemCount = $(parent).siblings('[class$="__count"]');
		if(elemCount.length === 0){
			elemCount = $(parent).siblings().find('[class$="__count"]');
		}
		let indexTotal = $(parent).find('.owl-dots>.owl-dot').length;
		let index = $(parent).find('.owl-dots>.active').index();
		$(elemCount).html(`${index + 1}/${indexTotal}`);

	}

	slider.on('changed.owl.carousel', function() {
		slider.trigger('stop.owl.autoplay');
		slider.trigger('play.owl.autoplay');
	});
	
	card.on('changed.owl.carousel', function() {
		card.trigger('stop.owl.autoplay');
		card.trigger('play.owl.autoplay');
	});
});
