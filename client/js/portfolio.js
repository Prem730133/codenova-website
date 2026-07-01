/*==================================================
  Portfolio Filter + Category Buttons
==================================================*/

"use strict";

/*=========================================
  Portfolio Elements
=========================================*/

const portfolioContainer =
    document.querySelector(".portfolio-container");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const filterButtons =
    document.querySelectorAll(".portfolio-filter .filter-btn");

const resultCounter =
    document.querySelector("#portfolioResults");

/*=========================================
  Portfolio Filter
=========================================*/

function filterPortfolio(category){

    let visibleItems = 0;

    portfolioItems.forEach(function(item){

        const itemCategory =
            item.dataset.category || "all";

        if(

            category === "all" ||

            itemCategory === category

        ){

            item.style.display = "block";

            setTimeout(function(){

                item.classList.add("show");

            },100);

            visibleItems++;

        }

        else{

            item.classList.remove("show");

            item.style.display = "none";

        }

    });

    updatePortfolioCounter(visibleItems);

}

/*=========================================
  Update Counter
=========================================*/

function updatePortfolioCounter(count){

    if(resultCounter){

        resultCounter.textContent =
            count + " Projects Found";

    }

}

/*=========================================
  Category Buttons
=========================================*/

filterButtons.forEach(function(button){

    button.addEventListener("click",function(){

        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category =
            this.dataset.filter || "all";

        filterPortfolio(category);

    });

});

/*=========================================
  Default Category
=========================================*/

window.addEventListener("load",function(){

    const activeButton =
        document.querySelector(

            ".portfolio-filter .filter-btn.active"

        );

    if(activeButton){

        filterPortfolio(

            activeButton.dataset.filter

        );

    }

    else{

        filterPortfolio("all");

    }

});

/*=========================================
  Filter Animation
=========================================*/

portfolioItems.forEach(function(item){

    item.addEventListener("transitionend",function(){

        this.classList.add("animation-complete");

    });

});

/*=========================================
  Reset Filters
=========================================*/

const resetFilter =
    document.querySelector("#resetPortfolio");

if(resetFilter){

    resetFilter.addEventListener("click",function(){

        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        const firstButton =
            filterButtons[0];

        if(firstButton){

            firstButton.classList.add("active");

        }

        filterPortfolio("all");

    });

}

/*=========================================
  Helper Functions
=========================================*/

function showProject(project){

    project.style.display = "block";

}

function hideProject(project){

    project.style.display = "none";

}

/*=========================================
  Console Message
=========================================*/

console.log(

    "Portfolio Filter Ready"

);
/*==================================================
  Search Projects + Sorting Projects
==================================================*/

"use strict";

/*=========================================
  Search Projects
=========================================*/

const searchInput =
    document.querySelector("#portfolioSearch");

const portfolioCards =
    document.querySelectorAll(".portfolio-item");

const searchResult =
    document.querySelector("#searchResult");

/*=========================================
  Search Function
=========================================*/

function searchProjects(keyword){

    let count = 0;

    portfolioCards.forEach(function(card){

        const title =
            card.querySelector(".portfolio-title")
            ?.textContent.toLowerCase() || "";

        const category =
            card.dataset.category?.toLowerCase() || "";

        const technologies =
            card.dataset.tech?.toLowerCase() || "";

        if(

            title.includes(keyword) ||

            category.includes(keyword) ||

            technologies.includes(keyword)

        ){

            card.style.display = "block";

            card.classList.add("search-visible");

            count++;

        }

        else{

            card.style.display = "none";

            card.classList.remove("search-visible");

        }

    });

    if(searchResult){

        searchResult.textContent =
            count + " Project(s) Found";

    }

}

/*=========================================
  Search Event
=========================================*/

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        searchProjects(

            this.value.trim().toLowerCase()

        );

    });

}

/*=========================================
  Clear Search
=========================================*/

const clearSearch =
    document.querySelector("#clearSearch");

if(clearSearch){

    clearSearch.addEventListener("click",function(){

        if(searchInput){

            searchInput.value = "";

        }

        searchProjects("");

    });

}

/*=========================================
  Sorting Projects
=========================================*/

const sortProjects =
    document.querySelector("#sortProjects");

if(sortProjects){

    sortProjects.addEventListener("change",function(){

        sortPortfolio(this.value);

    });

}

function sortPortfolio(option){

    const container =
        document.querySelector(".portfolio-container");

    if(!container) return;

    const items =
        Array.from(

            container.querySelectorAll(

                ".portfolio-item"

            )

        );

    items.sort(function(a,b){

        const titleA =
            a.dataset.title?.toLowerCase() || "";

        const titleB =
            b.dataset.title?.toLowerCase() || "";

        const yearA =
            parseInt(a.dataset.year) || 0;

        const yearB =
            parseInt(b.dataset.year) || 0;

        switch(option){

            case "name-asc":

                return titleA.localeCompare(titleB);

            case "name-desc":

                return titleB.localeCompare(titleA);

            case "latest":

                return yearB - yearA;

            case "oldest":

                return yearA - yearB;

            default:

                return 0;

        }

    });

    items.forEach(function(item){

        container.appendChild(item);

    });

}

/*=========================================
  Helper Functions
=========================================*/

function refreshPortfolio(){

    searchProjects("");

}

function resetSorting(){

    if(sortProjects){

        sortProjects.selectedIndex = 0;

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    refreshPortfolio();

    console.log(

        "Project Search & Sorting Initialized"

    );

});
/*==================================================
  Featured Projects + Portfolio Counter
==================================================*/

"use strict";

/*=========================================
  Featured Projects
=========================================*/

const featuredProjects =
    document.querySelectorAll(
        ".portfolio-item.featured"
    );

const featuredBadge =
    document.querySelector("#featuredCount");

/*=========================================
  Highlight Featured Projects
=========================================*/

function highlightFeaturedProjects(){

    featuredProjects.forEach(function(project,index){

        project.classList.add("featured-active");

        project.style.order = -1;

        project.style.transition =
            "all .4s ease";

        setTimeout(function(){

            project.classList.add("fade-in");

        },index * 150);

    });

}

/*=========================================
  Featured Hover Effect
=========================================*/

