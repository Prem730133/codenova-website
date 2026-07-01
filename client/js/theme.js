/*==================================================
  Dark Mode + Light Mode
==================================================*/

"use strict";

/*=========================================
  Theme Elements
=========================================*/

const body =
    document.body;

const themeToggle =
    document.querySelector("#themeToggle");

const themeIcon =
    document.querySelector("#themeIcon");

const THEME_KEY =
    "codenova-theme";

/*=========================================
  Apply Theme
=========================================*/

function applyTheme(theme){

    body.setAttribute(

        "data-theme",

        theme

    );

    localStorage.setItem(

        THEME_KEY,

        theme

    );

    updateThemeIcon(theme);

}

/*=========================================
  Dark Mode
=========================================*/

function enableDarkMode(){

    applyTheme("dark");

    body.classList.add(

        "dark-mode"

    );

    body.classList.remove(

        "light-mode"

    );

    console.log(

        "Dark Mode Enabled"

    );

}

/*=========================================
  Light Mode
=========================================*/

function enableLightMode(){

    applyTheme("light");

    body.classList.add(

        "light-mode"

    );

    body.classList.remove(

        "dark-mode"

    );

    console.log(

        "Light Mode Enabled"

    );

}

/*=========================================
  Update Theme Icon
=========================================*/

function updateThemeIcon(theme){

    if(!themeIcon) return;

    if(theme === "dark"){

        themeIcon.className =

            "fas fa-sun";

    }

    else{

        themeIcon.className =

            "fas fa-moon";

    }

}

/*=========================================
  Restore Theme
=========================================*/

function restoreTheme(){

    const savedTheme =

        localStorage.getItem(

            THEME_KEY

        );

    if(savedTheme === "dark"){

        enableDarkMode();

    }

    else{

        enableLightMode();

    }

}

/*=========================================
  Theme Status
=========================================*/

function currentTheme(){

    return body.getAttribute(

        "data-theme"

    );

}

/*=========================================
  Theme Classes
=========================================*/

function isDarkMode(){

    return currentTheme() ===

        "dark";

}

function isLightMode(){

    return currentTheme() ===

        "light";

}

/*=========================================
  Helper Functions
=========================================*/

function toggleBodyClass(

    addClass,

    removeClass

){

    body.classList.add(addClass);

    body.classList.remove(removeClass);

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        restoreTheme();

        console.log(

            "Dark & Light Theme Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  theme.js
  Part 1A.2
  Theme Toggle + System Theme Detection
==================================================*/

"use strict";

/*=========================================
  Theme Elements
=========================================*/

const themeButton =
    document.querySelector("#themeToggle");

const themeLabel =
    document.querySelector("#themeLabel");

const prefersDark =
    window.matchMedia(

        "(prefers-color-scheme: dark)"

    );

/*=========================================
  Theme Toggle
=========================================*/

function toggleTheme(){

    const currentTheme =

        document.body.getAttribute(

            "data-theme"

        ) || "light";

    if(currentTheme === "dark"){

        setTheme("light");

    }

    else{

        setTheme("dark");

    }

}

/*=========================================
  Set Theme
=========================================*/

function setTheme(theme){

    document.body.setAttribute(

        "data-theme",

        theme

    );

    document.body.classList.toggle(

        "dark-mode",

        theme === "dark"

    );

    document.body.classList.toggle(

        "light-mode",

        theme === "light"

    );

    localStorage.setItem(

        "codenova-theme",

        theme

    );

    updateThemeText(theme);

    updateToggleState(theme);

}

/*=========================================
  Theme Toggle Event
=========================================*/

if(themeButton){

    themeButton.addEventListener(

        "click",

        toggleTheme

    );

}

/*=========================================
  Theme Label
=========================================*/

function updateThemeText(theme){

    if(!themeLabel) return;

    themeLabel.textContent =

        theme === "dark"

        ? "Dark Mode"

        : "Light Mode";

}

/*=========================================
  Toggle Button State
=========================================*/

function updateToggleState(theme){

    if(!themeButton) return;

    themeButton.setAttribute(

        "aria-pressed",

        theme === "dark"

    );

}

/*=========================================
  System Theme Detection
=========================================*/

function detectSystemTheme(){

    if(prefersDark.matches){

        setTheme("dark");

    }

    else{

        setTheme("light");

    }

}

/*=========================================
  Listen for System Changes
=========================================*/

prefersDark.addEventListener(

    "change",

    function(event){

        const savedTheme =

            localStorage.getItem(

                "codenova-theme"

            );

        if(!savedTheme){

            if(event.matches){

                setTheme("dark");

            }

            else{

                setTheme("light");

            }

        }

    }

);

/*=========================================
  Auto Detect Theme
=========================================*/

function initializeTheme(){

    const savedTheme =

        localStorage.getItem(

            "codenova-theme"

        );

    if(savedTheme){

        setTheme(savedTheme);

    }

    else{

        detectSystemTheme();

    }

}

/*=========================================
  Helper Functions
=========================================*/

function currentTheme(){

    return document.body.getAttribute(

        "data-theme"

    );

}

function isDarkTheme(){

    return currentTheme() === "dark";

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeTheme();

        console.log(

            "Theme Toggle & System Theme Detection Ready"

        );

    }

);
/*==================================================
  Theme Icons + Theme Animation
==================================================*/

"use strict";

/*=========================================
  Theme Icons
=========================================*/

const themeIcon =
    document.querySelector("#themeIcon");

const themeButtons =
    document.querySelectorAll(".theme-btn");

const themeCards =
    document.querySelectorAll(".theme-card");

/*=========================================
  Update Theme Icon
=========================================*/

function updateThemeIcon(theme){

    if(!themeIcon) return;

    themeIcon.className =

        theme === "dark"

        ? "fas fa-sun"

        : "fas fa-moon";

    themeIcon.setAttribute(

        "aria-label",

        theme === "dark"

        ? "Switch to Light Mode"

        : "Switch to Dark Mode"

    );

}

/*=========================================
  Theme Button Icons
=========================================*/

themeButtons.forEach(function(button){

    button.addEventListener("mouseenter",function(){

        this.classList.add("icon-rotate");

    });

    button.addEventListener("mouseleave",function(){

        this.classList.remove("icon-rotate");

    });

});

/*=========================================
  Theme Card Hover
=========================================*/

themeCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("active");

        this.style.transform =

            "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("active");

        this.style.transform =

            "translateY(0) scale(1)";

    });

});

/*=========================================
  Theme Animation
=========================================*/

function animateThemeChange(){

    document.body.classList.add(

        "theme-transition"

    );

    setTimeout(function(){

        document.body.classList.remove(

            "theme-transition"

        );

    },600);

}

/*=========================================
  Ripple Animation
=========================================*/

function createRipple(event){

    const button = event.currentTarget;

    const ripple =
        document.createElement("span");

    ripple.className = "theme-ripple";

    const rect =
        button.getBoundingClientRect();

    ripple.style.left =
        (event.clientX - rect.left) + "px";

    ripple.style.top =
        (event.clientY - rect.top) + "px";

    button.appendChild(ripple);

    setTimeout(function(){

        ripple.remove();

    },600);

}

themeButtons.forEach(function(button){

    button.addEventListener(

        "click",

        createRipple

    );

});

