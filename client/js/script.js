/*==================================================
  CodeNova Technologies
  script.js
  DOM Ready + Preloader
==================================================*/

"use strict";

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("CodeNova Technologies Loaded Successfully");

    initializeWebsite();

});

function initializeWebsite() {

    initPreloader();

    console.log("Initialization Complete");

}

/*=========================================
  Helper Selectors
=========================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*=========================================
  Window Events
=========================================*/

window.addEventListener("load", function () {

    hidePreloader();

});

window.addEventListener("resize", function () {

    console.log("Window Resized");

});

window.addEventListener("online", () => {

    console.log("Internet Connected");

});

window.addEventListener("offline", () => {

    console.log("Internet Disconnected");

});

/*=========================================
  Preloader
=========================================*/

function initPreloader() {

    const preloader = $("#preloader");

    if (!preloader) return;

    preloader.style.display = "flex";

}

function hidePreloader() {

    const preloader = $("#preloader");

    if (!preloader) return;

    preloader.classList.add("loaded");

    setTimeout(function () {

        preloader.style.opacity = "0";

    }, 300);

    setTimeout(function () {

        preloader.style.visibility = "hidden";

        preloader.style.display = "none";

    }, 700);

}

/*=========================================
  Loader Progress
=========================================*/

const loaderText = $(".loader-text");

if (loaderText) {

    loaderText.textContent = "Loading...";

}

const loaderBar = $(".loader-progress");

if (loaderBar) {

    let progress = 0;

    const interval = setInterval(function () {

        progress += 10;

        loaderBar.style.width = progress + "%";

        if (progress >= 100) {

            clearInterval(interval);

        }

    }, 100);

}

/*=========================================
  Loading Animation
=========================================*/

const spinner = $(".spinner");

if (spinner) {

    spinner.classList.add("active");

}

/*=========================================
  Performance Log
=========================================*/

window.addEventListener("load", function () {

    console.log("Website Loaded in", performance.now().toFixed(0), "ms");

});
/*==================================================
  Sticky Header + Mobile Menu
==================================================*/

"use strict";

/*=========================================
  Sticky Header
=========================================*/

const header = document.querySelector("header");
const backToTop = document.querySelector("#backToTop");

function stickyHeader() {

    if (!header) return;

    if (window.scrollY > 100) {

        header.classList.add("sticky-header");

        if (backToTop) {
            backToTop.classList.add("show");
        }

    } else {

        header.classList.remove("sticky-header");

        if (backToTop) {
            backToTop.classList.remove("show");
        }

    }

}

window.addEventListener("scroll", stickyHeader);

stickyHeader();

/*=========================================
  Header Shadow
=========================================*/

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "none";

    }

});

/*=========================================
  Mobile Menu
=========================================*/

const menuToggle =
    document.querySelector(".menu-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");

const menuClose =
    document.querySelector(".menu-close");

const menuOverlay =
    document.querySelector(".mobile-overlay");

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    if (menuOverlay) {

        menuOverlay.classList.add("active");

    }

    document.body.style.overflow = "hidden";

}

function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    if (menuOverlay) {

        menuOverlay.classList.remove("active");

    }

    document.body.style.overflow = "";

}

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        openMobileMenu
    );

}

if (menuClose) {

    menuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}

/*=========================================
  Close Menu After Clicking Link
=========================================*/

document
.querySelectorAll(".mobile-menu a")
.forEach(function (link) {

    link.addEventListener("click", function () {

        closeMobileMenu();

    });

});

/*=========================================
  ESC Key Support
=========================================*/

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeMobileMenu();

    }

});

/*=========================================
  Reset Menu On Resize
=========================================*/

window.addEventListener("resize", function () {

    if (window.innerWidth > 991) {

        closeMobileMenu();

    }

});
/*==================================================
  Dropdown Menu + Search Box + Dark Mode
==================================================*/

"use strict";

/*=========================================
  Dropdown Menu
=========================================*/

const dropdownItems =
    document.querySelectorAll(".dropdown");

dropdownItems.forEach(function (item) {

    item.addEventListener("mouseenter", function () {

        if (window.innerWidth > 991) {

            item.classList.add("show");

        }

    });

    item.addEventListener("mouseleave", function () {

        item.classList.remove("show");

    });

});

document.querySelectorAll(".dropdown-toggle")
.forEach(function (toggle) {

    toggle.addEventListener("click", function (e) {

        if (window.innerWidth <= 991) {

            e.preventDefault();

            this.parentElement.classList.toggle("show");

        }

    });

});

/*=========================================
  Search Box
=========================================*/

