import SCENES from "../config/gameConstants.js";

var pauseFlag = false;

class MuseumScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENES.MUSEUM_SCENE });
        this.dialogDisplayed = false; // Ensure dialog appears only once
        this.textFlag = false; // To control when the game should pause for dialog
<<<<<<< HEAD
        this.currentDialogueIndex = 0; // Track the current dialog index
        this.typingEvent = null; // To track the text animation event
        this.isTyping = false; // To know if text is currently animating
=======
        this.endSceneFlag = false;
>>>>>>> e671071e7c2ede302fa12a39f74201f2fc3d0c8c
    }

    preload() {
        this.load.spritesheet('director_new', 'assets/images/characters/museum_director.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('character', 'assets/images/characters/detective.png', {
            frameWidth: 128, 
            frameHeight: 128 
        });

        this.load.image('dialogBox', 'assets/images/ui/dialogBox.png');
        this.load.image('crime-scene-alert', 'assets/images/ui/crime-scene-alert.png'); // New background image
        this.load.audio('new-music', 'assets/audio/new-audio.mp3'); // New audio file
    }

    create() {

        this.bg = this.add.image(0, 0, 'crime-scene-bg').setOrigin(0);
        const floor = this.physics.add.staticGroup();
        const platformWidth = this.textures.get('museum-floor-platform').getSourceImage().width;

        const sceneWidth = this.scale.width;
        const numPlatforms = Math.ceil(sceneWidth / platformWidth);
    
        for (let i = 0; i <= numPlatforms; i++) {
            floor.create(i * platformWidth, 501, 'museum-floor-platform').setScale(1).refreshBody();
        }

        this.anims.create({
            key: 'director_idle',
            frames: this.anims.generateFrameNumbers('director_new', { start: 0, end: 13 }),
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
            frames: this.anims.generateFrameNumbers('character', { start: 23, end: 32 }),
            frameRate: 15,
            repeat: -1
        });
    
        this.player = this.physics.add.sprite(100, 200, 'character');
        this.director = this.physics.add.sprite(800, 200, 'director_new');
    
        this.player.setScale(3);
        this.director.setScale(3);

        this.player.setCollideWorldBounds(true);
        this.director.setCollideWorldBounds(true);
    
        // Create WASD keys
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.director, floor);

        this.cameras.main.fadeIn(1000);
    
        this.createUI();

        // Make the director sprite interactive (clickable)
        this.director.setInteractive({
            useHandCursor: true,
            hitArea: new Phaser.Geom.Ellipse(this.director.width / 2, this.director.height / 2, 90, 110), // Adjust these values for ellipse fit
            hitAreaCallback: Phaser.Geom.Ellipse.Contains // Ellipse shape for hit area
        });

        // Add event listener for clicking on the director sprite
        this.director.on('pointerdown', () => {
            if (this.dialogDisplayed && this.isTyping) {
                // Skip current typing animation and display full text instantly
                this.skipCurrentDialogue();
            } else if (!this.dialogDisplayed) {
                // Start dialog for the first time
                this.dialogDisplayed = true;
                this.createDialogBox();
                pauseFlag = true; // Pause movement during dialog
            } else {
                // If dialog is displayed and not typing, skip to next dialogue
                this.nextDialogue();
            }
        });
    }

    update() {

        this.director.anims.play('director_idle', true);

<<<<<<< HEAD
        if (this.aKey.isDown && !pauseFlag) {
=======
        // Trigger dialog when player is near the director and dialog hasn't been displayed yet
        if (Math.abs(this.director.x - this.player.x) <= 150 && !this.dialogDisplayed) {
            this.dialogDisplayed = true;
            this.createDialogBox();
            pauseFlag = true;
        }

        if (cursors.left.isDown && !pauseFlag) {
>>>>>>> e671071e7c2ede302fa12a39f74201f2fc3d0c8c
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.dKey.isDown && !pauseFlag) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('detective_idle', true);
        }
    }

    createUI() {
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff'
        });
    }

    createDialogBox() {
        this.dialogBox = this.add.image(120, 460, 'dialogBox').setOrigin(0);
        this.dialogText = this.add.text(140, 470, "", {
            fontFamily: 'Arial',
            fontSize: '15px',
            color: '#000',
            wordWrap: { width: 700, useAdvancedWrap: true } // Adjust width for better word wrapping
        });

        this.dialogSequence = [
            { speaker: "Detective", content: "It's worse than we thought. I've been tracking this organization for months now. They're not just after relics—they're after time itself." },
            { speaker: "Museum Manager", content: "Time? What do you mean, detective?" },
            { speaker: "Detective", content: "These aren't random thefts. They’ve been targeting museums all over the world, stealing artifacts from key historical periods. They use them to open time portals—jumping back to the past to steal even more valuable relics from those eras. What’s valuable in the past becomes priceless in the present." },
            { speaker: "Museum Manager", content: "That’s impossible! You're telling me they can... time travel?!" },
            { speaker: "Detective", content: "Exactly. And they’re getting bolder. We need to stop them before they rewrite history for their own gain." }
        ];

        // Start the first dialogue sequence
        this.showDialogSequence(this.dialogText, this.dialogSequence, this.currentDialogueIndex);
    }

    showDialogSequence(textObject, sequence, index) {
        if (index < sequence.length) {
            const currentDialog = sequence[index];
            const dialogContent = `${currentDialog.speaker}: ${currentDialog.content}`;

            this.typeText(textObject, dialogContent, 50);

        } else {
            this.dialogDisplayed = false;
            this.endScene();
        }
    }

    nextDialogue() {
        // Move to the next dialogue if available
        this.currentDialogueIndex++;
        if (this.currentDialogueIndex < this.dialogSequence.length) {
            this.showDialogSequence(this.dialogText, this.dialogSequence, this.currentDialogueIndex);
        } else {
            // End dialog and resume gameplay
            this.dialogBox.destroy();
            this.dialogText.destroy();
            this.dialogDisplayed = false;
            pauseFlag = false;

            // Trigger the background and audio change
            this.changeBackgroundAndAudio();
        }
    }

    skipCurrentDialogue() {
        // Immediately display the entire current text and stop the typing animation
        this.typingEvent.remove();
        const currentDialog = this.dialogSequence[this.currentDialogueIndex];
        const dialogContent = `${currentDialog.speaker}: ${currentDialog.content}`;
        this.dialogText.setText(dialogContent);
        this.isTyping = false; // Text is fully displayed now
    }

    typeText(textObject, content, speed) {
        textObject.setText('');
        let i = 0;
        this.isTyping = true; // Mark that text is being typed
    
        // Clear any ongoing typing event before starting a new one
        if (this.typingEvent) {
            this.typingEvent.remove();
        }
    
        this.typingEvent = this.time.addEvent({
            delay: speed,
            callback: () => {
                textObject.setText(content.slice(0, i));
                i++;
                if (i > content.length) {
                    this.isTyping = false; // Mark typing as complete
                    this.textFlag = false;
                    this.typingEvent.remove();
                }
            },
            repeat: content.length - 1
        });
    }

<<<<<<< HEAD
    changeBackgroundAndAudio() {
        // Check if bg exists before trying to change its texture
        if (this.bg) {
            this.bg.setTexture('crime-scene-alert'); // Change background
        } else {
            console.warn('Background image is not initialized.'); // Log warning if bg is undefined
        }
    
        // Stop the current audio and play new audio
        if (this.currentAudio) {
            this.currentAudio.stop(); // Stop current music
        }
    
        // Play the new background music
        this.newAudio = this.sound.add('new-music');
        this.newAudio.play({ loop: true });
    }
    
=======
    endScene() {
        this.cameras.main.fadeOut(1000); 
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(SCENES.MUSEUM_THEFT);  // Transition to next scene
        });
    }
>>>>>>> e671071e7c2ede302fa12a39f74201f2fc3d0c8c
}

export default MuseumScene;
