// Countdown to the next Sunday service (10am).
(function () {
    const el = document.getElementById("countdown");
    if (!el) return;

    // Get next Sunday at 10am. If this week's is already past, use next week.
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
        const d = Math.floor(diff / 86400);
        const h = Math.floor((diff % 86400) / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        // Show days on their own so the hours don't get huge early in the week.
        el.textContent = d > 0
            ? `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`
            : `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    tick();
    setInterval(tick, 1000);
})();

// Ministry carousel (Swiper).
if (window.Swiper) {
    // Skip autoplay if the user has reduce-motion turned on.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ministrySwiper = new Swiper(".ministry-swiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: true,
        // rewind instead of loop - loop was glitchy with only 7 slides.
        rewind: true,
        speed: 500,
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

    const carousel = document.querySelector(".ministry-swiper");

    // Don't autoplay on page load - only run while the carousel is on screen.
    // Start it when it scrolls into view, and pause it again when it leaves.
    if (!reduceMotion && ministrySwiper.autoplay && "IntersectionObserver" in window) {
        ministrySwiper.autoplay.stop();
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) ministrySwiper.autoplay.start();
                else ministrySwiper.autoplay.stop();
            });
        }, { threshold: 0.3 }).observe(carousel);
    }

    // Stop the autoplay once someone tabs into the carousel.
    carousel.addEventListener("focusin", () => {
        ministrySwiper.autoplay?.stop();
    });
}

// The "#" links are placeholders for pages this mockup doesn't have. Stop them
// from jumping back to the top of the page when clicked (real anchors like the
// skip link still work).
document.addEventListener("click", (e) => {
    const placeholder = e.target.closest('a[href="#"], a[href=""]');
    if (placeholder) e.preventDefault();
});

// Fade elements in as they scroll into view.
(function () {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    // For reduce-motion users (or old browsers) just leave everything visible.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    targets.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target); // only reveal once
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));
})();
