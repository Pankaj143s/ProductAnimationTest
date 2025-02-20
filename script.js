// If starAnimationData isn't defined, define defaults
if (typeof starAnimationData === 'undefined') {
    var starAnimationData = {
        currentLang: 'en',
        baseUrl: '',
        buyButtonId: ''
    };
}

// Reset scroll on load
function resetScrollPosition() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
}

// Language-based messages (unchanged)
const messagesByLanguage = {
    en: [
        "Ticks learn smells. A smell that works today will not work a few days later. This makes a lot of repellents ineffective!",
        "Every worm, every fish, every bird and every tick want to live. If the tick is close to starving, its willingness to take risks increases enormously and a tick repellent becomes less effective.",
        "If you test a good tick repellent, you have to recognize the 4 basic principles: a) smell, b) taste, c) contact and d) distance.",
        "A tick repellent that covers all 4 basic principles will remain effective!",
        "Ticks only breathe eight times a day.",
        "It is very easy to keep your own garden free of ticks.",
        "Where animals mark their territory, ticks will migrate!",
        "The lurking tick, which is common in Europe, recognizes its host from up to 10 m away.",
        "The hunting tick Hyalomma recognizes its host from up to 100 m away and actively pursues it, e.g., horses.",
        "You can keep ticks at a distance of 1 m without touching them.",
        "Ticks learn their surroundings and assess them very precisely.",
        "Ticks create a map of their surroundings and mark their paths.",
        "Lurking ticks don't see, they measure!",
        "Ticks communicate with each other.",
        "Some ticks search for community and stay together, others are loners!",
        "A good tick repellent must cover all 4 areas: 1) smell, 2) taste, 3) contact, and 4) distance and be made from natural raw materials.",
        "A good tick repellent is tailored to the region.",
        "In Germany, around 100,000 people fall ill from a tick bite every year (Robert Koch Institute).",
        "In America, around 300,000 people fall ill from a tick bite every year.",
        "Those who can keep ticks at a distance can also reliably repel mosquitoes, biting midges, and blackflies.",
        "Every year, about 850,000 people die worldwide from a mosquito bite.",
        "Applying the principles of tick repellency could protect thousands of people from the deadly bite of mosquitoes.",
        "Worldwide, ticks are an enormous problem.",
        "If humans consume the natural hosts (cows, goats, deer, rabbits, etc.), the problem with ticks increases massively, and the region loses its natural shield."
    ]
    // Add other languages if needed...
};

// Grab references
let messages = [];
let messagesShown = 0;
let currentMessageIndex = 0;
let pathIndex = 0;
const paths = ['move-star-1', 'move-star-2', 'move-star-3'];
let starsCreated = 0;
let starsClicked = 0;
let starIntervalTimeout = null;

// We'll define these after the DOM is ready
let starContainer;
let messageContainer;

/**
 * Adjust the top nav bar z-index if needed
 */
function adjustNavbar() {
    const topBar = document.querySelector('#Header_wrapper');
    if (topBar) {
        topBar.style.zIndex = '0';
    }
}

/**
 * Load the correct messages from the object
 */
function loadMessages() {
    adjustNavbar();
    const currentLang = starAnimationData.currentLang || 'en';
    return messagesByLanguage[currentLang] || messagesByLanguage['en'];
}

/**
 * CREATE STAR
 */
function createStar(autoMove = false, animationType = '') {
    if (currentMessageIndex >= messages.length) return;
    const existingStars = starContainer.querySelectorAll('.star');
    // Only allow 1 star at a time if manually created
    if (!autoMove && existingStars.length >= 1) return;

    starsCreated++;

    const star = document.createElement('div');
    star.classList.add('star');

    const starImg = document.createElement('img');
    let starImageFile = 'star-image.png';
    const currentLang = starAnimationData.currentLang || 'en';

    // Make 1st & 5th stars bigger with "click me" images
    if (starsCreated === 1 || starsCreated === 5) {
        switch (currentLang) {
            case 'de': starImageFile = 'star-image-click-me-de.png'; break;
            case 'fr': starImageFile = 'star-image-click-me-fr.png'; break;
            case 'es': starImageFile = 'star-image-click-me-es.png'; break;
            case 'it': starImageFile = 'star-image-click-me-it.png'; break;
            default: starImageFile = 'star-image-click-me-en.png';
        }
        star.style.width = '110px';
        star.style.height = '110px';
        starImg.style.width = '100%';
        starImg.style.height = '100%';
    } else {
        star.style.width = '60px';
        star.style.height = '60px';
        starImg.style.width = '40px';
        starImg.style.height = '40px';
    }

    starImg.src = "./assets/" + starImageFile;
    starImg.classList.add('star-image');
    star.appendChild(starImg);

    if (autoMove) {
        // Move star automatically across screen
        star.style.left = '-50px';
        star.style.top = '-50px';
        star.style.transform = 'none';
        star.style.animation = `${animationType} 18.5s ease-in-out forwards`;
        star.fallTimeout = setTimeout(() => handleStarFall(star, true), 15000);
    } else {
        // Use one of the star path animations
        const currentPath = paths[pathIndex];
        star.style.animation = `${currentPath} 130s linear infinite`;
        pathIndex = (pathIndex + 1) % paths.length;
    }

    function starEventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        starsClicked++;
        handleStarFall(star, autoMove);
    }
    star.addEventListener('click', starEventHandler);
    star.addEventListener('touchstart', starEventHandler, { passive: false });
    star.addEventListener('mousedown', starEventHandler);

    starContainer.appendChild(star);
    requestAnimationFrame(() => {
        star.style.opacity = '0.9';
    });
}