const searchBtn =
    document.querySelector(".search-btn");

const searchBox =
    document.querySelector(".search-box");

const searchInput =
    document.querySelector(".search-input");

if (searchBtn && searchBox) {

    searchBtn.addEventListener("click", function () {

        searchBox.classList.toggle("active");

        if (searchInput) {

            searchInput.focus();

        }

    });

}

document.addEventListener("click", function (e) {

    if (
        searchBox &&
        !searchBox.contains(e.target) &&
        !searchBtn.contains(e.target)
    ) {

        searchBox.classList.remove("active");

    }

});

if (searchInput) {

    searchInput.addEventListener("keyup", function (e) {

        if (e.key === "Enter") {

            console.log(
                "Searching for:",
                this.value
            );

        }

    });

}

/*=========================================
  Dark Mode
=========================================*/

const themeToggle =
    document.querySelector(".theme-toggle");

const body =
    document.body;

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    body.classList.add("dark-mode");

    if (themeToggle) {

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }

}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        body.classList.toggle("dark-mode");

        const darkEnabled =
            body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            darkEnabled ? "dark" : "light"
        );

        this.innerHTML = darkEnabled
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

    });

}

/*=========================================
  Close Dropdown On Outside Click
=========================================*/

document.addEventListener("click", function (e) {

    dropdownItems.forEach(function (item) {

        if (!item.contains(e.target)) {

            item.classList.remove("show");

        }

    });

});
/*==================================================
  Hero Slider + Counter Animation
==================================================*/

"use strict";

/*=========================================
  Hero Slider
=========================================*/

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const nextSlideBtn = document.querySelector(".hero-next");
const prevSlideBtn = document.querySelector(".hero-prev");

let currentSlide = 0;
let heroInterval = null;

function showHeroSlide(index){

    if(heroSlides.length === 0) return;

    heroSlides.forEach(function(slide){
        slide.classList.remove("active");
    });

    heroDots.forEach(function(dot){
        dot.classList.remove("active");
    });

    heroSlides[index].classList.add("active");

    if(heroDots[index]){
        heroDots[index].classList.add("active");
    }

    currentSlide = index;

}

function nextHeroSlide(){

    let index = currentSlide + 1;

    if(index >= heroSlides.length){
        index = 0;
    }

    showHeroSlide(index);

}

function previousHeroSlide(){

    let index = currentSlide - 1;

    if(index < 0){
        index = heroSlides.length - 1;
    }

    showHeroSlide(index);

}

function autoHeroSlider(){

    heroInterval = setInterval(function(){

        nextHeroSlide();

    },5000);

}

function stopHeroSlider(){

    clearInterval(heroInterval);

}

if(nextSlideBtn){

    nextSlideBtn.addEventListener("click",nextHeroSlide);

}

if(prevSlideBtn){

    prevSlideBtn.addEventListener("click",previousHeroSlide);

}

heroDots.forEach(function(dot,index){

    dot.addEventListener("click",function(){

        showHeroSlide(index);

    });

});

if(heroSlides.length){

    showHeroSlide(0);

    autoHeroSlider();

}

/*=========================================
  Counter Animation
=========================================*/

const counters = document.querySelectorAll(".counter");

function startCounter(counter){

    const target = Number(counter.dataset.target);

    const speed = Number(counter.dataset.speed) || 200;

    let count = 0;

    const increment = Math.ceil(target / speed);

    const timer = setInterval(function(){

        count += increment;

        if(count >= target){

            count = target;

            clearInterval(timer);

        }

        counter.textContent = count.toLocaleString();

    },10);

}

const counterObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            startCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

counters.forEach(function(counter){

    counterObserver.observe(counter);

});
/*==================================================
  Progress Bars + Typing Effect
==================================================*/

"use strict";

/*=========================================
  Progress Bars
=========================================*/

const progressBars =
    document.querySelectorAll(".progress-bar");

function animateProgressBar(bar){

    const target =
        parseInt(bar.dataset.progress) || 0;

    let width = 0;

    const timer = setInterval(function(){

        if(width >= target){

            clearInterval(timer);

        }else{

            width++;

            bar.style.width = width + "%";

            bar.setAttribute(
                "aria-valuenow",
                width
            );

            const value =
                bar.querySelector(".progress-value");

            if(value){

                value.textContent = width + "%";

            }

        }

    },15);

}

const progressObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            animateProgressBar(entry.target);

            progressObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

progressBars.forEach(function(bar){

    progressObserver.observe(bar);

});

/*=========================================
  Typing Effect
=========================================*/

const typingElement =
    document.querySelector(".typing-text");

