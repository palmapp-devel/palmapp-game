const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
let currentScene = 0;
const scenes = [
    { name: 'Supermarket', spend: 2000, image: 'supermarket.png' },
    { name: 'Sportovni_obchod', spend: 15000, image: 'sports_store.png' },
    { name: 'Cestovni_kancelar', spend: 50000, image: 'travel_agency.png' },
    { name: 'Restaurace', spend: 3000, image: 'restaurant.png' }
];
let totalSpend = 0;
let totalCashback = 0;

const startSound = document.getElementById('startSound');
const clickSound = document.getElementById('clickSound');
const cashbackSound = document.getElementById('cashbackSound');
const completeSound = document.getElementById('completeSound');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

startButton.addEventListener('click', startGame);

function startGame() {
    playSound(startSound);
    startButton.style.display = 'none';
    showScene();
}

function showScene() {
    if (currentScene < scenes.length) {
        const scene = scenes[currentScene];
        gameScreen.innerHTML = `
            <h2>${scene.name.replace('_', ' ')}</h2>
            <img src="images/${scene.image}" alt="${scene.name}" class="scene-image">
            <p>Utratit: ${scene.spend} Kč</p>
            <button onclick="pay(${scene.spend})" class="button">Zaplatit PalmApp kartou</button>
        `;
    } else {
        showSummary();
    }
}

function pay(amount) {
    playSound(clickSound);
    const cashback = amount * 0.02;
    totalSpend += amount;
    totalCashback += cashback;
    gameScreen.innerHTML += `
        <p>Cashback: ${cashback.toFixed(2)} Kč</p>
        <button onclick="nextScene()" class="button">Další</button>
    `;
    setTimeout(() => playSound(cashbackSound), 500);
}

function nextScene() {
    currentScene++;
    showScene();
}

function showSummary() {
    playSound(completeSound);
    gameScreen.innerHTML = `
        <h2>Shrnutí</h2>
        <p>Celková útrata: ${totalSpend.toFixed(2)} Kč</p>
        <p>Celkový cashback: ${totalCashback.toFixed(2)} Kč</p>
        <p>Roční potenciální cashback: ${(totalCashback * 12).toFixed(2)} Kč</p>
        <p>Náklady firmy na kartu ročně: 600 Kč</p>
        <button onclick="restartGame()" class="button">Hrát znovu</button>
    `;
}

function restartGame() {
    currentScene = 0;
    totalSpend = 0;
    totalCashback = 0;
    startGame();
}

document.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('button')) {
        playSound(clickSound);
    }
});

function setVolume(volume) {
    [startSound, clickSound, cashbackSound, completeSound].forEach(sound => {
        sound.volume = volume;
    });
}

function muteAllSounds() {
    [startSound, clickSound, cashbackSound, completeSound].forEach(sound => {
        sound.muted = true;
    });
}

function unmuteAllSounds() {
    [startSound, clickSound, cashbackSound, completeSound].forEach(sound => {
        sound.muted = false;
    });
}