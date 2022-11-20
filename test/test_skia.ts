import { createCanvas } from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 200, 200)

ctx.fillStyle = "red";
ctx.font = "20px sans-serif";
ctx.fillText("Hello world", 0, 1);
await Deno.writeFile("text.png", canvas.toBuffer())