/**
 * HANDLE STAR FALL
 */
function handleStarFall(star, isAutoFalling) {
    if (star.fallTimeout) {
        clearTimeout(star.fallTimeout);
        star.fallTimeout = null;
    }
    star.style.pointerEvents = 'none';
    const rect = star.getBoundingClientRect();
    star.style.left = `${rect.left}px`;
    star.style.top = `${rect.top}px`;
    star.style.transform = 'none';
    star.style.position = 'fixed';
    star.style.animation = 'fall 2s ease-out forwards';

    if (!isAutoFalling && currentMessageIndex < messages.length) {
        displayMessage();
        messagesShown++;
    }
    setTimeout(() => {
        star.remove();
        // Create the next star after the old one disappears
        if (currentMessageIndex < messages.length) {
            createStar();
        }
    }, 8000);
}

/**
 * DISPLAY MESSAGE
 */
function displayMessage() {
    if (currentMessageIndex >= messages.length) return;

    const msg = messages[currentMessageIndex];
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = msg;
    messageContainer.appendChild(message);

    message.style.position = 'absolute';
    message.style.right = '20px';
    message.style.top = `${messagesShown * 70}px`;
    message.style.opacity = '1';
    message.style.transform = 'translateY(0)';
    message.style.transition = 'opacity 0.5s ease';

    adjustMessagesPosition();

    // Fade out after 10 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.remove();
            adjustMessagesPosition();
        }, 500);
    }, 10000);

    currentMessageIndex++;
    messagesShown++;

    // If we've shown them all, stop recurring star creation
    if (currentMessageIndex >= messages.length) {
        if (starIntervalTimeout) clearTimeout(starIntervalTimeout);
    }
}

/**
 * Keep messages spaced properly
 */
function adjustMessagesPosition() {
    const currentMessages = messageContainer.querySelectorAll('.message');
    let totalHeight = 0;
    const gap = 10;
    currentMessages.forEach((msg) => {
        msg.style.top = `${totalHeight}px`;
        totalHeight += msg.offsetHeight + gap;
    });
}

/**
 * Initiate recurring star creation
 */
function startStars() {
    function createNextStar() {
        if (currentMessageIndex >= messages.length) return;
        createStar();
        starIntervalTimeout = setTimeout(createNextStar, 5000);
    }
    createNextStar();
}

/**
 * Initialize the star animations
 */
function initStars() {
    // Create a star immediately
    createStar();
    // Then continue generating stars every 5 seconds
    startStars();
}

// Scroll threshold to begin star animation
const SCROLL_THRESHOLD = 180;
function handleStartStarsOnScroll() {
    if ((window.scrollY || document.documentElement.scrollTop) > SCROLL_THRESHOLD) {
        window.removeEventListener('scroll', handleStartStarsOnScroll);
        initStars();
    }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    resetScrollPosition();

    // Setup references
    starContainer = document.querySelector('.star-container');
    messageContainer = document.querySelector('.message-container');

    // Load & store the selected language messages
    messages = loadMessages();

    // Wait for user to scroll a bit, then start the star animation
    window.addEventListener('scroll', handleStartStarsOnScroll);

    // =============================================
    //  Show the product animation after 5s
    // =============================================
    setTimeout(() => {
        showProductAnimation();
    }, 5000);
});

/**
 * Show the product animation (slide from right -> center, hold ~20s, fade).
 * Force the GIF to restart by toggling src briefly.
 */
function showProductAnimation() {
    console.log("Product animation triggered!");

    const productContainer = document.getElementById('product-animation-container');
    const productImage = document.getElementById('product-animation-image');

    if (!productContainer || !productImage) {
        console.error("Product animation elements not found!");
        return;
    }

    console.log("Product animation elements found!");

    // Force reload by appending a unique timestamp
    productImage.src = ""; // Clear previous GIF
    setTimeout(() => {
        productImage.src = `./assets/Product_Animation5.gif?${Date.now()}`;
        console.log("GIF src updated:", productImage.src);
    }, 50);

    // Apply animation class
    setTimeout(() => {
        productContainer.classList.add('animate-product');
    }, 100);

    // Remove container after 32s (28s animation + 4s buffer)
    setTimeout(() => {
        productContainer.remove();
        console.log("Product animation container removed.");
    }, 32000);
}