if(typingElement){

    const words = [

        "Web Development",
        "UI / UX Design",
        "Mobile Applications",
        "Cloud Solutions",
        "Digital Marketing",
        "Software Development"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typingEffect(){

        const currentWord =
            words[wordIndex];

        if(!deleting){

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex++
                );

            if(charIndex >
                currentWord.length){

                deleting = true;

                setTimeout(
                    typingEffect,
                    1500
                );

                return;

            }

        }else{

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex--
                );

            if(charIndex < 0){

                deleting = false;

                wordIndex++;

                if(wordIndex >= words.length){

                    wordIndex = 0;

                }

            }

        }

        setTimeout(
            typingEffect,
            deleting ? 60 : 120
        );

    }

    typingEffect();

}
/*==================================================
  Scroll Reveal + Back To Top
==================================================*/

"use strict";

/*=========================================
  Scroll Reveal Animation
=========================================*/

const revealElements = document.querySelectorAll(
    ".reveal, .fade-up, .fade-left, .fade-right, .zoom-in"
);

function revealOnScroll() {

    const triggerPoint = window.innerHeight * 0.85;

    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < triggerPoint) {

            element.classList.add("active");

        } else {

            element.classList.remove("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/*=========================================
  Back To Top Button
=========================================*/

const backToTopBtn =
    document.querySelector("#backToTop");

function toggleBackToTop() {

    if (!backToTopBtn) return;

    if (window.scrollY > 300) {

        backToTopBtn.classList.add("show");

    } else {

        backToTopBtn.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);

if (backToTopBtn) {

    backToTopBtn.addEventListener("click", function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================
  Active Navigation on Scroll
=========================================*/

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});

/*=========================================
  Initialize
=========================================*/

revealOnScroll();

toggleBackToTop();
/*==================================================
  Portfolio Filter + Portfolio Popup
==================================================*/

"use strict";

/*=========================================
  Portfolio Filter
=========================================*/

const filterButtons =
    document.querySelectorAll(".portfolio-filter button");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

filterButtons.forEach(function(button){

    button.addEventListener("click",function(){

        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const filter =
            this.getAttribute("data-filter");

        portfolioItems.forEach(function(item){

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){

                item.style.display = "block";

                setTimeout(function(){

                    item.classList.add("show");

                },100);

            }else{

                item.classList.remove("show");

                setTimeout(function(){

                    item.style.display = "none";

                },300);

            }

        });

    });

});

/*=========================================
  Portfolio Popup
=========================================*/

const popup =
    document.querySelector(".portfolio-popup");

const popupImage =
    document.querySelector(".popup-image");

const popupTitle =
    document.querySelector(".popup-title");

const popupText =
    document.querySelector(".popup-description");

const popupClose =
    document.querySelector(".popup-close");

document
.querySelectorAll(".portfolio-preview")
.forEach(function(card){

    card.addEventListener("click",function(){

        if(!popup) return;

        const image =
            this.dataset.image;

        const title =
            this.dataset.title;

        const description =
            this.dataset.description;

        if(popupImage){

            popupImage.src = image;

            popupImage.alt = title;

        }

        if(popupTitle){

            popupTitle.textContent = title;

        }

        if(popupText){

            popupText.textContent = description;

        }

        popup.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

if(popupClose){

    popupClose.addEventListener("click",closePopup);

}

function closePopup(){

    if(!popup) return;

    popup.classList.remove("active");

    document.body.style.overflow = "";

}

window.addEventListener("click",function(e){

    if(e.target === popup){

        closePopup();

    }

});

document.addEventListener("keydown",function(e){

    if(e.key === "Escape"){

        closePopup();

    }

});
/*==================================================
  Team Cards + Services
==================================================*/

"use strict";

/*=========================================
  Team Cards
=========================================*/

const teamCards =
    document.querySelectorAll(".team-card");

teamCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("active");

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("active");

    });

});

document
.querySelectorAll(".team-social a")
.forEach(function(icon){

    icon.addEventListener("click",function(e){

        e.stopPropagation();

    });

});

teamCards.forEach(function(card){

    card.addEventListener("click",function(){

        const memberName =
            this.dataset.name || "Team Member";

        console.log(
            "Selected:",
            memberName
        );

    });

});

/*=========================================
  Team Search
=========================================*/

const teamSearch =
    document.querySelector("#teamSearch");

if(teamSearch){

    teamSearch.addEventListener("keyup",function(){

        const value =
            this.value.toLowerCase();

        teamCards.forEach(function(card){

            const text =
                card.textContent.toLowerCase();

            card.style.display =
                text.includes(value)
                ? "block"
                : "none";

        });

    });

}

/*=========================================
  Services
=========================================*/

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("hover");

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("hover");

    });

});

