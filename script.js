// script.js
let state = {
    gold: 100,
    fame: 0,
    members: [],
    candidates: [
        { id: 1, name: "Guerrier Novice", cost: 50, income: 2 },
        { id: 2, name: "Mage Errant", cost: 150, income: 8 },
        { id: 3, name: "Voleur Agile", cost: 300, income: 20 }
    ]
};

function init() {
    loadGame();
    renderCandidates();
    updateUI();
    // Boucle de gain d'or automatique toutes les secondes
    setInterval(updateGame, 1000);
}

function saveGame() {
    try {
        const saveData = {
            gold: state.gold,
            fame: state.fame,
            members: state.members
        };
        localStorage.setItem('gestaguilde_save', JSON.stringify(saveData));
    } catch (e) {
        console.warn("Sauvegarde impossible :", e);
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('gestaguilde_save');
        if (saved) {
            const parsed = JSON.parse(saved);
            state.gold = parsed.gold;
            state.fame = parsed.fame;
            state.members = parsed.members;
            addLog("Progression chargée !");
        }
    } catch (e) {
        console.warn("Chargement impossible :", e);
    }
}

function renderCandidates() {
    const list = document.getElementById('recruit-list');
    list.innerHTML = state.candidates.map(c => `
        <div class="card">
            <span>${c.name} (${c.cost} 🪙)</span>
            <button onclick="buyMember(${c.id})">Recruter</button>
        </div>
    `).join('');
}

function buyMember(id) {
    const candidate = state.candidates.find(c => c.id === id);
    if (state.gold >= candidate.cost) {
        state.gold -= candidate.cost;
        state.members.push({...candidate});
        addLog(`${candidate.name} a rejoint la guilde !`);
        updateUI();
        saveGame();
    } else {
        addLog("Pas assez d'or !");
    }
}

function updateGame() {
    state.members.forEach(m => {
        state.gold += m.income;
    });
    updateUI();
    saveGame();
}

function updateUI() {
    document.getElementById('gold').innerText = Math.floor(state.gold);
    document.getElementById('member-count').innerText = state.members.length;
}

function addLog(msg) {
    const logs = document.getElementById('logs');
    const li = document.createElement('li');
    li.innerText = `> ${msg}`;
    logs.prepend(li);
}

init();