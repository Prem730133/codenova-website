/*==================================================
  CodeNova Technologies
  animation.js
  Part 1A.1
  Preloader Animation + Fade Animations
==================================================*/

"use strict";

/*=========================================
  Preloader Animation
=========================================*/

const preloader =
    document.querySelector("#preloader");

const loaderLogo =
    document.querySelector(".loader-logo");

const loaderSpinner =
    document.querySelector(".loader-spinner");

const loaderProgress =
    document.querySelector(".loader-progress");

function startPreloaderAnimation(){

    if(!preloader) return;

    preloader.classList.add("active");

    if(loaderLogo){

        loaderLogo.classList.add("animate");

    }

    if(loaderSpinner){

        loaderSpinner.classList.add("spin");

    }

    let progress = 0;

    const timer = setInterval(function(){

        progress += 2;

        if(loaderProgress){

            loaderProgress.style.width =
                progress + "%";

        }

        if(progress >= 100){

            clearInterval(timer);

            finishPreloader();

        }

    },30);

}

function finishPreloader(){

    if(!preloader) return;

    preloader.classList.add("fade-out");

    setTimeout(function(){

        preloader.style.display = "none";

    },700);

}

window.addEventListener("load",function(){

    startPreloaderAnimation();

});

/*=========================================
  Fade Animations
=========================================*/

const fadeElements =
    document.querySelectorAll(
        ".fade-in,.fade-up,.fade-down,.fade-left,.fade-right"
    );

const fadeObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            fadeObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

fadeElements.forEach(function(element){

    fadeObserver.observe(element);

});

/*=========================================
  Fade Delay Animation
=========================================*/

document
.querySelectorAll("[data-fade-delay]")
.forEach(function(element){

    const delay =
        element.dataset.fadeDelay || 0;

    element.style.transitionDelay =
        delay + "ms";

});

/*=========================================
  Fade Hover Effect
=========================================*/

document
.querySelectorAll(".fade-hover")
.forEach(function(element){

    element.addEventListener("mouseenter",function(){

        this.classList.add("fade-active");

    });

    element.addEventListener("mouseleave",function(){

        this.classList.remove("fade-active");

    });

});

/*=========================================
  Fade Utility Functions
=========================================*/

function fadeIn(element){

    if(element){

        element.classList.add("show");

    }

}

function fadeOut(element){

    if(element){

        element.classList.remove("show");

    }

}
/*==================================================
  Slide Animations + Zoom Animations
==================================================*/

"use strict";

/*=========================================
  Slide Animations
=========================================*/

const slideElements = document.querySelectorAll(
    ".slide-left,.slide-right,.slide-up,.slide-down"
);

const slideObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            slideObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

slideElements.forEach(function(element){

    slideObserver.observe(element);

});

/*=========================================
  Slide Delay
=========================================*/

document
.querySelectorAll("[data-slide-delay]")
.forEach(function(element){

    const delay =
        element.dataset.slideDelay || 0;

    element.style.transitionDelay =
        delay + "ms";

});

/*=========================================
  Slide Hover Effect
=========================================*/

document
.querySelectorAll(".slide-hover")
.forEach(function(element){

    element.addEventListener("mouseenter",function(){

        this.classList.add("slide-active");

    });

    element.addEventListener("mouseleave",function(){

        this.classList.remove("slide-active");

    });

});

/*=========================================
  Zoom Animations
=========================================*/

const zoomElements = document.querySelectorAll(
    ".zoom-in,.zoom-out,.zoom-card"
);

const zoomObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            zoomObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});

zoomElements.forEach(function(element){

    zoomObserver.observe(element);

});

/*=========================================
  Zoom Delay
=========================================*/

document
.querySelectorAll("[data-zoom-delay]")
.forEach(function(element){

    const delay =
        element.dataset.zoomDelay || 0;

    element.style.transitionDelay =
        delay + "ms";

});

/*=========================================
  Zoom Hover
=========================================*/

document
.querySelectorAll(".zoom-hover")
.forEach(function(element){

    element.addEventListener("mouseenter",function(){

        this.style.transform =
            "scale(1.08)";

    });

    element.addEventListener("mouseleave",function(){

        this.style.transform =
            "scale(1)";

    });

});

/*=========================================
  Utility Functions
=========================================*/

function slideIn(element){

    if(element){

        element.classList.add("show");

    }

}

function zoomIn(element){

    if(element){

        element.classList.add("show");

    }

}

function resetAnimation(element){

    if(element){

        element.classList.remove("show");

    }

}

/*=========================================
  Animation Refresh
=========================================*/

window.addEventListener("resize",function(){

    slideElements.forEach(function(element){

        element.classList.remove("show");

        slideObserver.observe(element);

    });

});
/*==================================================
  CodeNova Technologies
  animation.js
  Part 1A.3
  Rotate Animations + Bounce Animations
==================================================*/

"use strict";

/*=========================================
  Rotate Animations
=========================================*/

const rotateElements = document.querySelectorAll(
    ".rotate,.rotate-left,.rotate-right"
);

const rotateObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            rotateObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.20
});

rotateElements.forEach(function(element){

    rotateObserver.observe(element);

});

/*=========================================
  Rotate Delay
=========================================*/