featuredProjects.forEach(function(project){

    project.addEventListener("mouseenter",function(){

        this.classList.add("featured-hover");

        this.style.transform =
            "translateY(-8px) scale(1.02)";

    });

    project.addEventListener("mouseleave",function(){

        this.classList.remove("featured-hover");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

/*=========================================
  Featured Badge Counter
=========================================*/

function updateFeaturedCount(){

    if(featuredBadge){

        featuredBadge.textContent =
            featuredProjects.length;

    }

}

/*=========================================
  Portfolio Counter
=========================================*/

const portfolioItems =
    document.querySelectorAll(
        ".portfolio-item"
    );

const portfolioCounter =
    document.querySelector("#portfolioCounter");

/*=========================================
  Update Portfolio Counter
=========================================*/

function updatePortfolioCounter(){

    let visibleProjects = 0;

    portfolioItems.forEach(function(project){

        if(

            project.style.display !== "none"

        ){

            visibleProjects++;

        }

    });

    if(portfolioCounter){

        portfolioCounter.textContent =
            visibleProjects +
            " Projects";

    }

}

/*=========================================
  Refresh Counter
=========================================*/

const refreshCounterButton =
    document.querySelector(
        "#refreshPortfolioCounter"
    );

if(refreshCounterButton){

    refreshCounterButton.addEventListener(
        "click",
        function(){

            updatePortfolioCounter();

            updateFeaturedCount();

        }
    );

}

/*=========================================
  Statistics
=========================================*/

const portfolioStatistics = {

    total:

        portfolioItems.length,

    featured:

        featuredProjects.length

};

console.table(

    portfolioStatistics

);

/*=========================================
  Helper Functions
=========================================*/

function showFeatured(){

    highlightFeaturedProjects();

}

function refreshPortfolio(){

    updatePortfolioCounter();

    updateFeaturedCount();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    highlightFeaturedProjects();

    updateFeaturedCount();

    updatePortfolioCounter();

    console.log(

        "Featured Projects Initialized"

    );

});
/*==================================================
  Portfolio Cards + Portfolio Hover Effects
==================================================*/

"use strict";

/*=========================================
  Portfolio Cards
=========================================*/

const portfolioCards =
    document.querySelectorAll(".portfolio-card");

const portfolioGrid =
    document.querySelector(".portfolio-grid");

/*=========================================
  Card Initialization
=========================================*/

portfolioCards.forEach(function(card,index){

    card.dataset.index = index + 1;

    card.classList.add("portfolio-ready");

});

/*=========================================
  Card Click Event
=========================================*/

portfolioCards.forEach(function(card){

    card.addEventListener("click",function(){

        portfolioCards.forEach(function(item){

            item.classList.remove("selected");

        });

        this.classList.add("selected");

        console.log(

            "Selected Project:",

            this.dataset.title ||

            "Portfolio Project"

        );

    });

});

/*=========================================
  Card Hover Effects
=========================================*/

portfolioCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("card-hover");

        this.style.transform =

            "translateY(-12px) scale(1.02)";

        this.style.boxShadow =

            "0 20px 40px rgba(0,0,0,.15)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("card-hover");

        this.style.transform =

            "translateY(0) scale(1)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Image Hover Zoom
=========================================*/

document
.querySelectorAll(".portfolio-card img")
.forEach(function(image){

    image.addEventListener("mouseenter",function(){

        this.style.transform =

            "scale(1.08)";

    });

    image.addEventListener("mouseleave",function(){

        this.style.transform =

            "scale(1)";

    });

});

/*=========================================
  Overlay Animation
=========================================*/

document
.querySelectorAll(".portfolio-overlay")
.forEach(function(overlay){

    const parent =
        overlay.closest(".portfolio-card");

    if(!parent) return;

    parent.addEventListener("mouseenter",function(){

        overlay.classList.add("show");

    });

    parent.addEventListener("mouseleave",function(){

        overlay.classList.remove("show");

    });

});

/*=========================================
  Card Counter
=========================================*/

const totalCards =
    document.querySelector("#totalProjects");

if(totalCards){

    totalCards.textContent =

        portfolioCards.length;

}

/*=========================================
  Shuffle Portfolio
=========================================*/

const shuffleButton =
    document.querySelector("#shuffleProjects");

if(shuffleButton && portfolioGrid){

    shuffleButton.addEventListener("click",function(){

        const cards =
            Array.from(portfolioCards);

        cards.sort(function(){

            return Math.random() - 0.5;

        });

        cards.forEach(function(card){

            portfolioGrid.appendChild(card);

        });

    });

}

/*=========================================
  Helper Functions
=========================================*/

function activateCard(card){

    if(card){

        card.classList.add("selected");

    }

}

function deactivateCard(card){

    if(card){

        card.classList.remove("selected");

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Portfolio Cards Initialized"

    );

});
/*==================================================
  Portfolio Modal + Image Gallery
==================================================*/

"use strict";

/*=========================================
  Portfolio Modal
=========================================*/

const portfolioModal =
    document.querySelector("#portfolioModal");

const modalImage =
    document.querySelector("#modalImage");

const modalTitle =
    document.querySelector("#modalTitle");

const modalDescription =
    document.querySelector("#modalDescription");

const modalClose =
    document.querySelector("#modalClose");

const modalButtons =
    document.querySelectorAll("[data-portfolio-modal]");

/*=========================================
  Open Portfolio Modal
=========================================*/

modalButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const card =
            this.closest(".portfolio-card");

        if(!card || !portfolioModal) return;

        const image =
            card.querySelector("img");

        if(modalImage && image){

            modalImage.src = image.src;

            modalImage.alt = image.alt;

        }

        if(modalTitle){

            modalTitle.textContent =
                card.dataset.title ||
                "Project";

        }

        if(modalDescription){

            modalDescription.textContent =
                card.dataset.description ||
                "Project details are unavailable.";

        }

        portfolioModal.classList.add("show");

        document.body.classList.add("modal-open");

    });

});

/*=========================================
  Close Modal
=========================================*/

function closePortfolioModal(){

    if(!portfolioModal) return;

    portfolioModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}

if(modalClose){

    modalClose.addEventListener("click",

        closePortfolioModal

    );

}

window.addEventListener("click",function(event){

    if(event.target === portfolioModal){

        closePortfolioModal();

    }

});

document.addEventListener("keydown",function(event){

    if(event.key === "Escape"){

        closePortfolioModal();

    }

});

/*=========================================
  Image Gallery
=========================================*/

const galleryImages =
    document.querySelectorAll(".gallery-image");

