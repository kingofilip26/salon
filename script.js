// --- 1. LIGHTBOX (FOTOGALERIE) ---
const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");

function openFullImg(pic){
    if (fullImgBox && fullImg) {
        fullImgBox.style.display = "flex";
        fullImg.src = pic;
    }
}

function closeFullImg(){
    if (fullImgBox) {
        fullImgBox.style.display = "none";
    }
}

if (document.querySelector('.swiper2') && typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper2', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 30,
        
        breakpoints:{
            768:{
                slidesPerView: 2,
            },
            1024:{
                slidesPerView: 3,
            }
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        autoplay:{
            delay: 2000,
            disableOnInteraction: false,
        }
    });
}

// --- 2. SWIPER SLIDER (Ošetřeno proti pádu) ---
// Spustí se pouze tehdy, pokud na stránce existuje prvek .swiper a je načtená knihovna Swiper
// Inicializace hlavního Hero Banneru na úvodní stránce
if (document.querySelector('.hero-swiper') && typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        
        // TYTO DVA ŘÁDKY JSOU KLÍČOVÉ:
        autoHeight: false,          // Vypne automatickou výšku dle obsahu
        setWrapperSize: false,       // Zabrání Swiperu nastavovat px výšku na wrapperu
    
        // Vynutí přepočet při změně velikosti okna
        observer: true,
        observeParents: true,
        resizeObserver: true,
    
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.hero-swiper .swiper-button-next',
            prevEl: '.hero-swiper .swiper-button-prev',
        },
    });
}



// --- 2. SWIPER SLIDER (Ošetřeno proti pádu) ---
// Spustí se pouze tehdy, pokud na stránce existuje prvek .swiper a je načtená knihovna Swiper

// --- 3. FAQ AKORDEON (Ošetřeno proti pádu) ---
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const itemAnswer = item.querySelector('.faq-answer');
                    if (itemAnswer) itemAnswer.style.maxHeight = null;
                });

                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// --- 4. HAMBURGER MENU ---
const input = document.querySelector(".hamburgerInput");
const zruseni = document.querySelector(".zruseni");
const menu = document.querySelector(".hamburger-menu");
const links = document.querySelectorAll(".hamburger-link");

if (input && zruseni && menu) {
    input.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    zruseni.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    links.forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    });

    // Zavření kliknutím mimo menu
    window.addEventListener("click", (e) => {
        if (menu.classList.contains("active") && !menu.contains(e.target) && e.target !== input) {
            menu.classList.remove("active");
        }
    });
}

// --- 5. HEADER SCROLL & TLAČÍTKO NAHORU ---
const header = document.getElementById("header");
const nahoru = document.querySelector(".nahoru");
const klik = document.querySelectorAll(".klik");
const image = document.querySelector(".osobni-logo-image");

if (header) {
    const scroll = () => {
        if (window.scrollY >= 50) {
            header.classList.add("scroll");
            if (nahoru) nahoru.classList.add("display");
            klik.forEach((item) => {
                item.classList.add("black");
            });
            if (image) image.classList.add("filter");
        } else {
            header.classList.remove("scroll");
            if (nahoru) nahoru.classList.remove("display");
            klik.forEach((item) => {
                item.classList.remove("black");
            });
            if (image) image.classList.remove("filter");
        }
    };

    window.addEventListener("scroll", scroll);
}

// --- 6. AKTUALIZACE OTEVÍRACÍ DOBY ---
function aktualizujOteviraciDobu() {
    const statusDiv = document.getElementById("status-otevreno");
    if (!statusDiv) return; // Pokud prvek neexistuje, funkce se tiše ukončí

    const ted = new Date();
    const den = ted.getDay(); 
    const hodina = ted.getHours();

    const jeVsedniDen = den >= 1 && den <= 5;
    const jeOtevreno = jeVsedniDen && hodina >= 9 && hodina < 17;

    if (jeOtevreno) {
        statusDiv.innerHTML = `<span class="tecka tecka--zelena"></span> Právě máme otevřeno – stavte se!`;
        statusDiv.style.color = "rgb(35, 223, 35)";
    } else {
        statusDiv.innerHTML = `<span class="tecka tecka--cervena"></span> Aktuálně máme zavřeno`;
        statusDiv.style.color = "#ff4a4a";
    }
}

aktualizujOteviraciDobu();

// --- 7. INTERSECTION OBSERVER (Animace sekcí) ---
const sections = document.querySelectorAll(".sekce");
if (sections.length > 0) {
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animation");
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback);

    sections.forEach((sekce) => {
        observer.observe(sekce);
    });
}