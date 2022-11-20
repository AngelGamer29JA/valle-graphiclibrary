import { EventEmitter, SDL_MOD } from "../../deps.ts";
import { SDLK_a } from "../../sdl2-ts/mod.SDL.ts";
import { Application } from "../Application/mod.ts";
import { ApplicationEvents } from "./EventKey.ts";

export class Event {
    readonly app: Application;
    readonly type: string = "";
    constructor(app: Application, type: string) {
        this.app = app;
        this.type = type;
    }
}
export class ApplicationEmitter extends EventEmitter<ApplicationEvents>{}