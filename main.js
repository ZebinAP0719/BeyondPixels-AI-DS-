class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load assets for the menu screen
        this.load.image('background', 'assets/menu-background.png');
        this.load.image('startButton', 'assets/start-button.png');
        this.load.image('optionsButton', 'assets/options-button.png');
        this.load.image('quitButton', 'assets/quit-button.png');
    }

    create() {
        // Add the background image
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background')
            .setScale(1.5)
            .setOrigin(0.5);

        // Game title
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'BeyondPixels-AI-DS', {
            fontSize: '64px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Start button
        const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'startButton')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene'); // Switch to the game scene
            });

        // Options button
        const optionsButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'optionsButton')
            .setInteractive()
            .on('pointerdown', () => {
                // Open the options scene
                this.scene.start('OptionsScene');
            });

        // Quit button
        const quitButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 200, 'quitButton')
            .setInteractive()
            .on('pointerdown', () => {
                // Quit the game (can handle differently in browser context)
                this.game.destroy(true);
            });

        // Hover effect: Buttons enlarge when hovered
        [startButton, optionsButton, quitButton].forEach(button => {
            button.on('pointerover', () => button.setScale(1.1));
            button.on('pointerout', () => button.setScale(1));
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Temporary game scene
        this.add.text(100, 100, 'Game Scene - Coming Soon!', { fontSize: '32px', fill: '#fff' });
    }
}

class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OptionsScene' });
    }

    create() {
        // Temporary options scene
        this.add.text(100, 100, 'Options Scene - Coming Soon!', { fontSize: '32px', fill: '#fff' });
    }
}

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MenuScene, GameScene, OptionsScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

// Create the game instance
const game = new Phaser.Game(config);
