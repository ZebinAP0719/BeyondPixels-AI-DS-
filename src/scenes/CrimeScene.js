import SCENES from '../config/gameConstants.js';
import Button from '../objects/UI/Button.js'
class CrimeScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.CRIME_SCENE });
        this.evidence = [];
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
        // Initialize UI
        this.createUI();
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

    update() {
        // Update game logic here
        this.evidence.forEach(item => item.update());
    }
}

export default CrimeScene;