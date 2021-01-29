export default class MainGame extends Phaser.Scene{
    constructor(){
        super('Game');
        this.score;
        
    }
    preload(){
        this.load.setPath('assets/img');
        this.load.image('tiles', 'tilesheet.png');
    }

    create(){
        this.score = 0;
        

        const level = [];
        for(let i = 600; i > 0; i--){
            var row = []
            for(let j = 600; j > 0; j--){
             row.push(Math.floor(Math.random()*4));   
            }
            level.push(row);
        }
        
          // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("tiles");
        const layer = map.createLayer(0, tiles, 0, 0);

        this.add.image(700,300, 'logo');
        

        var particles = this.add.particles('yellow');

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