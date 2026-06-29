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

// Ministry carousel: multi-item, responsive, swipe + autoplay (requirement #4).
if (window.Swiper) {
    new Swiper(".ministry-swiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: true,
        rewind: true,
        grabCursor: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            576: { slidesPerView: 2.5, centeredSlides: false, spaceBetween: 20 },
            768: { slidesPerView: 3.5, centeredSlides: false, spaceBetween: 24 },
            992: { slidesPerView: 5, centeredSlides: false, spaceBetween: 32 },
        },
    });
}