const galleryPreview =
    document.querySelector("#galleryPreview");

galleryImages.forEach(function(image){

    image.addEventListener("click",function(){

        if(galleryPreview){

            galleryPreview.src = this.src;

            galleryPreview.alt = this.alt;

        }

        galleryImages.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*=========================================
  Gallery Hover Effect
=========================================*/

galleryImages.forEach(function(image){

    image.addEventListener("mouseenter",function(){

        this.style.transform =
            "scale(1.05)";

    });

    image.addEventListener("mouseleave",function(){

        this.style.transform =
            "scale(1)";

    });

});

/*=========================================
  Gallery Counter
=========================================*/

const galleryCounter =
    document.querySelector("#galleryCount");

if(galleryCounter){

    galleryCounter.textContent =

        galleryImages.length +

        " Images";

}

/*=========================================
  Helper Functions
=========================================*/

function openGallery(index){

    if(galleryImages[index]){

        galleryImages[index].click();

    }

}

function closeGallery(){

    closePortfolioModal();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Portfolio Modal & Gallery Ready"

    );

});
/*==================================================
  Lightbox + Fullscreen Preview
==================================================*/

"use strict";

/*=========================================
  Lightbox
=========================================*/

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxCaption =
    document.querySelector("#lightboxCaption");

const lightboxClose =
    document.querySelector("#lightboxClose");

const previewImages =
    document.querySelectorAll(
        ".portfolio-gallery img"
    );

let currentImage = 0;

/*=========================================
  Open Lightbox
=========================================*/

previewImages.forEach(function(image,index){

    image.addEventListener("click",function(){

        currentImage = index;

        openLightbox(this);

    });

});

function openLightbox(image){

    if(!lightbox || !lightboxImage) return;

    lightbox.classList.add("show");

    document.body.classList.add("lightbox-open");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    if(lightboxCaption){

        lightboxCaption.textContent =
            image.alt || "Portfolio Image";

    }

}

/*=========================================
  Close Lightbox
=========================================*/

function closeLightbox(){

    if(!lightbox) return;

    lightbox.classList.remove("show");

    document.body.classList.remove("lightbox-open");

}

if(lightboxClose){

    lightboxClose.addEventListener(

        "click",

        closeLightbox

    );

}

window.addEventListener("click",function(event){

    if(event.target === lightbox){

        closeLightbox();

    }

});

/*=========================================
  Previous / Next Image
=========================================*/

const previousButton =
    document.querySelector("#lightboxPrev");

const nextButton =
    document.querySelector("#lightboxNext");

function updateLightbox(index){

    if(!previewImages[index]) return;

    lightboxImage.src =
        previewImages[index].src;

    lightboxImage.alt =
        previewImages[index].alt;

    if(lightboxCaption){

        lightboxCaption.textContent =
            previewImages[index].alt;

    }

}

if(previousButton){

    previousButton.addEventListener("click",function(){

        currentImage--;

        if(currentImage < 0){

            currentImage =
                previewImages.length - 1;

        }

        updateLightbox(currentImage);

    });

}

if(nextButton){

    nextButton.addEventListener("click",function(){

        currentImage++;

        if(currentImage >= previewImages.length){

            currentImage = 0;

        }

        updateLightbox(currentImage);

    });

}

/*=========================================
  Keyboard Navigation
=========================================*/

document.addEventListener("keydown",function(event){

    if(!lightbox.classList.contains("show")) return;

    switch(event.key){

        case "ArrowLeft":

            previousButton?.click();

            break;

        case "ArrowRight":

            nextButton?.click();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

/*=========================================
  Fullscreen Preview
=========================================*/

const fullscreenButton =
    document.querySelector("#fullscreenPreview");

function toggleFullscreen(){

    if(!lightboxImage) return;

    if(!document.fullscreenElement){

        lightboxImage.requestFullscreen?.();

    }

    else{

        document.exitFullscreen?.();

    }

}

if(fullscreenButton){

    fullscreenButton.addEventListener(

        "click",

        toggleFullscreen

    );

}

/*=========================================
  Fullscreen Change
=========================================*/

document.addEventListener(

    "fullscreenchange",

    function(){

        document.body.classList.toggle(

            "fullscreen-active",

            !!document.fullscreenElement

        );

    }

);

/*=========================================
  Helper Functions
=========================================*/

function showPreview(index){

    if(previewImages[index]){

        currentImage = index;

        openLightbox(previewImages[index]);

    }

}

function hidePreview(){

    closeLightbox();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Lightbox & Fullscreen Preview Initialized"

    );

});
/*==================================================
  Project Details + Technology Badges
==================================================*/

"use strict";

/*=========================================
  Project Details
=========================================*/

const projectCards =
    document.querySelectorAll(".portfolio-card");

const detailsPanel =
    document.querySelector("#projectDetails");

const projectTitle =
    document.querySelector("#projectTitle");

const projectCategory =
    document.querySelector("#projectCategory");

const projectClient =
    document.querySelector("#projectClient");

const projectDate =
    document.querySelector("#projectDate");

const projectDescription =
    document.querySelector("#projectDescription");

/*=========================================
  Show Project Details
=========================================*/

function showProjectDetails(card){

    if(!card || !detailsPanel) return;

    projectTitle.textContent =
        card.dataset.title || "Project";

    projectCategory.textContent =
        card.dataset.category || "Web Development";

    projectClient.textContent =
        card.dataset.client || "Confidential";

    projectDate.textContent =
        card.dataset.date || "2026";

    projectDescription.textContent =
        card.dataset.description ||
        "Professional software development project.";

    detailsPanel.classList.add("show");

}

/*=========================================
  Hide Details
=========================================*/

function hideProjectDetails(){

    if(detailsPanel){

        detailsPanel.classList.remove("show");

    }

}

/*=========================================
  Card Click Event
=========================================*/

projectCards.forEach(function(card){

    card.addEventListener("click",function(){

        projectCards.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

        showProjectDetails(this);

    });

});

/*=========================================
  Close Details
=========================================*/

const closeDetails =
    document.querySelector("#closeProjectDetails");

if(closeDetails){

    closeDetails.addEventListener("click",function(){

        hideProjectDetails();

    });

}

/*=========================================
  Technology Badges
=========================================*/

const technologyBadges =
    document.querySelectorAll(".technology-badge");

technologyBadges.forEach(function(badge){

    badge.addEventListener("mouseenter",function(){

        this.classList.add("badge-hover");

        this.style.transform =
            "scale(1.1)";

    });

    badge.addEventListener("mouseleave",function(){

        this.classList.remove("badge-hover");

        this.style.transform =
            "scale(1)";

    });

});

/*=========================================
  Badge Click
=========================================*/

technologyBadges.forEach(function(badge){

    badge.addEventListener("click",function(){

        technologyBadges.forEach(function(item){

            item.classList.remove("selected");

        });

        this.classList.add("selected");

        console.log(

            "Technology:",

            this.textContent.trim()

        );

    });

});

/*=========================================
  Badge Counter
=========================================*/

const badgeCounter =
    document.querySelector("#technologyCount");

if(badgeCounter){

    badgeCounter.textContent =
        technologyBadges.length;

}

/*=========================================
  Helper Functions
=========================================*/

function activateBadge(badge){

    badge.classList.add("selected");

}

function deactivateBadge(badge){

    badge.classList.remove("selected");

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Project Details & Technology Badges Ready"

    );

});
/*==================================================
  Project Statistics + Progress Bars
==================================================*/

"use strict";

/*=========================================
  Project Statistics
=========================================*/

const statNumbers =
    document.querySelectorAll(".project-stat-number");

const statSection =
    document.querySelector("#projectStatistics");

/*=========================================
  Animate Statistics
=========================================*/

function animateStatistics() {

    statNumbers.forEach(function (counter) {

        const target =
            parseInt(counter.dataset.target) || 0;

        const duration = 2000;

        const increment =
            Math.ceil(target / 100);

        let current = 0;

        const timer = setInterval(function () {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current;

        }, duration / 100);

    });

}

/*=========================================
  Statistics Observer
=========================================*/

if (statSection) {

    const statObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateStatistics();

                    statObserver.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.30

        });

    statObserver.observe(statSection);

}

