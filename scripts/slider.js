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
        this.slidesCount = 0;
        this.slidesOffsets = [];

        this.init();
    }

    init() {

        this.elem.classList.add(this.sliderClasses.main);

        const slideElems = this.elem.children;

        //wrap to div
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(this.sliderClasses.container);

        while(slideElems.length) {
            slideElems[0].classList.add(this.sliderClasses.slide);
            this.wrapper.appendChild(slideElems[0]);
        }

        this.elem.appendChild(this.wrapper);

        this.slidesCount = this.wrapper.children.length;

        for(let i = 0; i < this.slidesCount; i++) {
            this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
        }

        this.showSlide(this.currentSlide);
    }

    showSlide(number) {
        const newLeft = -this.wrapper.children[number].offsetLeft;
        this.wrapper.style.left = newLeft + 'px';
        const newWidth = this.wrapper.children[number].offsetWidth || this.wrapper.children[number].getBoundingClientRect().width;
        if (newWidth) this.elem.style.width = newWidth + 'px';
    }

    prevSlide() {
        this.currentSlide = Math.max(this.currentSlide - 1, 0);
        this.showSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = Math.min(this.currentSlide + 1, this.slidesCount - 1);
        this.showSlide(this.currentSlide);
    }

}