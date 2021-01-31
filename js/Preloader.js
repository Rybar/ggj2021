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
        .text(160, 50, "Where's Bailey?\nClick To Start", {
        font: "30px vt323regular",
        align: "center",
        color: "#ffaa33"
        })
        .setOrigin(0.5, 0.5)
        .setShadow(1, 2, "#0000000", 0, true, true);
     
        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}