/*=========================================
  Progress Bars
=========================================*/

const progressBars =
    document.querySelectorAll(".project-progress");

function animateProgressBars() {

    progressBars.forEach(function (bar) {

        const value =
            bar.dataset.progress || "0";

        bar.style.width = "0%";

        setTimeout(function () {

            bar.style.width =
                value + "%";

        }, 300);

    });

}

/*=========================================
  Progress Labels
=========================================*/

progressBars.forEach(function (bar) {

    const label =
        bar.parentElement.querySelector(
            ".progress-value"
        );

    if (label) {

        label.textContent =
            (bar.dataset.progress || 0) + "%";

    }

});

/*=========================================
  Progress Observer
=========================================*/

const progressSection =
    document.querySelector("#progressSection");

if (progressSection) {

    const progressObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateProgressBars();

                    progressObserver.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.25

        });

    progressObserver.observe(progressSection);

}

/*=========================================
  Reset Progress
=========================================*/

const resetProgress =
    document.querySelector("#resetProgress");

if (resetProgress) {

    resetProgress.addEventListener("click", function () {

        progressBars.forEach(function (bar) {

            bar.style.width = "0%";

        });

    });

}

/*=========================================
  Helper Functions
=========================================*/

function refreshStatistics() {

    animateStatistics();

}

function refreshProgressBars() {

    animateProgressBars();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load", function () {

    console.log(

        "Project Statistics & Progress Bars Ready"

    );

});
/*==================================================
  Project Timeline + Client Testimonials
==================================================*/

"use strict";

/*=========================================
  Project Timeline
=========================================*/

const timelineItems =
    document.querySelectorAll(".timeline-item");

const timelineSection =
    document.querySelector("#projectTimeline");

function revealTimeline() {

    timelineItems.forEach(function(item,index){

        setTimeout(function(){

            item.classList.add("active");

        },index * 250);

    });

}

if(timelineSection){

    const timelineObserver =
        new IntersectionObserver(function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    revealTimeline();

                    timelineObserver.unobserve(

                        entry.target

                    );

                }

            });

        },{

            threshold:0.25

        });

    timelineObserver.observe(timelineSection);

}

/*=========================================
  Timeline Hover
=========================================*/

timelineItems.forEach(function(item){

    item.addEventListener("mouseenter",function(){

        this.classList.add("timeline-hover");

        this.style.transform =
            "translateX(8px)";

    });

    item.addEventListener("mouseleave",function(){

        this.classList.remove("timeline-hover");

        this.style.transform =
            "translateX(0)";

    });

});

/*=========================================
  Client Testimonials
=========================================*/

const testimonials =
    document.querySelectorAll(".client-testimonial");

let testimonialIndex = 0;

function showTestimonial(index){

    testimonials.forEach(function(card){

        card.classList.remove("active");

    });

    if(testimonials[index]){

        testimonials[index].classList.add(

            "active"

        );

    }

}

/*=========================================
  Auto Slider
=========================================*/

function nextTestimonial(){

    testimonialIndex++;

    if(testimonialIndex >= testimonials.length){

        testimonialIndex = 0;

    }

    showTestimonial(testimonialIndex);

}

if(testimonials.length > 0){

    showTestimonial(0);

    setInterval(

        nextTestimonial,

        5000

    );

}

/*=========================================
  Previous / Next Buttons
=========================================*/

const previousButton =
    document.querySelector("#testimonialPrev");

const nextButton =
    document.querySelector("#testimonialNext");

if(previousButton){

    previousButton.addEventListener("click",function(){

        testimonialIndex--;

        if(testimonialIndex < 0){

            testimonialIndex =

                testimonials.length - 1;

        }

        showTestimonial(testimonialIndex);

    });

}

if(nextButton){

    nextButton.addEventListener("click",function(){

        nextTestimonial();

    });

}

/*=========================================
  Rating Stars
=========================================*/

document
.querySelectorAll(".testimonial-rating i")
.forEach(function(star){

    star.classList.add("filled");

});

/*=========================================
  Helper Functions
=========================================*/

function resetTestimonials(){

    testimonialIndex = 0;

    showTestimonial(0);

}

function activateTimeline(){

    revealTimeline();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Project Timeline & Client Testimonials Ready"

    );

});
/*==================================================
  Swiper Slider + Video Preview
==================================================*/

"use strict";

/*=========================================
  Swiper Slider
=========================================*/

let portfolioSwiper = null;