document
.querySelectorAll("[data-rotate-delay]")
.forEach(function(element){

    const delay =
        element.dataset.rotateDelay || 0;

    element.style.transitionDelay =
        delay + "ms";

});

/*=========================================
  Rotate Hover Effect
=========================================*/

document
.querySelectorAll(".rotate-hover")
.forEach(function(element){

    element.addEventListener("mouseenter",function(){

        this.style.transform =
            "rotate(10deg) scale(1.05)";

    });

    element.addEventListener("mouseleave",function(){

        this.style.transform =
            "rotate(0deg) scale(1)";

    });

});

/*=========================================
  Bounce Animations
=========================================*/

const bounceElements = document.querySelectorAll(
    ".bounce,.bounce-up,.bounce-down"
);

const bounceObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            bounceObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.20
});

bounceElements.forEach(function(element){

    bounceObserver.observe(element);

});

/*=========================================
  Bounce Hover Effect
=========================================*/

document
.querySelectorAll(".bounce-hover")
.forEach(function(element){

    element.addEventListener("mouseenter",function(){

        this.classList.add("bounce-active");

    });

    element.addEventListener("mouseleave",function(){

        this.classList.remove("bounce-active");

    });

});

/*=========================================
  Animation Utility Functions
=========================================*/

function rotateIn(element){

    if(element){

        element.classList.add("show");

    }

}

function bounceIn(element){

    if(element){

        element.classList.add("show");

    }

}

function resetAnimation(element){

    if(element){

        element.classList.remove("show");

    }

}

/*=========================================
  Refresh Animations
=========================================*/

window.addEventListener("resize",function(){

    rotateElements.forEach(function(element){

        element.classList.remove("show");

        rotateObserver.observe(element);

    });

    bounceElements.forEach(function(element){

        element.classList.remove("show");

        bounceObserver.observe(element);

    });

});

/*=========================================
  Page Load Animation
=========================================*/

window.addEventListener("load",function(){

    document.body.classList.add("animations-ready");

});
/*==================================================
  Hero Animations + Navbar Animations
==================================================*/

"use strict";

/*=========================================
  Hero Animations
=========================================*/

const heroSection =
    document.querySelector(".hero");

const heroTitle =
    document.querySelector(".hero-title");

const heroSubtitle =
    document.querySelector(".hero-subtitle");

const heroButtons =
    document.querySelectorAll(".hero-btn");

const heroImage =
    document.querySelector(".hero-image");

window.addEventListener("load",function(){

    if(heroSection){

        heroSection.classList.add("animate");

    }

    setTimeout(function(){

        if(heroTitle){

            heroTitle.classList.add("fade-in");

        }

    },200);

    setTimeout(function(){

        if(heroSubtitle){

            heroSubtitle.classList.add("slide-up");

        }

    },500);

    setTimeout(function(){

        heroButtons.forEach(function(button){

            button.classList.add("zoom-in");

        });

    },800);

    setTimeout(function(){

        if(heroImage){

            heroImage.classList.add("float");

        }

    },1000);

});

/*=========================================
  Hero Parallax Effect
=========================================*/

window.addEventListener("scroll",function(){

    if(!heroImage) return;

    const offset = window.scrollY * 0.25;

    heroImage.style.transform =
        "translateY(" + offset + "px)";

});

/*=========================================
  Hero Mouse Animation
=========================================*/

const heroContent =
    document.querySelector(".hero-content");

if(heroContent){

    heroContent.addEventListener("mousemove",function(){

        heroContent.classList.add("active");

    });

    heroContent.addEventListener("mouseleave",function(){

        heroContent.classList.remove("active");

    });

}

/*=========================================
  Navbar Animations
=========================================*/

const navbar =
    document.querySelector(".navbar");

const navLinks =
    document.querySelectorAll(".navbar .nav-link");

window.addEventListener("scroll",function(){

    if(!navbar) return;

    if(window.scrollY > 50){

        navbar.classList.add("navbar-animate");

    }else{

        navbar.classList.remove("navbar-animate");

    }

});

navLinks.forEach(function(link){

    link.addEventListener("mouseenter",function(){

        this.classList.add("hover");

    });

    link.addEventListener("mouseleave",function(){

        this.classList.remove("hover");

    });

});

/*=========================================
  Active Navigation Animation
=========================================*/

