// Scroll-triggered animations for Allybi pages
document.addEventListener("DOMContentLoaded", () => {
    // Generic animate-on-scroll elements
    const sectionsToAnimate = document.querySelectorAll(".animate-on-scroll");

    if (sectionsToAnimate && sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pain section highlight animation
    const painSection = document.querySelector(".pain-section");

    if (painSection) {
        if (prefersReducedMotion) {
            painSection.classList.add("is-visible");
        } else {
            const painObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        painObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.3,
                rootMargin: "0px"
            });

            painObserver.observe(painSection);
        }
    }

    // Steps section staggered fade-up animation
    const stepsSection = document.querySelector(".steps-section");

    if (stepsSection) {
        if (prefersReducedMotion) {
            stepsSection.classList.add("is-visible");
        } else {
            const stepsObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        stepsObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.2,
                rootMargin: "0px"
            });

            stepsObserver.observe(stepsSection);
        }
    }

    // Action cards staggered fade-up animation
    const actionBlock = document.querySelector(".action-cards-block");

    if (actionBlock) {
        if (prefersReducedMotion) {
            actionBlock.classList.add("is-visible");
        } else {
            const actionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        actionObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.2,
                rootMargin: "0px"
            });

            actionObserver.observe(actionBlock);
        }
    }

    // Final CTA section staggered checklist animation
    const finalCtaSection = document.querySelector(".final-cta-section");

    if (finalCtaSection) {
        if (prefersReducedMotion) {
            finalCtaSection.classList.add("is-visible");
        } else {
            const ctaObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        ctaObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.25,
                rootMargin: "0px"
            });

            ctaObserver.observe(finalCtaSection);
        }
    }
});
