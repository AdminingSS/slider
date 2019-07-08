const options = {
    slidesToShow: 5,
    slideMargin: 20,
    responsiveOptions: [
        {
            breakpoint: 960,
            slidesToShow: 3,
            slideMargin: 10
        },
        {
            breakpoint: 640,
            slidesToShow: 1,
            slideMargin: 0
        }
    ]
};
options.elem = document.getElementById('slider');

const slider = new Slider(options);