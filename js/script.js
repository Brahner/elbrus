window.addEventListener('load', readyLoad);

const indicators = document.querySelector('.slider__indicators'),
slides = document.querySelector('slider__items'),
slider = '.slider__indicator',
indicatorActive = 'slider__indicator--active',
sliderActive = 'slider__item--active',
sliderCount = document.querySelector('.slider__count', 'span'),
num = indicators.children.length,
timerValue = 2000;
let indexSlider = 0;

let intervalId = setInterval(function() {
	changeSlider();
	}, timerValue);

	function changeSlider(){
		changeSliderCount();
		if(indexSlider < num){
		indicators.children[indexSlider].classList.add(`${indicatorActive}`);
		document.querySelector(`#slide-${indexSlider}`).classList.add(`${sliderActive}`);
		if(indexSlider == 0){
			indicators.children[num - 1].classList.remove(`${indicatorActive}`);
			document.querySelector(`#slide-${num -1}`).classList.remove(`${sliderActive}`);
		}
		if(indexSlider != 0){
			indicators.children[indexSlider - 1].classList.remove(`${indicatorActive}`);
			document.querySelector(`#slide-${indexSlider - 1}`).classList.remove(`${sliderActive}`);
		}
		indexSlider++;
	}
	if(indexSlider == num){
		indexSlider = 0;
	}
}

function readyLoad() {
	indicators.addEventListener('click', function (e){
		if(e.target.closest(`${slider}`)){
			let index = e.target.id;
			indexSlider = index;
			clearInterval(intervalId);
			intervalId = setInterval(function() {
				changeSlider();
			}, timerValue);
			removeClassSlider();


			
			e.target.classList.toggle(`${indicatorActive}`);
			document.querySelector(`#slide-${index}`).classList.add(`${sliderActive}`);
		}
	});
}

function removeClassSlider() {
	for(let i = 0; i < indicators.children.length; i++){
		indicators.children[i].classList.remove(`${indicatorActive}`);
		document.querySelector(`#slide-${i}`).classList.remove(`${sliderActive}`);
	}
}

function changeSliderCount(){
	let numCount = +indexSlider + 1;
	sliderCount.textContent = `${numCount}/${num}`;
}