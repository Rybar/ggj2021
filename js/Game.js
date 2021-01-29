export default class MainGame extends Phaser.Scene{
    constructor(){
        super('Game');
        this.score;
        
    }

    create(){
        this.score = 0;
        this.add.image(700,300, 'logo');

        var particles = this.add.particles('red');

        this.cameras.main.setBounds(0, 0, 10000,10000);
        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        var emitter = particles.createEmitter({
            speed:100,
            scale: { start:0.1, end:0},
            blendMode: 'ADD'
        });

        this.input.on('pointermove', (pointer)=>{
            emitter.startFollow(pointer);
        })
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
}