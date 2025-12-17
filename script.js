
function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    
    if (!snowContainer) return;

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.innerHTML = '❄'; 

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

setInterval(createSnowflake, 100);

function toggleSound() {
    const video = document.getElementById('hero_video');
    const icon = document.getElementById('sound-icon');
    
    if (!video) {
        console.error("Video not found! Check HTML ID.");
        return;
    }
    
    if (video.muted) {
        video.muted = false;
        
        video.play().catch(error => {
            console.log("Playback failed:", error);
        });

        icon.setAttribute('data-lucide', 'volume-2'); 
    } else {
        video.muted = true;
        icon.setAttribute('data-lucide', 'volume-x');
    }
    
    lucide.createIcons();
}
function addToRoute(id) {
    alert("Added location " + id + " to your route!");
}

const LOCATIONS = {
    1: {
        title: "Zrinjevac Park",
        subtitle: "A Romantic Waltz of Lights",
        desc: "Escape into an old-world fairytale. Zrinjevac is the most elegant spot in the city, famous for its historic music pavilion which hosts live classical and jazz concerts every evening. Surrounded by 220 century-old plane trees wrapped in thousands of white lights, this market focuses on handmade ornaments, fried apples, and authentic local crafts. It is the perfect spot for a romantic evening walk.",
        time: "60",
        cost: "10",
        category: "Atmosphere",
        image: "assets/card_zrinjevac.png",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Zrinjevac+Park+Zagreb"
    },
    2: {
        title: "Trg Bana Jelačića",
        subtitle: "The Beating Heart of Advent",
        desc: "The main square is the central hub of the festivities. Here you will find the largest Christmas tree in the city and the Manduševac fountain transformed into a giant Advent candle display. The square is packed with traditional white cottages offering the best hearty winter food: sausages, mulled wine, and fritule. It is bustling, loud, and full of holiday spirit.",
        time: "45",
        cost: "15",
        category: "Main Event",
        image: "assets/card_trg.png",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Trg+bana+Josipa+Jelačića+Zagreb"
    },
    3: {
        title: "Ice Park Tomislavac",
        subtitle: "A Frozen Fairytale",
        desc: "Located in front of the majestic Art Pavilion, this is one of the largest open-air ice skating rinks in this part of Europe. The tracks wind through the park trees, allowing you to skate under golden lights while listening to festive music. Even if you don't skate, the observation deck offers a stunning view of the skaters and the historic architecture.",
        time: "90",
        cost: "25",
        category: "Activity",
        image: "assets/card_ice.png",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Ledeni+park+Trg+kralja+Tomislava+Zagreb"
    },
    4: {
        title: "Upper Town (Gornji Grad)",
        subtitle: "History with a View",
        desc: "Climb the funicular to the medieval Upper Town for the most photogenic spots in Zagreb. The vibe here is intimate and artistic, featuring small concerts in courtyards and stunning panoramic views of the city lights below. Key spots include the St. Mark's Church and the Gradec Plateau photo points. It is quieter, cozier, and utterly magical.",
        time: "75",
        cost: "12",
        category: "Sightseeing",
        image: "assets/card_upper.png",
        mapLink: "https://maps.app.goo.gl/zagreb_upper"
    },
    5: {
        title: "Fuliranje (Strossmayer)",
        subtitle: "Gourmet Street Food & Vibes",
        desc: "If you are a foodie, this is your paradise. Fuliranje (Fooling Around) is known for hosting the best chefs and restaurants in Croatia who create special street-food menus just for Advent. Expect gourmet burgers, asian fusion, craft cocktails, and hot gin. The atmosphere is modern and energetic, with DJs playing funk, soul, and disco beats all night long.",
        time: "120",
        cost: "30",
        category: "Food & Drink",
        image: "assets/card_fuliranje.png",
        mapLink: "https://maps.app.goo.gl/zagreb_fuliranje"
    },
    6: {
        title: "Tunel Grič",
        subtitle: "Underground Winter Wonderland",
        desc: "Experience Christmas from a different perspective. This pedestrian tunnel under the medieval city is transformed into a surreal 'Polar Dream'. 3D light installations, ceiling sculptures, and ambient choir music create a mysterious and calm atmosphere. It is a quick but unforgettable walk that feels like stepping into another dimension.",
        time: "30",
        cost: "0",
        category: "Experience",
        image: "assets/card_tunel.png",
        mapLink: "https://maps.app.goo.gl/zagreb_tunel"
    }
};

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
    if (event.target == modal) {
        closeModal();
    }
}

function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.innerHTML = '❄'; 
    snowContainer.appendChild(snowflake);
    setTimeout(() => { snowflake.remove(); }, 5000);
}
setInterval(createSnowflake, 100);

function addToRoute(id) {
    const name = LOCATIONS[id] ? LOCATIONS[id].title : "Location";
    alert("Added " + name + " to your route!");
}