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
// ========================================
// SAUTUS-SUNNAH AI ASSISTANT
// ========================================

const askAiButton = document.getElementById("ask-ai-btn");
const aiQuestion = document.getElementById("ai-question");
const aiAnswer = document.getElementById("ai-answer");
const aiLoading = document.getElementById("ai-loading");

if (askAiButton) {

    askAiButton.addEventListener("click", async () => {

        const question = aiQuestion.value.trim();

        if (!question) {
            aiAnswer.style.display = "block";
            aiAnswer.textContent = "Please enter your question.";
            return;
        }

        askAiButton.disabled = true;
        aiLoading.style.display = "block";
        aiAnswer.style.display = "none";

        try {

            const response = await fetch("/.netlify/functions/ask-ai", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong."
                );
            }

            aiAnswer.textContent = data.answer;
            aiAnswer.style.display = "block";

        } catch (error) {

            aiAnswer.textContent =
                "Sorry, something went wrong. Please try again.";

            aiAnswer.style.display = "block";

            console.error("SAUTUS-SUNNAH AI:", error);

        } finally {

            askAiButton.disabled = false;
            aiLoading.style.display = "none";

        }

    });

}