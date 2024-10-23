import SCENES from "../config/gameConstants.js";

var cursors;

class MuseumScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.MUSEUM_SCENE});
    }

    preload() {
        this.load.spritesheet('director', 'assets/images/characters/museum_director.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('character', 'assets/images/characters/detective.png', {
            frameWidth: 128, // Width of each frame
            frameHeight: 128 // Height of each frame
        });
    }

    create() {
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
            key: 'director_idle',
            frames: this.anims.generateFrameNumbers('director', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'detective_idle',
            frames: this.anims.generateFrameNumbers('character', { start: 10, end: 22 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 10, end: 19 }),
            frameRate: 15,
            repeat: -1
        });
    
        // Create the character sprite
        this.player = this.physics.add.sprite(100, 200, 'character'); // Make sure sprite key matches
        this.director = this.physics.add.sprite(800, 200, 'director');
    
        // Ensure the sprite has proper scaling and physics properties
        this.player.setScale(3);
        this.director.setScale(3);

        this.player.setCollideWorldBounds(true);
        this.director.setCollideWorldBounds(true)
    
        // Enable arrow key inputs
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.director, floor);
    
        // Initialize UI
        this.createUI();
    }

    update() {
        this.director.anims.play('director_idle', true);

        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            // If no key is pressed, stop the animation
            this.player.setVelocityX(0);
            this.player.anims.play('detective_idle', true);
        }
    }

    createUI() {
        // Score display
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff'
        });
    }

    talkToDirector() {

    }
}

export default MuseumScene;