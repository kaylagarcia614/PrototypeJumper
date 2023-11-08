title = "jumper";

description = `Jump to avoid\n\n the enemies`;

characters = [];

const G = {
  WIDTH: 150,
  HEIGHT: 100,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  theme: "dark",
  isReplayEnabled: true
};

let player;
let enemies = [];
let enemyCreationInterval = 60;
let gameOver = false; // Add a gameOver flag

function update() {
  if (!gameOver) { // Only update the game if it's not over
    if (!ticks) {
      player = {
        pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
        vy: 0,
      };
    }

    if (ticks % enemyCreationInterval === 0) {
      createEnemy(G.WIDTH, rnd(0, G.HEIGHT), rnd(1, 4));
      createEnemy(0, rnd(0, G.HEIGHT), -rnd(1, 4));
    }

    // Check for collisions between the player and enemies
    remove(enemies, (e) => {
      e.pos.x -= e.speed;
      if (e.pos.x < 0 || e.pos.x > G.WIDTH) {
        score++;
        return true;
      }

      if (playerHitEnemy(player, e)) {
        end();
      }

      color("red");
      box(e.pos, 6, 6);
    });

    player.vy += 0.5;
    if (player.vy > 2) {
      player.vy = 2;
    }
    player.pos.y += player.vy;

    if (player.pos.y > G.HEIGHT) {
      player.pos.y = 0;
    } else if (player.pos.y < 0) {
      player.pos.y = G.HEIGHT;
    }

    color("cyan");
    box(player.pos, 3);

    if (input.isJustPressed) {
      playerJump();
    }
  }
}

// Function to check for collision between the player and an enemy
function playerHitEnemy(player, enemy) {
  return player.pos.distanceTo(enemy.pos) < 6; // Adjust the collision radius as needed
}

function playerJump() {
  player.vy = -5;
}

function createEnemy(x, y, speed) {
  enemies.push({
    pos: vec(x, y),
    speed: speed,
  });
}
