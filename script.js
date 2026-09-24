// ================================
// SAUTUS-SUNNAH WEBSITE JAVASCRIPT
// ================================

// Mobile navigation
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        console.log("Navigation clicked:", link.textContent);
    });
});


// Smooth scrolling
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (targetId && targetId.startsWith("#")) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});


// Current year in footer
const footerYear = document.querySelector("footer p:last-child");

if (footerYear) {
    const currentYear = new Date().getFullYear();

    footerYear.textContent =
        `© ${currentYear} SAUTUS-SUNNAH. All Rights Reserved.`;
}


// Welcome message
console.log(
    "Welcome to SAUTUS-SUNNAH — Light from the Sunnah, Guidance for Life."
);