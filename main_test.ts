import * as Valle from './mod.ts';
import { COLOR } from './mod.ts';

const app = new Valle.Application({
	title: "Hello world",
	height: 600,
	width: 800
});

const context = app.context;
context.clearColor = [255,255,255]

let movementSpeed = 8;

const rect = new Valle.Rect();
rect.setSize(64, 64);
rect.color = COLOR.RED;


rect.position = {
	x: rect.width / 2,
	y: rect.height / 2
}

await context.draw(rect);

let gravity = 0.5;
let speed = 0.5;
let fallspeed = 0.5;
let y = gravity * speed / rect.height;

let falling = true;
let jumping = false;


app.on('update', async () => {

	rect.setPosition({
		y: y
	})

	if (rect.position.y > app.height - rect.height && jumping === false) {
		falling = false;
	}

	if (falling === true && jumping === false) {
		y += fallspeed;
		console.log("Position : %s", y);
	}
})
app.on('keyup', (e) => {
	if (e.key === "Z") {
		jumping = false;
	}
});

app.on('keypress', (e) => {
		if (e.key === "Z") {
			jumping = true;
			rect.position.y += 50
		} 

		if (e.key === "X") {
			rect.setSize((rect.position.x / 2) + rect.width + 1, (rect.position.y / 2) + rect.height + 1);
		}

		if (e.key === "D") {
			let pos = rect.position.x + movementSpeed / 30 * 50;
			rect.setPosition({
				x: pos
			});
		} else if (e.key === "A") {
			let pos = rect.position.x - movementSpeed / 30 * 50;
			rect.setPosition({
				x: pos
			})
		} else if (e.key === "S") {
			let pos = rect.position.y + movementSpeed / 30 * 50;
			rect.position.y = pos;
		} else if (e.key === "W") {
			let pos = rect.position.y - movementSpeed / 30 * 50;
			rect.position.y = pos;
		}
});
await app.run();