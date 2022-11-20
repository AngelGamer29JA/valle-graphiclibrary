import { SDL } from "../deps.ts";
import { Application, COLOR, Rect } from "../mod.ts";

const WIDTH = 800;
const HEIGHT = 600;

let gravity = 0.5;
let speed = 0.5;
let fallspeed = 0.5;
let movementSpeed = 190;
let falling = true;

const game = new Application({
    title: "Testing SDL Rect from DENO",
    width: WIDTH,
    height: HEIGHT
});
console.log(game)

const rect = new Rect({
    width: 64,
    height: 64,
    position: {
        x: 0,
        y: 0
    },
    color: COLOR.GREEN
});

await game.draw(rect);

let y = fallspeed / rect.height * gravity + speed;

game.on('update', () => {

    if (rect.position.y > HEIGHT - rect.height) {
       falling = false;
    } else if (rect.position.y < HEIGHT - rect.height) {
        falling = true;
    }

    if (falling === true) {
        rect.position.y = rect.position.y + y;
    }
});

game.on('keypress', (event) => {
    if (event.key === "A") {
        let pos = rect.position.x - movementSpeed / 10 * gravity;
        rect.position.x = pos;
    } else if (event.key === "D") {
        let pos = rect.position.x + movementSpeed / 10 * gravity;
        rect.position.x = pos;
    }
});

game.on('keyup', (event) => {
    if (event.key === "X") {
        resetFall();
    }
});

await game.run();

function resetFall() {
    rect.position.y = 0;
}