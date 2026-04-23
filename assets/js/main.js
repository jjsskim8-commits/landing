const mq = window.matchMedia("(max-width: 768px)");
let productSwiper = null;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

function getHeaderOffset() {
    const header = document.querySelector(".header");
    if (!header) return 0;
    return Math.round(header.getBoundingClientRect().height);
}

function setActiveMenuLink(activeId, menuLinks) {
    menuLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("header__menu-link--active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function setupMenuScroll(menuLinks) {
    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            const targetTop = window.scrollY + target.getBoundingClientRect().top;
            const scrollTop = Math.max(targetTop - getHeaderOffset() - 12, 0);

            window.scrollTo({
                top: scrollTop,
                behavior: reducedMotionQuery.matches ? "auto" : "smooth",
            });
        });
    });
}

function setupActiveMenu(menuLinks) {
    const sectionIds = [...new Set(menuLinks.map((link) => link.getAttribute("href")?.replace("#", "")).filter(Boolean))];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const ratios = new Map();
    let observer = null;

    const updateActiveByRatio = () => {
        let bestId = sectionIds[0] || "";
        let bestRatio = -1;

        sectionIds.forEach((id) => {
            const ratio = ratios.get(id) ?? 0;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestId = id;
            }
        });

        if (bestId) setActiveMenuLink(bestId, menuLinks);
    };

    const initObserver = () => {
        if (observer) observer.disconnect();
        ratios.clear();

        const headerOffset = getHeaderOffset();
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                });
                updateActiveByRatio();
            },
            {
                root: null,
                rootMargin: `-${headerOffset + 24}px 0px -40% 0px`,
                threshold: [0.2, 0.35, 0.5, 0.7],
            }
        );

        sections.forEach((section) => observer.observe(section));
    };

    initObserver();
    window.addEventListener("resize", initObserver);
}

function setupSectionReveal() {
    const revealTargets = document.querySelectorAll(".about, .product-slider, .mist-plan, .intro, .notes, .scent-point");

    if (reducedMotionQuery.matches) {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
        return;
    }

    revealTargets.forEach((target) => target.classList.add("fade-up"));

    const revealObserver = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            root: null,
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.16,
        }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
}

function initHeaderInteractions() {
    const menuLinks = [...document.querySelectorAll(".header__menu-link[href^='#']")];
    if (menuLinks.length === 0) return;

    setupMenuScroll(menuLinks);
    setupActiveMenu(menuLinks);
}

syncProductSwiper();
mq.addEventListener("change", syncProductSwiper);
initHeaderInteractions();
setupSectionReveal();