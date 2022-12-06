window.addEventListener('load', ()=>{
	const TIMER_VALUE = 3000;
	
	const indicators = document.querySelectorAll('.slider__indicator');
	const slides = document.querySelectorAll('.slider__item');
	const titleSliderEl = document.querySelector('.slider__count', 'span');
	
	const countSlides = indicators.length;
	
	const indicatorActiveClass = 'slider__indicator--active';
	const sliderActiveClass = 'slider__item--active';
	
	let indexSlider = 1;

	indicators.forEach((el) => {
		el.addEventListener('click', (e) => {
			indexSlider = +e.target.id;
			
		});
	});

	let intervalId = setInterval(() => {
		changeSlider();
		
	}, TIMER_VALUE);


	function changeSlider() {
		indicators.forEach((el) => {
			if (el.getAttribute('id') == indexSlider) {
				el.classList.add(`${indicatorActiveClass}`);
			} else {
				el.classList.remove(`${indicatorActiveClass}`);
			}
		});
	
		slides.forEach((el) => {
			if (el.getAttribute('id') == `slide-${indexSlider}`) {
				el.classList.add(`${sliderActiveClass}`);
			} else {
				el.classList.remove(`${sliderActiveClass}`);
			}
		});
		
		changeSliderCount();

		indexSlider++;
	
		if (indexSlider > countSlides) {
			indexSlider = 1;
		}
	
	}

	function changeSliderCount() {
		let numCount = indexSlider;
		titleSliderEl.textContent = `${numCount}/${countSlides}`;
	}
	
});


// let intervalId1

// function changeBar() {
// 	clearInterval(intervalId1);
// 	bar.classList.add('slider__bar--active');
	
// 	intervalId1 = setInterval(() => {
// 		bar.classList.remove('slider__bar--active');
// 	}, 2800); 
// } 


// function readyLoad() {
	// indicators.addEventListener('click', (e) => {
	// 	if(e.target.closest(`${slider}`)){
	// 		indexSlider = +e.target.id;
	// 		changeSliderCount();
	// 		e.target.classList.toggle(`${indicatorActiveClass}`);
	// 		document.querySelector(`#slide-${indexSlider}`).classList.add(`${sliderActiveClass}`);
	// 	}
	// });
// }