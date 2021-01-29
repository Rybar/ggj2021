export default class Preloader extends Phaser.Scene {
    constructor(){
        super('Preloader');
    }

    preload(){
        this.load.setPath('assets/img');
        this.load.image('red', 'red.png');
        this.load.image('yellow', 'yellow.png');

        this.add.image(400,300, 'logo');
    }

    create(){
        this.add
        .text(150, 100, "Empty Game\nClick To Start", {
        font: "30px monospace",
        color: "#999999"
        })
        .setOrigin(0.5, 0.5)
        .setShadow(1, 2, "#0000000", 0, true, true);
     
        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}