import SCENES from '../config/gameConstants.js';
import Button from '../objects/UI/Button.js';

var cursors;

class CrimeScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.CRIME_SCENE });
        this.evidence = [];
        cursors = null;
    }

    preload() {
        this.load.spritesheet('character', 'assets/images/characters/detective_run.png', {
            frameWidth: 20, // Width of each frame
            frameHeight: 39 // Height of each frame
        });
    }

    create() {
        console.log('Crime Scene')
        // Add background
        this.add.image(0, 0, 'crime-scene-bg').setOrigin(0);

        const floor = this.physics.add.staticGroup();
        const platformWidth = this.textures.get('museum-floor-platform').getSourceImage().width;

        // Calculate how many platforms are needed to cover the scene width
        const sceneWidth = this.scale.width;
        const numPlatforms = Math.ceil(sceneWidth / platformWidth);
    
        // Create and position each platform
        for (let i = 0; i <= numPlatforms; i++) {
            floor.create(i * platformWidth, 501, 'museum-floor-platform').setScale(1).refreshBody();
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 8, end: 15 }),
            frameRate: 15,
            repeat: -1
        });
    
        // Create the character sprite
        this.player = this.physics.add.sprite(100, 200, 'character'); // Make sure sprite key matches
    
        // Ensure the sprite has proper scaling and physics properties
        this.player.setScale(5);
        this.player.setCollideWorldBounds(true); // Ensure character doesn't go off-screen
    
        // Enable arrow key inputs
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, floor)
    
        // Initialize UI
        this.createUI();
    }

    update() {    
        // Check for left/right movement
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            // If no key is pressed, stop the animation
            this.player.setVelocityX(0);
            this.player.anims.stop();
        }
    }

    createUI() {
        // Score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff'
        });

        // Inventory button
        this.inventoryButton = new Button(this, 700, 550, 'Open Inventory', () => {
            this.scene.start(SCENES.INVENTORY);
        });
    }
}

export default CrimeScene;