if (typeof Swiper !== "undefined") {

    portfolioSwiper = new Swiper(".portfolioSwiper", {

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

            768: {

                slidesPerView: 2

            },

            992: {

                slidesPerView: 3

            }

        }

    });

}

/*=========================================
  Swiper Controls
=========================================*/

const playSlider =
    document.querySelector("#playSlider");

const pauseSlider =
    document.querySelector("#pauseSlider");

if(playSlider && portfolioSwiper){

    playSlider.addEventListener("click",function(){

        portfolioSwiper.autoplay.start();

    });

}

if(pauseSlider && portfolioSwiper){

    pauseSlider.addEventListener("click",function(){

        portfolioSwiper.autoplay.stop();

    });

}

/*=========================================
  Slide Counter
=========================================*/

const slideCounter =
    document.querySelector("#slideCounter");

function updateSlideCounter(){

    if(!portfolioSwiper || !slideCounter) return;

    slideCounter.textContent =

        (portfolioSwiper.realIndex + 1) +

        " / " +

        portfolioSwiper.slides.length;

}

if(portfolioSwiper){

    portfolioSwiper.on(

        "slideChange",

        updateSlideCounter

    );

    updateSlideCounter();

}

/*=========================================
  Video Preview
=========================================*/

const previewButtons =
    document.querySelectorAll(".video-preview-btn");

const previewModal =
    document.querySelector("#videoPreviewModal");

const previewFrame =
    document.querySelector("#videoFrame");

const closePreview =
    document.querySelector("#closeVideoPreview");

/*=========================================
  Open Preview
=========================================*/

previewButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const video =
            this.dataset.video;

        if(previewFrame){

            previewFrame.src =
                video + "?autoplay=1";

        }

        if(previewModal){

            previewModal.classList.add("show");

        }

        document.body.classList.add("modal-open");

    });

});

/*=========================================
  Close Preview
=========================================*/

function closeVideoModal(){

    if(previewModal){

        previewModal.classList.remove("show");

    }

    if(previewFrame){

        previewFrame.src = "";

    }

    document.body.classList.remove("modal-open");

}

if(closePreview){

    closePreview.addEventListener(

        "click",

        closeVideoModal

    );

}

window.addEventListener("click",function(event){

    if(event.target === previewModal){

        closeVideoModal();

    }

});

document.addEventListener("keydown",function(event){

    if(event.key === "Escape"){

        closeVideoModal();

    }

});

/*=========================================
  Helper Functions
=========================================*/

function playPortfolioVideo(url){

    if(previewFrame){

        previewFrame.src = url;

    }

}

function stopPortfolioVideo(){

    if(previewFrame){

        previewFrame.src = "";

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Swiper Slider & Video Preview Ready"

    );

});
/*==================================================
  GitHub Links + Live Demo Links
==================================================*/

"use strict";

/*=========================================
  GitHub Links
=========================================*/

const githubButtons =
    document.querySelectorAll(".github-link");

githubButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        event.preventDefault();

        const githubURL =
            this.dataset.github;

        if(githubURL){

            window.open(

                githubURL,

                "_blank",

                "noopener,noreferrer"

            );

        }

    });

});

/*=========================================
  GitHub Copy Link
=========================================*/

const copyGithubButtons =
    document.querySelectorAll(".copy-github");

copyGithubButtons.forEach(function(button){

    button.addEventListener("click",async function(){

        const githubURL =
            this.dataset.github;

        if(!githubURL) return;

        try{

            await navigator.clipboard.writeText(

                githubURL

            );

            this.textContent = "Copied!";

            setTimeout(()=>{

                this.textContent = "Copy Link";

            },2000);

        }

        catch(error){

            console.error(error);

        }

    });

});

/*=========================================
  Live Demo Links
=========================================*/

const demoButtons =
    document.querySelectorAll(".live-demo");

demoButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        event.preventDefault();

        const demoURL =
            this.dataset.demo;

        if(demoURL){

            window.open(

                demoURL,

                "_blank",

                "noopener,noreferrer"

            );

        }

    });

});

/*=========================================
  Demo Status
=========================================*/

document
.querySelectorAll(".demo-status")
.forEach(function(status){

    if(

        status.dataset.status === "online"

    ){

        status.classList.add("online");

        status.textContent =

            "● Live";

    }

    else{

        status.classList.add("offline");

        status.textContent =

            "● Offline";

    }

});

/*=========================================
  Link Hover Effects
=========================================*/

document
.querySelectorAll(

    ".github-link, .live-demo"

)
.forEach(function(link){

    link.addEventListener("mouseenter",function(){

        this.classList.add("hover");

        this.style.transform =

            "translateY(-3px)";

    });

    link.addEventListener("mouseleave",function(){

        this.classList.remove("hover");

        this.style.transform =

            "translateY(0)";

    });

});

/*=========================================
  Project Visits Counter
=========================================*/

const visitCounter =
    document.querySelector("#projectVisits");

let totalVisits =

    Number(

        localStorage.getItem(

            "portfolioVisits"

        )

    ) || 0;

totalVisits++;

localStorage.setItem(

    "portfolioVisits",

    totalVisits

);

if(visitCounter){

    visitCounter.textContent =

        totalVisits;

}

/*=========================================
  Helper Functions
=========================================*/

function openGithub(url){

    window.open(

        url,

        "_blank"

    );

}

function openDemo(url){

    window.open(

        url,

        "_blank"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "GitHub & Live Demo Links Initialized"

    );

});
/*==================================================
  Download Brochure + Share Project
==================================================*/

"use strict";

/*=========================================
  Download Brochure
=========================================*/

const brochureButtons =
    document.querySelectorAll(".download-brochure");

const downloadCounter =
    document.querySelector("#downloadCounter");

let brochureDownloads =
    Number(localStorage.getItem("brochureDownloads")) || 0;

/*=========================================
  Download Event
=========================================*/

brochureButtons.forEach(function(button){

    button.addEventListener("click",function(event){

        event.preventDefault();

        const brochureURL =
            this.dataset.file;

        if(!brochureURL) return;

        const link =
            document.createElement("a");

        link.href = brochureURL;

        link.download = "";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        brochureDownloads++;

        localStorage.setItem(

            "brochureDownloads",

            brochureDownloads

        );

        updateDownloadCounter();

    });

});

/*=========================================
  Download Counter
=========================================*/

function updateDownloadCounter(){

    if(downloadCounter){

        downloadCounter.textContent =
            brochureDownloads;

    }

}