document
.querySelectorAll(".service-btn")
.forEach(function(button){

    button.addEventListener("click",function(){

        const title =
            this.dataset.service ||
            "Service";

        alert(
            title +
            " selected successfully."
        );

    });

});

/*=========================================
  Service Category Filter
=========================================*/

const serviceFilter =
    document.querySelector("#serviceFilter");

if(serviceFilter){

    serviceFilter.addEventListener("change",function(){

        const category = this.value;

        serviceCards.forEach(function(card){

            if(
                category === "all" ||
                card.dataset.category === category
            ){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

}

/*=========================================
  Service Statistics
=========================================*/

const serviceCounter =
    document.querySelector(".service-count");

if(serviceCounter){

    serviceCounter.textContent =
        serviceCards.length;

}
/*==================================================
  Pricing Toggle + FAQ Accordion
==================================================*/

"use strict";

/*=========================================
  Pricing Toggle
=========================================*/

const pricingToggle =
    document.querySelector("#pricingToggle");

const prices =
    document.querySelectorAll(".price-value");

const billingLabels =
    document.querySelectorAll(".billing-label");

if (pricingToggle) {

    pricingToggle.addEventListener("change", function () {

        const yearly = this.checked;

        prices.forEach(function (price) {

            const monthly =
                price.dataset.monthly || 0;

            const annual =
                price.dataset.yearly || 0;

            price.textContent =
                yearly ? annual : monthly;

        });

        billingLabels.forEach(function (label) {

            label.classList.remove("active");

        });

        if (yearly) {

            document
                .querySelector(".yearly-label")
                ?.classList.add("active");

        } else {

            document
                .querySelector(".monthly-label")
                ?.classList.add("active");

        }

    });

}

/*=========================================
  Pricing Buttons
=========================================*/

document
.querySelectorAll(".pricing-btn")
.forEach(function (button) {

    button.addEventListener("click", function () {

        const plan =
            this.dataset.plan || "Plan";

        alert(
            "You selected the " +
            plan +
            " plan."
        );

    });

});

/*=========================================
  FAQ Accordion
=========================================*/

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", function () {

        faqItems.forEach(function (faq) {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*=========================================
  Expand All FAQs
=========================================*/

const expandFaq =
    document.querySelector("#expandFaq");

if (expandFaq) {

    expandFaq.addEventListener("click", function () {

        faqItems.forEach(function (item) {

            item.classList.add("active");

        });

    });

}

/*=========================================
  Collapse All FAQs
=========================================*/

const collapseFaq =
    document.querySelector("#collapseFaq");

if (collapseFaq) {

    collapseFaq.addEventListener("click", function () {

        faqItems.forEach(function (item) {

            item.classList.remove("active");

        });

    });

}

/*=========================================
  FAQ Search
=========================================*/

const faqSearch =
    document.querySelector("#faqSearch");

if (faqSearch) {

    faqSearch.addEventListener("keyup", function () {

        const keyword =
            this.value.toLowerCase();

        faqItems.forEach(function (item) {

            const text =
                item.textContent.toLowerCase();

            item.style.display =
                text.includes(keyword)
                    ? "block"
                    : "none";

        });

    });

}

/*=========================================
  FAQ Counter
=========================================*/

const faqCounter =
    document.querySelector(".faq-count");

if (faqCounter) {

    faqCounter.textContent =
        faqItems.length;

}
/*==================================================
  Swiper Slider + Testimonials
==================================================*/

"use strict";

/*=========================================
  Swiper Slider
=========================================*/

let testimonialSwiper = null;

if (typeof Swiper !== "undefined") {

    testimonialSwiper = new Swiper(".testimonial-swiper", {

        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        grabCursor: true,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        breakpoints: {

            576: {
                slidesPerView: 1
            },

            768: {
                slidesPerView: 2
            },

            1200: {
                slidesPerView: 3
            }

        }

    });

}

/*=========================================
  Swiper Controls
=========================================*/

const swiperPlay =
    document.querySelector(".swiper-play");

const swiperPause =
    document.querySelector(".swiper-pause");

if (swiperPlay && testimonialSwiper) {

    swiperPlay.addEventListener("click", function () {

        testimonialSwiper.autoplay.start();

    });

}

if (swiperPause && testimonialSwiper) {

    swiperPause.addEventListener("click", function () {

        testimonialSwiper.autoplay.stop();

    });

}

/*=========================================
  Testimonials
=========================================*/

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

testimonialCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        this.classList.add("active");

    });

    card.addEventListener("mouseleave", function () {

        this.classList.remove("active");

    });

});

/*=========================================
  Read More Testimonials
=========================================*/

document
.querySelectorAll(".testimonial-read-more")
.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            this.closest(".testimonial-card");

        if (!card) return;

        card.classList.toggle("expanded");

        this.textContent =
            card.classList.contains("expanded")
                ? "Show Less"
                : "Read More";

    });

});

