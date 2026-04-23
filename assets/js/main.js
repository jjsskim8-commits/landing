const mq = window.matchMedia("(max-width: 768px)");
let productSwiper = null;

function mountProductSwiper() {
    if (!productSwiper) {
        productSwiper = new Swiper(".product-slider", {
            slidesPerView: 1,
            pagination: {
                el: ".product-slider__pagination",
                clickable: true,
            },
        });
    }
}

function unmountProductSwiper() {
    if (productSwiper) {
        productSwiper.destroy(true, true);
        productSwiper = null;
    }
}

function syncProductSwiper() {
    if (mq.matches) {
        mountProductSwiper();
    } else {
        unmountProductSwiper();
    }
}

syncProductSwiper();
mq.addEventListener("change", syncProductSwiper);