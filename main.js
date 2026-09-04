/* ==========================================================
   HTET KO KO WIN ポートフォリオ
   main.js
========================================================== */

/* ===== Header Scroll Effect ===== */
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ===== Smooth Scroll ===== */
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ===== Hero Section Fade In ===== */
const heroLeft = document.querySelector(".hero-left");
const heroRight = document.querySelector(".hero-right");

if (heroLeft && heroRight) {
    heroLeft.style.opacity = "0";
    heroLeft.style.transform = "translateX(-60px)";
    heroLeft.style.transition = "1s";

    heroRight.style.opacity = "0";
    heroRight.style.transform = "translateX(60px)";
    heroRight.style.transition = "1s";

    window.addEventListener("load", function () {
        heroLeft.style.opacity = "1";
        heroLeft.style.transform = "translateX(0)";
        heroRight.style.opacity = "1";
        heroRight.style.transform = "translateX(0)";
    });
}

/* ===== Button Hover Effect ===== */
const buttons = document.querySelectorAll(".primary-btn, .secondary-btn");
buttons.forEach(function (button) {
    button.addEventListener("mouseenter", function () {
        button.style.transform = "translateY(-5px) scale(1.03)";
    });
    button.addEventListener("mouseleave", function () {
        button.style.transform = "translateY(0) scale(1)";
    });
});

/* ===== Hero Image Parallax ===== */
const heroImage = document.querySelector(".hero-right img");
document.addEventListener("mousemove", function (event) {
    const moveX = (event.clientX - window.innerWidth / 2) / 40;
    const moveY = (event.clientY - window.innerHeight / 2) / 40;
    if (heroImage) {
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

/* ===== Home Key to Top ===== */
window.addEventListener("keydown", function (event) {
    if (event.key === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

/* ===== Back to Top Button ===== */
const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
    topBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/* ===== Mobile Menu Toggle ===== */
const menuToggle = document.querySelector(".menu-toggle");
const navLinksMenu = document.querySelector(".nav-links");

if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinksMenu.classList.toggle("open");
    });

    navLinksMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menuToggle.classList.remove("active");
            navLinksMenu.classList.remove("open");
        });
    });
}

/* ===== Photo Slider Logic ===== */
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (!sliderTrack || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dot.addEventListener('click', function() {
                clearInterval(autoSlideInterval);
                goToSlide(index);
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        isTransitioning = true;
        currentIndex = index;

        sliderTrack.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        dots.forEach(function(dot, i) {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        setTimeout(function() {
            isTransitioning = false;
        }, 700);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(autoSlideInterval);
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(autoSlideInterval);
            prevSlide();
            startAutoSlide();
        });
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(function() {
            nextSlide();
        }, 3500);
    }

    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });

        sliderWrapper.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }

    startAutoSlide();
});

/* ===== Active Menu on Scroll ===== */
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute("id");
        }
    });

    navLinksAll.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});