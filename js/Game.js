//import * as Phaser from './lib/phaser.js'

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('Game');
        this.score;
        
    }
    preload(){
        this.load.setPath('assets/img');
        this.load.image('tiles', 'tilesheet.png');
        
        this.load.tilemapTiledJSON("map", "../maps/map00.json");
    }

    create(){
        this.score = 0;
        

        
        
          // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("tiles", "tiles");
        const belowLayer = map.createLayer("Below", tiles, 0, 0);
        const worldLayer = map.createLayer("World", tiles, 0, 0);
        const aboveLayer = map.createLayer("Above", tiles, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });

        //debug collide fill
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

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