class Slider {

    //options: {}
    //options.id - id элемента
    //options.css - css селектор элемента
    //options.elem - переданный элемент

    constructor (id) {

        if(typeof(id) === "string") {
            this.sliderID = id;
        }
        else {
            this.sliderID = id.id;
        }

        this.elem = document.getElementById(this.sliderID) || document.querySelector(id.css) || id.elem;

        this.sliderClass = 'slider-gallery';
        this.slidesContainerClass = 'slider-slides';
        this.slideClass = 'slider-slide';

        this.currentSlide = 0;

        this.init();
    }

    init() {

        this.elem.classList.add(this.sliderClass);

        const slideElems = this.elem.children;

        const wrapper = document.createElement('div');
        wrapper.classList.add(this.slidesContainerClass);

        while(slideElems.length) {
            slideElems[0].classList.add(this.slideClass);
            wrapper.appendChild(slideElems[0]);
        }

        this.elem.appendChild(wrapper);
    }
}