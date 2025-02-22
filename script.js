/***************************************
  PRODUCT ANIMATION (GIF → Button)
  Star code removed!
***************************************/

// If starAnimationData isn't defined, define defaults (for language or other usage)
if (typeof starAnimationData === 'undefined') {
    var starAnimationData = {
        currentLang: 'en',
        baseUrl: '',
        buyButtonId: ''
    };
}

// Reset scroll on load (optional)
function resetScrollPosition() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
}

// Button text translations (2-line)
const buttonTextByLanguage = {
    en: 'Support Our<br>Project',
    de: 'Unterstütze Unser<br>Projekt',
    fr: 'Soutenez Notre<br>Projet',
    es: 'Apoya Nuestro<br>Proyecto',
    it: 'Sostieni Il Nostro<br>Progetto'
};

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    resetScrollPosition();

    // Show the product GIF after 5s
    setTimeout(() => {
        showProductAnimation();
    }, 5000);
});

/**
 * Show product animation using a 28s keyframe (optional).
 * The GIF is ~25s, so around 24s we morph it to a button.
 */
function showProductAnimation() {
    const productContainer = document.getElementById('product-animation-container');
    const productImage = document.getElementById('product-animation-image');

    if (!productContainer || !productImage) {
        console.error("Product animation elements not found!");
        return;
    }

    // Force reload the GIF
    productImage.src = "";
    setTimeout(() => {
        productImage.src = `./assets/Product_Animation9.gif?${Date.now()}`;
    }, 50);

    // Optionally add the .animate-product class for a 28s fade keyframe
    setTimeout(() => {
        productContainer.classList.add('animate-product');
    }, 100);

    // Morph to button around 24s 
    setTimeout(() => {
        morphGifToButton(productContainer);
    }, 24000);
}

/**
 * Morph the GIF container → button at center, then slide button left
 */
function morphGifToButton(container) {
    if (!container.parentNode) return;

    // 1) Stop the keyframe if still active
    container.classList.remove('animate-product');

    // Fix container at center with scale(1)
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%) scale(1)';
    container.style.opacity = '1';
    container.style.transition = 'none';

    // Force reflow so it's locked
    container.getBoundingClientRect();

    // 2) Create the button in same center position, scale(0)
    const button = document.createElement('button');
    button.id = 'donation-button';
    button.classList.add('donation-button-custom');

    // 2-line text
    const lang = starAnimationData.currentLang || 'en';
    const twoLineText = buttonTextByLanguage[lang] || buttonTextByLanguage['en'];
    button.innerHTML = `<span>${twoLineText}</span>`;

    Object.assign(button.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0)',
        transformOrigin: 'center center',
        opacity: '0',
        transition: 'transform 2.5s, opacity 2.5s',
        zIndex: '10020'
    });

    document.body.appendChild(button);

    // 3) Animate container scale(1)->0, fade out; button scale(0)->1, fade in
    setTimeout(() => {
        container.style.transition = 'transform 2.5s, opacity 2.5s';
        container.style.transform = 'translate(-50%, -50%) scale(0)';
        container.style.opacity = '0';

        button.style.transform = 'translate(-50%, -50%) scale(1)';
        button.style.opacity = '1';
    }, 50);

    // 4) Remove container after morph, then slide the button left
    setTimeout(() => {
        container.remove();
        moveButtonToLeft(button);
    }, 2600);
}

/**
 * Move button left/bottom after morph
 */
function moveButtonToLeft(btn) {
    btn.style.transition = 'left 2.5s, top 2.5s, transform 2.5s';
    // E.g., anchor near left:1px, top:75%. Adjust as you like:
    btn.style.left = '1px';
    btn.style.top = '75%';
    btn.style.transform = 'translate(0, -50%)';
}
