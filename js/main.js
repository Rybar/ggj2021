import Boot from './Boot.js'
import Preloader from './Preloader.js'
import MainGame from './Game.js'

const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

const config = { 
    type: Phaser.AUTO,
    backgroundColor: '#110022',
    pixelart: true,
    zoom: 4,
    scene: [Boot, Preloader, MainGame ],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scale: {
        mode:Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Math.floor(width/4),
        height: Math.floor(height/4)
        }
    
};

let game = new Phaser.Game(config);