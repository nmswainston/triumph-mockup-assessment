// Hero countdown to the next Sunday service (10 AM local).
(function () {
    const el = document.getElementById("countdown");
    if (!el) return;

    // The next Sunday at 10:00; if it's already past this Sunday's service, roll to next week.
    function nextService() {
        const now = new Date();
        const target = new Date(now);
        const daysUntilSunday = (7 - now.getDay()) % 7; // Sunday = 0
        target.setDate(now.getDate() + daysUntilSunday);
        target.setHours(10, 0, 0, 0);
        if (target <= now) target.setDate(target.getDate() + 7);
        return target;
    }

    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
        let diff = Math.floor((nextService() - new Date()) / 1000);
        if (diff < 0) diff = 0;
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    tick();
    setInterval(tick, 1000);
})();

// Ministry carousel: multi-item, responsive, swipe + autoplay.
if (window.Swiper) {
    // Honor the visitor's OS "reduce motion" setting: no autoplay for them.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ministrySwiper = new Swiper(".ministry-swiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: true,
        // loop (not rewind) so the end wraps smoothly instead of snapping back.
        loop: true,
        grabCursor: true,
        keyboard: { enabled: true, onlyInViewport: true },
        autoplay: reduceMotion
            ? false
            : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            576: { slidesPerView: 2.5, centeredSlides: false, spaceBetween: 20 },
            768: { slidesPerView: 3.5, centeredSlides: false, spaceBetween: 24 },
            992: { slidesPerView: 5, centeredSlides: false, spaceBetween: 32 },
        },
    });

    // WCAG 2.2.2 / W3C carousel pattern: auto-rotation stops when keyboard
    // focus enters the carousel, and stays stopped (no resume on blur).
    document.querySelector(".ministry-swiper").addEventListener("focusin", () => {
        ministrySwiper.autoplay?.stop();
    });
}

// Scroll-reveal: fade/rise [data-reveal] elements in as they enter the viewport.
(function () {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    // Reduced-motion users (and browsers without IntersectionObserver) keep the
    // content fully visible; we never add the hidden .reveal state for them.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    targets.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target); // reveal once, then stop watching
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
})();