/*=========================================
  Testimonial Rating
=========================================*/

document
.querySelectorAll(".testimonial-rating")
.forEach(function (rating) {

    const value =
        Number(rating.dataset.rating) || 5;

    rating.innerHTML = "";

    for (let i = 1; i <= 5; i++) {

        const star =
            document.createElement("i");

        star.className =
            i <= value
                ? "fas fa-star"
                : "far fa-star";

        rating.appendChild(star);

    }

});

/*=========================================
  Total Testimonials
=========================================*/

const testimonialCount =
    document.querySelector(".testimonial-count");

if (testimonialCount) {

    testimonialCount.textContent =
        testimonialCards.length;

}
/*==================================================
  Blog + Newsletter
==================================================*/

"use strict";

/*=========================================
  Blog Section
=========================================*/

const blogCards =
    document.querySelectorAll(".blog-card");

blogCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        this.classList.add("active");

    });

    card.addEventListener("mouseleave", function () {

        this.classList.remove("active");

    });

});

/*=========================================
  Blog Search
=========================================*/

const blogSearch =
    document.querySelector("#blogSearch");

if (blogSearch) {

    blogSearch.addEventListener("keyup", function () {

        const keyword =
            this.value.toLowerCase();

        blogCards.forEach(function (card) {

            const content =
                card.textContent.toLowerCase();

            card.style.display =
                content.includes(keyword)
                    ? "block"
                    : "none";

        });

    });

}

/*=========================================
  Blog Category Filter
=========================================*/

const categoryFilter =
    document.querySelector("#blogCategory");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const category = this.value;

        blogCards.forEach(function (card) {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/*=========================================
  Newsletter Subscription
=========================================*/

const newsletterForm =
    document.querySelector("#newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            this.querySelector("input[type='email']");

        const message =
            document.querySelector(".newsletter-message");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.value.trim()) {

            if (message) {

                message.textContent =
                    "Please enter your email address.";

                message.className =
                    "newsletter-message error";

            }

            return;

        }

        if (!emailPattern.test(email.value)) {

            if (message) {

                message.textContent =
                    "Please enter a valid email.";

                message.className =
                    "newsletter-message error";

            }

            return;

        }

        if (message) {

            message.textContent =
                "Thank you for subscribing!";

            message.className =
                "newsletter-message success";

        }

        console.log(
            "Newsletter Email:",
            email.value
        );

        this.reset();

    });

}

/*=========================================
  Newsletter Counter
=========================================*/

const subscriberCount =
    document.querySelector(".subscriber-count");

if (subscriberCount) {

    let count =
        Number(subscriberCount.dataset.count) || 5000;

    subscriberCount.textContent =
        count.toLocaleString();

}
/*==================================================
  Contact Form Validation + Office Map
==================================================*/

"use strict";

/*=========================================
  Contact Form Validation
=========================================*/

const contactForm =
    document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.querySelector("#name");

        const email =
            document.querySelector("#email");

        const subject =
            document.querySelector("#subject");

        const message =
            document.querySelector("#message");

        const status =
            document.querySelector(".form-status");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !subject.value.trim() ||
            !message.value.trim()
        ) {

            if (status) {

                status.textContent =
                    "Please fill in all required fields.";

                status.className =
                    "form-status error";

            }

            return;

        }

        if (!emailPattern.test(email.value)) {

            if (status) {

                status.textContent =
                    "Please enter a valid email address.";

                status.className =
                    "form-status error";

            }

            email.focus();

            return;

        }

        if (status) {

            status.textContent =
                "Message sent successfully!";

            status.className =
                "form-status success";

        }

        console.log({

            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value

        });

        contactForm.reset();

    });

}

/*=========================================
  Input Validation
=========================================*/

document
.querySelectorAll("#contactForm input, #contactForm textarea")
.forEach(function (field) {

    field.addEventListener("blur", function () {

        if (this.value.trim() === "") {

            this.classList.add("is-invalid");

        } else {

            this.classList.remove("is-invalid");

            this.classList.add("is-valid");

        }

    });

});

/*=========================================
  Office Map
=========================================*/

const officeMap =
    document.querySelector("#officeMap");

const openMapBtn =
    document.querySelector(".open-map");

