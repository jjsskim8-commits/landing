let productSwiper = null;

function initProductSwiper() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && !productSwiper) {
        productSwiper = new Swiper('.product-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            pagination: {
                el: '.product-slider__pagination',
                clickable: true,
            },
        });
    }

    if (!isMobile && productSwiper) {
        productSwiper.destroy(true, true);
        productSwiper = null;
    }
}

// 실행
window.addEventListener('load', initProductSwiper);
window.addEventListener('resize', initProductSwiper);