/*=========================================
  Fade Animation
=========================================*/

function fadeThemeElements(){

    document

        .querySelectorAll(".theme-animate")

        .forEach(function(element){

            element.classList.add("fade-theme");

            setTimeout(function(){

                element.classList.remove(

                    "fade-theme"

                );

            },500);

        });

}

/*=========================================
  Theme Switch Animation
=========================================*/

document.addEventListener(

    "themeChanged",

    function(event){

        updateThemeIcon(

            event.detail.theme

        );

        animateThemeChange();

        fadeThemeElements();

    }

);

/*=========================================
  Helper Functions
=========================================*/

function refreshTheme(){

    const theme =

        document.body.getAttribute(

            "data-theme"

        ) || "light";

    updateThemeIcon(theme);

    animateThemeChange();

}

function animateIcons(){

    themeButtons.forEach(function(button){

        button.classList.add("pulse");

        setTimeout(function(){

            button.classList.remove("pulse");

        },700);

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    refreshTheme();

    animateIcons();

    console.log(

        "Theme Icons & Theme Animation Ready"

    );

});
/*==================================================
  Color Palette + Accent Color
==================================================*/

"use strict";

/*=========================================
  Color Palette
=========================================*/

const colorPalette =
    document.querySelectorAll(".color-palette");

const root =
    document.documentElement;

const COLOR_KEY =
    "codenova-color";

const ACCENT_KEY =
    "codenova-accent";

/*=========================================
  Apply Color Palette
=========================================*/

function applyColorPalette(color){

    root.style.setProperty(

        "--primary-color",

        color

    );

    localStorage.setItem(

        COLOR_KEY,

        color

    );

    updateActivePalette(color);

}

/*=========================================
  Palette Selection
=========================================*/

colorPalette.forEach(function(item){

    item.addEventListener("click",function(){

        const color =
            this.dataset.color;

        applyColorPalette(color);

    });

});

/*=========================================
  Active Palette
=========================================*/

function updateActivePalette(color){

    colorPalette.forEach(function(item){

        item.classList.remove("active");

        if(item.dataset.color === color){

            item.classList.add("active");

        }

    });

}

/*=========================================
  Accent Color
=========================================*/

const accentButtons =
    document.querySelectorAll(".accent-color");

function applyAccentColor(color){

    root.style.setProperty(

        "--accent-color",

        color

    );

    localStorage.setItem(

        ACCENT_KEY,

        color

    );

    updateAccentButtons(color);

}

/*=========================================
  Accent Selection
=========================================*/

accentButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const accent =
            this.dataset.accent;

        applyAccentColor(accent);

    });

});

/*=========================================
  Active Accent
=========================================*/

function updateAccentButtons(color){

    accentButtons.forEach(function(button){

        button.classList.remove("selected");

        if(button.dataset.accent === color){

            button.classList.add("selected");

        }

    });

}

/*=========================================
  Restore Theme Colors
=========================================*/

function restoreThemeColors(){

    const savedPalette =
        localStorage.getItem(COLOR_KEY);

    const savedAccent =
        localStorage.getItem(ACCENT_KEY);

    if(savedPalette){

        applyColorPalette(savedPalette);

    }

    if(savedAccent){

        applyAccentColor(savedAccent);

    }

}

/*=========================================
  Hover Animation
=========================================*/

[...colorPalette,...accentButtons]

.forEach(function(item){

    item.addEventListener("mouseenter",function(){

        this.style.transform =
            "scale(1.08)";

    });

    item.addEventListener("mouseleave",function(){

        this.style.transform =
            "scale(1)";

    });

});

/*=========================================
  Helper Functions
=========================================*/

function resetColors(){

    localStorage.removeItem(COLOR_KEY);

    localStorage.removeItem(ACCENT_KEY);

}

function currentPalette(){

    return localStorage.getItem(COLOR_KEY);

}

function currentAccent(){

    return localStorage.getItem(ACCENT_KEY);

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    restoreThemeColors();

    console.log(

        "Color Palette & Accent Color Ready"

    );

});
/*==================================================
  CodeNova Technologies
  theme.js
  Part 1B.2
  Font Size + Font Family
==================================================*/

"use strict";

/*=========================================
  Font Size
=========================================*/

const fontSizeSelector =
    document.querySelector("#fontSize");

const FONT_SIZE_KEY =
    "codenova-font-size";

const FONT_FAMILY_KEY =
    "codenova-font-family";

/*=========================================
  Apply Font Size
=========================================*/

function applyFontSize(size){

    document.documentElement.style.setProperty(

        "--font-size",

        size + "px"

    );

    localStorage.setItem(

        FONT_SIZE_KEY,

        size

    );

    updateFontSizeLabel(size);

}

/*=========================================
  Font Size Event
=========================================*/

if(fontSizeSelector){

    fontSizeSelector.addEventListener("input",function(){

        applyFontSize(this.value);

    });

}

/*=========================================
  Font Size Label
=========================================*/

const fontSizeValue =
    document.querySelector("#fontSizeValue");

function updateFontSizeLabel(size){

    if(fontSizeValue){

        fontSizeValue.textContent =

            size + "px";

    }

}

/*=========================================
  Font Family
=========================================*/

const fontFamilySelector =
    document.querySelector("#fontFamily");

function applyFontFamily(font){

    document.documentElement.style.setProperty(

        "--font-family",

        font

    );

    document.body.style.fontFamily = font;

    localStorage.setItem(

        FONT_FAMILY_KEY,

        font

    );

}

/*=========================================
  Font Family Event
=========================================*/

if(fontFamilySelector){

    fontFamilySelector.addEventListener("change",function(){

        applyFontFamily(this.value);

    });

}

/*=========================================
  Restore Typography
=========================================*/

function restoreTypography(){

    const savedSize =

        localStorage.getItem(

            FONT_SIZE_KEY

        );

    const savedFont =

        localStorage.getItem(

            FONT_FAMILY_KEY

        );

    if(savedSize){

        applyFontSize(savedSize);

        if(fontSizeSelector){

            fontSizeSelector.value =

                savedSize;

        }

    }

    if(savedFont){

        applyFontFamily(savedFont);

        if(fontFamilySelector){

            fontFamilySelector.value =

                savedFont;

        }

    }

}

/*=========================================
  Font Preview
=========================================*/

const previewText =
    document.querySelector(".font-preview");

function updatePreview(){

    if(!previewText) return;

    previewText.style.fontSize =

        getComputedStyle(

            document.documentElement

        ).getPropertyValue("--font-size");

    previewText.style.fontFamily =

        document.body.style.fontFamily;

}

/*=========================================
  Live Preview
=========================================*/

if(fontSizeSelector){

    fontSizeSelector.addEventListener("input",

        updatePreview

    );

}

if(fontFamilySelector){

    fontFamilySelector.addEventListener("change",

        updatePreview

    );

}

/*=========================================
  Helper Functions
=========================================*/

function resetTypography(){

    localStorage.removeItem(

        FONT_SIZE_KEY

    );

    localStorage.removeItem(

        FONT_FAMILY_KEY

    );

}

function currentFontSize(){

    return localStorage.getItem(

        FONT_SIZE_KEY

    );

}