if (openMapBtn) {

    openMapBtn.addEventListener("click", function () {

        window.open(

            "https://maps.google.com",

            "_blank"

        );

    });

}

if (officeMap) {

    officeMap.addEventListener("load", function () {

        console.log("Google Map Loaded Successfully");

    });

}

/*=========================================
  Office Location Buttons
=========================================*/

document
.querySelectorAll(".office-location")
.forEach(function (button) {

    button.addEventListener("click", function () {

        const office =
            this.dataset.office || "Head Office";

        alert(

            office +
            " location selected."

        );

    });

});

/*=========================================
  Contact Information
=========================================*/

const officePhone =
    document.querySelector(".office-phone");

const officeEmail =
    document.querySelector(".office-email");

if (officePhone) {

    officePhone.addEventListener("click", function () {

        console.log("Calling Office...");

    });

}

if (officeEmail) {

    officeEmail.addEventListener("click", function () {

        console.log("Opening Email Client...");

    });

}
/*==================================================
  Modal Windows + Notifications
==================================================*/

"use strict";

/*=========================================
  Modal Windows
=========================================*/

const modal =
    document.querySelector(".custom-modal");

const modalOpenButtons =
    document.querySelectorAll("[data-modal]");

const modalCloseButton =
    document.querySelector(".modal-close");

const modalOverlay =
    document.querySelector(".modal-overlay");

function openModal() {

    if (!modal) return;

    modal.classList.add("show");

    document.body.classList.add("modal-open");

}

function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");

}

modalOpenButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        openModal();

    });

});

if (modalCloseButton) {

    modalCloseButton.addEventListener("click", closeModal);

}

if (modalOverlay) {

    modalOverlay.addEventListener("click", closeModal);

}

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});

/*=========================================
  Notifications
=========================================*/

const notification =
    document.querySelector(".notification");

function showNotification(message, type = "success") {

    if (!notification) return;

    notification.textContent = message;

    notification.className =
        "notification " + type + " show";

    setTimeout(function () {

        notification.classList.remove("show");

    }, 3000);

}

document
.querySelectorAll(".notify-btn")
.forEach(function (button) {

    button.addEventListener("click", function () {

        const message =
            this.dataset.message ||
            "Operation completed successfully.";

        const type =
            this.dataset.type ||
            "success";

        showNotification(message, type);

    });

});

/*=========================================
  Notification Close Button
=========================================*/

const notificationClose =
    document.querySelector(".notification-close");

if (notificationClose) {

    notificationClose.addEventListener("click", function () {

        notification.classList.remove("show");

    });

}

/*=========================================
  Demo Notification
=========================================*/

window.addEventListener("load", function () {

    setTimeout(function () {

        showNotification(
            "Welcome to CodeNova Technologies!",
            "success"
        );

    }, 1000);

});
/*==================================================
  Cookies Banner + Lazy Loading
==================================================*/

"use strict";

/*=========================================
  Cookies Banner
=========================================*/

const cookieBanner =
    document.querySelector(".cookie-banner");

const acceptCookies =
    document.querySelector(".accept-cookies");

const rejectCookies =
    document.querySelector(".reject-cookies");

const COOKIE_KEY = "codenova_cookie_consent";

function hideCookieBanner() {

    if (cookieBanner) {

        cookieBanner.classList.remove("show");

    }

}

function showCookieBanner() {

    if (cookieBanner) {

        cookieBanner.classList.add("show");

    }

}

if (!localStorage.getItem(COOKIE_KEY)) {

    window.addEventListener("load", function () {

        setTimeout(showCookieBanner, 1000);

    });

}

if (acceptCookies) {

    acceptCookies.addEventListener("click", function () {

        localStorage.setItem(COOKIE_KEY, "accepted");

        hideCookieBanner();

    });

}

if (rejectCookies) {

    rejectCookies.addEventListener("click", function () {

        localStorage.setItem(COOKIE_KEY, "rejected");

        hideCookieBanner();

    });

}

/*=========================================
  Lazy Loading Images
=========================================*/

const lazyImages =
    document.querySelectorAll("img[data-src]");

const imageObserver =
new IntersectionObserver(function(entries, observer){

    entries.forEach(function(entry){

        if(!entry.isIntersecting){

            return;

        }

        const image = entry.target;

        image.src = image.dataset.src;

        image.removeAttribute("data-src");

        image.onload = function(){

            image.classList.add("loaded");

        };

        observer.unobserve(image);

    });

},{
    root:null,
    threshold:0.2,
    rootMargin:"100px"
});

lazyImages.forEach(function(image){

    imageObserver.observe(image);

});

