import { SDL, BoxedPointer } from "../../deps.ts";

class RenderWindow {
	title: string;
	width: number;
	height: number;
	#sdl_window: SDL.Window;
	

	constructor(title: string, width: number, height: number, sdl_window: SDL.Window) {
		this.title = title;
		this.width = width;
		this.height = height;
		this.#sdl_window = sdl_window;
	}
	get sdl_window() { return this.#sdl_window; }

}
export {
	RenderWindow
}