function currentFontFamily(){

    return localStorage.getItem(

        FONT_FAMILY_KEY

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    restoreTypography();

    updatePreview();

    console.log(

        "Font Size & Font Family Ready"

    );

});

/*==================================================
  Layout Width + Theme Preview
==================================================*/

"use strict";

/*=========================================
  Layout Width
=========================================*/

const layoutSelector =
    document.querySelector("#layoutWidth");

const previewContainer =
    document.querySelector(".theme-preview");

const LAYOUT_KEY =
    "codenova-layout-width";

/*=========================================
  Apply Layout Width
=========================================*/

function applyLayoutWidth(layout){

    document.body.classList.remove(

        "layout-full",

        "layout-boxed",

        "layout-wide"

    );

    document.body.classList.add(

        "layout-" + layout

    );

    localStorage.setItem(

        LAYOUT_KEY,

        layout

    );

    updateLayoutLabel(layout);

}

/*=========================================
  Layout Selector Event
=========================================*/

if(layoutSelector){

    layoutSelector.addEventListener("change",function(){

        applyLayoutWidth(

            this.value

        );

        updateThemePreview();

    });

}

/*=========================================
  Layout Label
=========================================*/

const layoutLabel =
    document.querySelector("#layoutLabel");

function updateLayoutLabel(layout){

    if(layoutLabel){

        layoutLabel.textContent =

            layout.charAt(0).toUpperCase() +

            layout.slice(1);

    }

}

/*=========================================
  Restore Layout
=========================================*/

function restoreLayout(){

    const savedLayout =

        localStorage.getItem(

            LAYOUT_KEY

        );

    if(savedLayout){

        applyLayoutWidth(savedLayout);

        if(layoutSelector){

            layoutSelector.value =

                savedLayout;

        }

    }

    else{

        applyLayoutWidth("full");

    }

}

/*=========================================
  Theme Preview
=========================================*/

function updateThemePreview(){

    if(!previewContainer) return;

    previewContainer.classList.add(

        "preview-animation"

    );

    setTimeout(function(){

        previewContainer.classList.remove(

            "preview-animation"

        );

    },500);

}

/*=========================================
  Live Preview
=========================================*/

const previewOptions =
    document.querySelectorAll(

        ".theme-option"

    );

previewOptions.forEach(function(option){

    option.addEventListener("click",function(){

        previewOptions.forEach(function(item){

            item.classList.remove("active");

        });

        this.classList.add("active");

        updateThemePreview();

    });

});

/*=========================================
  Preview Hover
=========================================*/

if(previewContainer){

    previewContainer.addEventListener("mouseenter",function(){

        this.style.transform =

            "scale(1.02)";

        this.style.transition =

            "all .3s ease";

    });

    previewContainer.addEventListener("mouseleave",function(){

        this.style.transform =

            "scale(1)";

    });

}

/*=========================================
  Reset Layout
=========================================*/

const resetLayoutButton =
    document.querySelector("#resetLayout");

if(resetLayoutButton){

    resetLayoutButton.addEventListener("click",function(){

        localStorage.removeItem(

            LAYOUT_KEY

        );

        applyLayoutWidth("full");

        if(layoutSelector){

            layoutSelector.value = "full";

        }

        updateThemePreview();

    });

}

/*=========================================
  Helper Functions
=========================================*/

function currentLayout(){

    return localStorage.getItem(

        LAYOUT_KEY

    ) || "full";

}

function refreshPreview(){

    updateThemePreview();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    restoreLayout();

    updateThemePreview();

    console.log(

        "Layout Width & Theme Preview Ready"

    );

});
/*==================================================
  CodeNova Technologies
  theme.js
  Part 2A.1
  Local Storage + Theme Persistence
==================================================*/

"use strict";

/*=========================================
  Local Storage Keys
=========================================*/

const ThemeStorage = {

    THEME: "codenova-theme",

    PALETTE: "codenova-color",

    ACCENT: "codenova-accent",

    FONT_SIZE: "codenova-font-size",

    FONT_FAMILY: "codenova-font-family",

    LAYOUT: "codenova-layout-width"

};

/*=========================================
  Local Storage Manager
=========================================*/

