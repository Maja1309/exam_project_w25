
const LOCATIONS = {
    1: { id: 1, title: "Zrinjevac Park", subtitle: "A Romantic Waltz of Lights", desc: "Escape into an old-world fairytale where 220 century-old plane trees are wrapped in thousands of warm white lights. The historic music pavilion serves as the heart of the park, hosting live classical waltzes and jazz concerts every evening. This is the most elegant spot in Zagreb, focusing on authentic handmade ornaments, fried apples, and a romantic atmosphere perfect for evening strolls.", time: 60, cost: 10, category: "Atmosphere", image: "assets/card_zrinjevac.png", mapLink: "https://maps.app.goo.gl/XG4XxkR4c6SvjKYcA" },
    2: { id: 2, title: "Trg Bana Jelačića", subtitle: "The Beating Heart of Advent", desc: "As the main city square, this is the beating heart of the festivities. It features the city's largest Christmas tree and the famous Manduševac fountain, transformed into a giant Advent wreath with candlelight. The square is a bustling hub of energy, packed with traditional white wooden cottages offering hearty winter specialties like sausages, mulled wine, and sweet fritule.", time: 45, cost: 15, category: "Main Event", image: "assets/card_trg.png", mapLink: "https://maps.app.goo.gl/mA1e2L1ReZDFF8PT8" },
    3: { id: 3, title: "Ice Park Tomislavac", subtitle: "A Frozen Fairytale", desc: "Located in front of the majestic Art Pavilion, this is one of the largest and most beautiful open-air ice skating rinks in Europe. Instead of a simple circle, the ice tracks wind through the park's trees, allowing you to skate under a canopy of golden lights. For those who don't skate, the elevated observation deck offers stunning views of the skaters and the historic architecture.", time: 90, cost: 25, category: "Activity", image: "assets/card_ice.png", mapLink: "https://maps.app.goo.gl/Sx5B9eUBJM3ZXsga9" },
    4: { id: 4, title: "Upper Town (Gornji Grad)", subtitle: "History with a View", desc: "Take the funicular up to the medieval Upper Town for the most photogenic views in Zagreb. The atmosphere here is intimate, quiet, and artistic, contrasting with the bustle of the lower town. Wander through decorated courtyards, enjoy acoustic concerts, and capture the perfect photo at the Gradec Plateau with the cathedral and city lights twinkling in the background.", time: 75, cost: 12, category: "Sightseeing", image: "assets/card_upper.png", mapLink: "https://maps.app.goo.gl/FayqtDKRB3u3PKUS9" },
    5: { id: 5, title: "Fuliranje (Strossmayer)", subtitle: "Gourmet Street Food & Vibes", desc: "Known locally as 'Fooling Around,' this is the ultimate paradise for foodies. Fuliranje hosts the best chefs and restaurants in Croatia, who create exclusive street-food menus just for Advent. Expect gourmet burgers, Asian fusion, craft cocktails, and hot gin. The vibe is modern and energetic, with DJs playing funk, soul, and disco beats well into the night.", time: 120, cost: 30, category: "Food & Drink", image: "assets/card_fuliranje.png", mapLink: "https://maps.app.goo.gl/1eNNpjqEVZFJjprCA" },
    6: { id: 6, title: "Tunel Grič", subtitle: "Underground Winter Wonderland", desc: "Experience Christmas from a completely different perspective—underground. This pedestrian tunnel beneath the medieval city is transformed into a surreal 'Polar Dream.' With spectacular 3D light installations, ceiling sculptures, and ambient choir music, walking through Tunel Grič feels like stepping into a magical, alternate dimension away from the winter cold.", time: 30, cost: 0, category: "Experience", image: "assets/card_tunel.png", mapLink: "https://maps.app.goo.gl/kRS5sDhCM3W2CzHD9" }
};


function getRoute() {
    return JSON.parse(localStorage.getItem('myRoute')) || [];
}

function addToRoute(id) {
    let route = getRoute();
    const item = LOCATIONS[id];

    if (!route.includes(id)) {
        route.push(id);
        localStorage.setItem('myRoute', JSON.stringify(route));
        
        updateRouteBadge();
        
        showToast("Success", item.title + " added to your route!");
        
    } else {
        showToast("Info", "This location is already in your route.");
    }
}