navLinks.forEach(function(link){

    link.addEventListener("click",function(){

        navLinks.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*=========================================
  Logo Animation
=========================================*/

const logo =
    document.querySelector(".navbar-brand");

if(logo){

    logo.addEventListener("mouseenter",function(){

        this.classList.add("logo-spin");

    });

    logo.addEventListener("mouseleave",function(){

        this.classList.remove("logo-spin");

    });

}
/*==================================================
  Button Hover Effects + Card Hover Effects
==================================================*/

"use strict";

/*=========================================
  Button Hover Effects
=========================================*/

const buttons =
    document.querySelectorAll(
        ".btn,.hero-btn,.primary-btn,.secondary-btn"
    );

buttons.forEach(function(button){

    button.addEventListener("mouseenter",function(){

        this.classList.add("btn-hover");

        this.style.transform =
            "translateY(-3px) scale(1.03)";

    });

    button.addEventListener("mouseleave",function(){

        this.classList.remove("btn-hover");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

buttons.forEach(function(button){

    button.addEventListener("mousedown",function(){

        this.classList.add("btn-click");

        this.style.transform =
            "scale(.96)";

    });

    button.addEventListener("mouseup",function(){

        this.classList.remove("btn-click");

        this.style.transform =
            "translateY(-3px) scale(1.03)";

    });

});

/*=========================================
  Ripple Effect
=========================================*/

buttons.forEach(function(button){

    button.addEventListener("click",function(e){

        const ripple =
            document.createElement("span");

        ripple.className = "ripple";

        const rect =
            this.getBoundingClientRect();

        ripple.style.left =
            (e.clientX - rect.left) + "px";

        ripple.style.top =
            (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

/*=========================================
  Card Hover Effects
=========================================*/

const cards =
    document.querySelectorAll(
        ".card,.service-card,.team-card,.blog-card,.portfolio-card"
    );

cards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("card-active");

        this.style.transform =
            "translateY(-10px)";

        this.style.boxShadow =
            "0 20px 40px rgba(0,0,0,.18)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("card-active");

        this.style.transform =
            "translateY(0)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Card Tilt Effect
=========================================*/

cards.forEach(function(card){

    card.addEventListener("mousemove",function(e){

        const rect =
            this.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            (y - rect.height / 2) / 18;

        const rotateY =
            (rect.width / 2 - x) / 18;

        this.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});

/*=========================================
  Hover Utilities
=========================================*/

function enableHover(element){

    if(element){

        element.classList.add("hover");

    }

}

function disableHover(element){

    if(element){

        element.classList.remove("hover");

    }

}
/*==================================================
  Image Hover Effects + Icon Animations
==================================================*/

"use strict";

/*=========================================
  Image Hover Effects
=========================================*/

const images = document.querySelectorAll(
    ".img-hover,.gallery img,.portfolio img,.team img,.blog img"
);

images.forEach(function(image){

    image.addEventListener("mouseenter",function(){

        this.classList.add("image-active");

        this.style.transform =
            "scale(1.08) rotate(1deg)";

        this.style.transition =
            "all .4s ease";

    });

    image.addEventListener("mouseleave",function(){

        this.classList.remove("image-active");

        this.style.transform =
            "scale(1) rotate(0deg)";

    });

});

/*=========================================
  Image Tilt Effect
=========================================*/

images.forEach(function(image){

    image.addEventListener("mousemove",function(event){

        const rect =
            this.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            (rect.height / 2 - y) / 20;

        const rotateY =
            (x - rect.width / 2) / 20;

        this.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.05)`;

    });

    image.addEventListener("mouseleave",function(){

        this.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) scale(1)";

    });

});

/*=========================================
  Icon Animations
=========================================*/

const icons = document.querySelectorAll(
    ".icon,.social-icon i,.feature-icon,.service-icon,.footer-icon"
);

icons.forEach(function(icon){

    icon.addEventListener("mouseenter",function(){

        this.classList.add("icon-active");

        this.style.transform =
            "scale(1.25) rotate(12deg)";

        this.style.transition =
            "all .3s ease";

    });

    icon.addEventListener("mouseleave",function(){

        this.classList.remove("icon-active");

        this.style.transform =
            "scale(1) rotate(0deg)";

    });

});

/*=========================================
  Icon Click Animation
=========================================*/

icons.forEach(function(icon){

    icon.addEventListener("click",function(){

        this.classList.add("icon-bounce");

        setTimeout(()=>{

            this.classList.remove("icon-bounce");

        },600);

    });

});

/*=========================================
  Floating Icons
=========================================*/

document
.querySelectorAll(".floating-icon")
.forEach(function(icon){

    let direction = 1;

    setInterval(function(){

        direction *= -1;

        icon.style.transform =
            `translateY(${direction * 8}px)`;

    },1200);

});

/*=========================================
  Animation Helpers
=========================================*/

function animateImage(element){

    if(element){

        element.classList.add("image-active");

    }

}

function animateIcon(element){

    if(element){

        element.classList.add("icon-active");

    }

}
/*==================================================
  Scroll Reveal + Counter Animation
==================================================*/

"use strict";

/*=========================================
  Scroll Reveal Animation
=========================================*/

const revealItems = document.querySelectorAll(
    ".reveal,.reveal-up,.reveal-left,.reveal-right,.reveal-scale"
);

const revealObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.20,
    rootMargin:"0px 0px -80px 0px"
});

revealItems.forEach(function(item){

    revealObserver.observe(item);

});

/*=========================================
  Reveal Delay
=========================================*/

document
.querySelectorAll("[data-delay]")
.forEach(function(item){

    const delay =
        item.dataset.delay || 0;

    item.style.transitionDelay =
        delay + "ms";

});

/*=========================================
  Reveal Reset
=========================================*/

function revealElement(element){

    if(element){

        element.classList.add("active");

    }

}

function hideElement(element){

    if(element){

        element.classList.remove("active");

    }

}

/*=========================================
  Counter Animation
=========================================*/

const counters =
    document.querySelectorAll(".counter");

function animateCounter(counter){

    const target =
        parseInt(counter.dataset.target) || 0;

    const speed =
        parseInt(counter.dataset.speed) || 200;

    let count = 0;

    const increment =
        Math.ceil(target / speed);

    const timer = setInterval(function(){

        count += increment;

        if(count >= target){

            count = target;

            clearInterval(timer);

        }

        counter.textContent =
            count.toLocaleString();

    },10);

}

const counterObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

counters.forEach(function(counter){

    counterObserver.observe(counter);

});

/*=========================================
  Counter Refresh
=========================================*/

const refreshCounter =
    document.querySelector(".refresh-counter");

if(refreshCounter){

    refreshCounter.addEventListener("click",function(){

        counters.forEach(function(counter){

            counter.textContent = "0";

            animateCounter(counter);

        });

    });

}

/*=========================================
  Counter Complete Callback
=========================================*/

function counterFinished(){

    console.log(
        "All counters completed."
    );

}

window.addEventListener("load",function(){

    if(counters.length){

        counterFinished();

    }

});
/*==================================================
  Progress Bar Animation + Typing Effect
==================================================*/

"use strict";

/*=========================================
  Progress Bar Animation
=========================================*/

const progressBars = document.querySelectorAll(
    ".progress-bar"
);

const progressObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            animateProgress(entry.target);

            progressObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.35
});

progressBars.forEach(function(bar){

    progressObserver.observe(bar);

});

function animateProgress(bar){

    const target =
        parseInt(bar.dataset.progress) || 0;

    let value = 0;

    const interval = setInterval(function(){

        value++;

        bar.style.width = value + "%";

        bar.setAttribute(
            "aria-valuenow",
            value
        );

        const percentage =
            bar.querySelector(".progress-value");

        if(percentage){

            percentage.textContent =
                value + "%";

        }

        if(value >= target){

            clearInterval(interval);

        }

    },15);

}

/*=========================================
  Progress Hover Effect
=========================================*/

progressBars.forEach(function(bar){

    bar.addEventListener("mouseenter",function(){

        this.classList.add("progress-active");

    });

    bar.addEventListener("mouseleave",function(){

        this.classList.remove("progress-active");

    });

});

/*=========================================
  Typing Effect
=========================================*/

const typingElement =
    document.querySelector(".typing-text");

if(typingElement){

    const words = [

        "Web Development",

        "Mobile Apps",

        "UI / UX Design",

        "Cloud Solutions",

        "AI Solutions",

        "Digital Marketing"

    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeAnimation(){

        const currentWord =
            words[wordIndex];

        if(!deleting){

            typingElement.textContent =
                currentWord.substring(
                    0,
                    letterIndex++
                );

            if(letterIndex >
                currentWord.length){

                deleting = true;

                setTimeout(
                    typeAnimation,
                    1500
                );

                return;

            }

        }else{

            typingElement.textContent =
                currentWord.substring(
                    0,
                    letterIndex--
                );

            if(letterIndex < 0){

                deleting = false;

                wordIndex++;

                if(wordIndex >= words.length){

                    wordIndex = 0;

                }

            }

        }

        setTimeout(

            typeAnimation,

            deleting ? 60 : 120

        );

    }

    typeAnimation();

}

/*=========================================
  Cursor Blink
=========================================*/

const cursor =
    document.querySelector(".typing-cursor");

if(cursor){

    setInterval(function(){

        cursor.classList.toggle("hidden");

    },500);

}

/*=========================================
  Restart Typing Animation
=========================================*/

const restartTyping =
    document.querySelector(".restart-typing");

if(restartTyping){

    restartTyping.addEventListener("click",function(){

        location.reload();

    });

}
/*==================================================
  Number Count Animation + Timeline Animation
==================================================*/

"use strict";

/*=========================================
  Number Count Animation
=========================================*/

const numberCounters = document.querySelectorAll(
    ".number-count"
);

function animateNumber(element){

    const target =
        parseInt(element.dataset.target) || 0;

    const duration =
        parseInt(element.dataset.duration) || 2000;

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

const numberObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            animateNumber(entry.target);

            numberObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.30
});

numberCounters.forEach(function(counter){

    numberObserver.observe(counter);

});

/*=========================================
  Timeline Animation
=========================================*/

const timelineItems =
    document.querySelectorAll(".timeline-item");

const timelineObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("timeline-active");

            timelineObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.25
});

timelineItems.forEach(function(item){

    timelineObserver.observe(item);

});

/*=========================================
  Timeline Hover Effect
=========================================*/

timelineItems.forEach(function(item){

    item.addEventListener("mouseenter",function(){

        this.classList.add("timeline-hover");

    });

    item.addEventListener("mouseleave",function(){

        this.classList.remove("timeline-hover");

    });

});

/*=========================================
  Timeline Current Step
=========================================*/

const currentStep =
    document.querySelector(".timeline-current");

if(currentStep){

    currentStep.classList.add("active");

}

/*=========================================
  Restart Number Animation
=========================================*/

const restartButton =
    document.querySelector(".restart-counter");

if(restartButton){

    restartButton.addEventListener("click",function(){

        numberCounters.forEach(function(counter){

            counter.textContent = "0";

            animateNumber(counter);

        });

    });

}

/*=========================================
  Animation Helper Functions
=========================================*/

function showTimeline(element){

    if(element){

        element.classList.add("timeline-active");

    }

}

function hideTimeline(element){

    if(element){

        element.classList.remove("timeline-active");

    }

}

function resetCounters(){

    numberCounters.forEach(function(counter){

        counter.textContent = "0";

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(
        "Number Count & Timeline Animations Ready"
    );

});
/*==================================================
  Portfolio Animation + Services Animation
==================================================*/

"use strict";

/*=========================================
  Portfolio Animation
=========================================*/

const portfolioCards = document.querySelectorAll(
    ".portfolio-card"
);

const portfolioObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("portfolio-show");

            portfolioObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.25
});

portfolioCards.forEach(function(card){

    portfolioObserver.observe(card);

});

/*=========================================
  Portfolio Hover Effect
=========================================*/

portfolioCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("portfolio-hover");

        this.style.transform =
            "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("portfolio-hover");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

/*=========================================
  Portfolio Image Zoom
=========================================*/

document
.querySelectorAll(".portfolio-image img")
.forEach(function(image){

    image.addEventListener("mouseenter",function(){

        this.style.transform =
            "scale(1.1)";

    });

    image.addEventListener("mouseleave",function(){

        this.style.transform =
            "scale(1)";

    });

});

/*=========================================
  Services Animation
=========================================*/

const serviceCards = document.querySelectorAll(
    ".service-card"
);

const serviceObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("service-show");

            serviceObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.30
});

serviceCards.forEach(function(card){

    serviceObserver.observe(card);

});

/*=========================================
  Service Hover Animation
=========================================*/

serviceCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("service-active");

        this.style.transform =
            "translateY(-10px)";

        this.style.boxShadow =
            "0 20px 40px rgba(0,0,0,.18)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("service-active");

        this.style.transform =
            "translateY(0)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Service Icon Animation
=========================================*/

document
.querySelectorAll(".service-icon")
.forEach(function(icon){

    icon.addEventListener("mouseenter",function(){

        this.classList.add("icon-spin");

    });

    icon.addEventListener("mouseleave",function(){

        this.classList.remove("icon-spin");

    });

});

/*=========================================
  Animation Helpers
=========================================*/

function animatePortfolio(element){

    if(element){

        element.classList.add("portfolio-show");

    }

}

function animateService(element){

    if(element){

        element.classList.add("service-show");

    }

}
/*==================================================
  Team Animation + Testimonial Animation
==================================================*/

"use strict";

/*=========================================
  Team Animation
=========================================*/

const teamCards = document.querySelectorAll(
    ".team-card"
);

const teamObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("team-show");

            teamObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.25
});

teamCards.forEach(function(card){

    teamObserver.observe(card);

});

/*=========================================
  Team Hover Effect
=========================================*/

teamCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("team-active");

        this.style.transform =
            "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("team-active");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

/*=========================================
  Team Social Icons
=========================================*/

document
.querySelectorAll(".team-social a")
.forEach(function(icon){

    icon.addEventListener("mouseenter",function(){

        this.classList.add("social-bounce");

    });

    icon.addEventListener("mouseleave",function(){

        this.classList.remove("social-bounce");

    });

});

/*=========================================
  Testimonial Animation
=========================================*/

const testimonialCards = document.querySelectorAll(
    ".testimonial-card"
);

const testimonialObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("testimonial-show");

            testimonialObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.30
});

testimonialCards.forEach(function(card){

    testimonialObserver.observe(card);

});

/*=========================================
  Testimonial Hover Effect
=========================================*/

testimonialCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("testimonial-active");

        this.style.transform =
            "translateY(-10px)";

        this.style.boxShadow =
            "0 18px 35px rgba(0,0,0,.18)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("testimonial-active");

        this.style.transform =
            "translateY(0)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Rating Star Animation
=========================================*/

document
.querySelectorAll(".testimonial-rating i")
.forEach(function(star){

    star.addEventListener("mouseenter",function(){

        this.classList.add("star-glow");

    });

    star.addEventListener("mouseleave",function(){

        this.classList.remove("star-glow");

    });

});

/*=========================================
  Animation Helpers
=========================================*/

function animateTeam(element){

    if(element){

        element.classList.add("team-show");

    }

}

function animateTestimonial(element){

    if(element){

        element.classList.add("testimonial-show");

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(
        "Team & Testimonial Animations Loaded"
    );

});
/*==================================================
  Swiper Animation + Blog Animation
==================================================*/

"use strict";

/*=========================================
  Swiper Animation
=========================================*/

if (typeof Swiper !== "undefined") {

    const swiper = new Swiper(".testimonial-swiper", {

        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        grabCursor: true,
        effect: "slide",

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
        }

    });

    swiper.on("slideChange", function () {

        document
            .querySelectorAll(".swiper-slide")
            .forEach(function (slide) {

                slide.classList.remove("swiper-active");

            });

        swiper.slides[swiper.activeIndex]
            .classList.add("swiper-active");

    });

}

/*=========================================
  Swiper Hover Pause
=========================================*/

const swiperContainer =
    document.querySelector(".testimonial-swiper");

if (swiperContainer && typeof swiper !== "undefined") {

    swiperContainer.addEventListener("mouseenter", function () {

        swiper.autoplay.stop();

    });

    swiperContainer.addEventListener("mouseleave", function () {

        swiper.autoplay.start();

    });

}

/*=========================================
  Blog Animation
=========================================*/

const blogCards = document.querySelectorAll(
    ".blog-card"
);

const blogObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("blog-show");

            blogObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.25
});

blogCards.forEach(function(card){

    blogObserver.observe(card);

});

/*=========================================
  Blog Hover Animation
=========================================*/

blogCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("blog-active");

        this.style.transform =
            "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("blog-active");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

/*=========================================
  Blog Image Animation
=========================================*/

document
.querySelectorAll(".blog-image img")
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
  Read More Animation
=========================================*/

document
.querySelectorAll(".blog-read-more")
.forEach(function(button){

    button.addEventListener("mouseenter",function(){

        this.classList.add("pulse");

    });

    button.addEventListener("mouseleave",function(){

        this.classList.remove("pulse");

    });

});

/*=========================================
  Animation Helpers
=========================================*/

function animateSwiper(){

    console.log("Swiper Animation Started");

}

function animateBlog(element){

    if(element){

        element.classList.add("blog-show");

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    animateSwiper();

    console.log(
        "Swiper & Blog Animations Ready"
    );

});
/*==================================================
  Form Animation + Modal Animation
==================================================*/

"use strict";

/*=========================================
  Form Animation
=========================================*/

const animatedForms = document.querySelectorAll(
    "form"
);

animatedForms.forEach(function(form){

    const fields =
        form.querySelectorAll(
            "input, textarea, select"
        );

    fields.forEach(function(field){

        field.addEventListener("focus",function(){

            this.parentElement.classList.add(
                "field-active"
            );

            this.classList.add("input-focus");

        });

        field.addEventListener("blur",function(){

            this.parentElement.classList.remove(
                "field-active"
            );

            this.classList.remove("input-focus");

            if(this.value.trim() !== ""){

                this.classList.add("input-filled");

            }else{

                this.classList.remove("input-filled");

            }

        });

    });

});

/*=========================================
  Submit Button Animation
=========================================*/

document
.querySelectorAll("form button[type='submit']")
.forEach(function(button){

    button.addEventListener("click",function(){

        this.classList.add("btn-loading");

        setTimeout(()=>{

            this.classList.remove("btn-loading");

        },1500);

    });

});

/*=========================================
  Modal Animation
=========================================*/

const modal =
    document.querySelector(".custom-modal");

const openButtons =
    document.querySelectorAll("[data-modal]");

const closeButton =
    document.querySelector(".modal-close");

function openModal(){

    if(!modal) return;

    modal.classList.add("modal-show");

    document.body.classList.add("modal-open");

}

function closeModal(){

    if(!modal) return;

    modal.classList.remove("modal-show");

    document.body.classList.remove("modal-open");

}

openButtons.forEach(function(button){

    button.addEventListener("click",openModal);

});

if(closeButton){

    closeButton.addEventListener(
        "click",
        closeModal
    );

}

window.addEventListener("click",function(event){

    if(event.target === modal){

        closeModal();

    }

});

/*=========================================
  Modal Entrance Animation
=========================================*/

if(modal){

    modal.addEventListener(
        "animationend",
        function(){

            modal.classList.add("animation-finished");

        }
    );

}

/*=========================================
  ESC Key Support
=========================================*/

document.addEventListener("keydown",function(event){

    if(event.key === "Escape"){

        closeModal();

    }

});

/*=========================================
  Animation Helpers
=========================================*/

function animateForm(element){

    if(element){

        element.classList.add("form-show");

    }

}

function animateModal(){

    openModal();

}
/*==================================================
  Notification Animation + Loading Spinner
==================================================*/

"use strict";

/*=========================================
  Notification Animation
=========================================*/

const notification =
    document.querySelector(".notification");

function showNotification(message,type="success"){

    if(!notification) return;

    notification.textContent = message;

    notification.className =
        "notification " + type;

    notification.classList.add("show");

    setTimeout(function(){

        notification.classList.remove("show");

    },3000);

}

document
.querySelectorAll(".notify-btn")
.forEach(function(button){

    button.addEventListener("click",function(){

        const message =
            this.dataset.message ||
            "Operation completed successfully.";

        const type =
            this.dataset.type ||
            "success";

        showNotification(message,type);

    });

});

/*=========================================
  Notification Close Button
=========================================*/

const notificationClose =
    document.querySelector(".notification-close");

if(notificationClose){

    notificationClose.addEventListener("click",function(){

        notification.classList.remove("show");

    });

}

/*=========================================
  Notification Hover
=========================================*/

if(notification){

    notification.addEventListener("mouseenter",function(){

        this.classList.add("pause-animation");

    });

    notification.addEventListener("mouseleave",function(){

        this.classList.remove("pause-animation");

    });

}

/*=========================================
  Loading Spinner
=========================================*/

const spinner =
    document.querySelector(".loading-spinner");

function showSpinner(){

    if(spinner){

        spinner.classList.add("spinner-show");

    }

}

function hideSpinner(){

    if(spinner){

        spinner.classList.remove("spinner-show");

    }

}

window.addEventListener("load",function(){

    showSpinner();

    setTimeout(function(){

        hideSpinner();

    },1500);

});

/*=========================================
  Button Loading Animation
=========================================*/

document
.querySelectorAll(".loading-btn")
.forEach(function(button){

    button.addEventListener("click",function(){

        this.classList.add("loading");

        this.disabled = true;

        setTimeout(()=>{

            this.classList.remove("loading");

            this.disabled = false;

        },2000);

    });

});

/*=========================================
  Spinner Rotation
=========================================*/

if(spinner){

    spinner.addEventListener("animationend",function(){

        console.log(
            "Loading animation completed."
        );

    });

}

/*=========================================
  Animation Helpers
=========================================*/

function notifySuccess(text){

    showNotification(text,"success");

}

function notifyError(text){

    showNotification(text,"error");

}

function startLoading(){

    showSpinner();

}

function stopLoading(){

    hideSpinner();

}
/*==================================================
  Page Transition + Back To Top Animation
==================================================*/

"use strict";

/*=========================================
  Page Transition
=========================================*/

const pageTransition =
    document.querySelector(".page-transition");

function showPageTransition(){

    if(!pageTransition) return;

    pageTransition.classList.add("active");

}

function hidePageTransition(){

    if(!pageTransition) return;

    pageTransition.classList.remove("active");

}

window.addEventListener("load",function(){

    hidePageTransition();

});

document
.querySelectorAll("a[href]")
.forEach(function(link){

    const href =
        link.getAttribute("href");

    if(
        href &&
        !href.startsWith("#") &&
        !href.startsWith("javascript") &&
        !link.hasAttribute("target")
    ){

        link.addEventListener("click",function(){

            showPageTransition();

        });

    }

});

/*=========================================
  Fade Between Pages
=========================================*/

window.addEventListener("pageshow",function(){

    document.body.classList.add("page-loaded");

});

/*=========================================
  Back To Top Animation
=========================================*/

const backToTop =
    document.querySelector("#backToTop");

function toggleBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 300){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll",toggleBackToTop);

if(backToTop){

    backToTop.addEventListener("click",function(event){

        event.preventDefault();

        this.classList.add("clicked");

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        setTimeout(()=>{

            this.classList.remove("clicked");

        },500);

    });

}

/*=========================================
  Scroll Progress Indicator
=========================================*/

const progressRing =
    document.querySelector(".scroll-progress");

window.addEventListener("scroll",function(){

    if(!progressRing) return;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (window.scrollY / scrollHeight) * 100;

    progressRing.style.width =
        percentage + "%";

});

/*=========================================
  Utility Functions
=========================================*/

function goToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function transitionPage(){

    showPageTransition();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("DOMContentLoaded",function(){

    toggleBackToTop();

    console.log(
        "Page Transition & Back To Top Ready"
    );

});

/*=========================================
  Cleanup
=========================================*/

window.addEventListener("beforeunload",function(){

    showPageTransition();

});

/*==================================================
  Utility Animation Functions + Animation Helpers
==================================================*/

"use strict";

/*=========================================
  Utility Animation Functions
=========================================*/

const AnimationUtils = {

    addClass(element, className) {

        if (element) {

            element.classList.add(className);

        }

    },

    removeClass(element, className) {

        if (element) {

            element.classList.remove(className);

        }

    },

    toggleClass(element, className) {

        if (element) {

            element.classList.toggle(className);

        }

    },

    hasClass(element, className) {

        return element
            ? element.classList.contains(className)
            : false;

    },

    delay(time) {

        return new Promise(function(resolve){

            setTimeout(resolve, time);

        });

    },

    fadeIn(element) {

        if (!element) return;

        element.classList.add("fade-in");

    },

    fadeOut(element) {

        if (!element) return;

        element.classList.remove("fade-in");

    },

    slideUp(element) {

        if (!element) return;

        element.classList.add("slide-up");

    },

    slideDown(element) {

        if (!element) return;

        element.classList.add("slide-down");

    }

};

/*=========================================
  Animation Helpers
=========================================*/

function animateOnLoad(selector, animation) {

    document
        .querySelectorAll(selector)
        .forEach(function(item){

            item.classList.add(animation);

        });

}

function animateOnHover(selector, animation) {

    document
        .querySelectorAll(selector)
        .forEach(function(item){

            item.addEventListener("mouseenter",function(){

                this.classList.add(animation);

            });

            item.addEventListener("mouseleave",function(){

                this.classList.remove(animation);

            });

        });

}

function animateOnClick(selector, animation) {

    document
        .querySelectorAll(selector)
        .forEach(function(item){

            item.addEventListener("click",function(){

                this.classList.add(animation);

                setTimeout(()=>{

                    this.classList.remove(animation);

                },600);

            });

        });

}

function resetAnimations(selector){

    document
        .querySelectorAll(selector)
        .forEach(function(item){

            item.classList.remove(

                "fade-in",
                "slide-up",
                "slide-down",
                "zoom-in",
                "rotate",
                "bounce"

            );

        });

}

function refreshAnimations(){

    resetAnimations(".animate");

    animateOnLoad(".animate","fade-in");

}

function randomDelay(){

    return Math.floor(

        Math.random() * 400

    ) + 100;

}

/*=========================================
  Animation Ready
=========================================*/

window.addEventListener("load",function(){

    animateOnLoad(".page-title","fade-in");

    animateOnHover(".card","hover-animation");

    animateOnClick(".btn","pulse");

    console.log(

        "Animation Utilities Loaded"

    );

});
/*==================================================
  Accessibility (Reduced Motion)
  Browser Compatibility
==================================================*/

"use strict";

/*=========================================
  Accessibility
  Reduced Motion
=========================================*/

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

function applyReducedMotion() {

    if (!prefersReducedMotion.matches) {

        return;

    }

    document.documentElement.classList.add(
        "reduced-motion"
    );

    document
        .querySelectorAll(".animate")
        .forEach(function (element) {

            element.style.animation = "none";

            element.style.transition = "none";

            element.style.transform = "none";

        });

    console.log(
        "Reduced motion enabled."
    );

}

applyReducedMotion();

prefersReducedMotion.addEventListener(
    "change",
    applyReducedMotion
);

/*=========================================
  Pause Animations
=========================================*/

function pauseAnimations() {

    document
        .querySelectorAll(".animate")
        .forEach(function (element) {

            element.style.animationPlayState =
                "paused";

        });

}

function resumeAnimations() {

    document
        .querySelectorAll(".animate")
        .forEach(function (element) {

            element.style.animationPlayState =
                "running";

        });

}

/*=========================================
  Browser Compatibility
=========================================*/

const browser = {

    chrome:
        /Chrome/.test(navigator.userAgent) &&
        !/Edg/.test(navigator.userAgent),

    firefox:
        /Firefox/.test(navigator.userAgent),

    safari:
        /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        ),

    edge:
        /Edg/.test(navigator.userAgent)

};

if (browser.chrome) {

    document.body.classList.add("chrome");

}

if (browser.firefox) {

    document.body.classList.add("firefox");

}

if (browser.safari) {

    document.body.classList.add("safari");

}

if (browser.edge) {

    document.body.classList.add("edge");

}

/*=========================================
  Touch Device
=========================================*/

if (

    "ontouchstart" in window ||

    navigator.maxTouchPoints > 0

) {

    document.body.classList.add("touch-device");

}

/*=========================================
  CSS Support
=========================================*/

if (

    CSS.supports(
        "scroll-behavior",
        "smooth"
    )

) {

    document.body.classList.add(
        "smooth-scroll"
    );

}

/*=========================================
  Window Visibility
=========================================*/

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            pauseAnimations();

        } else {

            resumeAnimations();

        }

    }
);

/*=========================================
  Browser Ready
=========================================*/

window.addEventListener(
    "load",
    function () {

        console.log(
            "Accessibility & Browser Compatibility Ready"
        );

    }
);
/*==================================================
  CodeNova Technologies
  animation.js
  Part 3B.3
  Initialization + End of animation.js
==================================================*/

"use strict";

/*=========================================
  Initialization
=========================================*/

const AnimationManager = {

    initialized: false,

    init() {

        if (this.initialized) {

            return;

        }

        this.initialized = true;

        this.initializeAnimations();

        this.initializeEvents();

        this.initializeAccessibility();

        console.log(
            "Animation Manager Initialized."
        );

    },

    initializeAnimations() {

        document.body.classList.add(
            "animations-enabled"
        );

    },

    initializeEvents() {

        window.addEventListener(

            "resize",

            this.handleResize

        );

        window.addEventListener(

            "scroll",

            this.handleScroll

        );

    },

    initializeAccessibility() {

        if (

            window.matchMedia(

                "(prefers-reduced-motion: reduce)"

            ).matches

        ) {

            document.body.classList.add(

                "reduce-motion"

            );

        }

    },

    handleResize() {

        document.body.dataset.width =

            window.innerWidth;

    },

    handleScroll() {

        document.body.dataset.scroll =

            window.scrollY;

    }

};

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        AnimationManager.init();

    }

);

/*=========================================
  Window Load
=========================================*/

window.addEventListener(

    "load",

    function () {

        document.body.classList.add(

            "page-loaded"

        );

        console.log(

            "All animations loaded successfully."

        );

    }

);

/*=========================================
  Window Unload
=========================================*/

window.addEventListener(

    "beforeunload",

    function () {

        document.body.classList.remove(

            "page-loaded"

        );

    }

);

/*=========================================
  Debug Information
=========================================*/

const AnimationInfo = {

    version: "1.0.0",

    author: "CodeNova Technologies",

    framework: "Vanilla JavaScript",

    compatibility: [

        "Chrome",

        "Firefox",

        "Edge",

        "Safari"

    ]

};

console.table(

    AnimationInfo

);

/*=========================================
  Animation Ready Event
=========================================*/

document.dispatchEvent(

    new CustomEvent(

        "animationsReady",

        {

            detail: {

                status: "success",

                version: AnimationInfo.version

            }

        }

    )

);

/*=========================================
  End Message
=========================================*/

console.log(
    "====================================="
);

console.log(
    " CodeNova Technologies Animation.js "
);

console.log(
    " Version : " + AnimationInfo.version
);

console.log(
    " All modules initialized successfully."
);

console.log(
    "====================================="
);