/*=========================================
  Lazy Loading Videos
=========================================*/

const lazyVideos =
    document.querySelectorAll("video[data-src]");

lazyVideos.forEach(function(video){

    const source =
        video.querySelector("source");

    if(!source) return;

    const observer =
    new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                source.src =
                    source.dataset.src;

                video.load();

                observer.unobserve(video);

            }

        });

    });

    observer.observe(video);

});
/*==================================================
  Image Gallery + Statistics
==================================================*/

"use strict";

/*=========================================
  Image Gallery
=========================================*/

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryModal =
    document.querySelector(".gallery-modal");

const galleryImage =
    document.querySelector(".gallery-modal img");

const galleryClose =
    document.querySelector(".gallery-close");

galleryItems.forEach(function(item){

    item.addEventListener("click",function(){

        if(!galleryModal || !galleryImage) return;

        const image =
            this.querySelector("img");

        galleryImage.src = image.src;

        galleryImage.alt = image.alt;

        galleryModal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

function closeGallery(){

    if(!galleryModal) return;

    galleryModal.classList.remove("show");

    document.body.style.overflow = "";

}

if(galleryClose){

    galleryClose.addEventListener("click",closeGallery);

}

if(galleryModal){

    galleryModal.addEventListener("click",function(e){

        if(e.target === galleryModal){

            closeGallery();

        }

    });

}

document.addEventListener("keydown",function(e){

    if(e.key === "Escape"){

        closeGallery();

    }

});

/*=========================================
  Gallery Filter
=========================================*/

const galleryFilter =
    document.querySelector("#galleryFilter");

if(galleryFilter){

    galleryFilter.addEventListener("change",function(){

        const category = this.value;

        galleryItems.forEach(function(item){

            if(
                category === "all" ||
                item.dataset.category === category
            ){

                item.style.display = "block";

            }else{

                item.style.display = "none";

            }

        });

    });

}

/*=========================================
  Statistics
=========================================*/

const statistics =
    document.querySelectorAll(".stat-number");

function animateStatistic(element){

    const target =
        Number(element.dataset.target) || 0;

    const duration = 2000;

    const increment =
        target / (duration / 20);

    let current = 0;

    const timer = setInterval(function(){

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent =
            Math.floor(current).toLocaleString();

    },20);

}

const statsObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            animateStatistic(entry.target);

            statsObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

statistics.forEach(function(item){

    statsObserver.observe(item);

});

/*=========================================
  Statistics Refresh
=========================================*/

const refreshStats =
    document.querySelector(".refresh-stats");

if(refreshStats){

    refreshStats.addEventListener("click",function(){

        statistics.forEach(function(item){

            item.textContent = "0";

            animateStatistic(item);

        });

    });

}
/*==================================================
  CodeNova Technologies
  script.js
  Part 3B.1
  Theme Settings + Local Storage
==================================================*/

"use strict";

/*=========================================
  Theme Settings
=========================================*/

const themeButton =
    document.querySelector(".theme-toggle");

const rootElement =
    document.documentElement;

const THEME_KEY = "codenova_theme";

function applyTheme(theme){

    if(theme === "dark"){

        document.body.classList.add("dark-mode");

        if(themeButton){

            themeButton.innerHTML =
                '<i class="fas fa-sun"></i>';

        }

    }else{

        document.body.classList.remove("dark-mode");

        if(themeButton){

            themeButton.innerHTML =
                '<i class="fas fa-moon"></i>';

        }

    }

    localStorage.setItem(THEME_KEY, theme);

}

const savedTheme =
    localStorage.getItem(THEME_KEY);

if(savedTheme){

    applyTheme(savedTheme);

}else{

    applyTheme("light");

}

if(themeButton){

    themeButton.addEventListener("click",function(){

        const nextTheme =
            document.body.classList.contains("dark-mode")
            ? "light"
            : "dark";

        applyTheme(nextTheme);

    });

}

/*=========================================
  Local Storage
=========================================*/

const Storage = {

    save(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key){

        const data =
            localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : null;

    },

    remove(key){

        localStorage.removeItem(key);

    },

    clear(){

        localStorage.clear();

    }

};

/*=========================================
  Save User Preferences
=========================================*/

Storage.save("website",{

    company:"CodeNova Technologies",

    version:"1.0.0"

});

const preferences =
    Storage.get("website");

if(preferences){

    console.log(

        "Preferences Loaded:",

        preferences

    );

}

/*=========================================
  Remember Scroll Position
=========================================*/

window.addEventListener("beforeunload",function(){

    Storage.save(

        "scrollPosition",

        window.scrollY

    );

});

window.addEventListener("load",function(){

    const position =
        Storage.get("scrollPosition");

    if(position){

        window.scrollTo({

            top:position,

            behavior:"instant"

        });

    }

});

/*=========================================
  Session Counter
=========================================*/

let visitCount =
    Number(localStorage.getItem("visitCount")) || 0;

visitCount++;

localStorage.setItem(

    "visitCount",

    visitCount

);

console.log(

    "Website Visits:",

    visitCount

);
/*==================================================
  Utilities + Helper Functions
==================================================*/

"use strict";

/*=========================================
  Utility Functions
=========================================*/

const Utils = {

    select(selector){

        return document.querySelector(selector);

    },

    selectAll(selector){

        return document.querySelectorAll(selector);

    },

    addClass(element,className){

        if(element){

            element.classList.add(className);

        }

    },

    removeClass(element,className){

        if(element){

            element.classList.remove(className);

        }

    },

    toggleClass(element,className){

        if(element){

            element.classList.toggle(className);

        }

    },

    hasClass(element,className){

        return element
            ? element.classList.contains(className)
            : false;

    },

    random(min,max){

        return Math.floor(

            Math.random() * (max-min+1)

        ) + min;

    },

    debounce(callback,delay){

        let timer;

        return function(){

            clearTimeout(timer);

            timer = setTimeout(

                callback,

                delay

            );

        };

    }

};

/*=========================================
  Helper Functions
=========================================*/

function scrollToElement(selector){

    const element = Utils.select(selector);

    if(element){

        element.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

function formatDate(){

    return new Date().toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    );

}

function currentYear(){

    const year = Utils.select("#currentYear");

    if(year){

        year.textContent =

            new Date().getFullYear();

    }

}

function copyText(text){

    navigator.clipboard.writeText(text)

    .then(function(){

        console.log("Copied:",text);

    })

    .catch(function(){

        console.log("Copy Failed");

    });

}

function isMobile(){

    return window.innerWidth <= 768;

}

function isDesktop(){

    return window.innerWidth > 768;

}

function pageTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function pageBottom(){

    window.scrollTo({

        top:document.body.scrollHeight,

        behavior:"smooth"

    });

}

/*=========================================
  Initialize Helpers
=========================================*/

currentYear();

console.log(

    "Today's Date:",

    formatDate()

);
/*==================================================
  Browser Fixes + Initialization
==================================================*/

"use strict";

/*=========================================
  Browser Fixes
=========================================*/

function browserFixes(){

    /* Smooth Scroll Support */

    if(!("scrollBehavior" in document.documentElement.style)){

        console.warn(
            "Smooth scrolling is not supported."
        );

    }

    /* Touch Device */

    if(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    ){

        document.body.classList.add("touch-device");

    }

    /* Safari */

    const isSafari =
        /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );

    if(isSafari){

        document.body.classList.add("safari");

    }

    /* Firefox */

    if(
        navigator.userAgent
        .toLowerCase()
        .includes("firefox")
    ){

        document.body.classList.add("firefox");

    }

    /* Edge */

    if(
        navigator.userAgent
        .includes("Edg")
    ){

        document.body.classList.add("edge");

    }

    /* Chrome */

    if(
        navigator.userAgent
        .includes("Chrome")
    ){

        document.body.classList.add("chrome");

    }

    /* Online / Offline */

    window.addEventListener("online",function(){

        console.log("Internet Connected");

    });

    window.addEventListener("offline",function(){

        console.log("Internet Disconnected");

    });

}

/*=========================================
  Website Initialization
=========================================*/

function initializeWebsite(){

    console.log(
        "Initializing CodeNova Technologies..."
    );

    browserFixes();

    if(typeof revealOnScroll === "function"){

        revealOnScroll();

    }

    if(typeof stickyHeader === "function"){

        stickyHeader();

    }

    if(typeof toggleBackToTop === "function"){

        toggleBackToTop();

    }

    console.log(
        "Initialization Complete."
    );

}

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);

/*=========================================
  Window Load
=========================================*/

window.addEventListener("load",function(){

    console.log(
        "Website Loaded Successfully."
    );

});

/*=========================================
  Resize Event
=========================================*/

window.addEventListener("resize",function(){

    console.log(

        "Window Width:",

        window.innerWidth

    );

});

/*=========================================
  Scroll Event
=========================================*/

window.addEventListener("scroll",function(){

    document.body.dataset.scroll =

        window.scrollY;

});

/*=========================================
  Performance
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Load Time:",

        performance.now().toFixed(2),

        "ms"

    );

});



