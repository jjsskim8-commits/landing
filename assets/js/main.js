(() => {
    const products = document.querySelectorAll(".product");
    const scentReviews = document.querySelectorAll(".scent-point__testimonial");
    if (!products.length && !scentReviews.length) return;

    document.body.classList.add("js-enabled");

    if (!("IntersectionObserver" in window)) {
        products.forEach((product) => product.classList.add("is-visible"));
        scentReviews.forEach((review) => review.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            root: null,
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px",
        }
    );

    [...products, ...scentReviews].forEach((item) => observer.observe(item));
})();