function saveThemeSetting(key,value){

    try{

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    catch(error){

        console.error(

            "Storage Error:",

            error

        );

    }

}

function getThemeSetting(key){

    try{

        const value =

            localStorage.getItem(key);

        return value

            ? JSON.parse(value)

            : null;

    }

    catch(error){

        return localStorage.getItem(key);

    }

}

function removeThemeSetting(key){

    localStorage.removeItem(key);

}

function clearThemeSettings(){

    Object.values(ThemeStorage)

    .forEach(function(key){

        removeThemeSetting(key);

    });

}

/*=========================================
  Theme Persistence
=========================================*/

function saveCurrentTheme(){

    saveThemeSetting(

        ThemeStorage.THEME,

        document.body.getAttribute(

            "data-theme"

        ) || "light"

    );

    saveThemeSetting(

        ThemeStorage.PALETTE,

        getComputedStyle(

            document.documentElement

        ).getPropertyValue(

            "--primary-color"

        ).trim()

    );

    saveThemeSetting(

        ThemeStorage.ACCENT,

        getComputedStyle(

            document.documentElement

        ).getPropertyValue(

            "--accent-color"

        ).trim()

    );

}

/*=========================================
  Restore Theme
=========================================*/

function restoreSavedTheme(){

    const theme =

        getThemeSetting(

            ThemeStorage.THEME

        );

    const palette =

        getThemeSetting(

            ThemeStorage.PALETTE

        );

    const accent =

        getThemeSetting(

            ThemeStorage.ACCENT

        );

    if(theme){

        document.body.setAttribute(

            "data-theme",

            theme

        );

    }

    if(palette){

        document.documentElement

        .style.setProperty(

            "--primary-color",

            palette

        );

    }

    if(accent){

        document.documentElement

        .style.setProperty(

            "--accent-color",

            accent

        );

    }

}

/*=========================================
  Auto Save Theme
=========================================*/

window.addEventListener(

    "beforeunload",

    function(){

        saveCurrentTheme();

    }

);

/*=========================================
  Theme Information
=========================================*/

function displayThemeInfo(){

    console.table({

        theme:

            getThemeSetting(

                ThemeStorage.THEME

            ),

        palette:

            getThemeSetting(

                ThemeStorage.PALETTE

            ),

        accent:

            getThemeSetting(

                ThemeStorage.ACCENT

            ),

        fontSize:

            getThemeSetting(

                ThemeStorage.FONT_SIZE

            ),

        fontFamily:

            getThemeSetting(

                ThemeStorage.FONT_FAMILY

            ),

        layout:

            getThemeSetting(

                ThemeStorage.LAYOUT

            )

    });

}

/*=========================================
  Theme Exists
=========================================*/

function hasSavedTheme(){

    return !!localStorage.getItem(

        ThemeStorage.THEME

    );

}

/*=========================================
  Synchronize Theme
=========================================*/

window.addEventListener(

    "storage",

    function(event){

        if(

            Object.values(ThemeStorage)

            .includes(event.key)

        ){

            restoreSavedTheme();

        }

    }

);

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        if(hasSavedTheme()){

            restoreSavedTheme();

        }

        displayThemeInfo();

        console.log(

            "Local Storage & Theme Persistence Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  theme.js
  Part 2A.2
  Reset Theme + Theme Import
==================================================*/

"use strict";

/*=========================================
  Reset Theme
=========================================*/

const resetThemeButton =
    document.querySelector("#resetTheme");

const importThemeInput =
    document.querySelector("#importTheme");

const importStatus =
    document.querySelector("#importStatus");

/*=========================================
  Default Theme
=========================================*/

const DEFAULT_THEME = {

    theme: "light",

    palette: "#2563eb",

    accent: "#06b6d4",

    fontSize: "16",

    fontFamily: "'Poppins', sans-serif",

    layout: "full"

};

/*=========================================
  Reset Complete Theme
=========================================*/

function resetTheme(){

    localStorage.removeItem("codenova-theme");

    localStorage.removeItem("codenova-color");

    localStorage.removeItem("codenova-accent");

    localStorage.removeItem("codenova-font-size");

    localStorage.removeItem("codenova-font-family");

    localStorage.removeItem("codenova-layout-width");

    applyDefaultTheme();

}

/*=========================================
  Apply Default Theme
=========================================*/

function applyDefaultTheme(){

    document.body.setAttribute(

        "data-theme",

        DEFAULT_THEME.theme

    );

    document.documentElement.style.setProperty(

        "--primary-color",

        DEFAULT_THEME.palette

    );

    document.documentElement.style.setProperty(

        "--accent-color",

        DEFAULT_THEME.accent

    );

    document.documentElement.style.setProperty(

        "--font-size",

        DEFAULT_THEME.fontSize + "px"

    );

    document.body.style.fontFamily =

        DEFAULT_THEME.fontFamily;

    document.body.classList.remove(

        "layout-boxed",

        "layout-wide"

    );

    document.body.classList.add(

        "layout-full"

    );

}

/*=========================================
  Reset Button
=========================================*/

if(resetThemeButton){

    resetThemeButton.addEventListener(

        "click",

        function(){

            if(confirm(

                "Reset all theme settings?"

            )){

                resetTheme();

                console.log(

                    "Theme Reset Successfully"

                );

            }

        }

    );

}

/*=========================================
  Theme Import
=========================================*/

function importTheme(file){

    const reader = new FileReader();

    reader.onload = function(event){

        try{

            const theme = JSON.parse(

                event.target.result

            );

            if(theme.theme){

                localStorage.setItem(

                    "codenova-theme",

                    theme.theme

                );

            }

            if(theme.palette){

                localStorage.setItem(

                    "codenova-color",

                    theme.palette

                );

            }

            if(theme.accent){

                localStorage.setItem(

                    "codenova-accent",

                    theme.accent

                );

            }

            if(theme.fontSize){

                localStorage.setItem(

                    "codenova-font-size",

                    theme.fontSize

                );

            }

            if(theme.fontFamily){

                localStorage.setItem(

                    "codenova-font-family",

                    theme.fontFamily

                );

            }

            if(theme.layout){

                localStorage.setItem(

                    "codenova-layout-width",

                    theme.layout

                );

            }

            location.reload();

        }

        catch(error){

            console.error(error);

            if(importStatus){

                importStatus.textContent =

                    "Invalid Theme File";

            }

        }

    };

    reader.readAsText(file);

}

/*=========================================
  Import Event
=========================================*/

if(importThemeInput){

    importThemeInput.addEventListener(

        "change",

        function(){

            if(this.files.length){

                importTheme(

                    this.files[0]

                );

            }

        }

    );

}

/*=========================================
  Import Success
=========================================*/

function showImportSuccess(){

    if(importStatus){

        importStatus.textContent =

            "Theme Imported Successfully";

        importStatus.classList.add(

            "success"

        );

    }

}

/*=========================================
  Helper Functions
=========================================*/

function clearThemeStorage(){

    Object.keys(localStorage)

    .forEach(function(key){

        if(key.startsWith("codenova")){

            localStorage.removeItem(key);

        }

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Reset Theme & Theme Import Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 2A.3
  Theme Export + User Preferences
==================================================*/

"use strict";

/*=========================================
  Theme Export
=========================================*/

const exportThemeButton =
    document.querySelector("#exportTheme");

const preferenceForm =
    document.querySelector("#themePreferences");

/*=========================================
  Export Theme
=========================================*/

function exportTheme(){

    const themeData = {

        theme:
            localStorage.getItem("codenova-theme"),

        palette:
            localStorage.getItem("codenova-color"),

        accent:
            localStorage.getItem("codenova-accent"),

        fontSize:
            localStorage.getItem("codenova-font-size"),

        fontFamily:
            localStorage.getItem("codenova-font-family"),

        layout:
            localStorage.getItem("codenova-layout-width"),

        exportedAt:
            new Date().toISOString()

    };

    const blob =
        new Blob(

            [

                JSON.stringify(

                    themeData,

                    null,

                    4

                )

            ],

            {

                type:"application/json"

            }

        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =

        "CodeNova-Theme.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

/*=========================================
  Export Event
=========================================*/

if(exportThemeButton){

    exportThemeButton.addEventListener(

        "click",

        exportTheme

    );

}

/*=========================================
  User Preferences
=========================================*/

const preferenceInputs =
    document.querySelectorAll(

        "[data-preference]"

    );

const PREFERENCE_KEY =
    "codenova-user-preferences";

/*=========================================
  Save Preferences
=========================================*/

function savePreferences(){

    const preferences = {};

    preferenceInputs.forEach(function(input){

        preferences[

            input.dataset.preference

        ] =

        input.type === "checkbox"

        ? input.checked

        : input.value;

    });

    localStorage.setItem(

        PREFERENCE_KEY,

        JSON.stringify(preferences)

    );

}

/*=========================================
  Load Preferences
=========================================*/

function loadPreferences(){

    const preferences =

        JSON.parse(

            localStorage.getItem(

                PREFERENCE_KEY

            )

        ) || {};

    preferenceInputs.forEach(function(input){

        const value =

            preferences[

                input.dataset.preference

            ];

        if(value === undefined) return;

        if(input.type === "checkbox"){

            input.checked = value;

        }

        else{

            input.value = value;

        }

    });

}

/*=========================================
  Preference Events
=========================================*/

preferenceInputs.forEach(function(input){

    input.addEventListener(

        "change",

        savePreferences

    );

});

/*=========================================
  Reset Preferences
=========================================*/

function resetPreferences(){

    localStorage.removeItem(

        PREFERENCE_KEY

    );

    loadPreferences();

}

/*=========================================
  Preference Summary
=========================================*/

function showPreferenceSummary(){

    console.table(

        JSON.parse(

            localStorage.getItem(

                PREFERENCE_KEY

            )

        )

    );

}

/*=========================================
  Auto Save Form
=========================================*/

if(preferenceForm){

    preferenceForm.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            savePreferences();

            console.log(

                "Preferences Saved"

            );

        }

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        loadPreferences();

        showPreferenceSummary();

        console.log(

            "Theme Export & User Preferences Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  theme.js
  Part 2B.1
  Accessibility Theme + High Contrast
==================================================*/

"use strict";

/*=========================================
  Accessibility Theme Elements
=========================================*/

const accessibilityToggle =
    document.querySelector("#accessibilityToggle");

const contrastToggle =
    document.querySelector("#contrastToggle");

const accessibilityStatus =
    document.querySelector("#accessibilityStatus");

const ACCESSIBILITY_KEY =
    "codenova-accessibility";

const HIGH_CONTRAST_KEY =
    "codenova-high-contrast";

/*=========================================
  Enable Accessibility Theme
=========================================*/

function enableAccessibilityTheme(){

    document.body.classList.add(

        "accessibility-theme"

    );

    localStorage.setItem(

        ACCESSIBILITY_KEY,

        "enabled"

    );

    updateAccessibilityStatus(

        "Accessibility Theme Enabled"

    );

}

/*=========================================
  Disable Accessibility Theme
=========================================*/

function disableAccessibilityTheme(){

    document.body.classList.remove(

        "accessibility-theme"

    );

    localStorage.setItem(

        ACCESSIBILITY_KEY,

        "disabled"

    );

    updateAccessibilityStatus(

        "Accessibility Theme Disabled"

    );

}

/*=========================================
  Toggle Accessibility Theme
=========================================*/

function toggleAccessibilityTheme(){

    if(

        document.body.classList.contains(

            "accessibility-theme"

        )

    ){

        disableAccessibilityTheme();

    }

    else{

        enableAccessibilityTheme();

    }

}

/*=========================================
  Accessibility Status
=========================================*/

function updateAccessibilityStatus(message){

    if(accessibilityStatus){

        accessibilityStatus.textContent =

            message;

    }

}

/*=========================================
  Accessibility Button
=========================================*/

if(accessibilityToggle){

    accessibilityToggle.addEventListener(

        "click",

        toggleAccessibilityTheme

    );

}

/*=========================================
  High Contrast
=========================================*/

function enableHighContrast(){

    document.body.classList.add(

        "high-contrast"

    );

    localStorage.setItem(

        HIGH_CONTRAST_KEY,

        "enabled"

    );

}

function disableHighContrast(){

    document.body.classList.remove(

        "high-contrast"

    );

    localStorage.setItem(

        HIGH_CONTRAST_KEY,

        "disabled"

    );

}

/*=========================================
  Toggle High Contrast
=========================================*/

function toggleHighContrast(){

    if(

        document.body.classList.contains(

            "high-contrast"

        )

    ){

        disableHighContrast();

    }

    else{

        enableHighContrast();

    }

}

/*=========================================
  High Contrast Button
=========================================*/

if(contrastToggle){

    contrastToggle.addEventListener(

        "click",

        toggleHighContrast

    );

}

/*=========================================
  Restore Accessibility Settings
=========================================*/

function restoreAccessibilitySettings(){

    const accessibility =

        localStorage.getItem(

            ACCESSIBILITY_KEY

        );

    const contrast =

        localStorage.getItem(

            HIGH_CONTRAST_KEY

        );

    if(accessibility === "enabled"){

        enableAccessibilityTheme();

    }

    else{

        disableAccessibilityTheme();

    }

    if(contrast === "enabled"){

        enableHighContrast();

    }

    else{

        disableHighContrast();

    }

}

/*=========================================
  Keyboard Shortcut
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        if(

            event.altKey &&

            event.key === "A"

        ){

            event.preventDefault();

            toggleAccessibilityTheme();

        }

        if(

            event.altKey &&

            event.key === "H"

        ){

            event.preventDefault();

            toggleHighContrast();

        }

    }

);

/*=========================================
  Helper Functions
=========================================*/

function isAccessibilityEnabled(){

    return document.body.classList.contains(

        "accessibility-theme"

    );

}

function isHighContrastEnabled(){

    return document.body.classList.contains(

        "high-contrast"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        restoreAccessibilitySettings();

        console.log(

            "Accessibility Theme Ready"

        );

        console.log(

            "High Contrast Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 2B.2
  Reduced Motion + Keyboard Navigation
==================================================*/

"use strict";

/*=========================================
  Reduced Motion
=========================================*/

const reducedMotionToggle =
    document.querySelector("#reducedMotion");

const REDUCED_MOTION_KEY =
    "codenova-reduced-motion";

const motionQuery =
    window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );

/*=========================================
  Enable Reduced Motion
=========================================*/

function enableReducedMotion(){

    document.body.classList.add(

        "reduce-motion"

    );

    document

        .querySelectorAll("*")

        .forEach(function(element){

            element.style.animation = "none";

            element.style.transition = "none";

        });

    localStorage.setItem(

        REDUCED_MOTION_KEY,

        "enabled"

    );

}

/*=========================================
  Disable Reduced Motion
=========================================*/

function disableReducedMotion(){

    document.body.classList.remove(

        "reduce-motion"

    );

    document

        .querySelectorAll("*")

        .forEach(function(element){

            element.style.animation = "";

            element.style.transition = "";

        });

    localStorage.setItem(

        REDUCED_MOTION_KEY,

        "disabled"

    );

}

/*=========================================
  Toggle Reduced Motion
=========================================*/

function toggleReducedMotion(){

    if(

        document.body.classList.contains(

            "reduce-motion"

        )

    ){

        disableReducedMotion();

    }

    else{

        enableReducedMotion();

    }

}

if(reducedMotionToggle){

    reducedMotionToggle.addEventListener(

        "click",

        toggleReducedMotion

    );

}

/*=========================================
  System Motion Preference
=========================================*/

function detectMotionPreference(){

    if(motionQuery.matches){

        enableReducedMotion();

    }

}

motionQuery.addEventListener(

    "change",

    function(event){

        if(event.matches){

            enableReducedMotion();

        }

        else{

            disableReducedMotion();

        }

    }

);

/*=========================================
  Keyboard Navigation
=========================================*/

const focusableElements =
    document.querySelectorAll(

        "button,a,input,select,textarea"

    );

let currentFocus = 0;

/*=========================================
  Keyboard Events
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        /* Alt + T */

        if(

            event.altKey &&

            event.key.toLowerCase() === "t"

        ){

            event.preventDefault();

            document

                .querySelector("#themeToggle")

                ?.click();

        }

        /* Alt + M */

        if(

            event.altKey &&

            event.key.toLowerCase() === "m"

        ){

            event.preventDefault();

            toggleReducedMotion();

        }

        /* Arrow Navigation */

        if(event.key === "ArrowDown"){

            currentFocus++;

            if(

                currentFocus >=

                focusableElements.length

            ){

                currentFocus = 0;

            }

            focusableElements[

                currentFocus

            ].focus();

        }

        if(event.key === "ArrowUp"){

            currentFocus--;

            if(currentFocus < 0){

                currentFocus =

                    focusableElements.length - 1;

            }

            focusableElements[

                currentFocus

            ].focus();

        }

    }

);

/*=========================================
  Restore Motion Preference
=========================================*/

window.addEventListener(

    "load",

    function(){

        const saved =

            localStorage.getItem(

                REDUCED_MOTION_KEY

            );

        if(saved === "enabled"){

            enableReducedMotion();

        }

        else{

            detectMotionPreference();

        }

    }

);

/*=========================================
  Focus Highlight
=========================================*/

focusableElements.forEach(function(item){

    item.addEventListener("focus",function(){

        this.classList.add(

            "keyboard-focus"

        );

    });

    item.addEventListener("blur",function(){

        this.classList.remove(

            "keyboard-focus"

        );

    });

});

/*=========================================
  Helper Functions
=========================================*/

function motionEnabled(){

    return !document.body.classList.contains(

        "reduce-motion"

    );

}

function resetKeyboardFocus(){

    currentFocus = 0;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "DOMContentLoaded",

    function(){

        console.log(

            "Reduced Motion Ready"

        );

        console.log(

            "Keyboard Navigation Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 2B.3
  Theme Notifications + Theme Shortcuts
==================================================*/

"use strict";

/*=========================================
  Theme Notifications
=========================================*/

const notificationContainer =
    document.querySelector("#themeNotifications");

const notificationDuration = 3000;

/*=========================================
  Show Notification
=========================================*/

function showThemeNotification(message,type="success"){

    if(!notificationContainer) return;

    const notification =
        document.createElement("div");

    notification.className =
        `theme-notification ${type}`;

    notification.innerHTML = `
        <span>${message}</span>
    `;

    notificationContainer.appendChild(

        notification

    );

    setTimeout(function(){

        notification.classList.add("show");

    },100);

    setTimeout(function(){

        notification.classList.remove("show");

        setTimeout(function(){

            notification.remove();

        },300);

    },notificationDuration);

}

/*=========================================
  Theme Change Events
=========================================*/

document.addEventListener(

    "themeChanged",

    function(event){

        const theme =

            event.detail.theme || "Light";

        showThemeNotification(

            theme +

            " Theme Activated"

        );

    }

);

/*=========================================
  Error Notification
=========================================*/

function showThemeError(message){

    showThemeNotification(

        message,

        "error"

    );

}

/*=========================================
  Success Notification
=========================================*/

function showThemeSuccess(message){

    showThemeNotification(

        message,

        "success"

    );

}

/*=========================================
  Theme Shortcuts
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        /* Alt + D */

        if(

            event.altKey &&

            event.key.toLowerCase() === "d"

        ){

            event.preventDefault();

            enableDarkMode();

            showThemeSuccess(

                "Dark Mode Enabled"

            );

        }

        /* Alt + L */

        if(

            event.altKey &&

            event.key.toLowerCase() === "l"

        ){

            event.preventDefault();

            enableLightMode();

            showThemeSuccess(

                "Light Mode Enabled"

            );

        }

        /* Alt + C */

        if(

            event.altKey &&

            event.key.toLowerCase() === "c"

        ){

            event.preventDefault();

            toggleHighContrast();

            showThemeSuccess(

                "High Contrast Toggled"

            );

        }

        /* Alt + R */

        if(

            event.altKey &&

            event.key.toLowerCase() === "r"

        ){

            event.preventDefault();

            resetTheme();

            showThemeSuccess(

                "Theme Reset"

            );

        }

    }

);

/*=========================================
  Theme Shortcut Help
=========================================*/

const shortcutButton =
    document.querySelector("#themeShortcutHelp");

if(shortcutButton){

    shortcutButton.addEventListener(

        "click",

        function(){

            alert(

`Theme Keyboard Shortcuts

Alt + D → Dark Mode
Alt + L → Light Mode
Alt + C → High Contrast
Alt + R → Reset Theme`

            );

        }

    );

}

/*=========================================
  Notification Sound
=========================================*/

function playNotificationSound(){

    const audio =
        document.querySelector("#themeSound");

    if(audio){

        audio.play().catch(function(){

            console.log(

                "Audio playback blocked."

            );

        });

    }

}

/*=========================================
  Helper Functions
=========================================*/

function notifyThemeSaved(){

    playNotificationSound();

    showThemeSuccess(

        "Theme Settings Saved"

    );

}

function notifyThemeImported(){

    playNotificationSound();

    showThemeSuccess(

        "Theme Imported Successfully"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Theme Notifications Ready"

        );

        console.log(

            "Theme Shortcuts Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3A.1
  Live Preview + Theme Switch Animation
==================================================*/

"use strict";

/*=========================================
  Live Preview
=========================================*/

const previewWindow =
    document.querySelector("#themePreview");

const previewFrame =
    document.querySelector(".preview-frame");

const previewCards =
    document.querySelectorAll(".preview-card");

const previewControls =
    document.querySelectorAll("[data-preview]");

/*=========================================
  Update Live Preview
=========================================*/

function updateLivePreview(){

    if(!previewWindow) return;

    previewWindow.classList.add(

        "preview-refresh"

    );

    const theme =
        document.body.getAttribute(

            "data-theme"

        );

    previewWindow.setAttribute(

        "data-theme",

        theme

    );

    setTimeout(function(){

        previewWindow.classList.remove(

            "preview-refresh"

        );

    },500);

}

/*=========================================
  Preview Controls
=========================================*/

previewControls.forEach(function(control){

    control.addEventListener("click",function(){

        previewControls.forEach(function(btn){

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const mode =
            this.dataset.preview;

        if(previewFrame){

            previewFrame.dataset.mode = mode;

        }

        updateLivePreview();

    });

});

/*=========================================
  Preview Card Hover
=========================================*/

previewCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.style.transform =

            "translateY(-8px) scale(1.03)";

        this.classList.add("preview-hover");

    });

    card.addEventListener("mouseleave",function(){

        this.style.transform =

            "translateY(0) scale(1)";

        this.classList.remove("preview-hover");

    });

});

/*=========================================
  Theme Switch Animation
=========================================*/

function animateThemeSwitch(){

    document.body.classList.add(

        "theme-switching"

    );

    document.body.animate([

        {

            opacity:0.6,

            transform:"scale(.98)"

        },

        {

            opacity:1,

            transform:"scale(1)"

        }

    ],{

        duration:500,

        easing:"ease"

    });

    setTimeout(function(){

        document.body.classList.remove(

            "theme-switching"

        );

    },500);

}

/*=========================================
  Theme Changed Event
=========================================*/

document.addEventListener(

    "themeChanged",

    function(event){

        animateThemeSwitch();

        updateLivePreview();

        console.log(

            "Theme Changed:",

            event.detail.theme

        );

    }

);

/*=========================================
  Ripple Animation
=========================================*/

const themeButtons =
    document.querySelectorAll(".theme-btn");

themeButtons.forEach(function(button){

    button.addEventListener("click",function(){

        this.classList.add("theme-pulse");

        setTimeout(()=>{

            this.classList.remove(

                "theme-pulse"

            );

        },600);

    });

});

/*=========================================
  Helper Functions
=========================================*/

function refreshPreview(){

    updateLivePreview();

}

function restartAnimation(){

    animateThemeSwitch();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    updateLivePreview();

    console.log(

        "Live Preview Ready"

    );

    console.log(

        "Theme Switch Animation Ready"

    );

});

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3A.2
  CSS Variables + Performance
==================================================*/

"use strict";

/*=========================================
  CSS Variables
=========================================*/

const root =
    document.documentElement;

const cssVariables = {

    primary:
        "--primary-color",

    secondary:
        "--secondary-color",

    accent:
        "--accent-color",

    background:
        "--background-color",

    text:
        "--text-color",

    fontSize:
        "--font-size"

};

/*=========================================
  Set CSS Variable
=========================================*/

function setCSSVariable(name,value){

    root.style.setProperty(

        name,

        value

    );

}

/*=========================================
  Get CSS Variable
=========================================*/

function getCSSVariable(name){

    return getComputedStyle(root)

        .getPropertyValue(name)

        .trim();

}

/*=========================================
  Apply Theme Variables
=========================================*/

function applyThemeVariables(theme){

    if(theme === "dark"){

        setCSSVariable(

            cssVariables.background,

            "#111827"

        );

        setCSSVariable(

            cssVariables.text,

            "#ffffff"

        );

    }

    else{

        setCSSVariable(

            cssVariables.background,

            "#ffffff"

        );

        setCSSVariable(

            cssVariables.text,

            "#111827"

        );

    }

}

/*=========================================
  Display Variables
=========================================*/

function showVariables(){

    console.table({

        primary:

            getCSSVariable(

                cssVariables.primary

            ),

        accent:

            getCSSVariable(

                cssVariables.accent

            ),

        background:

            getCSSVariable(

                cssVariables.background

            ),

        text:

            getCSSVariable(

                cssVariables.text

            ),

        fontSize:

            getCSSVariable(

                cssVariables.fontSize

            )

    });

}

/*=========================================
  Performance
=========================================*/

const ThemePerformance = {

    start:

        performance.now(),

    logLoadingTime(){

        const end =

            performance.now();

        console.log(

            "Theme Load:",

            (end - this.start)

            .toFixed(2),

            "ms"

        );

    }

};

/*=========================================
  Performance Observer
=========================================*/

if("PerformanceObserver" in window){

    const observer =

        new PerformanceObserver(

            function(list){

                list.getEntries()

                .forEach(function(entry){

                    console.log(

                        entry.name,

                        entry.duration

                        .toFixed(2),

                        "ms"

                    );

                });

            }

        );

    observer.observe({

        entryTypes:["measure"]

    });

}

/*=========================================
  Measure Theme Update
=========================================*/

function measureThemeUpdate(callback){

    performance.mark(

        "theme-start"

    );

    callback();

    performance.mark(

        "theme-end"

    );

    performance.measure(

        "Theme Update",

        "theme-start",

        "theme-end"

    );

}

/*=========================================
  Optimize DOM Updates
=========================================*/

function updateDOM(callback){

    requestAnimationFrame(function(){

        callback();

    });

}

/*=========================================
  Idle Task
=========================================*/

function scheduleTask(task){

    if("requestIdleCallback" in window){

        requestIdleCallback(task);

    }

    else{

        setTimeout(task,100);

    }

}

/*=========================================
  Helper Functions
=========================================*/

function refreshTheme(){

    const theme =

        document.body.getAttribute(

            "data-theme"

        ) || "light";

    measureThemeUpdate(function(){

        applyThemeVariables(theme);

    });

}

function logPerformance(){

    ThemePerformance.logLoadingTime();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        refreshTheme();

        showVariables();

        logPerformance();

        console.log(

            "CSS Variables Ready"

        );

        console.log(

            "Performance Optimization Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3A.3
  Browser Support + Error Handling
==================================================*/

"use strict";

/*=========================================
  Browser Support
=========================================*/

const BrowserSupport = {

    localStorage:
        typeof(Storage) !== "undefined",

    fetch:
        "fetch" in window,

    intersectionObserver:
        "IntersectionObserver" in window,

    resizeObserver:
        "ResizeObserver" in window,

    requestAnimationFrame:
        "requestAnimationFrame" in window,

    matchMedia:
        "matchMedia" in window,

    cssVariables:
        window.CSS &&
        CSS.supports(
            "--primary-color",
            "#2563eb"
        )

};

/*=========================================
  Browser Check
=========================================*/

function checkBrowserSupport(){

    Object.entries(BrowserSupport)

    .forEach(function(feature){

        const [name,supported] = feature;

        if(supported){

            console.log(

                "✓",

                name,

                "Supported"

            );

        }

        else{

            console.warn(

                "✗",

                name,

                "Not Supported"

            );

        }

    });

}

/*=========================================
  Apply Fallbacks
=========================================*/

function applyFallbacks(){

    if(!BrowserSupport.cssVariables){

        document.body.classList.add(

            "no-css-variables"

        );

    }

    if(!BrowserSupport.fetch){

        console.warn(

            "Fetch API unavailable."

        );

    }

}

/*=========================================
  Error Handling
=========================================*/

function logError(error){

    console.error(

        "[Theme Error]",

        error

    );

}

function showError(message){

    console.error(message);

}

/*=========================================
  Global JavaScript Errors
=========================================*/

window.addEventListener(

    "error",

    function(event){

        logError({

            message:

                event.message,

            file:

                event.filename,

            line:

                event.lineno

        });

    }

);

/*=========================================
  Promise Errors
=========================================*/

window.addEventListener(

    "unhandledrejection",

    function(event){

        logError({

            message:

                event.reason

        });

    }

);

/*=========================================
  Safe Execution
=========================================*/

function safeExecute(callback){

    try{

        callback();

    }

    catch(error){

        logError(error);

    }

}

/*=========================================
  Browser Information
=========================================*/

function browserInfo(){

    console.table({

        userAgent:

            navigator.userAgent,

        language:

            navigator.language,

        online:

            navigator.onLine,

        cookies:

            navigator.cookieEnabled,

        platform:

            navigator.platform

    });

}

/*=========================================
  Online / Offline
=========================================*/

window.addEventListener(

    "online",

    function(){

        console.log(

            "Internet Connection Restored"

        );

    }

);

window.addEventListener(

    "offline",

    function(){

        console.warn(

            "Internet Connection Lost"

        );

    }

);

/*=========================================
  Helper Functions
=========================================*/

function initializeBrowser(){

    safeExecute(checkBrowserSupport);

    safeExecute(applyFallbacks);

}

function initializeErrors(){

    console.log(

        "Error Handling Enabled"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        initializeBrowser();

        initializeErrors();

        browserInfo();

        console.log(

            "Browser Support Ready"

        );

        console.log(

            "Error Handling Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3B.1
  Utility Functions + Helper Functions
==================================================*/

"use strict";

/*=========================================
  Utility Functions
=========================================*/

const ThemeUtils = {

    /* Select Element */
    qs(selector){

        return document.querySelector(selector);

    },

    /* Select Multiple */
    qsa(selector){

        return document.querySelectorAll(selector);

    },

    /* Add Class */
    addClass(element,className){

        if(element){

            element.classList.add(className);

        }

    },

    /* Remove Class */
    removeClass(element,className){

        if(element){

            element.classList.remove(className);

        }

    },

    /* Toggle Class */
    toggleClass(element,className){

        if(element){

            element.classList.toggle(className);

        }

    },

    /* Check Class */
    hasClass(element,className){

        return element

            ? element.classList.contains(className)

            : false;

    },

    /* CSS Variable */
    setVariable(name,value){

        document.documentElement

        .style.setProperty(name,value);

    },

    /* Get CSS Variable */
    getVariable(name){

        return getComputedStyle(

            document.documentElement

        ).getPropertyValue(name).trim();

    },

    /* Save Storage */
    save(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    /* Read Storage */
    read(key){

        const value =

            localStorage.getItem(key);

        if(!value) return null;

        try{

            return JSON.parse(value);

        }

        catch{

            return value;

        }

    }

};

/*=========================================
  Helper Functions
=========================================*/

function debounce(callback,delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(function(){

            callback.apply(this,args);

        },delay);

    };

}

function throttle(callback,delay){

    let waiting = false;

    return function(...args){

        if(waiting) return;

        callback.apply(this,args);

        waiting = true;

        setTimeout(function(){

            waiting = false;

        },delay);

    };

}

function smoothScroll(target){

    if(target){

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

function capitalize(text){

    if(!text) return "";

    return text.charAt(0)

        .toUpperCase() +

        text.slice(1);

}

function randomID(){

    return Math.random()

        .toString(36)

        .substring(2,10);

}

function delay(milliseconds){

    return new Promise(function(resolve){

        setTimeout(

            resolve,

            milliseconds

        );

    });

}

function isDarkTheme(){

    return document.body

        .getAttribute("data-theme")

        === "dark";

}

function currentTheme(){

    return document.body

        .getAttribute("data-theme")

        || "light";

}

/*=========================================
  Console Helpers
=========================================*/

function success(message){

    console.log(

        "✔",

        message

    );

}

function warning(message){

    console.warn(

        "⚠",

        message

    );

}

function failure(message){

    console.error(

        "✖",

        message

    );

}

/*=========================================
  Utility Ready
=========================================*/

window.addEventListener("load",function(){

    success(

        "Theme Utility Functions Ready"

    );

    success(

        "Theme Helper Functions Ready"

    );

});

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3B.2
  Initialization + Event Listeners
==================================================*/

"use strict";

/*=========================================
  Theme Application
=========================================*/

const ThemeApp = {

    initialized: false,

    version: "1.0.0",

    company: "CodeNova Technologies"

};

/*=========================================
  Initialization
=========================================*/

ThemeApp.init = function(){

    if(this.initialized){

        return;

    }

    this.initialized = true;

    this.cacheElements();

    this.restoreSettings();

    this.initializeModules();

    this.bindEvents();

    console.log(

        "Theme Application Initialized"

    );

};

/*=========================================
  Cache Elements
=========================================*/

ThemeApp.cacheElements = function(){

    this.body = document.body;

    this.root = document.documentElement;

    this.themeButton =

        document.querySelector(

            "#themeToggle"

        );

};

/*=========================================
  Restore Settings
=========================================*/

ThemeApp.restoreSettings = function(){

    if(typeof restoreTheme === "function"){

        restoreTheme();

    }

    if(typeof restoreThemeColors === "function"){

        restoreThemeColors();

    }

    if(typeof restoreTypography === "function"){

        restoreTypography();

    }

};

/*=========================================
  Initialize Modules
=========================================*/

ThemeApp.initializeModules = function(){

    console.log(

        "Theme Modules Loaded"

    );

};

/*=========================================
  Event Listeners
=========================================*/

ThemeApp.bindEvents = function(){

    /* Resize */

    window.addEventListener(

        "resize",

        debounce(function(){

            console.log(

                "Window:",

                window.innerWidth,

                "x",

                window.innerHeight

            );

        },200)

    );

    /* Scroll */

    window.addEventListener(

        "scroll",

        throttle(function(){

            document.body.dataset.scroll =

                window.scrollY;

        },100)

    );

    /* Online */

    window.addEventListener(

        "online",

        function(){

            success(

                "Internet Connected"

            );

        }

    );

    /* Offline */

    window.addEventListener(

        "offline",

        function(){

            warning(

                "Internet Disconnected"

            );

        }

    );

    /* Visibility */

    document.addEventListener(

        "visibilitychange",

        function(){

            console.log(

                document.hidden

                ? "Tab Hidden"

                : "Tab Active"

            );

        }

    );

};

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        ThemeApp.init();

    }

);

/*=========================================
  Window Load
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Theme Resources Loaded"

        );

    }

);

/*=========================================
  Before Unload
=========================================*/

window.addEventListener(

    "beforeunload",

    function(){

        if(typeof saveCurrentTheme === "function"){

            saveCurrentTheme();

        }

        console.log(

            "Saving Theme Settings..."

        );

    }

);

/*=========================================
  Custom Event
=========================================*/

document.dispatchEvent(

    new CustomEvent(

        "themeReady",

        {

            detail:{

                version:

                    ThemeApp.version,

                company:

                    ThemeApp.company

            }

        }

    )

);

/*=========================================
  Helper Functions
=========================================*/

function initializeTheme(){

    ThemeApp.init();

}

function reloadTheme(){

    location.reload();

}

/*==================================================
  CodeNova Technologies
  theme.js
  Part 3B.3
  Final Configuration + End of theme.js
==================================================*/

"use strict";

/*=========================================
  Final Configuration
=========================================*/

const ThemeConfiguration = {

    application: "theme.js",

    company: "CodeNova Technologies",

    version: "1.0.0",

    author: "CodeNova Development Team",

    environment: "Production",

    buildDate: "2026",

    framework: "Vanilla JavaScript",

    storage: "LocalStorage",

    defaultTheme: "light",

    supportedThemes: [

        "light",

        "dark"

    ],

    supportedLayouts: [

        "full",

        "boxed",

        "wide"

    ]

};

/*=========================================
  Freeze Configuration
=========================================*/

Object.freeze(

    ThemeConfiguration

);

/*=========================================
  Theme Information
=========================================*/

function showThemeInformation(){

    console.group(

        "Theme Configuration"

    );

    console.table(

        ThemeConfiguration

    );

    console.groupEnd();

}

/*=========================================
  Configuration Validation
=========================================*/

function validateConfiguration(){

    const required = [

        "application",

        "company",

        "version",

        "defaultTheme"

    ];

    let valid = true;

    required.forEach(function(key){

        if(!(key in ThemeConfiguration)){

            console.error(

                "Missing:",

                key

            );

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Application Status
=========================================*/

function applicationStatus(){

    return {

        ready: true,

        initialized:

            ThemeApp.initialized,

        theme:

            currentTheme(),

        browser:

            navigator.userAgent

    };

}

/*=========================================
  Export Configuration
=========================================*/

window.ThemeConfiguration =

    ThemeConfiguration;

window.ThemeApp = ThemeApp;

/*=========================================
  Final Initialization
=========================================*/

window.addEventListener(

    "load",

    function(){

        const valid =

            validateConfiguration();

        if(valid){

            success(

                "Theme Configuration Valid"

            );

        }

        else{

            failure(

                "Configuration Error"

            );

        }

        showThemeInformation();

        console.table(

            applicationStatus()

        );

    }

);

/*=========================================
  Final Cleanup
=========================================*/

window.addEventListener(

    "beforeunload",

    function(){

        if(typeof saveCurrentTheme === "function"){

            saveCurrentTheme();

        }

        console.log(

            "Theme settings saved."

        );

    }

);

/*=========================================
  Global Helpers
=========================================*/

window.getCurrentTheme =

    currentTheme;

window.isDarkTheme =

    isDarkTheme;

window.refreshTheme =

    refreshTheme;

window.resetThemeSettings =

    resetTheme;

/*=========================================
  Development Banner
=========================================*/

console.log(

"=========================================="

);

console.log(

" CodeNova Technologies "

);

console.log(

" Theme Management System "

);

console.log(

" Version :",ThemeConfiguration.version

);

console.log(

" Environment :",

ThemeConfiguration.environment

);

console.log(

" Loaded Successfully "

);

console.log(

"=========================================="

);

