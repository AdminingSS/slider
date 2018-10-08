class Slider {
    constructor (id) {
        const sliderElem = document.getElementById(id);
        sliderElem.classList.add('slider-gallery');

        const slideElems = sliderElem.children;
        alert(slideElems.length);

        const wrapper = document.createElement('div');
        wrapper.classList.add('slider-slides');

        for(const child of slideElems) {
            child.classList.add('slider-slide');
            wrapper.appendChild(child);
        }

        sliderElem.appendChild(wrapper);

        let currentSlide = 0;

    }
}