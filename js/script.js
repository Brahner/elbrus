/*globals $:false */
$(document).ready(function(){
	const TIMER = 4000;
	const ELEMENT_TIME = 700;
	const PROGRESS_TIME = (TIMER - ELEMENT_TIME - 100) / 1000;
	const header = $('.header');
	const overlay = $('.overlay');
	const navigate = $('.navigate');
	const close = $('.close');
	const headerBtn = $('.header__btn');
	const popup = $('.popup');
	const popupWrap = $('.popup__wrap');
	const slider = $('#slider');
	const card = $('#cards');

	const headerActive = 'header--active';
	const popupActive = 'popup__wrap--active';
	const none = 'd-none';
	const activeId = 'active';
	const scrollLimit = 760;

	let lastScrollPage;

	//! скрываем/показываем header при скролле
	$(document).scroll(() => {
		let scrollCurrent = $(window).scrollTop();

		if(scrollCurrent > scrollLimit && scrollCurrent < lastScrollPage && $(navigate).attr('id') != activeId){
			$(header).addClass(headerActive);
		} else {
			$(header).removeClass(headerActive);
		}

		lastScrollPage = scrollCurrent;
	});

	//! показываем popup
	$(headerBtn).click(() => {
		$(popup).toggleClass(none);
		$(popupWrap).toggleClass(popupActive);
	});

	//! скрываем popup
	$(popup).click((e) => {
		let elem = $(e.target);
		if(!elem.is(popupWrap) && !elem.parents().is(popupWrap)){
			$(popup).toggleClass(none);
			$(popupWrap).toggleClass(popupActive);
		}
	});

	//! мобильное меню
	$(header).click((e) => {
		let elem = $(e.target);

		if(elem.is('.burger')){
			$(overlay).toggleClass(none);
			$(navigate).toggleClass(none);
			$(navigate).attr('id', activeId);
		}

		if(elem.is(':not(.burger)') && elem.is(':not(.navigate)') && $(navigate).attr('id') === activeId){
			$(navigate).removeAttr('id');
			$(overlay).toggleClass(none);
			$(navigate).toggleClass(none);
		}

		$(close).click(() => {
			$(navigate).removeAttr('id');
			$(overlay).toggleClass(none);
			$(navigate).toggleClass(none);
		});
	});

	//! карусель картинок
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
	
	//! карусель карточек
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

	//! Меняем индикаторы карусели
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

	//! Меняем счетчик
	function counter(parent) {
		let indexTotal = $(parent).find('.owl-dots>.owl-dot').length;
		let index = $(parent).find('.owl-dots>.active').index();
		let elemCount = $(parent).siblings('[class$="__count"]');

		if(elemCount.length === 0){
			elemCount = $(parent).siblings().find('[class$="__count"]');
		}

		$(elemCount).html(`${index + 1}/${indexTotal}`);
	}

	//! переключаем карусель, так же сбрасываетя прогресс карусели
	slider.on('changed.owl.carousel', function() {
		slider.trigger('stop.owl.autoplay');
		slider.trigger('play.owl.autoplay');
	});
	
	card.on('changed.owl.carousel', function() {
		card.trigger('stop.owl.autoplay');
		card.trigger('play.owl.autoplay');
	});
});
