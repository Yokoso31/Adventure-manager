const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: { preload: preload, create: create, update: update }
};

let game = new Phaser.Game(config);
let adventurers = [];
let gold = 100;

function preload() {
    // Ici on chargera tes sprites découpés
    this.load.image('floor', 'https://labs.phaser.io/assets/skies/space3.png'); // Placeholder sol
    this.load.spritesheet('hero', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'floor').setAlpha(0.3); // Le sol de la guilde

    // Créer un aventurier qui se balade
    spawnAdventurer(this);

    // Timer de revenu Idle
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            gold += adventurers.length * 5;
            document.getElementById('gold-text').innerText = gold;
        },
        loop: true
    });
}

function spawnAdventurer(scene) {
    let x = Phaser.Math.Between(100, 700);
    let y = Phaser.Math.Between(100, 500);
    let sprite = scene.add.sprite(x, y, 'hero');

    // IA simple : Se déplacer vers un point aléatoire
    scene.tweens.add({
        targets: sprite,
        x: Phaser.Math.Between(100, 700),
        y: Phaser.Math.Between(100, 500),
        duration: 3000,
        ease: 'Linear',
        onComplete: () => { spawnAdventurerMove(scene, sprite); }
    });
    adventurers.push(sprite);
}

function spawnAdventurerMove(scene, sprite) {
    scene.tweens.add({
        targets: sprite,
        x: Phaser.Math.Between(100, 700),
        y: Phaser.Math.Between(100, 500),
        duration: Phaser.Math.Between(2000, 5000),
        delay: 1000,
        onComplete: () => { spawnAdventurerMove(scene, sprite); }
    });
}

function update() {}