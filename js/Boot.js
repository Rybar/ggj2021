export default class Boot extends Phaser.Scene
{
    constructor () {
        super('Boot');
    }

    preload () {
        this.load.setPath('assets/img');
        this.load.image('logo', 'phaser2.png');
    }

    create (){
        this.scene.start('Preloader');
    }
}