/*=========================================
  Share Project
=========================================*/

const shareButtons =
    document.querySelectorAll(".share-project");

/*=========================================
  Native Share API
=========================================*/

async function shareProject(title,url){

    if(navigator.share){

        try{

            await navigator.share({

                title:title,

                text:
                "Check out this amazing portfolio project.",

                url:url

            });

        }

        catch(error){

            console.log(

                "Share cancelled."

            );

        }

    }

    else{

        copyProjectLink(url);

    }

}

/*=========================================
  Copy Link
=========================================*/

async function copyProjectLink(url){

    try{

        await navigator.clipboard.writeText(url);

        alert("Project link copied!");

    }

    catch(error){

        console.error(error);

    }

}

/*=========================================
  Share Button Events
=========================================*/

shareButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const projectTitle =
            this.dataset.title ||
            document.title;

        const projectURL =
            this.dataset.url ||
            window.location.href;

        shareProject(

            projectTitle,

            projectURL

        );

    });

});

/*=========================================
  Social Share Icons
=========================================*/

document
.querySelectorAll(".share-icon")
.forEach(function(icon){

    icon.addEventListener("mouseenter",function(){

        this.style.transform =
            "scale(1.15) rotate(8deg)";

    });

    icon.addEventListener("mouseleave",function(){

        this.style.transform =
            "scale(1) rotate(0deg)";

    });

});

/*=========================================
  Helper Functions
=========================================*/

function downloadBrochure(file){

    window.open(file,"_blank");

}

function updateShares(){

    console.log(

        "Share statistics updated."

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    updateDownloadCounter();

    console.log(

        "Download Brochure & Share Project Ready"

    );

});
/*==================================================
  Lazy Loading + Infinite Scroll
==================================================*/

"use strict";

/*=========================================
  Lazy Loading Images
=========================================*/

const lazyImages =
    document.querySelectorAll("img[data-src]");

const lazyImageOptions = {

    root: null,

    rootMargin: "100px",

    threshold: 0.1

};

function loadImage(entry, observer){

    const image = entry.target;

    image.src = image.dataset.src;

    image.onload = function(){

        image.classList.add("loaded");

        image.removeAttribute("data-src");

    };

    observer.unobserve(image);

}

/*=========================================
  Lazy Observer
=========================================*/

const lazyImageObserver =
new IntersectionObserver(function(entries, observer){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            loadImage(entry, observer);

        }

    });

}, lazyImageOptions);

lazyImages.forEach(function(image){

    lazyImageObserver.observe(image);

});

/*=========================================
  Lazy Sections
=========================================*/

const lazySections =
    document.querySelectorAll(".lazy-section");

const sectionObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("section-visible");

            sectionObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

lazySections.forEach(function(section){

    sectionObserver.observe(section);

});

/*=========================================
  Infinite Scroll
=========================================*/

const portfolioContainer =
    document.querySelector(".portfolio-grid");

const loadingSpinner =
    document.querySelector("#portfolioLoader");

let currentPage = 1;

let isLoading = false;

const maxPages = 5;

/*=========================================
  Load More Projects
=========================================*/

function loadMoreProjects(){

    if(isLoading) return;

    if(currentPage >= maxPages) return;

    isLoading = true;

    if(loadingSpinner){

        loadingSpinner.classList.add("show");

    }

    setTimeout(function(){

        currentPage++;

        const hiddenProjects =
            document.querySelectorAll(

                ".portfolio-item.hidden"

            );

        let count = 0;

        hiddenProjects.forEach(function(project){

            if(count < 6){

                project.classList.remove("hidden");

                project.classList.add("fade-in");

                count++;

            }

        });

        if(loadingSpinner){

            loadingSpinner.classList.remove("show");

        }

        isLoading = false;

    },1000);

}

/*=========================================
  Window Scroll
=========================================*/

window.addEventListener("scroll",function(){

    if(

        window.innerHeight +

        window.scrollY >=

        document.body.offsetHeight - 200

    ){

        loadMoreProjects();

    }

});

/*=========================================
  Helper Functions
=========================================*/

function resetInfiniteScroll(){

    currentPage = 1;

}

function showLoader(){

    if(loadingSpinner){

        loadingSpinner.classList.add("show");

    }

}

function hideLoader(){

    if(loadingSpinner){

        loadingSpinner.classList.remove("show");

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Lazy Loading & Infinite Scroll Ready"

    );

});
/*==================================================
  Load More Button + Favorites
==================================================*/

"use strict";

/*=========================================
  Load More Button
=========================================*/

const loadMoreButton =
    document.querySelector("#loadMoreProjects");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const ITEMS_PER_CLICK = 6;

let visibleProjects = ITEMS_PER_CLICK;

/*=========================================
  Initialize Projects
=========================================*/

function initializeProjects() {

    portfolioItems.forEach(function (project, index) {

        if (index < visibleProjects) {

            project.classList.remove("hidden");

        } else {

            project.classList.add("hidden");

        }

    });

    updateLoadMoreButton();

}

/*=========================================
  Load More Projects
=========================================*/

function loadMorePortfolioProjects() {

    visibleProjects += ITEMS_PER_CLICK;

    portfolioItems.forEach(function (project, index) {

        if (index < visibleProjects) {

            project.classList.remove("hidden");

            project.classList.add("fade-in");

        }

    });

    updateLoadMoreButton();

}

/*=========================================
  Update Button
=========================================*/

function updateLoadMoreButton() {

    if (!loadMoreButton) return;

    if (visibleProjects >= portfolioItems.length) {

        loadMoreButton.disabled = true;

        loadMoreButton.textContent =
            "All Projects Loaded";

    } else {

        loadMoreButton.disabled = false;

        loadMoreButton.textContent =
            "Load More Projects";

    }

}

if (loadMoreButton) {

    loadMoreButton.addEventListener("click", function () {

        loadMorePortfolioProjects();

    });

}

/*=========================================
  Favorites
=========================================*/

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const FAVORITE_KEY =
    "portfolioFavorites";

/*=========================================
  Get Favorites
=========================================*/

function getFavorites() {

    return JSON.parse(

        localStorage.getItem(FAVORITE_KEY)

    ) || [];

}

/*=========================================
  Save Favorites
=========================================*/

function saveFavorites(favorites) {

    localStorage.setItem(

        FAVORITE_KEY,

        JSON.stringify(favorites)

    );

}