function removeFromRoute(id) {
    let route = getRoute();
    route = route.filter(itemId => itemId !== id);
    localStorage.setItem('myRoute', JSON.stringify(route));
    
    if (window.location.pathname.includes('route.html')) {
        renderRoutePage(); 
    }
    updateRouteBadge();
    showToast("Removed", "Location removed from route.");
}


function updateRouteBadge() {
    const route = getRoute();
    const count = route.length;
    const badge = document.getElementById('nav-badge');
    
    if (badge) {
        if (count > 0) {
            badge.innerText = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

let toastTimeout;
function showToast(title, message) {
    const toast = document.getElementById('toast-notification');
    const titleEl = document.getElementById('toast-title');
    const msgEl = document.getElementById('toast-message');

    if (!toast) return;

    if(titleEl) titleEl.innerText = title;
    if(msgEl) msgEl.innerText = message;

    toast.classList.remove('translate-x-[120%]');
    toast.classList.add('translate-x-0');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-[120%]');
    }
}


function openModal(id) {
    const data = LOCATIONS[id];
    const modal = document.getElementById('details-modal');
    if (!data || !modal) return;

    document.getElementById('modal-image').src = data.image;
    document.getElementById('modal-category').innerText = data.category;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-subtitle').innerText = data.subtitle;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-time').innerText = "~" + data.time + " min";
    document.getElementById('modal-cost').innerText = "~" + data.cost + " EUR";
    document.getElementById('modal-map-btn').href = data.mapLink;
    
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.onclick = function() { addToRoute(id); closeModal(); };

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('details-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('details-modal');
    if (event.target == modal) closeModal();
}


function renderRoutePage() {
    const routeContainer = document.getElementById('route-list');
    if (!routeContainer) return; 

    const savedIds = getRoute();
    const budget = parseInt(document.getElementById('budget-slider').value);
    const timeLimit = parseInt(document.getElementById('time-slider').value);

    document.getElementById('budget-value').innerText = budget + " €";
    const h = Math.floor(timeLimit / 60);
    const m = timeLimit % 60;
    document.getElementById('time-value').innerText = h + "h " + m + "m";

    if (savedIds.length === 0) {
        routeContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                    <i data-lucide="map-pin" class="text-brand-red w-10 h-10"></i>
                </div>
                <h3 class="text-2xl font-serif font-bold text-gray-400 mb-2">Your planner is empty</h3>
                <p class="text-gray-400 mb-8">Go to the gallery to start adding locations.</p>
                <a href="gallery.html" class="bg-brand-red text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition shadow-lg">Browse Gallery</a>
            </div>
        `;
        document.getElementById('total-cost').innerText = "0 €";
        document.getElementById('total-time').innerText = "0h 0m";
        document.getElementById('location-count').innerText = "0 Locations";
        lucide.createIcons();
        return;
    }

    let html = '';
    let currentCost = 0;
    let currentTime = 0;

    savedIds.forEach((id, index) => {
        const item = LOCATIONS[id];
        currentCost += item.cost;
        currentTime += item.time;

        html += `
            <div class="bg-white border border-gray-100 p-6 rounded-2xl flex gap-6 items-start relative hover:shadow-lg transition-shadow">
                <div class="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-lg flex-shrink-0">${index + 1}</div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-xl font-bold font-serif text-gray-900">${item.title}</h4>
                        <div class="flex gap-2">
                             <a href="${item.mapLink}" target="_blank" class="text-gray-400 hover:text-blue-600 transition"><i data-lucide="map" width="20"></i></a>
                             <button onclick="removeFromRoute(${id})" class="text-gray-400 hover:text-red-600 transition"><i data-lucide="trash-2" width="20"></i></button>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-2">${item.desc}</p>
                    <div class="flex gap-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600"><i data-lucide="clock" width="14" class="text-brand-red"></i> ${item.time} min</span>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600"><i data-lucide="euro" width="14" class="text-brand-red"></i> ~${item.cost}</span>
                    </div>
                </div>
            </div>
        `;
    });

    routeContainer.innerHTML = html;
    document.getElementById('location-count').innerText = savedIds.length + " Locations";
    document.getElementById('total-cost').innerText = currentCost + " €";
    const totalH = Math.floor(currentTime / 60);
    const totalM = currentTime % 60;
    document.getElementById('total-time').innerText = totalH + "h " + totalM + "m";

    const costBox = document.getElementById('total-cost-box');
    const budgetWarning = document.getElementById('budget-warning');
    if (currentCost > budget) {
        costBox.classList.add('bg-red-50', 'border-red-200');
        document.getElementById('total-cost').classList.add('text-red-600');
        budgetWarning.classList.remove('hidden');
    } else {
        costBox.classList.remove('bg-red-50', 'border-red-200');
        document.getElementById('total-cost').classList.remove('text-red-600');
        budgetWarning.classList.add('hidden');
    }

    const timeBox = document.getElementById('total-time-box');
    const timeWarning = document.getElementById('time-warning');
    if (currentTime > timeLimit) {
        timeBox.classList.add('bg-red-50', 'border-red-200');
        document.getElementById('total-time').classList.add('text-red-600');
        timeWarning.classList.remove('hidden');
    } else {
        timeBox.classList.remove('bg-red-50', 'border-red-200');
        document.getElementById('total-time').classList.remove('text-red-600');
        timeWarning.classList.add('hidden');
    }
    lucide.createIcons();
}

function initSnow() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    const s = document.createElement('div');
    s.classList.add('snowflake');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    s.style.fontSize = Math.random() * 10 + 10 + 'px';
    s.innerHTML = '❄'; 
    snowContainer.appendChild(s);
    setTimeout(() => s.remove(), 5000);
}
setInterval(initSnow, 100);

document.addEventListener('DOMContentLoaded', () => {
    updateRouteBadge();

    if (document.getElementById('route-list')) {
        renderRoutePage();
        document.getElementById('budget-slider').addEventListener('input', renderRoutePage);
        document.getElementById('time-slider').addEventListener('input', renderRoutePage);
    }
});

function toggleSound() {
    const video = document.getElementById('hero_video');
    const icon = document.getElementById('sound-icon');
    if (!video) return;
    if (video.muted) {
        video.muted = false;
        video.play().catch(e => console.log(e));
        icon.setAttribute('data-lucide', 'volume-2'); 
    } else {
        video.muted = true;
        icon.setAttribute('data-lucide', 'volume-x');
    }
    lucide.createIcons();
}

const observerOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            if (entry.target.hasAttribute('data-count')) {
                startCounter(entry.target);
            }
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => scrollObserver.observe(el));
    
    startCountdown();
});

function startCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || ""; 
    const duration = 2000; 
    const stepTime = 20; 
    const steps = duration / stepTime;
    const increment = target / steps;
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target + suffix;
            clearInterval(timer);
        } else {
            el.innerText = Math.ceil(current) + suffix;
        }
    }, stepTime);
}

function startCountdown() {
    const countdownEl = document.getElementById('advent-countdown');
    if (!countdownEl) return;

    const targetDate = new Date("Dec 24, 2025 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownEl.innerHTML = "MERRY CHRISTMAS!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('cd-days').innerText = days;
        document.getElementById('cd-hours').innerText = hours;
        document.getElementById('cd-min').innerText = minutes;
    }, 1000);
}

function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const backdrop = document.getElementById('mobile-backdrop');
    const sidebar = document.getElementById('mobile-sidebar');
    
    const isOpen = sidebar.classList.contains('translate-x-0');

    if (isOpen) {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
        
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        
        setTimeout(() => {
            overlay.classList.add('pointer-events-none');
            document.body.style.overflow = 'auto'; 
        }, 300);
        
    } else {
        overlay.classList.remove('pointer-events-none');
        
        requestAnimationFrame(() => {
            sidebar.classList.remove('translate-x-full');
            sidebar.classList.add('translate-x-0');
            
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
        });

        document.body.style.overflow = 'hidden'; 
    }
}

function updateRouteBadge() {
    const route = getRoute();
    const count = route.length;
    
    const desktopBadge = document.getElementById('nav-badge');
    if (desktopBadge) {
        if (count > 0) {
            desktopBadge.innerText = count;
            desktopBadge.classList.remove('hidden');
        } else {
            desktopBadge.classList.add('hidden');
        }
    }

    const mobileBadge = document.getElementById('mobile-nav-badge');
    if (mobileBadge) {
        if (count > 0) {
            mobileBadge.innerText = count;
            mobileBadge.classList.remove('hidden');
        } else {
            mobileBadge.classList.add('hidden');
        }
    }
}