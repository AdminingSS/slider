class Slider {

    //options - объект настроек или строка
    //options.id - id элемента
    //options.cssSelector - css селектор элемента
    //options.elem - переданный элемент

    constructor (options) {

        this.elem = options.elem;

        this.sliderClasses = {
            main: 'slider-gallery',
            container: 'slider-slides',
            slide: 'slider-slide'
        };
        
        this.currentSlide = 0;

        this.init();
    }

    init() {

        this.elem.classList.add(this.sliderClasses.main);

        const slideElems = this.elem.children;

        const wrapper = document.createElement('div');
        wrapper.classList.add(this.sliderClasses.container);

        while(slideElems.length) {
            slideElems[0].classList.add(this.sliderClasses.slide);
            wrapper.appendChild(slideElems[0]);
        }

        this.elem.appendChild(wrapper);
    }
}