/*=========================================
  Toggle Favorite
=========================================*/

favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const projectId =
            this.dataset.project;

        let favorites =
            getFavorites();

        if (favorites.includes(projectId)) {

            favorites = favorites.filter(function (id) {

                return id !== projectId;

            });

            this.classList.remove("active");

        } else {

            favorites.push(projectId);

            this.classList.add("active");

        }

        saveFavorites(favorites);

    });

});

/*=========================================
  Restore Favorites
=========================================*/

function restoreFavorites() {

    const favorites =
        getFavorites();

    favoriteButtons.forEach(function (button) {

        if (

            favorites.includes(

                button.dataset.project

            )

        ) {

            button.classList.add("active");

        }

    });

}

/*=========================================
  Helper Functions
=========================================*/

function clearFavorites() {

    localStorage.removeItem(

        FAVORITE_KEY

    );

}

function favoriteCount() {

    return getFavorites().length;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load", function () {

    initializeProjects();

    restoreFavorites();

    console.log(

        "Load More Button & Favorites Ready"

    );

});
/*==================================================
  Recently Viewed + Local Storage
==================================================*/

"use strict";

/*=========================================
  Recently Viewed Projects
=========================================*/

const recentProjectCards =
    document.querySelectorAll(".portfolio-card");

const recentContainer =
    document.querySelector("#recentProjects");

const RECENT_KEY =
    "portfolio_recent_projects";

const MAX_RECENT = 6;

/*=========================================
  Get Recent Projects
=========================================*/

function getRecentProjects(){

    return JSON.parse(

        localStorage.getItem(RECENT_KEY)

    ) || [];

}

/*=========================================
  Save Recent Projects
=========================================*/

function saveRecentProjects(projectId){

    let recent = getRecentProjects();

    recent = recent.filter(function(id){

        return id !== projectId;

    });

    recent.unshift(projectId);

    if(recent.length > MAX_RECENT){

        recent = recent.slice(0, MAX_RECENT);

    }

    localStorage.setItem(

        RECENT_KEY,

        JSON.stringify(recent)

    );

}

/*=========================================
  Card Click Event
=========================================*/

recentProjectCards.forEach(function(card){

    card.addEventListener("click",function(){

        const projectId =
            this.dataset.project ||
            this.dataset.id ||
            "";

        if(projectId){

            saveRecentProjects(projectId);

            renderRecentProjects();

        }

    });

});

/*=========================================
  Render Recent Projects
=========================================*/

function renderRecentProjects(){

    if(!recentContainer) return;

    recentContainer.innerHTML = "";

    const recent =
        getRecentProjects();

    if(recent.length === 0){

        recentContainer.innerHTML =
            "<p>No recently viewed projects.</p>";

        return;

    }

    recent.forEach(function(id){

        const item =
            document.createElement("div");

        item.className =
            "recent-project";

        item.textContent =
            "Project ID: " + id;

        recentContainer.appendChild(item);

    });

}

/*=========================================
  Local Storage Utilities
=========================================*/

const STORAGE_KEYS = {

    favorites: "portfolioFavorites",

    recent: RECENT_KEY,

    downloads: "brochureDownloads",

    visits: "portfolioVisits"

};

/*=========================================
  Storage Helpers
=========================================*/

function saveStorage(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getStorage(key){

    const value =
        localStorage.getItem(key);

    if(!value) return null;

    try{

        return JSON.parse(value);

    }

    catch(error){

        return value;

    }

}

function removeStorage(key){

    localStorage.removeItem(key);

}

function clearPortfolioStorage(){

    Object.values(STORAGE_KEYS)

    .forEach(function(key){

        localStorage.removeItem(key);

    });

}

/*=========================================
  Storage Information
=========================================*/

function displayStorageInfo(){

    console.log(

        "Favorites:",

        getStorage(STORAGE_KEYS.favorites)

    );

    console.log(

        "Recent:",

        getStorage(STORAGE_KEYS.recent)

    );

    console.log(

        "Downloads:",

        getStorage(STORAGE_KEYS.downloads)

    );

}

/*=========================================
  Restore Data
=========================================*/

window.addEventListener("load",function(){

    renderRecentProjects();

    displayStorageInfo();

    console.log(

        "Recently Viewed & Local Storage Ready"

    );

});

/*=========================================
  Helper Functions
=========================================*/

function resetRecentProjects(){

    removeStorage(RECENT_KEY);

    renderRecentProjects();

}

function exportPortfolioStorage(){

    console.table({

        favorites:getStorage(STORAGE_KEYS.favorites),

        recent:getStorage(STORAGE_KEYS.recent),

        downloads:getStorage(STORAGE_KEYS.downloads),

        visits:getStorage(STORAGE_KEYS.visits)

    });

}
/*==================================================
  Utility Functions + Browser Compatibility
==================================================*/

"use strict";

/*=========================================
  Utility Functions
=========================================*/

const PortfolioUtils = {

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

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

    show(element){

        if(element){

            element.style.display = "block";

        }

    },

    hide(element){

        if(element){

            element.style.display = "none";

        }

    },

    smoothScroll(element){

        if(element){

            element.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    },

    debounce(callback,delay){

        let timer;

        return function(...args){

            clearTimeout(timer);

            timer = setTimeout(function(){

                callback.apply(null,args);

            },delay);

        };

    },

    throttle(callback,delay){

        let waiting = false;

        return function(...args){

            if(waiting) return;

            callback.apply(null,args);

            waiting = true;

            setTimeout(function(){

                waiting = false;

            },delay);

        };

    }

};

/*=========================================
  Browser Compatibility
=========================================*/

const BrowserInfo = {

    userAgent:

        navigator.userAgent,

    isChrome:

        /Chrome/.test(navigator.userAgent) &&

        !/Edg/.test(navigator.userAgent),

    isFirefox:

        /Firefox/.test(navigator.userAgent),

    isSafari:

        /^((?!chrome|android).)*safari/i.test(

            navigator.userAgent

        ),

    isEdge:

        /Edg/.test(navigator.userAgent)

};

if(BrowserInfo.isChrome){

    document.body.classList.add(

        "chrome-browser"

    );

}

if(BrowserInfo.isFirefox){

    document.body.classList.add(

        "firefox-browser"

    );

}

if(BrowserInfo.isSafari){

    document.body.classList.add(

        "safari-browser"

    );

}

if(BrowserInfo.isEdge){

    document.body.classList.add(

        "edge-browser"

    );

}

/*=========================================
  Feature Detection
=========================================*/

const BrowserFeatures = {

    localStorage:

        "localStorage" in window,

    fetchAPI:

        "fetch" in window,

    intersectionObserver:

        "IntersectionObserver" in window,

    fullscreen:

        !!document.fullscreenEnabled,

    shareAPI:

        "share" in navigator,

    clipboard:

        !!navigator.clipboard

};

console.table(BrowserFeatures);

/*=========================================
  Touch Device Detection
=========================================*/

if(

    "ontouchstart" in window ||

    navigator.maxTouchPoints > 0

){

    document.body.classList.add(

        "touch-device"

    );

}

/*=========================================
  Helper Functions
=========================================*/

function isMobile(){

    return window.innerWidth < 768;

}

function isDesktop(){

    return window.innerWidth >= 992;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Portfolio Utilities Ready"

    );

    console.log(

        "Browser Compatibility Verified"

    );

});
/*==================================================
  Accessibility + Initialization
==================================================*/

