export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, "player", 0)
      .setDrag(2000, 2000)
      .setMaxVelocity(300, 400);
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D, } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    });
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const onGround = sprite.body.blocked.down;
    const acceleration = 400;
    const anims = this.scene.anims;
    sprite.setMaxVelocity(150);

    anims.create({
      key: "allison-walk-up",
      frames: anims.generateFrameNumbers("player", { start: 16, end: 31 }),
      frameRate: 16,
      repeat: -1
    });
    anims.create({
      key: "allison-walk-down",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });
    
    anims.create({
      key: "allison-walk-right",
      frames: anims.generateFrameNumbers("player", { start: 48, end: 63 }),
      frameRate: 16,
      repeat: -1
    });
    anims.create({
      key: "allison-walk-left",
      frames: anims.generateFrameNumbers("player", { start: 32, end: 47 }),
      frameRate: 16,
      repeat: -1
    });

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.a.isDown) {
      sprite.setAccelerationX(-acceleration);      
      } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
    } else {
      sprite.setAccelerationX(0);
    }

    // up/down movement
    if (keys.up.isDown || keys.w.isDown) {
      sprite.setAccelerationY(-acceleration);      
      } else if (keys.down.isDown || keys.s.isDown) {
      sprite.setAccelerationY(acceleration);
    } else {
      sprite.setAccelerationY(0);
    }

    //animation based on accelleration
    if (sprite.body.acceleration.x < 0) {
      sprite.anims.play("allison-walk-right", true);
    } else if (sprite.body.acceleration.x > 0) {
      sprite.anims.play("allison-walk-left", true);
    } else if (sprite.body.acceleration.y > 0) {
      sprite.anims.play("allison-walk-down", true);
    } else if (sprite.body.acceleration.y < 0) {
      sprite.anims.play("allison-walk-up", true);
    } else {
      sprite.anims.stop();
    }

  }

  destroy() {
    this.sprite.destroy();
  }
}
