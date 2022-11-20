import { Application } from "../Application/mod.ts";
import { Event } from "./Event.ts";

export class CloseEvent extends Event {
    constructor(type: string, app: Application) {
        super(app, type);
    }

    get window() {
        return this.app.window;
    }
}