"use strict";

/*=========================================
  Accessibility
=========================================*/

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

const accessibilityToggle =
    document.querySelector("#accessibilityToggle");

/*=========================================
  Reduced Motion
=========================================*/

function applyReducedMotion() {

    if (prefersReducedMotion.matches) {

        document.body.classList.add("reduced-motion");

        document.querySelectorAll(".animated").forEach(function (element) {

            element.style.animation = "none";
            element.style.transition = "none";

        });

    } else {

        document.body.classList.remove("reduced-motion");

    }

}

applyReducedMotion();

prefersReducedMotion.addEventListener(

    "change",

    applyReducedMotion

);

/*=========================================
  High Contrast Mode
=========================================*/

if (accessibilityToggle) {

    accessibilityToggle.addEventListener("click", function () {

        document.body.classList.toggle("high-contrast");

        localStorage.setItem(

            "portfolioContrast",

            document.body.classList.contains("high-contrast")

        );

    });

}

/*=========================================
  Restore Contrast
=========================================*/

if (localStorage.getItem("portfolioContrast") === "true") {

    document.body.classList.add("high-contrast");

}

/*=========================================
  Keyboard Focus
=========================================*/

document.querySelectorAll(

    "button,a,input,select,textarea"

).forEach(function (element) {

    element.addEventListener("focus", function () {

        this.classList.add("keyboard-focus");

    });

    element.addEventListener("blur", function () {

        this.classList.remove("keyboard-focus");

    });

});

/*=========================================
  Skip To Portfolio
=========================================*/

const skipPortfolio =
    document.querySelector("#skipPortfolio");

if (skipPortfolio) {

    skipPortfolio.addEventListener("click", function (event) {

        event.preventDefault();

        const portfolio =
            document.querySelector(".portfolio-section");

        if (portfolio) {

            portfolio.scrollIntoView({

                behavior: "smooth"

            });

            portfolio.setAttribute(

                "tabindex",

                "-1"

            );

            portfolio.focus();

        }

    });

}

/*=========================================
  Initialization
=========================================*/

const PortfolioApp = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        this.cacheElements();

        this.initializeModules();

        this.bindEvents();

    },

    cacheElements() {

        this.body = document.body;

        this.wrapper =

            document.querySelector(".portfolio-wrapper");

    },

    initializeModules() {

        console.log(

            "Portfolio modules initialized."

        );

    },

    bindEvents() {

        window.addEventListener("resize", function () {

            console.log(

                "Portfolio resized:",

                window.innerWidth

            );

        });

    }

};

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        PortfolioApp.init();

    }

);

/*=========================================
  Window Load
=========================================*/

window.addEventListener("load", function () {

    console.log(

        "Accessibility & Initialization Ready"

    );

});
/*==================================================
  Performance Optimization + End of portfolio.js
==================================================*/

"use strict";

/*=========================================
  Performance Optimization
=========================================*/

const PortfolioPerformance = {

    initialized: false,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        this.optimizeImages();

        this.optimizeScroll();

        this.monitorPerformance();

        this.cleanupDOM();

        console.log(

            "Portfolio Performance Optimization Enabled."

        );

    },

    optimizeImages() {

        document

            .querySelectorAll("img[data-src]")

            .forEach(function (image) {

                if (image.dataset.src) {

                    image.src = image.dataset.src;

                    image.removeAttribute("data-src");

                }

            });

    },

    optimizeScroll() {

        let ticking = false;

        window.addEventListener("scroll", function () {

            if (!ticking) {

                requestAnimationFrame(function () {

                    document.body.dataset.scroll =

                        window.scrollY;

                    ticking = false;

                });

                ticking = true;

            }

        });

    },

    monitorPerformance() {

        if ("performance" in window) {

            console.log(

                "DOM Ready:",

                Math.round(

                    performance.now()

                ) + " ms"

            );

        }

    },

    cleanupDOM() {

        document

            .querySelectorAll(".temporary")

            .forEach(function (element) {

                element.remove();

            });

    }

};

/*=========================================
  Memory Cleanup
=========================================*/

window.addEventListener(

    "beforeunload",

    function () {

        console.log(

            "Cleaning Portfolio Resources..."

        );

    }

);

/*=========================================
  Portfolio Configuration
=========================================*/

const PortfolioConfig = {

    version: "1.0.0",

    application: "portfolio.js",

    company: "CodeNova Technologies",

    author: "Development Team",

    framework: "Vanilla JavaScript",

    lastUpdated: "2026"

};

console.table(PortfolioConfig);

/*=========================================
  Custom Ready Event
=========================================*/

document.dispatchEvent(

    new CustomEvent(

        "portfolioReady",

        {

            detail: {

                module:

                    PortfolioConfig.application,

                version:

                    PortfolioConfig.version

            }

        }

    )

);

/*=========================================
  Initialize Performance
=========================================*/

window.addEventListener(

    "load",

    function () {

        PortfolioPerformance.init();

    }

);

/*=========================================
  Final Console Messages
=========================================*/

console.log(
"========================================"
);

console.log(
" CodeNova Technologies Portfolio Module "
);

console.log(
" Version : " + PortfolioConfig.version
);

console.log(
" portfolio.js Loaded Successfully "
);

console.log(
"========================================"
);

