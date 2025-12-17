
const LOCATIONS = {
    1: { id: 1, title: "Zrinjevac Park", subtitle: "A Romantic Waltz of Lights", desc: "Escape into an old-world fairytale. Zrinjevac is the most elegant spot in the city.", time: 60, cost: 10, category: "Atmosphere", image: "assets/card_zrinjevac.png", mapLink: "https://www.google.com/maps/search/?api=1&query=Zrinjevac+Park+Zagreb" },
    2: { id: 2, title: "Trg Bana Jelačića", subtitle: "The Beating Heart of Advent", desc: "The main square is the central hub of the festivities featuring the largest Christmas tree.", time: 45, cost: 15, category: "Main Event", image: "assets/card_trg.png", mapLink: "https://www.google.com/maps/search/?api=1&query=Trg+bana+Josipa+Jelačića+Zagreb" },
    3: { id: 3, title: "Ice Park Tomislavac", subtitle: "A Frozen Fairytale", desc: "One of the largest open-air ice skating rinks in this part of Europe.", time: 90, cost: 25, category: "Activity", image: "assets/card_ice.png", mapLink: "https://www.google.com/maps/search/?api=1&query=Ledeni+park+Trg+kralja+Tomislava+Zagreb" },
    4: { id: 4, title: "Upper Town (Gornji Grad)", subtitle: "History with a View", desc: "Climb the funicular to the medieval Upper Town for the most photogenic spots.", time: 75, cost: 12, category: "Sightseeing", image: "assets/card_upper.png", mapLink: "https://maps.app.goo.gl/zagreb_upper" },
    5: { id: 5, title: "Fuliranje (Strossmayer)", subtitle: "Gourmet Street Food & Vibes", desc: "Known for hosting the best chefs and restaurants in Croatia with modern vibes.", time: 120, cost: 30, category: "Food & Drink", image: "assets/card_fuliranje.png", mapLink: "https://maps.app.goo.gl/zagreb_fuliranje" },
    6: { id: 6, title: "Tunel Grič", subtitle: "Underground Winter Wonderland", desc: "This pedestrian tunnel is transformed into a surreal 'Polar Dream'.", time: 30, cost: 0, category: "Experience", image: "assets/card_tunel.png", mapLink: "https://maps.app.goo.gl/zagreb_tunel" }
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