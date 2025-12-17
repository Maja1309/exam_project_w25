
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
    const video = document.getElementById('hero-video');
    const icon = document.getElementById('sound-icon');
    
    if (!video || !icon) return;
    
    if (video.muted) {
        video.muted = false;
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