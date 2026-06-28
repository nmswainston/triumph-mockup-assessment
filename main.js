//Mobile nav: tap outside the menu to close it.
(function () {
    const menu = document.getElementById("mainNav");
    const toggler = document.querySelector(".navbar-toggler");
    if (!menu || !toggler) return;

    const isOpen = () => menu.classList.contains("show");
    const close = () => bootstrap.Collapse.getOrCreateInstance(menu).hide();

    // Tap outside the open menu to close it.
    document.addEventListener("click", function (e) {
        if (!isOpen()) return;
        if (menu.contains(e.target) || toggler.contains(e.target)) return;
        close();
    });

    // Tap a nav link to close the menu.
    menu.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (isOpen()) close();
        });
    });
})();

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
        slidesPerView: 1.5,   // mobile default; the .5 reveals a peek so it reads as swipeable
        spaceBetween: 16,
        rewind: true,         // finite 7-item set: snap back to the start instead of cloning for a loop
        grabCursor: true,
        autoplay: { delay: 2500, disableOnInteraction: false }, // keeps autoplaying after a manual swipe
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            576: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 7 }, // full set visible on desktop, like the design
        },
    });
}

