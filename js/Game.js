import Player from './Player.js'

export default class MainGame extends Phaser.Scene{
    constructor(){
        super('Game');
        this.score;
        
    }
    preload(){
        this.load.setPath('assets/img');
        this.load.image('tiles', 'tilesheet.png');
        this.load.image('player', 'guy.png');
        this.load.tilemapTiledJSON("map", "../maps/map00.json");
    }

    create(){
        this.score = 0;
        
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("tiles", "tiles");
        const belowLayer = map.createLayer("Below", tiles, 0, 0);

        const worldLayer = map.createLayer("World", tiles, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });
        

        const aboveLayer = map.createLayer("Above", tiles, 0, 0).setScrollFactor(1.1);
        aboveLayer.setDepth(10);

        const spawnPoint = map.findObject("Objects", obj => obj.name === "spawn");

        //debug collide fill
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        // this.player = this.physics.add
        //     .sprite(spawnPoint.x, spawnPoint.y, "player",)
        //     //.setOffset(0, 24);
        //     this.physics.add.collider(this.player, worldLayer);

        this.player = new Player(this, spawnPoint.x, spawnPoint.y);
        this.physics.world.addCollider(this.player.sprite, this.worldLayer);

        this.add.image(700,300, 'logo');

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update (time, delta)
    {
        this.player.update();
    }
}