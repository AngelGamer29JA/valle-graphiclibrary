import { EventEmitter, SDL } from '../../deps.ts';
import { RenderWindow } from './Window.ts';
import { RenderContext } from './Context.ts';
import { BoxedPointer } from '../../deps.ts';
import { ErrorEvent, KeyboardEvent, CloseEvent, ApplicationEmitter, ApplicationEvents, MouseEvent, Event } from "../Events/mod.ts";
import { Renderer } from './Renderer.ts';
import { SDL_LIB_PATH } from '../utils/paths.ts';
import { EntityPosition, RenderObject } from '../Object/Object.ts';

export type AppConf = {
	title: string
	width: number
	height: number,
	libraryPath?: string,
	options?: {
		resizable?: boolean
	}
}

export type Color = [number, number, number];
export function Color(r: number, g: number, b: number): Color {
	return [r, g, b];
}

export const COLOR = {
    WHITE: Color(255, 255, 255),
    BLACK: Color(0, 0, 0),
    RED: Color(255, 0, 0),
    GREEN: Color(0, 255, 0),
    BLUE: Color(0, 0, 255)
}

export class Application {
	window: RenderWindow;
	context: RenderContext;
	renderer: Renderer
	#emitter: EventEmitter<ApplicationEvents> = new ApplicationEmitter();
	#done: boolean = false;
	#pressedKeys: {[n: string]: boolean} = {}
	#mousepos: EntityPosition = {x: 0, y: 0};

	readonly resizable: boolean;
	readonly flags: number;
	readonly title: string;
	readonly width: number;
	readonly height: number;

	constructor(options: AppConf) {
		options.libraryPath = options.libraryPath != null ? options.libraryPath : SDL_LIB_PATH;
		options.options = (options.options === undefined) ? {} : options.options;
		this.title = options.title;
		this.width = options.width;
		this.height = options.height;
		this.resizable = (options.options?.resizable === undefined) ? false : options.options.resizable;

		this.flags = (
			(!this.resizable) ?
			(SDL.WINDOW_OPENGL | SDL.WINDOW_SHOWN) : (SDL.WINDOW_RESIZABLE | SDL.WINDOW_OPENGL)
		);

		SDL.Init(SDL.INIT_VIDEO, options.libraryPath);
		let _window = SDL.CreateWindow(
			options.title,
			SDL.WINDOWPOS_CENTERED,
			SDL.WINDOWPOS_CENTERED,
			options.width,
			options.height,
			this.flags
		);

		if (_window === null) {
			this.#emitter.emit("error", new ErrorEvent(this, "Error to load SDL Window"));
			SDL.Quit();
			this.close(0xB);
		}

		let _renderer = SDL.CreateRenderer(_window!, -1, SDL.RENDERER_ACCELERATED);
		if (_renderer === null) {
			this.#emitter.emit("error", new ErrorEvent(this, "Error to load SDL Renderer"));
			SDL.DestroyWindow(_window!);
			SDL.Quit();
			this.close(0xA);
		}

		this.window = new RenderWindow(
			options.title,
			options.width,
			options.height,
			_window!
		);
		this.renderer = new Renderer(_renderer!);
		this.context = new RenderContext(this.renderer);
	}

	#_disableKey(key: string): void {
		this.#pressedKeys[key] = false;
	}

	#_enableKey(key: string): void {
		this.#pressedKeys[key] = true;
	}

	#onEvent(): void {
		const event = new SDL.Event();
		while (SDL.PollEvent(event) != 0) {
			if (event.type === SDL.KEYDOWN) {
				const _keycode = event.key.keysym.scancode;
				const _keyname = SDL.GetScancodeName(_keycode);
				const _evt = new KeyboardEvent(_keyname, _keycode, this, "keypress");
				_evt.pressed = true;
				this.#emitter.emit("keypress", _evt);

				this.#_enableKey(_keyname);
			} else if (event.type === SDL.KEYUP) {
				const _keycode = event.key.keysym.scancode;
				const _keyname = SDL.GetScancodeName(_keycode);
				const _evt = new KeyboardEvent(_keyname, _keycode, this, "keyup");
				this.#emitter.emit("keyup", _evt);

				this.#_disableKey(_keyname);
			} else if (event.type === SDL.MOUSEMOTION) {
				this.#mousepos = {x: event.mousemotion.x, y: event.mousemotion.y}
				const _evt = new MouseEvent("mousemove", this, event.mousemotion.x, event.mousemotion.y);
				this.#emitter.emit("mousemove", _evt);
			} else if (event.type === SDL.WINDOWEVENT) {
				var _evt: Event;
				switch (event.window.event) {
					case SDL.WINDOWEVENT_RESIZED:
						_evt = new Event(this, "resize");
						break;
					case SDL.WINDOWEVENT_CLOSE:
						_evt = new CloseEvent("close", this);
						break;
					case SDL.WINDOWEVENT_FOCUS_GAINED:
						_evt = new Event(this, "focus");
						break;
					case SDL.WINDOWEVENT_FOCUS_LOST:
						_evt = new Event(this, "unfocus");
						break;
					case SDL.WINDOWEVENT_ENTER:
						_evt = new MouseEvent("mouseenter", this, this.#mousepos.x, this.#mousepos.y);
						break;
					case SDL.WINDOWEVENT_LEAVE:
						_evt = new MouseEvent("mouseleave", this, this.#mousepos.x, this.#mousepos.y);
						break;
					default:
						_evt = new Event(this, "unknown");
				}
				this.#emitter.emit(_evt.type as keyof ApplicationEvents, _evt);
			} else if (event.type === SDL.QUIT) {
				const _evt = new CloseEvent("quit", this);
				this.#emitter.emit(_evt.type as keyof ApplicationEvents, _evt);
				this.close(0);
			}
		}
	}

	on<K extends keyof ApplicationEvents>(name: K, listener: (event: ApplicationEvents[K][0]) => void) {
		this.#emitter.on(
			name, 
			listener as any as (...event: ApplicationEvents[K]) => void
		);
	}

	draw(object: RenderObject): Promise<void>{
		object.app = this;
		return this.context.draw(object);
	}

	isKeyPressed(...keys: string[]): boolean {
		const _pressedKeys = this.#pressedKeys;
		for (let i = 0;i < keys.length;i++) {
			const _key = keys[i].toUpperCase()
			if (_pressedKeys[_key]) {
				return true;
			}
			_pressedKeys[_key] = false; 
		}
		return false;
	}

	setTitle(title: string) {
		this.window.title = title;
	}

	close(code: number): void {
		this.#done = true;
		Deno.exit(code);
	}

	async run(): Promise<void> {
		const _renderer = this.renderer.renderer;
		const _window = this.window.sdl_window;
		const _color = this.context.clearColor as Color;

		this.#emitter.emit("run", new Event(this, "run"));

		while (this.#done != true) {
			this.#onEvent(); // Event Listeners
			SDL.SetRenderDrawColor(_renderer, _color[0], _color[1], _color[2], 255);
			SDL.RenderPresent(_renderer);
			SDL.RenderClear(_renderer);

			this.renderer.render() // Rnedering all objects
			//SDL.RenderFlush(_renderer)
			this.#emitter.emit('update', new Event(this, "update"));
		}
	
		console.log('Destroying renderer');
		SDL.DestroyRenderer(_renderer);
		console.log('Destroying window : %s', this.title)
		SDL.DestroyWindow(_window);
		SDL.Quit();
	}

	get systemRam() {
		return SDL.GetSystemRAM();
	}

	get keys(){ return this.#pressedKeys; }
}