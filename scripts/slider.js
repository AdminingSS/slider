class Slider {

    constructor (options) {

        this.elem = options.elem;

        this.sliderClasses = {
            main: 'slider-gallery',
            container: 'slider-slides',
            slide: 'slider-slide'
        };
        
        this.currentSlide = 0;
        this.slidesCount = 0;
        this.currentWidth = 0;
        this.baseSlidesToShow = options.slidesToShow || 1;
        this.baseSlideMargin = options.slideMargin || 0;
        // this.slidesToShow = options.slidesToShow || 1;
        // this.slideMargin = options.slideMargin || 0;
        this.leftBlocked = false;
        this.rightBlocked = false;
        this.responsiveOptions = options.responsiveOptions || [];
        //this.slidesOffsets = [];

        this.init();
        this.reInit();
    }

    init() {

        this.slidesToShow = this.baseSlidesToShow;
        this.slideMargin = this.baseSlideMargin;

        if(this.responsiveOptions.length) {
            const optionsCounter = this.responsiveOptions.length;
            for(let i = 0; i < optionsCounter; i++) {
                if(this.checkResponsive(this.responsiveOptions[i].breakpoint)) {
                    this.slidesToShow = this.responsiveOptions[i].slidesToShow;
                    this.slideMargin = this.responsiveOptions[i].slideMargin;
                }
            }
        }

        const totalVisibleMargins = this.slideMargin * (this.slidesToShow -1);

        this.currentWidth = this.elem.offsetWidth || this.elem.getBoundingClientRect().width;

        const slideWidth = (this.currentWidth - totalVisibleMargins) / this.slidesToShow;

        this.elem.classList.add(this.sliderClasses.main);

        const slideElems = this.elem.children;

        //wrapper = track
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add(this.sliderClasses.container);

        while(slideElems.length) {
            slideElems[0].classList.add(this.sliderClasses.slide);
            slideElems[0].style.width = slideWidth + 'px';
            slideElems[0].style.marginRight = this.slideMargin + 'px';
            this.wrapper.appendChild(slideElems[0]);
        }

        this.elem.appendChild(this.wrapper);

        if(this.currentSlide === 0) this.leftBlocked = true;
        if(this.currentSlide === slideElems.length - 1 ) this.rightBlocked = true;

        const prevArrow = document.createElement('div');
        prevArrow.classList.add('prev-arrow');
        this.elem.appendChild(prevArrow);

        const nextArrow = document.createElement('div');
        nextArrow.classList.add('next-arrow');
        this.elem.appendChild(nextArrow);

        this.slidesCount = this.wrapper.children.length;

        // for(let i = 0; i < this.slidesCount; i++) {
        //     this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
        // }

        this.showSlide(this.currentSlide);

        this.elem.addEventListener('click', this.eventHandler.bind(this));

        window.addEventListener('resize', this.reInit.bind(this))
    }

    eventHandler (event) {
        let target = event.target;

        while (target != this.elem) {
            if (target.classList.contains('prev-arrow') && !this.leftBlocked) {
                this.prevSlide();
                return;
            }
            if (target.classList.contains('next-arrow') && !this.rightBlocked) {
                this.nextSlide();
                return;
            }
            target = target.parentNode;
        }
    }

    showSlide(number) {
        if(number) {
            this.leftBlocked = false;
        } else {
            this.leftBlocked = true;
        }
        if(number >= (this.slidesCount - this.slidesToShow)) {
            this.rightBlocked = true;
            number = this.slidesCount - this.slidesToShow;
        } else {
            this.rightBlocked = false;
        }

        const newLeft = -this.wrapper.children[number].offsetLeft;
        this.wrapper.style.left = newLeft + 'px';

        //const newWidth = this.wrapper.children[number].offsetWidth || this.wrapper.children[number].getBoundingClientRect().width;
        //if (newWidth) this.elem.style.width = newWidth + 'px';
    }

    prevSlide() {
        this.currentSlide = Math.max(this.currentSlide - 1, 0);
        this.showSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = Math.min(this.currentSlide + 1, this.slidesCount - 1);
        this.showSlide(this.currentSlide);
    }

    reInit() {

        this.slidesToShow = this.baseSlidesToShow;
        this.slideMargin = this.baseSlideMargin;

        if(this.responsiveOptions.length) {
            const optionsCounter = this.responsiveOptions.length;
            for(let i = 0; i < optionsCounter; i++) {
                if(this.checkResponsive(this.responsiveOptions[i].breakpoint)) {
                    this.slidesToShow = this.responsiveOptions[i].slidesToShow;
                    this.slideMargin = this.responsiveOptions[i].slideMargin;
                }
            }
        }

        const totalVisibleMargins = this.slideMargin * (this.slidesToShow -1);

        this.currentWidth = this.elem.offsetWidth || this.elem.getBoundingClientRect().width;

        const slideWidth = (this.currentWidth - totalVisibleMargins) / this.slidesToShow;

        const slideElems = this.wrapper.children;

        //wrap to div

        let counter = slideElems.length - 1;

        while(counter + 1) {
            slideElems[counter].style.width = slideWidth + 'px';
            counter--;
        }

        // const prevArrow = document.createElement('div');
        // prevArrow.classList.add('prev-arrow');
        // this.elem.appendChild(prevArrow);
        //
        // const nextArrow = document.createElement('div');
        // nextArrow.classList.add('next-arrow');
        // this.elem.appendChild(nextArrow);

        //this.slidesCount = this.wrapper.children.length;

        // for(let i = 0; i < this.slidesCount; i++) {
        //     this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
        // }

        this.showSlide(this.currentSlide);

        //this.elem.addEventListener('click', this.eventHandler.bind(this));
    }

    // makeResponsive() {
    //     this.responsiveOptions.forEach(function (options) {
    //
    //     });
    // }

    checkResponsive(breakpoint) {
        return window.innerWidth < breakpoint;
    }

}