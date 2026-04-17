const mq = window.matchMedia('(max-width: 768px)');

function initSwiper() {
    if (mq.matches) {
        new Swiper('.product-slider', {
            slidesPerView: 1,
            pagination: {
                el: '.product-slider__pagination',
                clickable: true,
            },
        });
    }
}

initSwiper();
mq.addEventListener('change', () => location.reload()); // 리사이즈 시 재초기화