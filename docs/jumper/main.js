title = "jumper";

description = `Jump to avoid the enemies!`;

characters = [];

const G = {
  WIDTH: 150,
  HEIGHT: 100,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  theme: "dark",
};

/**
 * @typedef {{
 * pos: Vector,
 * vy: number
 * }} Player
 */
/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector
 * }} Enemy
 */
/**
 * @type { Enemy[] }
 */
let enemies;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
      vy: 0, // Vertical velocity for jumping
    };
    color("cyan");
  }

  // Apply gravity to the player
  player.vy += 0.5; // You can adjust this value to control the gravity strength
  // Limit the maximum falling speed to 5
  if (player.vy > 2) {
    player.vy = 2;
  }
  player.pos.y += player.vy;

  // Wrap the player around the screen vertically
  if (player.pos.y > G.HEIGHT) {
    player.pos.y = 0;
  } else if (player.pos.y < 0) {
    player.pos.y = G.HEIGHT;
  }

  box(player.pos, 3);

  if (input.isJustPressed) {
    playerJump();
  }

  function playerJump() {
    // Apply an upward force when the player jumps
    player.vy = -5; // You can adjust this value for the jump height
  }

  console.log("score: " + score);
}
